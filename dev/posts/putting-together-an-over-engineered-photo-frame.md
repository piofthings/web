{{{
    "title": "Putting together a digital photo frame using a Raspberry Pi",
    "tags": ["RaspberryPi", "3D Printing"],
    "category": "Projects",
    "date": "01-12-2018",
    "author": "Sumit Maitra"
}}}

I have had this idea of a portable Pi tablet style computer for a while. My first touchscreen purchase was specifically for building such a portable Pi device. However the driver for the WaveShare display went bust and with that it got consigned to my heap of "Todo later" projects.

Around Boxing Day last year (2017), when there were some neat discounts available for official RaspberryPi hardware, I managed to snag the RaspberryPi official 7" display, with the intention of converting it into a quick Picture frame for my parents as their Christmas gift. Little did I know how badly I had miscalculated the effort required.

> This is a very costly and roundabout way to build a rather small digital photo frame. If you want only a photo frame with images stuck in an SD card there are lots and lots of much cheaper options, that give you a much bigger screen. Consider yourself warned.

## The hardware

1. Raspberry Pi 3
2. Raspberry Pi Original 7" display
3. 16 Gb micro SD card
4. RaspberryPi official power supply (2.5A minimum)
5. Pimoroni OnOff Button shim
6. ~~Adafruit Powerboost 1000C~~
7. ~~3.7 Lipo from Pimoroni/Adafruit~~
8. ~~8 K Ohm and 22 K Ohm resistors~~
9. 3D Printed case
10. Loads of M2 nuts and bolts 10mm to 12mm
11. 1 tactile push button switch
12. Some proto-board/perf-board and a hacksaw to cut them to size
13. 12" long Raspberry Pi camera/display flat cable

**_From the workshop_**

- A low powered or manual drill with a 2mm drill bit

Why are some of the items struck out? Well, I started with them in my initial design but had to drop them later. You will see some pictures that include them, so just a heads up. I'll also explain why I dropped them.

**Designing the enclosure**<br>
First challenge was to do the 3D Design. This took the longest. But if you are going to try this out yourself, you don't have to start from scratch all the models I built are available on [Tinkercad](https://www.tinkercad.com/things/6y6mqInNMwd) (under [CC-BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/))

The design is split into two parts.

- The top part that holds the display screen
- The bottom part that houses the Pi and the switch

![](/posts/images/pi-photo-frame/bi-colour-picture-frame-case.jpg "Bi-colour photo frame case")

The angled side is the bottom and the frame slants back slightly as it sits. Initially I thought it wouldn't stand on its own, but it turned out rather stable.

**_Printing the enclosure_**<br>
Printing the enclosure was a challenge in itself and unless you have a print bed that's greater than 220mm on one side you'll have to split the bits up. I have a separate design for the each of the broken down bits.

For the top-frame I designed a nice overlap so I had enough surface to apply the glue to.

For the bottom bit, I cut it straight but kept it un-equal so the join wouldn't be down the middle for both the pieces. For some reason I concluded it wouldn't look good or be not strong enough. Both were pretty unfounded I think.

**Assembling the components**  
As seen from the hardware list above I had plans to power the project via a wall wart as well as battery, hence the PowerBoost 1000C. The PowerBoost was supposed to be at the left bottom corner and the RaspberryPi is planned to be on the right. In middle was space for the OnOff button shim and a 1200 mAh LiPo pack.

Since I yanked the PowerBoost and the LiPo at the last moment, the OnOff button shim's input moved had to be moved to where the PowerBoost originally was. Also the on off shim doesn't have and screw holes. I worked around by pinning it on a slightly bigger piece of Proto board and bolting the ProtoBoard to the chassis.

The shim comes with a breakout for an external tactile button (On when pushed, off when released) . I passed the header pins from under, so it brought together protoboard and the shim. Then I soldered it on the shim, took out the plastic separators and soldered it on the ProtoBoard. Thus the board was now a nice extension of the Shim.

I soldered the a set of headers on the shim and connected to the GPIO pins as they were intended (if the Shim had been soldered straight in). Point to note, use as small a jumper cable as possible to reduce current drop.

The new official displays only need the 5V and GND pins connected from the Pi. The touch information is now passed via the DSI cable connector. So I powered the display via the other free 5V pin on the Pi header and a GND pin.

## The software

Once you have the 3DPrinted components the hardware is easy enough to assemble, the software I built wasn't too complicated.

