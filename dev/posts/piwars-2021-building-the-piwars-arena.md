{{{
  "title": "PiWars at home 2021: The Arena",
  "tags": ["piwars","piwars-2021"],
  "category": "Robotics",
  "date": "September 7, 2021",
  "author": "Sumit Maitra",
  "draft": false
}}}

This is the third post in draft mode that I have about last PiWars (PiWars at Home 2021). A new PiWars has already been announced for 2022. Here I am still trying to catchup with my blogging from last year. Hopefully this one will see the light of the day. This one is about how I made a foldable arena for PiWars challenges. I showed a glimpse in my last post, here are the nitty gritties if you want to build one for yourself.

## The Arena - Picking the materials
PiWars challenge arena was `1500mm x 1500mm`, that's `1.5 m`<sup>2</sup>. Which is quite a big area to dedicate in the house for a period of 6-8 months. So I started with how do I make this foldable/collapsible/stowable.

Couple of years ago I had made an arena out of black poster paper glued on cardboard. That resulted in an uneven surface that could potentially make CV challenging. After much deliberation I found [black A1 sized 5mm thick foam boards on Amazon](https://www.amazon.co.uk/gp/product/B00BYT1KOQ/) **I bought them for 20 quids and they are selling for 52 now, so shop around, that link is just for reference, they are not affiliate links I don't make money if you click on them**. 

Selecting foamboard meant any joins could be done with simple materials like paper (poster paper, cardboard) and white glue, common craft materials. I chose a 10m poster paper roll. I'll expand on it's uses below.

### The Base
A1 boards are `594mm x 841mm` in size so a grid of `3x2` would be enough to cover `1782mm x 1682` which is more than sufficient for the `1500 x 1500` area required by PiWars.

You could lay them out side by side and be done with it for the base, but then you would have 6 moving bits and a lot of potential of them shifting about as the challenge was in progress.So I decided to make hinges out of black poster paper and make two sets of `3x1`, so they could be folded and unfolded. This reduced the number of moving bits from 6 to 2.

You could still fold them into one stack of 6 sheets.

### The walls
- There were no max height limitations, so I just cut an A1 board down the middle to get two `297 x 841` mm planks.
- Then I cut the long side down to `750 mm` so I had a wall `297 mm` high and `750 mm` wide. To be absolutely precise you could cut one to `750` and other to `755` so there is a bit of overlap at each corner.
- I used the poster paper hinge idea again to join the two bits to get the full 1500mm wall.  
![Using poster paper to make foam board hinges](/posts/images/pi-wars/2021/arena-wall-join-2.jpg)
- Repeated the process for 3 more A1 boards and I had 4 walls.

### Holding them all up
- Now the basic bits were ready, but the walls wouldn't stand on their own. So I designed some Right angled joins and 3D printed them. The ends of the walls neatly slotted in to these 3D Printed corners. Print them in black and they meld in pretty well. 
  - You need a minimum of 4, but you fancy a super rigid structure you can print 8 and put them at the bottom as well as the top of each corner.  
![3D printer Corner bracket](/posts/images/pi-wars/2021/arena-corner.jpg)
- This took care of the corners, but the inner joins could still flex. So I designed a simple `U` clamp that I 3D printed again, and it could be pushed down at the wall joins to give them more rigidity and stop the joins from flexible.
  - Again you can get away with 4 but for nice and rigid structure you can print 2 per wall totalling up to 8. If you do print 8 you may have to cut a tiny slot of the foam board at the bottom so the uclamp sits flush with the ground else it will be about an mm off the ground and depending on your lighting conditions you may have some light bleeding through the bottom. This is why I didn't put any u-clamps at the bottom.
![3D printer Corner bracket](/posts/images/pi-wars/2021/arena-uclamp.jpg)  

## The Challenges
Now you had the basic structure of the arena done in nice even matt black. For each challenge you could stick the tracks or markers down on the base. Since both sides are black you had two sides at your disposal. Problem was the third challenge, would you want to remove the stuck on bits and layout the third track?

I decided on a slightly different approach. I had purchased a [760mm wide, 10M roll of black poster paper](https://www.amazon.co.uk/gp/product/B008RK825K/) **Again this is just for reference shop around and find the cheapest, they are not affiliate links I don't make money if you click on them**.

Beauty of the roll being `760mm` wide meant it gave me `10mm` overlap to stick two lengths `1500mm` long to get a 1500x1500 sheet. This became my `Challenge sheet`. I could create one/two/three different challenge sheets out of the 10m roll and still have 1m left over to do the joins etc. Or, you could just do two `Challenge sheets` and put the third one directly on the base.

I firmed up the corners and the middles with additional tape backing on the backside so they were more resilient to wear and tear.

Again, the good part about this `Challenge sheet` was you could roll it up and put it in one corner of your room until you needed it. The size of the sheet did mean a little care while rolling it up, but that was manageable in the end.

### Markings on the Challenge sheet
I used a combination of white Electrical Tape and simple white paper. Used the tape for straight lines and paper for curves. The electrical tape gives you a stead 19mm width line.

## In Action
Here are a couple of timelapse videos of me putting the arena together for my first challenge, `Up the garden path`.  
 <video width="800" controls>
  <source src="https://piot.blob.core.windows.net/asset-5cdf62ea-5e49-4096-9d80-5bfb796be252/PiWars2021-Arena1.m4v?sp=r&st=2021-09-07T20:19:01Z&se=2031-09-08T04:19:01Z&spr=https&sv=2020-08-04&sr=b&sig=MH2L5r2ZAeqp6ejWiDBxnZD4YTv1GkbPcOKJWyOmzMM%3D" type="video/mp4">
  Your browser does not support the video tag.
</video>   
In the first frame you can see how compact the whole arena is, it will take a maximum of A1 size if you lay it flat. If you put it up against a wall only a few `cms`.
<br />
<video width="800" controls>
  <source src="https://piot.blob.core.windows.net/asset-363d6471-d959-4b4e-8191-6993457442b2/PiWars2021-Arena2.m4v?sp=r&st=2021-09-07T20:16:25Z&se=2031-09-08T04:16:25Z&spr=https&sv=2020-08-04&sr=b&sig=%2BXEjs35izKQpyz7YUHV7rLGEGsmmEv40z%2B0VsLei5mc%3D" type="video/mp4">
  Your browser does not support the video tag.
</video>      

Here in the first frame you can see how I have put the `U-clamp` right in the middle of the wall so it remains straight and sturdy.

You can also see how the base panels are hinged as I unfold them.
<br />

Here is another video of the actual `Up the garden path` challenge.  
<video width="800" controls>
  <source src="https://piot.blob.core.windows.net/asset-d01291f3-17fe-419d-952d-7ea2e74ac1f3/Smokey-GardenPath.mp4?sp=r&st=2021-09-07T19:41:46Z&se=2031-09-08T03:41:46Z&spr=https&sv=2020-08-04&sr=b&sig=z7HlZ8ZkN76jPQu6ER5Xmu5br1W2BevkjW46ESUBp1c%3D" type="video/mp4">
  Your browser does not support the video tag.
</video> 
<br />

Notice the paper `Challenge sheet` holds up quite well to the twists and turns of the bot through the challenge.

My `Tidy up the toys` challenge used mecanum wheels and that didn't affect the poster paper either. It held strong with one slight modification. I used `blue-tac` on four corners for additional support to the challenge sheet. This meant when the bot was going sideways or turning on the spot, the sheet didn't scrunch up.

## Final list of materials

- `A1` sized foam boards `5mm` thick (pack of 10)
- `760mm` wide, `10m` roll of black poster paper (there were no standards I found if they publish GSM for thickness go for higher GSM as budget permits)
- Scissors / Paper cutting knife
- While Glue
- If 3D printing corners preferably black filament. You can print in any colour and paint it black if that's an easier option for you.
- Optionally you could make the corners out of cardboard and white glue, and then cover them with the same black poster paper for the bits that are on the inside of the arena.
- Little bit of `blue-tac` like putty to temporarily hold `Challenge sheets` in place.
- GCODE Files : 
  - [ArenaCorner.gcode](/dev/posts/images/pi-wars/2021/course-angle.gcode)
  - [UClamp.gcode](/dev/posts/images/pi-wars/2021/u-shape-clamp.gcode)  
  
**These are setup for PLA at 220 Degs and 60 Deg bed temperature. You can export them as Obj and reimport them into your slicer**

**Apologies for the shoddy GCODE files, I am not trying to hide my work or prevent modifications I actually lost the CAD files. I think they were left behind in Fusion 360 when I moved from Fusion 360 to FreeCAD. I went back recently to Fusion 360 and all the files were gone. I will replace them with proper FreeCAD/Step design files as soon as I can.**


