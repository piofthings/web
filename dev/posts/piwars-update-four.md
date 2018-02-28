{{{
  "title": "Update 4: Sound, Vision and fury, stumbling along...",
  "tags": ["piwars", "robotics", "RaspberryPi"],
  "category": "RaspberryPi",
  "date": "February 25, 2018",
  "author": "Sumit Kumar Maitra"
}}}

Two weeks have flown by since the last update and as I sit down to write this I realize, inspite of what seems like quite a bit of progress, we maybe falling behind. Anyway, we made some progress in the last couple of weeks. Following are the highlights in no particular order in which they were achieved.

## Getting started with telemetry
We started with implementing rudimentary telemetry logging using Python's logger.

```Python

import os
import logging
import settings
import time


class Telemetry(object):
    """Telemetry class for pi-o-steer"""

    def __init__(self, name, ext):
        super(Telemetry, self).__init__()
        self.name = name
        self.runId = time.time()
        # log_namespace can be replaced with your namespace
        logger = logging.getLogger('piosteer.%s' % name)
        logger.setLevel(logging.INFO)
        if not logger.handlers:
            fileName = str(self.runId) + self.name + "." + ext
            print('Logging telemetry at' + fileName)
            file_name = os.path.join("./logs", fileName)
            handler = logging.FileHandler(file_name)
            formatter = logging.Formatter(
                '%(asctime)s,%(levelname)s,%(message)s')
            handler.setFormatter(formatter)
            handler.setLevel(logging.INFO)
            logger.addHandler(handler)

        self._logger = logger

    def get(self):
        return self._logger

```

It is mostly from a StackOverflow answer on how to implement CSV logging in Python.

Why CSV? Right now my 'data analysis tool' is Libre Office, and also csv is almost universally accepted data load format, so why not!

I initialise it as follows:

```Python
self.teleLogger = Telemetry("telemetry", "csv").get()
```

The use it at one place like this:

```Python
if (self.motors.speed != 0):
    self.teleLogger.info(
        '%(left)f, %(front)f, %(right)f, %(back)f, %(distanceMoved)f, %(forwardSpeed)f, %(direction)s, %(degree)f, %(ratio)f', {
            "left": self.us.left,
            "front": self.us.front,
            "right": self.us.right,
            "back": self.us.back,
            "distanceMoved": self.motors.distanceMoved,
            "forwardSpeed": self.motors.forwardSpeed,
            "direction": self.steering.going,
            "degree": self.steering.steeringPosition,
            "ratio": self.steering.sideRatio
        })

```

This gives me fairly readable CSV files with a sample of data like this

![Pi-o-steer Telemetry sample](/posts/images/pi-wars/pi-o-steer-telemetry-csv.jpg)

Currently the goal is to keep the ratio column value as close to 1 as possible. A ratio of 1 means the bot is at the perfect distance from left and right walls (ratio = right distance/left distance)

