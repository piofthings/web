{{{
  "title": "PiWars 2019 Diary: Are we there yet? Not quite!",
  "tags": ["piwars-2019", "piwars", "Bluetooth"],
  "category": "Robotics",
  "date": "March 14, 2019",
  "author": "Sumit Kumar Maitra"
}}}

So here we are... 2 weeks to go! Honestly I didn't want to write a post yet but today is the last day for submission into the competition, so I thought I'll share some more of the progress. Actually a lot of stuff has happened on the mechanical end of things and not enough has happened on the software side. So end result is a fairly good looking bot that still needs a lot of integration and testing. However, lots of lessons were learnt, so I'll try to cover some those today.

In my last post I left with the promise to show how I did BT comms between the two Pis. So we'll take that up first.

## Talking between two Raspberry Pis using BlueDot
Yeah, I didn't write a low-level BT driver, just stood on shoulder of giants :). Martin O'Hanlan has written an excellent Bluetooth library in Python that works perfectly on the Pi.

Step 1: Pair the two Pis using instructions here https://bluedot.readthedocs.io/en/latest/pairpipi.html

Step 2: Decide which one is client and which one is server
Step 3: Initialise server as shown here https://bluedot.readthedocs.io/en/latest/btcommapi.html
```Python
from bluedot.btcomm import BluetoothServer
from signal import pause

def data_received(data):
    print(data)
    s.send(data)

s = BluetoothServer(data_received)
pause()
```
Step 4: Initialise client as shown here https://bluedot.readthedocs.io/en/latest/btcommapi.html#bluetoothclient Change "raspberrypi" with the hostname of your Pi or just use the MAC address directly

```Python
from bluedot.btcomm import BluetoothClient
from signal import pause

def data_received(data):
    print(data)

c = BluetoothClient("raspberrypi", data_received)
c.send("helloworld")

pause()
```
Done!

Well not really done because you only sent a "Hello world" and the client the bounced it back to you.

