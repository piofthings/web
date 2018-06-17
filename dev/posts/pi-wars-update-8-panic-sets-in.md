{{{
  "title": "Update 8: Panic setting in with seven days to go!",
  "tags": ["piwars","piwars-2018","piwars-2018"],
  "category": "RaspberryPi",
  "date": "April 13, 2018",
  "author": "Sumit Kumar Maitra"
}}}

Only a week to go and panic has well and truly set in. We have nothing working.

Three weeks ago when I posted my last update, I thought we were in a good place. Straight line speed was working like a treat and we had all the right ideas for somewhere over the Rainbow challenge. Today, nothing works. Straight line speed is broken, somewhere over the rainbow is broken and nothing else is complete. Well the PiNoon holder was designed and printed out for chassis v2, so if we went to PiWars tomorrow that's the only thing that would work.

## What's gone wrong?
Well to start with, overconfidence on my Python refactoring skills. After the straight line speed started working I didn't commit my code and started working on somewhere over the rainbow. When I started working with SOTR I realized the code wasn't good enough to be used repeatably. I was copy-pasting the same things again and again. So I embarked upon an ambitious refactor. Halfway through I realized I hadn't committed code so I powered through assuming I knew what I was changing.

I got the robot moving well prepared to complete Somewhere over the rainbow. It was reliably scanning its environment and detecting balls and turning around correctly.

By this time the straight line speed code had changed so much that it was beyond recognizable. I could not for the love of code figure out whether the logic I wrote was dodgy and the robot got lucky when it did those clean runs or I had messed up badly. The decision is still pending, but all I know is the bot is messing up 3 out of 5 runs at the moment.

Moral of the story, commit your code everytime you "think" something is working.

## The trip to Cambridge PiWars workshop
I went to the final workshop on April 8, and took junior along hoping to get some PiNoon practice, but unfortunately only a few roboteers turned up, it being squat in the middle of Easter Holidays. I wanted to restore the straight line speed code and test it out, but it went no-where. I shouldn't have over-estimated my ability to write code in workshops. Just not my style.

Anyway, we got to see an David Pride's awesome X-Bot strafe around the maze like a champ. Also Neal Oldmeadow's Plan9 bot and Mark Mellor's Piradigm aced the maze and straight line speed.

Mike and Tim turned up and helped setup the electrical tape down the middle of the straight line speed track. The first round of white electrical tape is my contribution to the PiWars courses 😆 🤣. Tim also informed us how the lights would be setup for the SOTR challenge (which has since been distributed in an email).

## Race against time is on

Week before last, I spent some time re-doing the pan-tilt mount so that it wasn't so far ahead of the bot. This gives the bot ability to turn its head the full 270 degrees the servo can. With 70 degree FoV of the Pixy's default camera, that covers almost 335 degrees. With the right lighting the robot shouldn't miss the ball. It turns towards each ball fine. However the stop logic after it has reached the ball is still a little dodgy. I am trying to gauge distance by the size of the ball. This seems to come out different for different colours, so impossible to nail down correctly resulting in the bot piling into the corner.
Brain C suggested using just the width instead of the size. This is something I am still to try.

The bot has now got 'Big boy' wheels and it looks all grown up. This was supposed to give us a speed advantage in straight line test, but our line follow algorithm is so buggered right now, the new wheels are currently just that, 'new'.

![Big boy wheels](/posts/images/pi-wars/pi-o-steer-big-boy-wheels.jpg)

Spent most of the last week finishing final design work for the robot including placement of battery, PiBorg, attachments, and new motor mounts. Still nowhere close to done. Need to finish design of ball capture device and Duck shoot launcher. Might have to go with rolling the ball around for duck shoot.

The total 3D Print time for the chassis is about 60+ hours. Just finished one 19+ hours over the last two days. The printer is working on the next build that's another 3.5 hours. 3D Printing helps but 3D Printing isn't as precise as Laser cutting so after the object has been printed there is significant effort required to file, buff, snip, cut, dremel and drill before two pieces come together. Add to that a printer that can't print circles and you have more fun added.

Currently working as fast as I can on Tinkercad to finish design of the ball grabber and projectile launcher. Very little chance of these being fully ready before the day.

This is going down to the wire.

Hope to send in another update before The Day.