It is a simple [Electron](https://electron.io) JS app I call [Cloud Nine](https://github.com/piofthings/cloud-nine).

It connects to a specified Azure blob storage using a shared access key (be very careful here, don't use account key that will give anyone with access to it, read/write access to your blob storage).

Normally people build Electron Apps using React, but I am rather old fashioned so I use RequireJS and Knockout. It is styled using the ubiquitous Bootstrap style library and the core functionality uses Bootstrap slide-show component.

Since I was in a terrible hurry to get it out of the door, I haven't tested it for scale so if you try to load a million images on this, it might run out of memory. I'll add a scalability note once I've uploaded all my images to the Blob store (and tested it myself.)

Also note an immediate optimisation I have in mind is to resize the images. I was using `lwip` node module earlier to resize images on another Electron app I built but `lwip` seems to be broken at the moment. So, either I'll have to fix what's broken or find a different library. Also I plan to throw Azure functions into the mix at some point.

[The code](https://github.com/piofthings/cloud-nine) is open source, feel free to have a go, file bugs or send PRs.

Here is what it looks like: ![](/posts/images/pi-photo-frame/cloud-nine-at-work.jpg "Home screen of Cloud Nine")

The Settings page has some basic settings to get you to connect to the Azure blob storage.

![](/posts/images/pi-photo-frame/cloud-nine-settings-page.jpg "Settings page")

The settings are mostly Azure blob storage related. If I get around to doing other stores I'll update the UI appropriately. Maybe start with a picker of supported stores.

Refresh, initiates a request to pull down new files. Ideally I would like this to be automatic on a timed poll. Haven't managed to get to it yet.

The close button closes the app and returns you to the Desktop.

Finally the slide-show initiates the photo-frame mode where is loops through the images that it has downloaded infinitely.

![](/posts/images/pi-photo-frame/photo-frame-slideshow.jpg "Slide show models")<br>
_(That's an image don't click on the navigation arrows :-)..)_

Tapping on the screen bring up the navigation arrows and the top navigation bar. The navigation bar vanishes after a few seconds.

### Next steps

Currently I don't have a release plan or for it and Electron doesn't seem to have the integrated updater for Linux. Once I've sorted it out I'll start releasing packages and installers on all platforms Electron supports. Till then feel free to clone and run.

## Special mention
Many thanks to [Phil Howard](https://twitter.com/gadgetoid) aka @Gadgetoid of PiMoroni whose prompt answers on OnOffShim helped me ship this off with my parents on time. Phil runs [pinout.xyz](http://pinout.xyz) - the definitive reference of RaspberryPi HATs and pHATs GPIO pin compatibility with the Pi. Phil has a [Patreon page](https://patreon.com/gadgetoid), go support him if you can!


Here are a few images that show the making of the photo-frame (that's a carousel you can click left or right).


<div id="piphotoframeimages" class="carousel slide" data-ride="carousel">
  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
     <img alt="Printing the base's Right side" src="/posts/images/pi-photo-frame/carousel-0-base-rhs-begins.jpg" />
     <div class="carousel-caption">
       Printing the base's Right side
     </div>
    </div>
    <div class="item">
     <img alt="Print the base's left hand side" src="/posts/images/pi-photo-frame/carousel-1-base-right.jpg" />
     <div class="carousel-caption">
      Print the base's left hand side
     </div>
    </div>
    <div class="item">
     <img alt="The top layer of the base, looking good!" src="/posts/images/pi-photo-frame/carousel-2-base-top-layer.jpg" />
     <div class="carousel-caption">
      The top layer of the base, looking good!
     </div>
    </div>
    <div class="item">
     <img alt="The full base, glued up" src="/posts/images/pi-photo-frame/carousel-3-base-glued-up.jpg" />
     <div class="carousel-caption">
      The full base, glued up
     </div>
    </div>
    <div class="item ">
     <img alt="Testing it out with Adafruit Powerboost, worked till it didn't (not enough current)" src="/posts/images/pi-photo-frame/carousel-4-nearly-worked-but.jpg" />
     <div class="carousel-caption">
      Testing it out with Adafruit Powerboost, worked till it didn't (not enough current)
     </div>
    </div>
    <div class="item ">
     <img alt="Removed Powerboost and retrofitted the PiMoroni OnOff Shim in placed" src="/posts/images/pi-photo-frame/carousel-5-final-power-in.jpg" />
     <div class="carousel-caption">
      Removed Powerboost and retrofitted the PiMoroni OnOff Shim in placed
     </div>
    </div>
    <div class="item ">
     <img alt="The guts of the system" src="/posts/images/pi-photo-frame/carousel-6-the-guts.jpg" />
     <div class="carousel-caption">
      The guts of the system
     </div>
    </div>
    <div class="item ">
     <img alt="Closer look at the wiring of the Shim and Display. One Red (5V) and Black (GND) goes to the display, the rest mirror the Shim's piofthings" src="/posts/images/pi-photo-frame/carousel-7-the-guts-2.jpg" />
     <div class="carousel-caption">
      Closer look at the wiring of the Shim and Display. One Red (5V) and Black (GND) goes to the display, the rest mirror the Shim's piofthings
     </div>
    </div>
    <div class="item ">
     <img alt="Why can't the photo frame be slimmer? Well you could get creative with the headers, but I was working with what I had" src="/posts/images/pi-photo-frame/carousel-8-why-not-slimmer.jpg" />
     <div class="carousel-caption">
      Why can't the photo frame be slimmer? Well you could get creative with the headers, but I was working with what I had
     </div>
    </div>
    <div class="item ">
     <img alt="Hey look, the CG is perfect for it to stand without additonal support" src="/posts/images/pi-photo-frame/carousel-9-on-its-own.jpg" />
     <div class="carousel-caption">
      Hey look, the CG is perfect for it to stand without additonal support
     </div>
    </div>
    <div class="item ">
     <img alt="It works! " src="/posts/images/pi-photo-frame/carousel-10-it-works.jpg" />
     <div class="carousel-caption">
      It works!
     </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#piphotoframeimagesc" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left fa fa-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#piphotoframeimages" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right fa fa-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
