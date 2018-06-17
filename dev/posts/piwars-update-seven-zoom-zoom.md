{{{
  "title": "Update 7: Zoom Zoom... some progress at last",
  "tags": ["piwars","robotics","RaspberryPi","piwars-2018"],
  "category": "Robotics",
  "date": "March 28, 2018",
  "author": "Sumit Kumar Maitra"
}}}

It's been a while since I posted an update. We have been head down in a - coding, building, designing printing and repeat loop. Unfortunately, it still doesn't mean we are done with all the challenges. However, we have made some progress in understanding how computer vision works. Must add Pixy has made our life much easier. We have done a part of ball follow and redone straight line speed using PixyCam.

## Ball find using PixyCam
In the last update I showed how we had setup the 270 degrees servo as a part of a pan tilt mechanism to follow a colour. Next step was to get the Bot moving in the direction it found the ball.

The Algorithm is pretty simple.
- Crane neck to -135 degrees and swing the head around clockwise till you detect the ball.
- Stop when you see the ball at the center of the view finder
- Note the angle as with the neck is (the pan angle).
- Tank turn on the spot by that many degrees.
- Pan to center (the ball should be straight ahead)
- Steer towards the ball till the ball is of a particular max size on the view finder.
- Stop when it reaches max size.
- Reverse back till the point you did the on the spot turn (no need to to turn back into initial position)
- Repeat

Works well in theory. Key things to be aware of, tank turn by degree is fairly subjective because the DC motors only understand on and off. So to move ```x``` degrees you have to run one side wheels one way, the other side wheels the other way for ```y``` amount of time. The ```x``` value can be determined by the factor of motor rpm, wheel circumference, wheelbase size etc. Or if you were me, simply wing it and use a number that works best.

So far I have managed to get the bot to chase two balls together whether it is in front of the bot or behind it. The logic to look behind needs to be updated so that it goes back a little before it starts looking for it. With cream colored walls and faux wood flooring tracking yellow is a bit of a pain at the moment. To top that Amazon decided that throwing in a delayed Prime Delivery would only liven the challenge. So my arena creation wasn't complete over the weekend.

Hopefully it will be done in the next couple of days and I'll be able to complete this challenge well and truly.

Here it is nodding around like an excited puppy

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">“Where is it, where is it, oh behind me? Found yaaaa!” Pi-o-steer is getting Puppy-ish qualities or maybe I am imagining it 😂🤣 <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> <a href="https://twitter.com/hashtag/OverTheRainbow?src=hash&amp;ref_src=twsrc%5Etfw">#OverTheRainbow</a> <a href="https://t.co/Au9XFymrNK">pic.twitter.com/Au9XFymrNK</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/975866080798429185?ref_src=twsrc%5Etfw">19 March 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## Straight line speed using PixyCam
I ordered two massive rolls (10m each) of black poster paper to use as base of my arenas. It will save me some time painting and waiting for paint to dry. I used a mix of cardboard packing boxes and some spare timber  planks to setup the side walls for the straight line speed track. Nearly ran out of 'house' (turns out 24 feet has a lot of 'foots').  
![Half the track and nearly out of dining room](/posts/images/pi-wars/pi-wars-straight-line-speed-01.jpg)

As per information provided by the organisers, the white line is going to be standard white insulation tape (19mm wide) down the middle with two narrowed out sections in the middle.  
![Markers before the full tape down the middle](/posts/images/pi-wars/pi-wars-straight-line-speed-02.jpg)

(Sorry about the skewed images, looks like the phone missed a trick with the accelerometer)


The narrowed out sections are more significant if you are using Ultrasonic sensors because you have to adjust for the narrowing on both sides before you take any corrective action.
![All done, ready to race, zoom zoom...](/posts/images/pi-wars/pi-wars-straight-line-speed-03.jpg)


Advantage of doing line follow is you don't veer too much you don't have to worry about narrowed out sections.

Using Pixy for straight line speed was as simple as training it to recognize white and the following tweaks to above Algorithm

- Look down so that only white line and black surroundings are visible.
- Disable tank turns
- Start moving forward
- Pan the head so that white remains in the center and steer (Ackerman) in the opposite direction to correct for veering
- Repeat till there is no white line visible.

With that we were able to achieve a fairly respectable speed with current set of wheels. Here's a video.

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">I think we have nailed the straight line speed! Now to test in various lighting conditions! <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> <a href="https://twitter.com/hashtag/robotvision?src=hash&amp;ref_src=twsrc%5Etfw">#robotvision</a> <a href="https://twitter.com/hashtag/pixycam?src=hash&amp;ref_src=twsrc%5Etfw">#pixycam</a> <a href="https://t.co/TppEPmGOBI">pic.twitter.com/TppEPmGOBI</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/978408725093416961?ref_src=twsrc%5Etfw">26 March 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


It did stop at the end of the line

![Staaapp](/posts/images/pi-wars/pi-wars-update-straight-line-eol.jpg)

Though the above position breaks the laser hence triggering the timing device I might just make a foot long section out of paper and leave it at the end of the track so that the bot actually gets off the track completely.

## Team hoodies have arrived!
Whether the robot gets done or not, we are going to PiWars 2018 alright, because are team hoodies are here :D

![Team Pi-O-Steer will be very easily discoverable](/posts/images/pi-wars/pi-wars-pi-o-steer-hoodies.jpg)

They were ordered from [www.tshirtstudio.com](https://www.tshirtstudio.com)
