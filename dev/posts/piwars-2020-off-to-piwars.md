{{{
  "title": "Applying for and getting into PiWars 2020",
  "tags": ["piwars-2020", "piwars"],
  "category": "Robotics",
  "date": "10 October, 2019",
  "author": "Sumit Kumar Maitra"
}}}

So... we applied for and made it to PiWars 2020. We have managed to expand on our previous sketch and send off the application one day before applications closed.
I've taken out the sensitive information, but this is our **Robot Details.** section in it's entirety. We created a PDF and attached it as a part of the application.

## Robot details
Our robot is based on the red truck from the natural disaster movie Twister.
Twister was a movie created very much in pre-IoT days- a system of sensors that sends back telemetry data from inside clouds and tornadoes.
If one thinks of sensors that send back data in today’s scenario industrial scale IoT comes to mind immediately. If Twister were re-written today we would probably have Dorothy the sensor system, as a self drive capable vehicular system that could drive itself into a Tornado and let loose the array of sensors that would then talk back to a central/decentralised (LoRA WAN anyone?) command center.

## Our bot – Dorothy Mk2 and its sidekick Tinman

### Dorothy Mk2
#### The Chassis and drive train
Dorothy will be built to (roughly) resemble the Dodge RAM 3000 truck that was used in the movie, but inside will be a ‘bit different’.
As of now we have plans for it to have a front wheel digital Ackerman steering (one Servo for each wheel) and will be able to skid steer to turn on the spot.
In that respect it is a little underwhelming, however we found our last year’s design for 4 wheel pivot steering wasn’t quite feasible using our current approach of mounting servos on the stalk. We may get back to it in a different format some day.
> Please note, we have just finished building the second iteration of our gearbox for the digital Ackerman steering which seems to work as a prototype. At the time of writing we have not tested the prototype with the rest of the chassis, so in case the gearbox fails we will revert to simple tank steering (this will not need any complex redesign of chassis, we’ll simply use the rear tie rod at the front as well).

As a ‘lesson learnt’ from previous PiWars we shall not continue experimenting with gearboxes anymore, instead use the fallback.

However, the drivetrain is not entirely boring. It will have two servos, one in front and one at the rear. These two drive a set of rack and pinion gears that are tied to the drive shafts, giving the robot, ability to raise it’s main chassis further off the ground. This will help in potential ‘beaching’ scenarios where the robot may get over a bump but gets ‘beached’ because it’s rear wheels didn’t make it to the bump, before the front wheels got off. From current state of the 3D Models it seems we’ll need this functionality for the pluggable “Barrel Grabber” attachment as well.

This is particularly well suited for scenarios like the one towards the end of the Twister movie where the protagonist’s truck is stuck because a huge tree gets wedged under the truck ;-).

#### Some media of the our successes so far
A picture of steering shafts that we had to mill down from 8mm to 7.8mm using nothing but a hand- drill and sandpaper
![A picture of steering shafts that we had to mill down from 8mm to 7.8mm using nothing but a hand- drill and sandpaper](/posts/images/pi-wars/piwars-2020-steering-stalk.jpg)

Here’s a video of the height adjuster in action.
https://twitter.com/piofthings/status/1168310980406910976?s=20

Here’s how the ‘new’ gearbox works

https://twitter.com/piofthings/status/1174433479917998080?s=20

A video compilation of our main Bot’s design process

<video style="max-width: 720px" controls="true" autoplay="false" src="https://piot.blob.core.windows.net/asset-1a0ecb7e-4b69-4a82-b6e4-7c47bdf3b87c/piwars-2020-full-design-side-view-edited.mp4?sv=2017-04-17&amp;sr=c&amp;si=e72c2200-b14b-4116-a1e0-988693ff8e94&amp;sig=y6la2u73wdgExt8y0SPGCWwGQYK6%2FFMddPGkgtvBZn4%3D&amp;st=2019-09-24T00%3A12%3A09Z&amp;se=2119-09-24T00%3A12%3A09Z" type="video/mp4"></video>

This hides the complexity behind each component and doesn’t show the entire Mk1 build that we scrapped and started fresh after the steering gear design turned out unreliable :-)

