{{{
  "title": "PiWars Update One: Steering (out of) control",
  "tags": ["piwars","robotics"],
  "category": "Robotics",
  "date": "11-07-2017",
  "author": "Sumit Maitra"
}}}

It's been a couple of weeks since I posted, thought I would share an update.  

Most progress has been towards proving things wrong (which is important) but not much has gone right. I would have liked to have a moving bot by now. While there isn't much todo to get it moving, lack of steering the way I wanted it, is concerning.  

## Small wins
We did manage a few small successes:

- First was to attach the motor mount to the front plate. This means the robot is now a single block and nothing falls off when I pick it up :-) or put it on an upturned takeaway box that acts as my 'jack' (okay the pi falls out if you tip it to far back ;-)...). To finish this I had to do the following
    - Drilled a hole down the middle of the top panel.
    - Create a retainer panel for the front motor mounts to make sure the ball bearings don't fall through.

    <img title="Retainer and spacers" src="/posts/images/pi-wars/pi-o-steer-spacers-and-retainer.jpg" />  

    - Bolted the retainer panel to the front motor mount.
    - Bolted the top panel with the front motor mount down the middle. Used the spacer between the bearings and column to make sure only the bit that's supposed to move is in contact with it.

- Second was using the Hobbywing UBEC to power the UltraBorg. In my last post I mentioned I was still to power the UltraBorg externally. Doing it is easy:
    - *Take out the jumper on the UltraBorg board*
    - Plug the input side of the Hobbywing UBEC to the 12v terminals on the PiBorg. This port gets power when I switch the ThunderBorg on, so it is perfect for powering the UltraBorg along with the Pi.
    - The output side of the UBEC has 5v or 6v out. The UltraBorg doesn't mind so you can start with 5v. Just measure it on the multimeter so that you know what you are providing to the board.

- Finally, I found a 12v 2A power adapter that will work perfectly for the development platform. That way I don't have to worry about the batteries dying and conserving battery when doing experiments. I managed to get creative with an adapter and a 9v battery clip to power the bot via the ThunderBorg board. It supplies 12.3V which is less the the 14ish Volts I was getting from the battery pack. But it should do for development stuff.

## Steering Servo one!

The first design iteration didn't have the steering motor mount, so I had to hack the font-panel to squeeze in the steering servo.

<img title="Steering motor mount one" src="/posts/images/pi-wars/pi-o-steer-steering-v1-01.jpg" />

To be honest I had absolutely no idea on how to use the servo horn to actually steer the bot. Once I mounted it, I found the two columns for attaching the sensor mount to the motor mount, were near-perfectly placed to be used for moving the steering panel.

I attached it to the UltraBorg and got a very shoddy jerky movement using a slightly modified default test code that comes with the UltraBorg samples. The default code had a sweep to 'zero' built in, so even though I reduced the min and max angles I ended up with a jerk for the sweep motion.

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">It moves, not steers! Tiny bit of progress there! Looks like a design v2 is needed already 😬 <a href="https://twitter.com/hashtag/piwars?src=hash&amp;ref_src=twsrc%5Etfw">#piwars</a> <a href="https://twitter.com/hashtag/robots?src=hash&amp;ref_src=twsrc%5Etfw">#robots</a> <a href="https://t.co/hL1FUAAXCW">pic.twitter.com/hL1FUAAXCW</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/925507675168935936?ref_src=twsrc%5Etfw">31 October 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The above tweet started a nice chain with Tim Freeburn, who immediately suggested that I needed a bigger motor :-).

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Definitely want a much larger and more powerful servo there</p>&mdash; Tim Freeburn (@bohblesku) <a href="https://twitter.com/bohblesku/status/925631543925755905?ref_src=twsrc%5Etfw">1 November 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

For the uninitiated, Tim is the boss at PiBorg and he knows a 'thing or two' robots :-). He basically confirmed what I had suspected as soon as the motor had come in - The tiny servo wouldn't be powerful enough to turn the big and heavy steering mount. I hoped it would be enough to at-least validate my idea and positioning of the motor and if I was lucky be able to move the steering when the bot was jacked up.

So I hacked up the sample and moved the sweep back into to a different script (centering.py). The test script only flipped between moving left and right.

