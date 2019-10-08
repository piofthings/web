{{{
  "title": "To PiWars or not to PiWars is the question! Or is it?",
  "tags": ["piwars","piwars-2020", "robotics", "raspberrypi"],
  "category": "Robotics",
  "date": "15 September, 2019",
  "author": "Sumit Kumar Maitra"
}}}

By this time you all know [PiWars 2020](https://piwars.org) is happening, same place same dates as 2019. This time there is more direct involvement from the community. Some of the courses have been suggested by the community and are going to be built by the community. In previous years, only a select few bits were built by the community, everything else was done by Tim Richardson and Mike Horne, the organisers.

Last date for application as a group or individual is September 24, 2019. I haven't put in my application yet. Initially I had no doubts about my participation. After last year's fiasco, I _had_ to fix the issues and get a new bot back in there. Fact is I nearly have a new bot as we speak. But suddenly I am getting very nervous about being a one (active) person, team. Doubts are creeping in - Am I biting more off than I can chew again? Am I being over ambitious with my design? If I were to be selected would I do justice to that spot unlike last year? I dunno!

My first design iteration has resulted in a failure. I can't get the steering mechanism to work reliably. The steering gears aren't meshing properly at all heights. If the gears don't mesh then wheels don't adjust as expected and end up in wrong states to what the both thinks, that results in a lot of pressure on the motor which eventually results in pouff... magic smoke!

One more week to go before application closes, and as development of the robot progresses I might find these self-doubts going away and me getting back in top gear again. Till then this post is going to remain a bookmark of things to come. I cannot quite predict the exact sequence of things, but they will be broadly under the following categories. I will add subcategories with actual titles.

1. Experiments and process of elimination
2. Locking down on final mechanical design(s?)
3. Bot Software stack
4. Remote controller design
5. Remote control software stack
6. VR or not to VR

## Overall idea
Since this year's theme is "Disaster zone", I am going to treat the natural disaster movie "Twister" as my guide. If you haven't seen the movie, it is about a bunch of weather scientists trying to toss a collection of sensors into a Tornado so they can study it from the inside, and to do that they have to drive their pickup truck onto the path of the Tornado and then 'run for their lives'. Very pre-iot days :). If Twister was made today it would probably be scripted a little differently :).

- We can carry over the idea of adjustable ground clearance from J2, but we'll do a complete redo of how we do the ground clearance adjustment mechanism.
- My Crowdfunded StereoPi board has arrived so it gives me plenty of excuses to try out my long cherished dream of stereo vision for robots.
- We'll have only one Raspberry Pi on the bot, but we'll have a second one on the controller. We are building a Bluetooth controller using the Adafruit JoyBonnet
- Since we have the StereoPi as our base system it will be a shame to not try out the a VR headset and do some of the manual challenges using it. I don't have a swanky VR headset like the Oculus but instead I have some ideas on how to use a 15 quid vanilla stereo headset (or 5 quid Google Cardboard) and have fun.
- We will have an updated shooter that will be more compact, accurate and robust (last year we lost at least one shot per round and targeting was so fiddly we didn't finish all the rounds)
- We have 4 new high torque Pololu motors for the drive train.
- Custom designed and printed wheels with about 90-100mm dia rubber wheels.
- LEDs, lots of bright LEDs
- There are so many ideas I have in my head for the artistic merit that I could spend 6 months just doing that, but let's see what I can do meaningfully.

I think the toughest challenge is the Eco Disaster. It will be a challenge to do grab and place under pressure. Much more if you were to try and do it automatically.

Well then, just writing this post up has cheered me a lot. So I will probably end up applying. I really have to go pedal to metal without slacking at any point to build a bot that actually can do all the 7 challenges :).

Good luck to all who are applying, may the best bots make it to the finals in March, 2020!
