{{{
  "title": "Update 6: Pan, tilt, see... Vision challenges in progress...",
  "tags": ["piwars", "robotics", "raspberrypi"],
  "category": "Robotics",
  "date": "March 12, 2018",
  "author": "Sumit Kumar Maitra"
}}}

Another weekend... and yet another, smaller than expected turnaround... but we have made progress. As mentioned in the last post, I have been racing to complete the Pixy camera integration before I finalize the routing logic for Pi-o-steer. I thought this week would be it, but we had a scope creep... we ended up designing, 3D Printing and assembling a full Pan-Last mechanism. On any other day I would have considered that a big achievement but in the big scheme of things it wasn't as big.

## KYS (Know your Servos)
The week started off with me receiving the continuous rotation servo from PiMoroni among other bits and bobs. The idea was to swap the 135 degree motor that came with the original Pan-tilt-mechanism (from Adafruit/PiMoroni) with the continuous rotation one, with the intent of driving the motor 270 degrees left to right so that it gives the bot a good enough field of view to see all the 4 balls for the Over-the-Rainbow challenge. However, it turns out I don't know my servos well enough. [Micro continuous rotation servos like the FS90R](https://shop.pimoroni.com/products/micro-360-degree-continuous-rotation-servo-fs90r) behave more like DC Motors than like Servos. You can't tell them to turn by x degrees. Instead you set a speed and turn them on and off. Based on speed and duration that you left them on, the servo with turn by y amount. Needless to say this increases the work (read maths) that needs to be done to manage the Servo. Here is a thread I started on [PiBorg's forum](http://forum.piborg.org/node/2589) as I bumbled through the about 'discovery'.

## Upgrade again, a 270 degrees servo, coming up!
Faced with additional software development time, I once again did the time vs. cost and went with saving time than cost. So got myself a nice [270 degrees rotation Servo from Amazon](https://www.amazon.co.uk/dp/B07569WJ1M). It's the same make as my steering motor and since the steering motor worked without an issue I just went with it blindly.

Now this is a full size motor and reto-fitting it in the existing pan-tilt mechanism was not possible. I briefly held the hope that I would need to change the bottom bit only, but once I had the new motor in my hand, that option vanished quickly.

## When you have a hammer... (err... I mean 3D Printer)
Luckily I already had a to-scale model for my previous driving motor as well as the first micro servo that I tried to use for steering. This meant I could have a go at the design straightaway. Taking 'inspiration' from the design in front of my I came up with this.

![Pixy Pan Tilt mechanism from the left](/posts/images/pi-wars/pi-o-steer-pixy-pan-tilt-left.jpg)

![Pixy Pan-Tilt mechanism from the right](/posts/images/pi-wars/pi-o-steer-pixy-pan-tilt-right.jpg)

The design implies the big 270 degree motor is downward facing and bolted to the base plate (floor). So when the motor is turned the whole assembly tied to it turns. Rest of the tilt mechanism is tied to the big motor.

- The blue bits are the two motors these are not printed, rather placeholders for real things.
- The maroon parts clamp to the pan motor. They are split down the middle for assembly purposes. The right has side piece has the hole and cutout to hold the tilt motor. The tilt motor's spindle is also bolted down, so when the tilt motor is turned the whole motor turns up and down.
- The red bits tie the Tilt motor to the Pixie Cam holder.
- The violet part is the Pixy cam holder.

Here are some more pictures of the assembly process and assembled unit.

<div id="pixpantiltcarosouel" class="carousel slide" data-ride="carousel">
  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
     <img alt="Pixy Pan Tilt mechanism - left" src="/posts/images/pi-wars/pi-o-steer-pixy-cam-base-motor-left.jpg" />
     <div class="carousel-caption">
      Pixy Pan Tilt mechanism - left
     </div>
    </div>
    <div class="item">
     <img alt="Pixy Pan Tilt mechanism - right" src="/posts/images/pi-wars/pi-o-steer-pixy-cam-base-motor-right.jpg" />
     <div class="carousel-caption">
      Pixy Pan Tilt mechanism - right
     </div>
    </div>
    <div class="item ">
     <img alt="Pixy Pan tilt mechanism - Pixy holder" src="/posts/images/pi-wars/pi-o-steer-pixy-cam-base-pixy-cam-holder.jpg" />
     <div class="carousel-caption">
      Pixy Pan tilt mechanism - Pixy holder
     </div>
    </div>
    <div class="item">
     <img alt="Pix Pan tilt mechanism - Motors mounted" src="/posts/images/pi-wars/pi-o-steer-pixy-cam-pan-motor-mounted.jpg" />
     <div class="carousel-caption">
      Pix Pan tilt mechanism - Motors mounted
     </div>
    </div>
    <div class="item">
     <img alt="Pixy Cam mounted on Pi-o-steer" src="/posts/images/pi-wars/pi-o-steer-pixy-cam-pan-base-mounted.jpg" />
     <div class="carousel-caption">
      Pixy Cam mounted on Pi-o-steer
     </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left fa fa-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right fa fa-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

Last but not least, here's a video of the mount in action.

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr">Right then, we can crane our ‘neck’ 270 degrees to see what’s behind us (mostly). Up next, heading that way… <a href="https://twitter.com/hashtag/piwars?src=hash&amp;ref_src=twsrc%5Etfw">#piwars</a> <a href="https://twitter.com/hashtag/OverTheRainbow?src=hash&amp;ref_src=twsrc%5Etfw">#OverTheRainbow</a> Also, that’s custom pan-tilt had driven by <a href="https://twitter.com/Pi_Borg?ref_src=twsrc%5Etfw">@Pi_Borg</a> <a href="https://twitter.com/hashtag/ultraborg?src=hash&amp;ref_src=twsrc%5Etfw">#ultraborg</a> <a href="https://t.co/nFLKoKDM4e">pic.twitter.com/nFLKoKDM4e</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/973018695206305792?ref_src=twsrc%5Etfw">March 12, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Up next, getting the bot to go where it detects the ball.