_centering.py_  
```

#!/usr/bin/env python
# coding: latin-1

# Import the libraries we need
import UltraBorg
import time

# Settings

startupDelay = 0.5              # Delay before making the initial move
stepDelay = 0.1                 # Delay between steps
rateStart = 0.05                # Step distance for all servos during initial move
rateServo4 = 0.01               # Step distance for servo #4

# Start the UltraBorg
UB = UltraBorg.UltraBorg()      # Create a new UltraBorg object
UB.Init()                       # Set the board up (checks the board is connected)

# Loop over the sequence until the user presses CTRL+C
print 'Press CTRL+C to finish'
try:
   print 'Move to central'
   # Initial settings
   servo4 = 0.0
   # Set our initial servo positions
   UB.SetServoPosition4(servo4)

except KeyboardInterrupt:
   # User has pressed CTRL+C
   print 'Done'

```

_steering.py_  
```
#!/usr/bin/env python
# coding: latin-1

# Import the libraries we need
import UltraBorg
import time

# Settings
servoMin = -0.40                 # Smallest servo position to use
servoMax = +0.40                 # Largest servo position to use
startupDelay = 0.5              # Delay before making the initial move
stepDelay = 0.4                 # Delay between steps
rateStart = 0.05                # Step distance for all servos during initial move
rateServo4 = 0.01               # Step distance for servo #4

# Start the UltraBorg
UB = UltraBorg.UltraBorg()      # Create a new UltraBorg object
UB.Init()                       # Set the board up (checks the board is connected)

# Loop over the sequence until the user presses CTRL+C
print 'Press CTRL+C to finish'
try:
    print 'Move to central'
    # Initial settings
    servo4 = 0.0
    # Set our initial servo positions
    UB.SetServoPosition4(servo4)
    # Wait a while to be sure the servos have caught up
    time.sleep(startupDelay)

    direction = 'left'
    while True:
        if direction == 'left':
                # Increase the servo positions at separate rates
                servo4 += rateServo4
                # Check if any of them are too large, if so wrap to the over end
                if servo4 > servoMax:
                    direction = 'right'
        else:
                servo4 -= rateServo4
                if servo4 < servoMin:
                    direction = 'left'

        if (servo4 < servoMax) & (servo4 > servoMin):
                print 'Servo going ' + direction + ' at' + repr(servo4)
                # Set our new servo positions
                UB.SetServoPosition4(servo4)
                # Wait until the next step
                time.sleep(stepDelay)
except KeyboardInterrupt:
    # User has pressed CTRL+C
    print 'Done'

```

This resulted in a much more controlled movement.  

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Much gentler and controlled movement. Now to build something that removes the dead spots.l and integrate with US sensors <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> <a href="https://t.co/wFgbuJUiOV">pic.twitter.com/wFgbuJUiOV</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/926814161425674248?ref_src=twsrc%5Etfw">4 November 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

As you will see, while moving right, there is a small dead space where the motor is moving but the the steering is not.

Happy that I had nearly nailed it I decided to tie the horn to a little wedge between the two columns to remove the dead space.

<img title="Steering horn and wedge to remove dead-space" src="/posts/images/pi-wars/pi-o-steer-steering-horn-and-wedge.jpg" />

Problem with this is, tying an arm (the horn) that is moving in a circular motion, to something that's at best linear will result in lockup when the linear bit moves further than the arm's length. As a result the steering still struggles to move right. Also the X shape of the wedge isn't helping either. It's too tight a fit.

Next iteration of the wedge I'll make it so that horn is not tied linearly.

## What now
By this time I had realized that an upgrade to the steering motor was mandatory. However the size of a motor with about 20Kg/cm of torque is literally double of what I have. This resulted in major issue with placement. I just couldn't place the steering motor at a place that didn't require major changes to the design and layout. Instead of moving everything I decided to go for a steering design overhaul. This would help take care of an issue with the previous design where both front motors moving at same speed would be harder to steer. One of the ways street Cars handle it is by turning the inner wheel (wrt to direction of turn) more than the outer wheel. I couldn't do this earlier because my wheels were locked at the end of the steering mount. New design will hopefully have independent turning radius for each wheel.

I have since ordered the new servo. I realize this design-redo will take at least till end of November to finish. This is a big delay in scheme of things and I really don't want to wait that long. So I am going to split things up.

Get the steering locked at center and start thinking about tank steering all the way. Get the Bot moving and make sure it is controllable via two controllers at least (Rock candy and XBox One).

Secondly, continue with the 3D design for new Motor mounts and steering mechanism. As someone with absolutely no experience in Automobile engineering and steering mechanisms, the design I am aiming for is very ambitious. I am determined to crack it and hope, by the end of the year, we will have a uniquely maneuverable bot.

In the next update I will hopefully be able to share some code with line-follow and maze-solving capability, till then happy robot hacking!
