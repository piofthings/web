{{{
  "title": "PiWars 2019 - Failure and heartbreak - maybe Part 1 of many",
  "tags": ["piwars", "piwars-2019"],
  "category": "Robotics",
  "date": "April 1, 2019",
  "author": "Sumit Kumar Maitra"
}}}

So we attended PiWars 2019 yesterday, and failed miserably with our robot - J2. It broke down on the second event of the day, struggled with the third event and went up in smokes on the fourth. We came 15th (last) in our category. It was a sobering lesson in robot building and failures. I have blogged a lot of what I did with PiWars bots in the past, but not always focused on the fails, so I think the time has come for me to detail the fails, if nothing for myself to refer to.

## The high-level list of fails

Honestly there is only one major reason:

- Poor time management. Me and my time estimations are a bit of a running joke at work, so no surprises there, but this was on a different scale altogether. My estimations on what it would take to build a highly complex (mechanical) robot and code it ground up resulted in the following:
    1. Poorly tested mechanical design
    2. Incomplete code
    3. Unfinished graphics and paint job

I'll go into details one by one starting in this post with stability and drive issues:

## Lesson 0: Attempt all events
Build a robot that is able to attempt all 7 events. If you attempt all of them and make it to the end of each, you are in the top 5 alteast. Keep this primary goal in mind before you start and every step of the way.

## Lesson 1: Build a mechanically stable robot asap
Building a mechanically stable robot is critical to success in the competition. The more outlandish your design, the harder it will be to compete, but it will be a helluva lot more fun to build.
>Make your choices early and have a target date to have a mechanically sound chassis done. This is super critical. Ideally you should plan to have the chassis built and tested by driving it around about 3 months prior to the competition (assuming you are a lone warrior like me).

Before you start on the "crazy design", have a backup plan, an _escape hatch_ design compromise that will enable you to build a competition worthy robot but just not as fancy.

Soon after PiWars 2019 was announced with the "Space theme" I had decided what I wanted to build. I wanted to build J2 from the Netflix reboot of Lost in space. While J2 was a badass ATV, I wanted more (yup my undoing).  
Building a 4 wheeled robot that can adjust drive height as you drive it around isn't something everyone chooses to do. As I learnt through the year, it is a fairly hard thing to accomplish well, unless you design vehicles for a living.

My reasoning behind going for the design that took most of my time was - the desire to be different. Everyone builds 4 wheeled 'robots' stuck to a layer of stiff material. Where is the challenge in that? In fact for my first entry at PiWars I didn't have 4 wheels stuck on a plate, I had Ackerman steering on front wheels and I could lock them up and do tank steering if there was a need.  

The J2 Chariot in the story, goes into space semi-assembled and my thinking was, what if it wasn't semi-assembled but fully assembled and ready to drive but 'compressed' to take up less space when travelling? Seemed like a 'space based' thing to do for a space based robot.

I did two iterations of the design, but waited too long to get to the second, more stable design. I started with the redesign in December when I got sick.
> What I should have done was gone back to last year's tested design instead of complicating things to by trying to build an four wheel "independent steering" bot.


## Lesson 2: Relearning the fact that driving the bot around is important
Brian Coreteil's first rule is, drive your robot, day in, day out... as much as you can...

I think my bot first ran in January and it was evident back then I had way too much play on the wheels for it to be stable. That was my second clue to drop this design and get on with the competitive bits, but nopes, I stuck around and made about 4 or 5 iterations of the gearing and 4 iterations of the gearbox before I was 'kind of ready' with a  movable robot.

## Lesson 3: Torque is the king, speed can come in later if at all
This was an early design and component choice that I made incorrectly. I wanted a fast robot but didn't read up enough about DC Motor gearboxes. Basically, if you are going faster (say 1000rpm) it isn't always your motor going faster, it is its gearing done so low that it can do 1000 rpm. With those kind of gear ratios you loose out on torque. My 2918 robot was based on the Monsterborg components. PiBorg had done the hardwork of choosing the right motors and wheels for the weight and it had boatloads of Torque. Thanks to that, we rode rough shod through all obstacles in the obstacle course.

This time we got stuck at the first obstacle and nearly burned the battery box.

Moral of the story, a 300rpm high torque motor will help you get to the end of more challenges than a 1000rm low torque motor. Err on the side of Torque.

### Beware of stall current
Side effect of having a low torque motor is you hit its stall current early, specially given the heavy bot I had. Eventually this was the robot's undoing because it pull so much current that the battery box melted (again bad design choice, more on that in a minute).

## With great power...
I was always paranoid of my bot not getting enough power so I had 4 x 18650 batteries powering the bot. Each compute unit has it's own 5W BEC, that means, Servos were on their own, each Pi was on it's own and the DC motors were connected to the Cytron Controller directly which was directly fed 16.8V (I over volted the motors). The 18650s can supply 20A at continuous drain, which should be enough for any bot of PiWars' size.

However, the weakest link in the chain was my battery box. After many failed attempts I went with last year's battery box, that had springs and fairly thin wires from the box. To compensate for the thin wires, I bolted nickel plates to the end of the spring and soldered thicker wires to it. Little did I know I still had one weaklink left, the spring itself. The spring literally became a heating coil when high current was drawn, melting the battery box and powering down the robot, but not before letting off some smoke and scaring the bajezus out of me as well as the judges :D

Next time I am building my own battery box with proper, thick nickle plates and thick(er) wires.


## Lesson 4: Bits of sample code are fine, but code for a challenge
Give yourself plenty of time to code and test, specially if you don't build robots for a living. There is a significant difference in the "Physical" aspect of programming a robot. It is one thing to test a Time of Flight sensor sitting on a desk, it is another thing, taking 1000 readings on a moving rover and deciding which one to keep and which one to consider because they are seemingly all over the place. It will happen! the physical world has infinite nuances that will get in the way for sure.

I was overly optimistic on how quickly I could convert my samples into workable code ending up with a hodge-podge of incompletely coded challenges.


## Artistic and technical merit
While everyone I met, loved the looks of the robot, I had much higher goals for its final fit and finish. One of these days I'll get around to doing the windows with acrylic, the gull wing doors operational and front crash guard that looks like the ATV from the series.

(Just saw results of Artistic merit, we can 28th out of 37... clearly needs more 'finishing', anyway, Artistic merit is way too subjective to aim for points in.)


## In Conclusion
I am literally pick up the pieces of the gruelling attempt. My room is a mess and everytime I look at the bot I feel rather despondent.

However, I will sit down and 'finish' J2 the way I wanted to. I will share more as I learn. Hopefully I'll have energy to come back to another PiWars when it happens.

All said and done, I just love the atmosphere and the people. They are just a-m-a-z-i-n-g... Love all of you!
