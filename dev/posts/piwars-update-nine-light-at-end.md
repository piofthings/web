{{{
  "title": "Update 9: Light at the end of the tunnel...",
  "tags": ["piwars", "RaspberryPi"],
  "category": "Robotics",
  "date": "April-16-2018",
  "author": "Sumit Kumar Maitra"
}}}

... is often the headlights of an oncoming train 🤣🤣🤣.

## Restoring confidence and getting my mojo black

In my last post I outlined I had goofed up the code for straight line speed challenge. Yesterday things came to a head and I decided I had enough. I scrapped the entire code for the straight line bit and started fresh. I was desperate to have a small win as a pick-me-up from the sad state of affairs.  

After re-writing my control loop, it took about 30-45 minutes for me to get the bot to start going straight-ish again. In a couple of hours or so I had it completing the full length, albeit with a significant bit of meandering. This was at 50% speed. After some more tuning (and this time noting down every bit of change I was making to the code in my commit notes) I was able to race the bot at 70% speed taking smidge less than 9 seconds. I paused there, took a deep breath and checked in the code.

Too early to celebrate yet! I wanted to keep all software tuning for this week and wanted to focus on the construction of the robot over the weekend so I parked the code and went back to Tinkercad.


## Golf grabber

Saturday night I designed a golf ball grabbing attachment that looked way over complicated with two motors, one to open/close the clamp and other to raise lower the whole thing. I posted a picture of the design on Twitter.

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">If you thought my PiNoon holder was over engineered, I present to you my golf ball grabber… still at a concept stage so may no make it by Sunday <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> 😳 <a href="https://t.co/KWjFwSgkGk">pic.twitter.com/KWjFwSgkGk</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/985327239993745408?ref_src=twsrc%5Etfw">15 April 2018</a></blockquote>

Keith (@PiTutorials) responded and pointed out it was a bit of overkill to use two motors to do essentially the same thing, grab and release the ball.
<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">So the servos open/close and move up/down?  Do you really need both, they effectively do the same thing, release the ball.</p>&mdash; Keith&#39;s Pi Tutorials (@PiTutorials) <a href="https://twitter.com/PiTutorials/status/985431166193995776?ref_src=twsrc%5Etfw">15 April 2018</a></blockquote>

That got me thinking, I could really do this with one motor and not worry about opening/closing the clamp. So after my mini win with the straight line speed I went back to re-designing the grabber and came up with this.

![Golf grabber](/posts/images/pi-wars/pi-o-steer-golf-grabber-design-2.jpg)    

This was a much simpler design requiring only one motor making the robot less 'front-heavy'.

## To shoot or not to duck shoot...

I spent quite a bit of time trying to build a spring based projectile launcher for the duck shoot challenge. However, I could only get so far as this

![Proposed Duck shooty thingy](/posts/images/pi-wars/pi-o-steer-duck-shooty-thingy-incomplete.jpg)

The idea was to have a launcher on spring, pulled all the way back via one motor. A clamp at the bottom that keeps the ball in launch position, and another motor that release the clamp to launch the ball.

Unfortunately, it is easier to imagine it than come up with all the gubbins required to accurately hold the thing in place.

I felt I didn't have enough time to do this.

Once I decided I wasn't going to build the launcher the next option was to roll the ball.

I read up the rules and found out the ball size and told myself, well, we'll see what we can do about that, if nothing we'll have our butch bot nudge the balls towards target.

### The golf grabber v2 bonus
After the golf grabber design was done I sat there looking at it at 2 am in the morning, and it suddenly struck me - _If I modify this to hold a bigger ball I could use a smiliar mechanism to propel the ball! Only risk was it might lob the ball instead of rolling it._ I got on discourse and asked Mike the question. Today morning he came back with the confirmation this was allowed. Wooo hoo! That's six out of seven challenges within grasping distance.

## 3D Printing away to glory
I mentioned I had 60+ hours of 3D Printing to do. Turns out it might be significantly more than that. After 34 hours I have this motely lot of parts

![34 hours of 3D Printing later](/posts/images/pi-wars/pi-o-steer-3d-printing-34hrs.jpg)

Doesn't seem like a lot, that's because I have a cheap printer that prints rather slowly. If you have access to a better printer it shouldn't take you this long. I'll just have to power through the rest of the build at this pace. Looks like another 30 hrs or so to go.



How things have turned around in a couple of days. All I have to do it maintain this focus (not one of my strengths) and we'll be in a decent place for Sunday. Fingers crossed.