## Battery upgrade
While looking around for various battery options, I was mostly focused on a good set of 14.xV 4S Lipo battery + charger. However, I stumbled upon a new (to me) rechargeable battery the 18650, 3.7V, 3000 mAH. Two sets (of 4 each) of these + their charger was turning out to be a fair bit cheaper than equivalent 4S LiPo + their charger. Very conscious of the fast escalating cost of the bot (that's for another day), I decided to go for it.

Initial experiments with home made 3D printed battery holder was cut short when the 1.5V AA battery holder springs I had scavenged turned out to be grossly insufficient to pass enough current and started to act as hot cutting wire the second I turned it on.

Dr Footleg turned cam back with some very nice suggestions and I decided to just cut my losses and get some read-made ones instead.

Currently they are held on the bot using velcro and blue tac. Hopefully, there will be a permanent solution shortly.

![Pi-o-steer's new battery pack](/posts/images/pi-wars/pi-o-steer-new-battery-pack.jpg)

So far they have held at around 13.7 V for the 2+ hours I have spent with them.

### Don't forget to update ThunderBorg battery settings
The good thing about ThunderBorg is you can put in upto 35V DC and it will happily take it. However you should let it know whenever the max and minimum current changes. It's simple using the provided tbSetBatteryVoltages script. I set it to Max 16V, Min 13.6 (3.4c4).

The battery API allows allows you to fetch the current values so you can monitor the health of the powerpack while your Robot is duking it out on the tracks.

## The Pixy Cam for vision based challenges
Super aware that I was falling behind other competitors on other challenges, I made a time vs. cost decision - Go for Pixy Cam that can do ball and color detection very accurately and easily. The other option was to go the OpenCV + regular Raspi CAM.

Using the Pixy also gave new options for maze follow. You are allowed to add upto 6 temporary markers on the maze follow track. So if I could train Pixy to identify markers it would aid the doddering Ultrasonics much needed boost to decide which direction to turn. The Ultrasonics would still be in play to judge distances, but the turn would be accurately determined by Pixy.

That sorts two of the three autonomous challenges. All I had to do was get the straight line speed correct. Now if I could only nail this simple one ;-)

## Ultrasonics is fairly sketchy, need moar maths!

In the last update I had mentioned how I had slowed down readings from the UltraBorg and lowered the speed of the bot to get reliable readings. But 'reliable' was really a misnomer. As soon as we went from 1 sensor to 2 to read distances from opposite walls, things started falling apart again. I started getting really weird and impossible readings. The frustration was setting in resulting in a cry of anguish on Twitter...

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Doh! Back to rubbish readings from <a href="https://twitter.com/hashtag/Ultraborg?src=hash&amp;ref_src=twsrc%5Etfw">#Ultraborg</a>. Either my positioning of sensors is rubbish or the h/w is. <a href="https://twitter.com/davedude0?ref_src=twsrc%5Etfw">@davedude0</a> was your sensor directed slightly forward instead of parallel to wall? Kind of at my wits end here <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> Measuring moving things is hard 😬</p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/963965004771938305?ref_src=twsrc%5Etfw">15 February 2018</a></blockquote>

... and the awesome community responded!

Tim who has helped earlier as well, suggested I could be getting echoes due to reflection from the wheels and I should try and move the sensors inline with the wheels.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Can I suggest moving the ultrasonic sensor forward, so the back of it is in the front mounting hole, and see what the results are. I think you might be getting bounce from the wheels</p>&mdash; Tim Freeburn (@bohblesku) <a href="https://twitter.com/bohblesku/status/964068509071405056?ref_src=twsrc%5Etfw">February 15, 2018</a></blockquote>

Andy told me how he and Harry had used three Ultrasonic sensors successfully in last PiWars

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">KEITH&#39;s side sensors were parallel to the wall. Only one of them was active on the straight line test though!</p>&mdash; Andy Merckel (@andyrmerckel) <a href="https://twitter.com/andyrmerckel/status/964301726777004032?ref_src=twsrc%5Etfw">February 16, 2018</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hi again. KEITH3 used three ultrasonic sensors through the Ultraborg interface. We had no problems with getting three signals but Harry didn&#39;t take the coding for the maze forward. The single sensor for the speed test worked fine through the Ultraborg...</p>&mdash; Andy Merckel (@andyrmerckel) <a href="https://twitter.com/andyrmerckel/status/964917057535008769?ref_src=twsrc%5Etfw">February 17, 2018</a></blockquote>

And Kerry reaffirmed that it was silly on my part to not listen to advice from the PiBorg team and use the Raw sensor readings from UltraBorg directly.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Last year we had similar problems... We discovered in the <a href="https://twitter.com/Pi_Borg?ref_src=twsrc%5Etfw">@Pi_Borg</a> provided code remarks about how to use raw data and got significantly better results when we applied the suggestions.</p>&mdash; Kerry Bruce (@MyITInstructor) <a href="https://twitter.com/MyITInstructor/status/964243013563170816?ref_src=twsrc%5Etfw">February 15, 2018</a></blockquote>

With support from the community I was back on track. I re-printed the side sensors so they were in line with the wheels.

![Pi-o-steer new sensor holder and alignment](/posts/images/pi-wars/pi-o-steer-new-sensor-holder.jpg)

I changed the code to read the raw values from UltraBorg. This resulted in a decent straight line performance. The occasional outliers were still messing with my  code.

### Maths to the rescue
I was using a simple ratio of (right distance)/(left distance) to decide which way to go and then steering that way by a fixed amount. This had the problem of very large values due to reflections would throw the steering off wildly. Instead, I decided to make use of a logarithmic value of the absolute difference *log<sub>10</sub>(abs(right distance - left distance))* to determine how much to turn the steering and then use the left and right distances to decide which direction (left or right) to steer. With the steering factor of 0.08 this fared well with the maximum and minimum steering values I have for the front wheel steering.

For straight line speed I am using Ackerman steering only, so tank turn is not activated and I needn't worry about full lock yet.

With the revised logarithmic factor, straight line 2017 was done. Next I had to up the challenge and make sure straight line 2018 works too. This means the bot shouldn't be swayed much by the narrowed out sections. I haven't got a chance to run proper tests, but I might go back to waiting for both sensor readings before calculating steering response.

Currently it reads
```
 left side sensor  -> calculates heading -> steers ->
 right side sensor -> calculates heading -> steers -> repeat  
```

This can result in snaking. I had done this when I couldn't read sensors fast enough. But the raw reads seem reasonably fast, so I am going to try and steer after I've got both values, which makes it slightly less responsive, but I can increase the steering factor to compensate for it.

Goes without saying you'll hear from me about the results soon :-)

## Thoughts on Golf grabber and Duck shoot challenges

I had almost given up on being able to get to all the competitions but the above success and decision to use Pixy is allowing me to think beyond the autonomous challenges. I have ordered a box of various sized springs and hope to be able to create a spring mounted projectile launcher. It might not be as fancy as Nerf gun powered ones, but if the bot can hit a target then that's a win.

The Golf grabber might be more complex to design as it needs to be able to open, close and push. Might leave the push out and depend on robot's momentum.

## Chassis v3
I have started designing a much smaller chassis that doesn't need a join down the middle and looks a teensy bit more exciting. It is still pretty rough. Not sure if it will be in time for PiWars 2018.

Well, that's all the updates for now, hope to update in another couple of weeks or after some exciting successes, whichever happens first 😉.