### Creating your own comm commands/protocol
Remember in the [last post](https://piofthings.net/blog/piwars-2019-diary---a-major-design-change-and-other-challenges) I had finished with a mini serialisation framework? Well it was for a reason. I wanted the two Pis to talk JSON amongst themselves. All I had to do was decide on the parameters. I came up with the following format in an attempt to keep it succinct.

```python
import json
from serialisable_base import SerialisableBase
from bt_steering_mode_data import BtSteeringModeData


class BtRequest(SerialisableBase):
    cmd = ""
    action = ""
    data = None

    def __init__(self, json_def=None, json_file=None):
        super().__init__(json_def, json_file)

    def deserialise(self, json_dict):
        super().deserialise(json_dict)
        if(self.data != None):
            if(self.cmd == "steering" and self.action == "move"):
                self.data = BtSteeringModeData(json_def=json.dumps(self.data))

```  

The ```BtRequest``` class has three properties, ```cmd```, ```action```, ```data```. The first two are string parameters and data is an object. I hoped to keep it to simple types like string and numbers. But turns out the first thing I tried it for, it became a full fledged object - BtSteeringModeData (as you can see above I have had to 'improvise' to get it deserialised)

```Python
import json
from serialisable_base import SerialisableBase


class BtSteeringModeData(SerialisableBase):
    speedLeft = ""
    directionLeft = ""
    speedRight = ""
    directionRight = ""

    def __init__(self, json_def=None, json_file=None):
        super().__init__(json_def, json_file)

    def deserialise(self, json_dict):
        super().deserialise(json_dict)

```

### How does it work?
Basically I have a set of commands pre-defined, commands that the ```Cruncher``` sends to the ```Controller```. It is mostly unidirectional (atleast as far as I have thought it out).

- All sensors are attached to the ```Cruncher``` which is the beefier Pi3A+. Sensor array consists of
    - Joystick (yes the Joystick is a sensor in my world)
    - 4x ToF Sensors VLX
    - 1x 9DoF sensor
    - Camera
Essentially all inputs go to the ```Cruncher```

- All DC motors, Servo motors, lights  etc. are connect to the ```Controller```. This is a Pi Zero W with a Pico HAT Hacker.

For example for steering these are the commands:

#### Manual Control

<table class="table">
 <thead>

  <tr>
  <th>
  </th>
   <th>Cruncher</th>
   <th>Controller</th>
   <th/>
   <th/>
   <th>Notes</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td />
   <td>
    {  
     "cmd": "steering",  
     "action": "move",  
     "data": {  
         "speedLeft": [0-1],  
         "directionLeft": [1-0],  
         "speedRight": [0-1],  
         "directionRight": [1-0]  
     }  
    }
   </td>
   <td>
    {  
        "res": "OK",  
        "data": None  
    }  
   </td>
   <td />
   <td />
   <td>
    Cruncher gets input from Joystick and if the event selected in UI is applicable, sends out a ```steering``` command with the ```action``` = ```move```. The ```data``` property has the left and right speed and direction details

    The Controller Pi, on reciept, is supposed to respond with a ```OK```.
   </td>
  </tr>
  <tr>
  <td />

   <td>
   {  
    "cmd": "wheels",  
    "action": "strafe",  
    "data": "left30"  
   }
   </td>
   <td>
   {  
       "res": "OK",  
       "data": None  
   }
   </td>
   <td/>
   <td/>
   <td>
    The 'Wheels' command turns the wheels using the dedicated steering motors.<br />
    The 'strafe' action tells the robot to get ready to strafe <br/>
    The 'data' which in this case is a simple string instructing Controller pi to set the wheels to strafe left 30 degrees <br/>

   </td>
   <td></td>
  </tr>
  <tr>
  <td />

   <td>
   {  
    "cmd": "wheels",  
    "action": "strafe",  
    "data": "right30"   
   }
   </td>
   <td>
   {  
       "res": "OK",  
       "data": None  
   }
   </td>
   <td/>
   <td/>
   <td>Same as above just strafe right</td>
  </tr>
  <tr>
  <td />

   <td>
   {  
    "cmd": "wheels",  
    "action": "strafe",  
    "data": "sideways"  
   }  
   </td>
   <td>
   {  
       "res": "OK",  
       "data": None  
   }
   </td>
   <td/>
   <td/>
   <td>This one is theoretical, not sure if the bot will be balanced enough if I move the wheels 90 degrees to normal. I know it can do it, practicality has to be tested</td>
  </tr>
  <tr>
  <td />

   <td>
   {  
    "cmd": "wheels",  
    "action": "spotTurn",  
    "data": "none"  
   }  
   </td>
   <td>
   {  
       "res": "OK",  
       "data": None  
   }
   </td>
   <td/>
   <td/>
   <td>This is a single command to set the wheels in spot turn position.</td>
  </tr>

 </tbody>
</table>

The code for this interaction is fairly simple, again thanks to BlueDot.

The _Cruncher_ sends off the command as follows, quite literally a string construction:
```python
def update_j2_controller(self):
        if(self.__cruncher_menu.current_menu_name == "ev_pi_noon"):
            if(self.__joystick_input.enabled == True):
                btCommand = '{{"cmd": "steering","action": "move","data": {{ "speedLeft": {},"directionLeft": {}, "speedRight": {}, "directionRight": {} }} }}'.format(
                    self.__joystick_input.driveLeft,
                    self.__joystick_input.directionLeft,
                    self.__joystick_input.driveRight,
                    self.__joystick_input.directionRight
                )
                self.__bt_server.send(btCommand)
```

The _Controller_ recieves the command via BlueDot's ```data_received``` event handler and processes it as follows:

```python
def data_received(self, data_string):
    # print("BT Recieved:" + data_string)
    try:
        request=BtRequest(json_def=data_string)
        if(request.cmd == "calibrate"):
            if(request.action == "getStatus"):)
                self.bt_request.send(json.dumps(self.__steering.steering())
        elif(request.cmd == "steering"):
            if(and request.action == "move"):
                self.__gpiozero_drive.move(int(request.data.directionLeft), int(request.data.directionRight), float(request.data.speedLeft), float(request.data.speedRight))
        elif(request.cmd == "shooter"):
            if(and request.action == "aim"):
                # Turn laser on
                pass
            elif(request.action == "launch"):
                # Fire appropriate cannon
                pass

    except:
        type, value, traceback=sys.exc_info()
        print('Error Deserialising %s: %s %s' % (data_string, type, value))
```

Here you can see Controller has passed on the driving functionality to a module instance named ```__gpiozero_drive```. You can see the code in the project [Github repo](https://github.com/piofthings/piwars-2019/blob/master/clients/services/gpiozero_drive.py). It uses the excellent GPIOZero library to send appropriate PWM commands to my Cytron controller board.


That was a super brief introduction to the BT Comms between my two Pis.

## Building the top-shell and yet more design changes
After much delay I completed final touches to the 3D Model of the top shell just in time to submit it to Mike for the team details update. It took a good 40 hours to print all the bits, but the final result was really encouraging. Here are a few pics:

![First part - Rear bottom of the bot](/posts/images/pi-wars/pi-wars-2019-shell-part-1.jpg)  

_First part - Rear bottom of the bot_

![Second part - Rear top part, also holds the GFX HAT display unit](/posts/images/pi-wars/pi-wars-2019-shell-part-2.jpg)
_Second part - Rear top part, also holds the GFX HAT display unit_

![Full shell assembled - It is put together by a mix of bolts and plastic cement](/posts/images/pi-wars/pi-wars-2019-shell-assembled.jpg)
_Full shell assembled - It is put together by a mix of bolts and plastic cement_

![Shell on the bot - Can you tell where the design is beginning to change again?](/posts/images/pi-wars/pi-wars-2019-shell-on-bot.jpg)
_Shell on the bot - Can you tell where the design is beginning to change again?_

I have plans to fill in the rough places with putty, and then air brush the whole thing.

Initial plans to laser cut acrylic windows have been shelved. Might hand cut them or stick some transparent book laminate to fill in. Attempt at 3D Printing with transparent filament, resulted in fairly translucent windows.


### Yet another design change
After the shell was printed it became clear the gear along with the stabiliser was a bit too high. Ready to ignore it I tried to steer the bot's wheels but they kept getting stuck at unpredicatable places. It became clear I had to rethink the 'gear-stabiliser'. So instead I went back and designed a very simple 'gear box'. Basically an elliptical cylinder that encompasses both the gears and can be bolted down to the chassis.
![New improved gear boxes](/posts/images/pi-wars/pi-wars-2019-new-gearbox.jpg)

## Menu and GUI
I am using the GFX HAT from PiMoroni for my on board GUI. It has an easy to shut off backlight making it an efficient display using with nice programmable capacitive touch buttons. I don't like the placement of the buttons because it is very difficult to build a 'case' for it, but I think I can get away with a metal aluminium bit on a spring on top of each to extend its range.

I piggy backed on the Menu system provided in the default examples by PiMoroni. However made improvements to it as I went along, resulting in a multi-depth menu system that should be enough to handle all the UI needs.


## The Meteor shooter
This one is still being completed, but full credit to Brian Starkey for pointing me to Lego Competition cannons. I was running out of ideas on how to do a spring based projectile launcher, this cannon solved it for me. To save time between reloads I ordered 6 of them (use 5). I modeled a 3D printed scaffold with place for Laser pointer in line with the cannon and motors at the back. This turned out to be very fun project itself.

![Meteor shooter - 5 Cannons triggered by 3 Servos](/posts/images/pi-wars/pi-wars-2019-meteor-shooter.jpg)
_Meteor shooter - 5 Cannons triggered by 3 Servos_

I'll write a detailed blog post about this one later.

## The PiNoon holder

This wasn't very exciting but necessary. Atleast with the holder in place I can say I can take part in 2 events atleast :D

![PiNoon holder - Fairly 'space agey'](/posts/images/pi-wars/pi-wars-2019-pi-noon-holder.jpg)
_PiNoon holder - Fairly 'space agey'_

## Other challenges
Apart from the challenge of time (and focus), day before yesterday I came back to find the robot had fallen off its styrofoam perch and smashed an axle and gearbox. Reprint/dismantle/reassmble... phew!

The battery monitoring circuits kept playing up till I realised I was charging my 4.2V 18650 batteries to 3.7 only. Once I figured that could be charged upto 4.2, the battery monitoring circuits kicked in.

The aiming lasers were supposed to be triggered by Solid State relays but I didn't know SSRs are explicitly designed for AC loads and DC loads. I managed to buy the wrong kinds. This bit still hasn't been sorted yet, I've got a bunch of Darlington Pair transistors based modules that should do the job instead.

## In Conclusion
The next two weeks are going to be mostly sleepless and full of work. Need to get the robot on the ground and practice driving. Once the steering is predictable start integrating all the Open CV code I wrote in the past. In the meantime I might just use the sidekick Tiny4WD for the OpenCV development and testing.

A lot of work remains, and I will be blogging about all of it, either before or after the competition. PiWars is more about community, sharing and learning. There is no point in keeping secrets of what I have stumbled upon, learn share grow continues to be my motto and I am infinitely grateful to the like of Brian Starkey, Douglas Gore, Michael Sendula, @drfootleg, Elliot Pittnam and loads of others who have provided continuous guidance and inspiration and at times, brought be back from the brink of giving up! Thanks ya'll...
