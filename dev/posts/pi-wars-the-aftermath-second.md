{{{
  "title": "PiWars 2018: The Aftermath - 2 (Lessons learnt)",
  "tags": ["piwars", "RaspberryPi"],
  "category": "robotics",
  "date": "April 25, 2018",
  "author": "Sumit Kumar Maitra"
}}}

In the last post I wrote what went right and wrong with the build. However, build is only a small part of the event preparation. Attending PiWars is a full scale project. To be successful you need to manage your team's time well and split the work up correctly for things to line up correctly for success. Work needs to be split up into Software, Hardware, Design, Fabrication and Integration.
If you think you are a one member 'team' well, you have to do all those tasks, so first thing to do is sit down and break it down into those buckets. If you try to do everything without a master list you will forget about critical things and remember them when it is too late to react.

## Lessons learnt
- Design challenges
    - I had a working chassis in December, but did not sit down to design it to completion, so that I could at-least estimate how much time it would take to fabricate, fit and finish.
    - Once you have a chassis, you should work on the challenges and label your code as you go. Save every change in source control so it is easy to roll back.
    - It takes a really long time to actually design things in any CAD software. Whatever the software and whatever your proficiency. I built my entire bot in Tinkercad and I am fairly new to Tinkercad. They have not introduced very helpful ready made boards like the RaspberryPi and Arduino for you to easily put it in your design and layout the rest of the components around it.
    - I had the idea, in my head that the final chassis would be in a certain colour scheme, 3D printed and 'slightly sleeker' design. I should have sat down and finished the design completely, and done an estimation of how much time it would take to 3D Print the whole thing. Turns out it is a lot. Factor in print failures, 3D Printer issues and you are easily looking at more than a week's worth of work if you are simply printing 10-12 hours a day. I must have printed for 100+ hours on my printer in the last week, still have another 10-12 hours of printing left but the printer gave up on me.

-  Component selection
    - This is critical when you are a newbie. If you are going to try out different combination of parts Motors + Wheels + Servos + Cameras + Drivers, start early and draw a line quickly.
    - I got my final set of wheels only in the last two weeks of preparation. TOO Late!
    - The wheels weren't just a new set, they were a new size. Changing something as critical as the wheel size implies you have to change everything to counter the change in ground clearance and achievable speed.
    - Decide on your electronics by December, latest January and keep the h/w handy and ready. Make sure you think through how different bits of hardware will integrate and make sure it is possible without breaking the Pi.

- Setting expectations for challenges
    - We all want to win and win big. That's a good place to start. However once you start working on code for the challenges you'll realise you may/maynot be equipped to smash the opposition out of the park. Time to start thinking smart.
    - See which challenges offer most points and how. Attempt the ones that get you into points easily, first.
        - If there are two modes, one with less point and one with more, make sure you can do the one with less points without fail. Example duck shoot had two options, shoot soft projectiles or roll a ball. Make sure you can roll the ball accurately before you takedown a Nerf gun!

    - Straight line speed is much easier to conquer if you decide to do it cleanly first. Go for speed next. And before you go for speed, don't forget to commit your code to source control.

    - _Updated April 26, 2018_  
    <blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">And test in different lighting conditions.</p>&mdash; Cathy O&#39;Malley (@spud01au) <a href="https://twitter.com/spud01au/status/989304009625292800?ref_src=twsrc%5Etfw">26 April 2018</a></blockquote>

        -  Cathy O'Malley on twitter pointed out quite correctly that one needs to be on top of the Lighting conditions as well in the Vision based challenges. Computer vision is notoriously fickle and easily affected by bright lights. Do as much as you can to prepare for varying light conditions. This includes testing in daylight and night time.

        - Another thing I did was create course replicas. I did the straight line speed and the SOTR. I am now going to setup the Minimal Maze as well to finalize and complete that challenge (yeah yeah... late so what!).

    _End Update_

- Practice practice practice
    - Last 2 year's winner and this year's runner up Brian Corteil has a very nice [video on how to approach PiWars](https://www.youtube.com/watch?v=24GbJCq19V8), watch it multiple times and absorb everything he's saying. Key bit is what I said above, get a working chassis fast and drive it a a lot.

## In conclusion
- I completely flubbed the time management bit.
 and grossly overestimated my 3D Printer's capabilities, resulting in the final build taking up all the time I was supposed to be fine tuning code.
- While it is good to have a chassis early and I did have one by end of December 2017. DO NOT leave the final build till 2 weeks from the competition.
- Keep the final build's changes limited to change in colours and fit-and-finish only.
- Complete your code on your test chassis fully. That will give you everything you need to build the final robot.
- Basically if the tournament is in April, you should be done by end of February. March and whatever days of April is for practice only.
