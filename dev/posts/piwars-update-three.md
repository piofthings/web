{{{
  "title": "Update 3: We are going to PiWars 2018!",
  "tags": ["piwars","robotics","RaspberryPi","piwars-2018"],
  "category": "Robotics",
  "date": "February 7, 2018",
  "author": "Sumit Kumar Maitra"
}}}

Happy new year everyone; Oh wait, it's February already (how did that happen O_o ?!?). January just flew past and among all the excitement of New Year, squat in the middle of NDC London, I got the magic email from Mike Horne, one of the organisers of PiWars - there had been a drop off and our team had been bumped into the qualifiers list. So team Pi-o-steer is going to PiWars, Yaba daba doooooooo! This news provided impetus to my sagging morale that had seen me procrastinate about the bot for over a month.

10 days after I got the mail, I also attended Brian Corteil's workshop at Cambridge Makespace. It was an exciting event attended by about 28 people, most participating in PiWars. Pi-o-steer was grossly underprepared. While I had hoped to get the three (front, left right) sensors working... lets just say they were not. Anyway, lots of ideas exchanged, and saw what the competition was up to. Most robots were ahead of me with some doing maze and others trying Over the Rainbow. Looked like Brian had already nailed Over the Rainbow. I figured out what I should be prepared for when heading out to a workshop/competition with my Robot but without my entire den :-).

## Wrestling with sound (erm... Ultrasonic sensors)

Just before the workshop I had started with the Ultrasonic sensors and initial tests showed the design of hanging the sensors way up in front, on the wheel mounts, though desirable, it wasn't stable enough to give good readings. So I hurriedly printed a couple of holders that could be bolted to the side.

<img alt="Sensors mounted on the side" src="/posts/images/pi-wars/pi-o-steer-side-mounted-sensors.jpg" />

On the day of the workshop I found I was getting absolutely rubbish readings. Initially I thought I had busted sensors. After swapping sensors I continued to get rubbish readings. This started to look like a big setback, if the Ultrasonic sensors were not going to be reliable I would have to rethink the entire bot from scratch and that was a massive overhead of unplanned work.

That's when Robert K of CamMakespace mentioned the "timing" word. Not that I wasn't aware but it got me thinking about how I was reading the sensor data via Ultraborg. If you run a tight loop and read sensors one after the other, there is a good chance that one sensor will read echoes from the other. Testing with UltraBorg's default sample code gave similar readings as my code. However I also found out when a Single sensor was in play it gave nearly correct readings every time. This confirmed the suspicion about echoes from other sensors interfering.

So after I came back I decided to put in a 0.05 second delay between each sensor reading. That significantly improved things. Problem is, with that much of a delay you can't drive the motor at full speed because in 0.2 seconds the robot would have moved enough to go hit a wall, not giving it enough time to adjust heading. Given the other option was to redo the h/w stack I decided to go slow. So I dialed back the power to the Motors to 50%. The results were very encouraging. The bot seems to be able to detect walls and do course correction using its steering. At home we don't have a long enough stretch for the full speed test. But I was able to crank the speed up to 70% and still get it to avoid walls. For some reason it would only read the right hand side sensor correctly.

_The 'meander-bot' aka Mr. Wallhugger_
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Presenting Mr. Wallhugger! First bit of progress towards any of the challenges at <a href="https://twitter.com/hashtag/PiWars?src=hash&amp;ref_src=twsrc%5Etfw">#PiWars</a> 2018. Technically this was in January 😬🤪 <a href="https://t.co/ayaAqO0kCp">pic.twitter.com/ayaAqO0kCp</a></p>&mdash; Pi of things (@piofthings) <a href="https://twitter.com/piofthings/status/958852590560841728?ref_src=twsrc%5Etfw">February 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## Firming up the Chassis and Electrical contacts
The bot having been printed in two parts had a few rigidity challenges. Primarily because I was lazy about bolting the Pi down correctly. As a result the Pi would stop/reset on the slightest bump or even if I picked it up. This is a recipe for disaster and ripe for SD card corruption.

<img alt="Pi-o-steer Top view" src="/posts/images/pi-wars/pi-o-steer-top-view.jpg" />

So I bolted the joiner down with 4 bolts and then bolted the pi with another 4. With 4 bolts on each part of the chassis, the robot became significantly rigid. Next plan is to build a battery holder to make it rigid and connect the battery pack to the ThunderBorg using 9V connectors I have. This should make the entire platform much more stable. If we have enough time I am hoping to redo the entire chassis so that it can be printed in one go so basically about 190mm in length max.

<img alt="Pi-o-steer bolted down" src="/posts/images/pi-wars/pi-o-steer-bolted-on.jpg" />

After firming the chassis up, when I flipped the robot over, I realized why I wasn't getting readings from the LHS sensor. A couple of wires would come loose as soon as I put it down. I tightened those up properly and bingo. Both sensors were in action. W00t!

<img alt="Pi-o-steer sensor taped up" src="/posts/images/pi-wars/pi-o-steer-sensor-plugin.jpg" />

## Up Next

Immediate next step is to start tracking telemetry aka logging. It is imperative you log what the Robot "sees" or "senses", only then will you be able to start tuning its movements.

I am hoping to be able to tune the robot enough so it can go at top speed while keeping significant distance from both the walls (basically down the middle). Hopefully if the 'meander is limited' it will be able to squeeze through the narrow sections without issue.

Going forward hope to be able to give a weekly or bi-weekly update. Until next time, happy "Roboting".
