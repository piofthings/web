{{{
  "title": "PiWars 2019 - Fail Whale Part 2 of 2, Onwards...",
  "tags": ["piwars", "piwars-2019"],
  "category": "Robotics",
  "date": "June 3, 2019",
  "author": "Sumit Kumar Maitra"
}}}

It has been two months since I wrote my last post. It has taken a bit to fully get over the disappointment. But last weekend marked the official end of Robot J2...

## More torque will do it... or will it!
In my last post I had mentioned how the robot had poor mechanical stability and I had attributed low torque of the DC motors as its main failing. So I went and got some high torque Pololu motors. Turns out the initial draw of the new motors was so high that my 12V power adapter's voltage would sag and reboot both the Pis.

## Battery holder
The issue with the power adapter expedited the new battery box process and I found a real nice 'spring-less' design on [Thingiverse](https://www.thingiverse.com/thing:456900).
I was able to use nickle plates to complete the box and luckily it fit in the existing battery bay for the bot.
<div class="row">
    <div class="col col-xs-6">![Battery box 1](/posts/images/pi-wars/pi-wars-2019-battery-box-01.jpg)
    </div>
    <div class="col col-xs-6">![Battery box 2](/posts/images/pi-wars/pi-wars-2019-battery-box-02.jpg)
    </div>
</div>
<div class="row">
 <div class="col col-xs-6">![Battery box 3](/posts/images/pi-wars/pi-wars-2019-battery-box-03.jpg)
 </div>
 <div class="col col-xs-6">![Battery box 1](/posts/images/pi-wars/pi-wars-2019-battery-box-04.jpg)
 </div>
</div><br />
Yay! Time to finally play with the bot.

## With great power...
I keep going back to Uncle Ben's famous words... but the first test with new motors showed me that even though the motors were insanely torquey, the chassis just wasn't up to it. The tyres would come off rims, the wheels would still struggle to stay in line and overall the robot was just too heavy for the setup.

The rather McGyver-ish battery box however held together like a champ and even though the motors were trying to drive 4 poorly aligned wheels there was no heating or smoking. I did notice some sparking inside the motors which caused some concerns. Mark Mellors on Twitter suggested over-volting would bring down the life of the brush significantly.
After much deliberations on Twitter, I decided to knock off one battery and make it a 10.5V - 12.8V setup instead of a 14V - 16.8V setup. So instead of over-volting I was going to under-volt.

The fact remained the chassis was extremely unstable. Something had to be done.

## A vague new plan
The battery and motor tests were done in May, but I refused to see the results for what they were until this weekend. It was obvious that the play between the stalk and the bearings was just too much to manage for the gearbox. I would have to come up with a different plan that included:
- Increases stiffness of chassis + wheels
- Reduced weight... much reduced, about half of the 3.5Kgs monstrosity it is currently

I decided to take the 8mm Aluminium rod I had purchased last year and sand it down to 7.8mm so it could go through some slide bearings I had lying around as part of a 3D Printing kit I had bought.
![Slide bearings](/posts/images/pi-wars/pi-wars-2019-slide-bearings.jpg)  
Slide bearings allow rotation as well as translation while holding shaft at the same place steadily. They are mostly use for translation of axes on 3D Printers. If I could replace the 623s with 8mm linear bearings I could provide additional support to the shaft and increase rigidity of the wheel assembly.

Took me a while to whittle down 4 x 100mm bits of 8mm aluminum to 7.8mm each, with nothing but a battery powered hand drill and some sand-paper. Eventually all 4 bits went through the linear bearings.

This made it even clearer that I would now need a new base plate. That combined with the requirement to reduce weight finally did it.

## Pulling the proverbial plug
Over the weekend I finally sat down and dismantled J2. It was a fairly massive endeavour, because little did I realise how much I had crammed into the little bot.

Here are ALL the parts in the bot. I think it is only missing one ToF sensor which I couldn't find at the time.

![J2 All parts dismantled](/posts/images/pi-wars/pi-wars-2019-all-parts-dismanted.jpg)

Now you can see where the weight came from, to halve that weight I literally have to halve the components. Not sure how far I'll be successful, but that's for another day.

![J2 nuts and bolts](/posts/images/pi-wars/pi-wars-2019-nuts-and-bolts.jpg)
Initially I thought this was all the nuts and bolts I had used, but turned out it was only half of the actual number. I ended up with another small bag of similar size, stuffed with more nuts and bolts.

![J2 all packed up](/posts/images/pi-wars/pi-wars-2019-all-packed.jpg)

Contrary to my usual untidy, leave-it-on-the-desk approach, I managed to pack all the bits away and label them too. Hopefully most of these parts will be reused in J2.2

For now it is back to the drawing board.

## Things to do differently
- Yap less on Twitter and Discord and maintain razor sharp focus.
- Set small targets and test them quickly for viability.
- Be more adventurous with 3D Design and printing to create more monocoque parts and use less nuts and bolts.
- Put together working prototype before summer vacation starts.
- Expand into other areas like ML and stereo vision

I really don't know if I'll get another chance to compete at PiWars, given so many talented teams apply. I've blown two good chances. Nevertheless it is time to build our best robot so far and challenge myself to get to the next level.
