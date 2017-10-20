{{{
  "title": "Getting started with PiWars (and how not to apply for it)",
  "tags": ["piwars","robotics"],
  "category": "Robotics",
  "date": "10-15-2017",
  "author": "Sumit Maitra"
}}}

Last week we found out our maiden application hadn't made the cut for [PiWars 2018](http://www.piwars.org). Made me sad, momentarily, but it faded away fairly quickly. We are too invested (not just monetarily) in this to not do it, but it didn't reflect in our application.  

One re-look at the application and it was obvious, Tim and Mike didn't have to think much about putting it in "not serious" basket!
So lesson learnt - * When a PiWars application opens, remember it is not first-come-first-serve. Don't be in a mighty hurry to hit ```Send``` on your application.*

- Take your time to read through the challenges, formulate a rough plan in your head or on a notepad on how you think you will approach the challenges. Do some background research on what it takes to attempt all the challenges.

- It is possible you will have to learn a lot before you are done, list those in a "to learn" column and say it out loud. If you are a first-timer at PiWars (like me), do lots of homework. Dig up all the past videos, blogs and pictures about PiWars.

- Finally, find like-minded Roboteers nearby and form a team/community if you are not applying on behalf of one already! RaspberryPi is all about community and education, more the merrier.

So if I were to re-apply -  "Proposed robot details" section of my application would be something like this:

We are planning to build our robot using a RaspberryPi 3 and a ThunderBorg motor controller at its heart. We plan to use the motors that come with the MonsterBorg (or similar).  

The chassis will be custom designed and 3D Printed. At the end of the challenge we'll make all our designs open source for everyone to view/share/improve. We have a rough sketch of how it will support front-wheel-steering. This, we hope, will give a bit of uniqueness to the drive system of an otherwise standard four-wheeled robot.

The bot will be equipped with four (or more) Ultrasonic sensors for distance sensing to help it navigate the Speed challenge and the Maze challenge. We've looked up past challenges and found managing timing for Ultrasonic sensors in software is tricky so we are planning to use dedicated hardware to capture the sensor data and pass it on to the Pi. Looking around, we found an Arduino powered project that does 360 degree coverage using 8 sensors. However the UltraBorg supports 4 HC-SR104 sensors plus 4 servos with independent power supply. It is an I2C board that supports daisy chaining so if we found need for more than 4 sensors we could get two of them working in tandem. The additional support for servos will come in handy for the steering and an attachment we have in mind for the 'Over the moon' challenge.

For the speed challenge, previously, a wall-hugging algorithm looking at only the left or the right wall was enough to keep it straight. Introducing the narrowing of track, steps up the challenge and we hope to be able to use distance on both sides combined with the steering capability to keep us centered.

With four distance sensors and a independently steerable robot, we hope to perfect a routing algorithm that enables the robot to navigate the maze challenge fairly independently. However, if we encounter issues we may resort to the visual cues that are being offered and use OpenCV.

For 'Over the moon' challenge we will need at-least one camera. We plan to mount the camera on a pan tilt mechanism (we already have a un-used Pan Tilt hat kit from Pimoroni) and drive it via the UltraBorg's servo drivers. We don't know yet, there is a chance 180 degree movement is going to be enough to capture all the four corners of the challenge pit. If it doesn't we will have to re-work the image-capture system to have two cameras facing away from each other and will be easily able to cover a 360 degree view. We are new to OpenCV but have looked at the possibilities and we hope to be able to trace out the position of the 4 balls and workout an optimal run during the first parse. The second and third parse won't require the route calculation so we hope our best times are in these runs. We would like the capture unit to be an independent PiZero talking to the mother ship over USB.

If we gain enough OpenCV experience we may use the camera as a backup for centering in the line challenge as well.

The Duck shoot challenge seems very interesting given the complexity of building a projectile launcher. We haven't thought this through yet, but we saw David Pride's nerf launcher and we do have a Nerf gun that can be sacrificed. We will probably follow David's lead for this one.

Tada!

Well, that definitely looks better than what I said in the application:

      I am currently waiting eagerly for the MonsterBorg kit to be delivered. If selected, our Robot is likely to be based on the ThunderBorg board and a Raspberry Pi 3.
      We have a 3D Printer so the chassis is likely to be 3D Printed.

Yeah, that's pretty embarrassing alright!   

Mind you, most of the things I wrote above are stuff I found out after I submitted the application and before the last date of submission. So even if you start thinking about your new Robot after the Applications have opened, you have enough time to think through your approach and form a coherent plan. It should reflect in your application.  

Will the additional details ensure selection, NOPE!

Remember, Tim and Mike have the un-enviable and fairly subjective task of picking teams from the hundreds of applications. If you don't make it, don't despair, continue with your experimenting and learning. Talk about what you learn and where you get stuck, share it with people via, blogs, talks and workshops. Remember, PiWars is more about community and education than with cut-throat multi-million pounds professional competition!

Go to the actual event anyway, it should be a lot of fun.

That's about it for now. I leave you with an image of my Bot build so far. Nope, it doesn't move yet, though I've tested the ThunderBorg board and yes that works fine.