**And some failures**  
When we thought we have a full bot... and then we tried the steering... :-(
![When we thought we have a full bot... and then we tried the steering... :-(](/posts/images/pi-wars/piwars-2020-invalid-steering-design.jpg)

And that occasion when we nearly ruined a costly piece of hardware because we are noobs at SMD soldering (Thankfully the port still works).
![Melted SterepPi](/posts/images/pi-wars/piwars-2020-melted-stereo-pi.jpg)

We shall continue to post detailed blog posts of our successes and failures. We have been too preoccupied with getting a working prototype out of the door to stop and write our experiences down, but we have been saving these up and will be releasing them shortly (now that the application is done).

On to further details about the bot.

### Computer Vision
Dorothy will have stereo cameras mounted at the front to enable remote heads up displays to get a 3D first-person-view (FPV) view of the arena. We would primarily use this for the Blind Maze challenge. We have tied two Waveshare 160 degree FoV cameras to our StereoPi module to achieve stereo vision.

StereoPi is essentially a trimmed down Compute Module that focuses on stereo vision projects. At a hardware level it doesn’t have any additional specialised compute hardware. It provides lots of easy to use starter samples, that we have to build upon, to make use in a project like our PiWars robot.

We are using a Compute Module 3+ with 32Gb onboard eMMC with the StereoPi.

#### First Person View using cheap 3D goggles
Cheap 3D goggles like Google cardboard allow users to view 3D Videos by putting our phones inside the goggles and use it to view Youtube videos.
We will have lots more details on this in our blogs as we get going, but we have tested this with the off- the-shelf software that came with Stereo Pi and it works. We won’t be using the exact same software but we will be using the input from stereo cameras to stream the video to an internally hosted webserver (on the StereoPi) and then use a phone as the ‘Viewer’. We will likely stream via OpenCV giving us ability to add overlays on to the display. If OpenCV gets tricky we’ll simply use PiCamera’s streaming capabilities.

#### Shoot-em-up-Zombies
We will be redoing our Lego Cannons setup from last year to make the firing more consistent and the aiming easier. We are going to have a pan-tilt mechanism to help fine tune the targeting. The circuitry will be the same using ULN2803A darlington drivers to power the LEDs and control them via GPIO. The trigger will be a mechanical trigger but use one 270 degree servo to trigger each cannon. Again, we have done one parse of the design and currently it seems like it will become too big to be manageable so we are going to do a second parse at it.


### ‘Tinman’ our custom Bluetooth Controller

Last year we had trouble with the promiscuous controllers from PiHut/Rock Candy but had decent results talking between two Raspberry Pis over Bluetooth. So this year, we are building our own controller using Adafruit’s JoyBonnet and a RaspberryPi with BT and Wifi abilities. It could be either a Zero W or a 3A+. We are hoping this will eliminate dropped connection issues.
We currently have plans to mount the GFX HAT on the controller to give it additional Menu capabilities.
We may swap to a touch screen based display if we get the time.

_[Redacted - This was primarily a question about something we wanted to do but were not sure about. Mike has responded that we can do this. We'll share this in a separate blog post]_

### Tackling the challenges
We intend to use Computer Vision for “Lava Palaver” and “Minesweeper”. However the stereo vision will come in handy for “Blind Maze” and hopefully “Zombie Apocalypse” as well.

We are not confident that we’ll be able to do the “Environment Disaster” as it is currently defined, with pure Computer Vision only. If there were routes/lines defined to the barrels that the robot had to follow, it was still doable, but without predefined routes, and with random positioning, we are currently of the view we won’t be able to do it with CV. So we’ll be attempting it in remote control mode.

We hope to do significantly better than last year’s attempt at the “Obstacle course” where our wheels fell off and we couldn’t exactly go beyond the first obstacle because the ginormous size of our Robot. We have made the robot much narrower, but it is stretched out a bit, so it will be interesting.

Last but not least, “Pi Noon”, we have been knocked out in the first round of both our attempts at PiWars thus far. Last year we drew first blood but the controller gave up and we were literally sitting ducks in the end. Hopefully the new controller (and a lot more practice) will help prevent that.

### The Hardware
This year we have toned down the on board hardware a little bit by getting rid of the second Pi and associated power supply. We are also getting rid of the I2C Multiplexer and the ToF sensors because we are doing the challenges either using CV or manually. We have also dialed down the power supply to 3x 18650 batteries (instead of the 4x 18650s earlier). This reduces the weight and keeps the motors from being over-volted.
- StereoPI Compute Module carrier board with Raspberry Pi CM3+ 32Gb eMMC
- Dual Waveshare 160 degree FOV Cameras for stereoscopic vision
- Adafruit 16 servo PWM controller
- Cytron 30A Dual DC Motor controller (or RedRobotics Redboard if we can get our hands on one) - 4x 290 rpm High Torque 12v Brushed DC Pololou motors
- 2x DF Robotics 25W BEC (Pi and Servos get their own BECs to try and keep the power supply steady)
- 5x 3v Laser pointers
- 2x MG996R servos for Pan-Tilt mechanism for Zombie shooter
- 1x 270 degree servo for firing mechanism of Zombie shooter
- 2x MG996R servos for synchronised front wheel steering
- 2x Longrunner servos for controlling the rack and pinion based ground clearance adjuster - 2x MG996R servos for the “Barrel Picker”
- BNO55 9DoF with sensor fusion for heading and speed measurements
- Custom built 3x 18650 battery holder for powering the whole bot.

_End of application_

I guess that gives you an idea of the level of details required to make it into PiWars. Even with this details, I was afraid I might not make it, because every year, the standard just keeps going up, with maximum number of international teams arriving this year. Next time I'll probably create a well edited video showing creation of all the parts one by one and maybe a sample of the robot functions.

Originally I had intended to finish building a steerable bot, but the design fail of first iteration set us back and we had to redo the chassis again. In the next post I'll talk more about the lessons learnt from that and hopefully have a remote-controllable bot ready.
