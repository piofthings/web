{{{
  "title": "Cost of building a robot for PiWars",
  "tags": ["piwars", "RaspberryPi","piwars-2018"],
  "category": "Robotics",
  "date": "April-30-2018",
  "author": "Sumit Kumar Maitra"
}}}

This maybe a controversial topic and I fully expect to get panned for it, however, I thought I should write down what I spent on my PiWars bot (First time and in the Beginners category) for two reasons:
1. Improve on the costs in future (i.e. spend less money)
2. Give others a heads up

Before you continue if you have reached here as a PiWars first timer and not read the [PiWars Getting Started](https://piwars.org/getting-started-with-robotics/) manual, I strongly recommend you do. It will give you an idea of lots of options available. This post is more about the costs associated with building a robot from my perspective only.

Back to this post, the thing to keep in mind before you shoot the messenger is, this is my first PiWars and basically my first big project, so I may not be the smartest/most economic component buyer.

That said, I must stress you can do very well in PiWars with a standard off the shelf robot chassis. So I'll start with that.

Before we start, I'll assume you have a Monitor, a wireless Keyboard (bluetooth or proprietary dongle) and a mouse.

## Building a competition robot using Tiny 4WD
A year and half ago Brian Coretil wrote an excellent two part article in the MagPi ([Issue 51](https://www.raspberrypi.org/magpi/robot-magpi-51/) and [Issue 52](https://www.raspberrypi.org/magpi/robot-magpi-52/)) on how to build a small robot that could arguably compete well in PiWars. This became the first kit "Tiny 4WD" his company Coretec Robotics started selling. I have built a couple of 'bootlegged' versions of this robot and they are excellent little bots.

### Cost of Tiny W4D based robot
Tiny kit costs £55/- from Pimoroni and comes with laser cut acrylic chassis + camera holder + Explorer pHAT Motor Controller + Micro metal motors + Moon Buggy Wheels + nut/bolts/spacers.

You'll need to add a Pi, a battery pack and to do vision challenges a Pi Camera with cable. To do Vision challenges I recommend you get a Pi 3 B+. You'll find the Pi Zero struggling to keep up.

So cost of the bot (assuming a Pi3 and official Pi Camera and a 16Gb MicroSD Card) can be split up as follows:
<table class="table table-striped">
<thead>
<tr>
<th></th>
<th>Item</th>
<th>Qty.</th>
<th>Each</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.</td>
<td>Tiny 4WD Kit</td>
<td>1</td>
<td>1</td>
<td>£55.00</td>
</tr>
<tr>
<td>2.</td>
<td>RaspberryPi 3</td>
<td>1</td>
<td>1</td>
<td>£32.00</td>
</tr>
<tr>
<td>3.</td>
<td>SD Card 16Gb</td>
<td>1</td>
<td>1</td>
<td>£ 9.00</td>
</tr>
<tr>
<td>4.</td>
<td>Pi Camera</td>
<td>1</td>
<td>1</td>
<td>£24.00</td>
</tr>
<tr>
<td>5.</td>
<td>2000 mAH battery pack</td>
<td>1</td>
<td>1</td>
<td>~£15.00</td>
</tr>
<tr>
<td></td>
<td>Total</td>
<td></td>
<td></td>
<td>~£135.00</td>
</tr>
</tbody>
</table>

You can play around with the costs by going for an aftermarket Camera from Ebay that starts at about 6 quids.

If you have a LiPo charger you can just go with the [LiPo Shim (£10.00)](https://shop.pimoroni.com/products/lipo-shim) + (upto) 6000mAh LiIon battery ([like one of these from Pimoroni](https://shop.pimoroni.com/products/lithium-ion-battery-pack)) only.



#### Optional components
- Controller/Joystick. If you had a Wii-mote, a Sony PS3/4, or XBox One controller you don't need to buy one, you can easily use one of those as your Controller. You could also use your keyboard, I've seen people use the small bluetooth enable media center keyboards for controlling the robot.  
I used the Rock Candy PS3 controller clone. It uses a dongle so takes up a USB port but works fine once you have paired it.

- Additional Servo(s): This year you could build a passive golf grabber that is basically a U shaped clamp that guides the ball forward. However you might want to use a servo to close a 'gate' once the ball is in, so that you don't loose it till the end.

#### Other options
You can still use a Tiny 4WD like frame and go with other options like picking one of the following:

- Motor Controllers
 - [4Tronix PiconZero](https://shop.4tronix.co.uk/collections/motor-controllers/products/4tronix-picon-zero-intelligent-robotics-controller-for-raspberry-pi?variant=36997006977) It is slightly costlier than Explorer pHAT that comes with the Tiny 4WD Kit <del>but has beefier H Bridges that can possibly support bigger motors </del>* It also has one Utrasonic Sensor input. The key differentiator however is it's ability to be powered independently. This allows you to separate Power to the Pi and Power to the Motors making the overall platform more stable. That said, people did wonders with the Tiny 4WD this year (Check out Mark Mellors and Neal Olemeadow's exploits).  
 I got this board in my goody bag and I fully intend to explore it in the near future.

 <strong>_*Update May 2, 2018: Brian Coreteil pointed out that both the Explorer pHATs and Picon Zero have the same H-Bridge Only difference is that PiconZero allows independent power to the motors so you can use it to drive higher voltage motors, whereas the Explorer pHAT doesn't so you are limited to 5V motors. Thanks Brian._ </strong>
 - [4Tronix PZM Pi Zero Motor Shim](https://shop.4tronix.co.uk/collections/motor-controllers/products/4tronix-pzm-pi-zero-motor-shim-for-raspberry-pi) I found this quite accidentally but then realised Dr. Emma Norling was referring to this controller in her tweet earlier. This little board seems to be the cheapest H Bridge motor driver you can have at £ 5.00/- and seems quite capable. I might get myself a couple to try out.
 - [PiBorg ZeroBorg](https://www.piborg.org/motor-control-1135/zeroborg-ks1) This is costlier than the previous boards but has ability to control 4 motors independently. The basic kit with no addons costs 18/-. It battery controller addon it goes upto 23/-. I have used it without the Battery Controller in my bootlegged Pi and it works very nicely. However I would consider this board only if I was using Mercanum wheels or other designs that needed independent speed control of 4 motors. Most PiWars challenge don't need independent control of 4 wheels unless you have a design that enables you to strafe sideways. Apart from that it is an I2C device like the others and you can daisy chain/stack as many as you want so if you built an eight legged robot you could probably stack two of these :-) to get control of 8 motors, but then again 8 legged robots would need more than brushed DC motors to control ;-).
 - [Cytron 10A 5-30V Dual channel DC Motor Driver from Robotshop](https://www.robotshop.com/uk/cytron-10a-5-30v-dual-channel-dc-motor-driver.html) Keith Ellis, from 2018's Pro Champion team, suggested this one on the Discord server so it is definitely worth noting. Again at 20/- it is not cheap but it can certainly drive some powerful motors. You can easily control it directly from the Pi using the GPIO Zero library.
 - [Generic Motor drivers from Ebay](https://www.ebay.co.uk/itm/30A-DC5V-12V-Dual-channel-Motor-Drive-Controller-Board-H-Bridge-Motor-Contr-W1A0-/282912514860) This one was suggested by Brian S who was a Judge and also had an awesome Robot to show called BotMatrix. Just search of Dual H-Bridge DC Motor Controllers. Only thing about eBay is you are a bit on your own, but then again, most standard H-Bridge based controllers have very straight forward interfacing options for PWM control via the Pi. These will need to be powered separately from the Pi as well (which is a good thing).

- Power options  
 You don't really have a lot of options for power because without steady power to the Pi and the Motors your robot won't be able to cope with the rigors of competition.
  - Option 1 - Have separate power for motors, supply them directly what they need via the controller boards. Depending on how efficient you controller board is you could power them with a bank of AA cells 4/5/6/10 (depending on Motor DC voltage rating). Have a dedicated LiPo with a buck/boost converter to power the Pi. Given LiPos provide 3.7 or multiples of it, you'll either need a UBEC to covert 7.4 or more down to 5V or a boost converter to up 3.7 to 5 and still provide about 2A to the Pi. Be careful with which UBEC you choose some are not recommended for use with RaspberryPi due to noisy nature of their output.
  - Option 2 - Use a costly controller + power regulator board and supply it 9v-12v or whatever it needs (ZeroBorg needs Nine so 7 x AA batteries should suffice) and let it do the Buck/Boost to supply the Pi with a steady supply.

- Motors  
 If you go looking for motors at other hobby places like ModMyPi, RobotShop or HobbyKing you will definitely see lots of options and prices. Ebay is always there and so are Chinese portals like Alibaba/Bangood etc.


That's about all the maneuverability you have with respect to components. Big chunk of your this cost is going to be Motors + Driver + Power Supply (Voltage regulator) and Power Source (Batteries). Where you source it from, could give you the cost advantage. You could probably order these from Alibaba, wait a month and have them delivered for 1/3rd the price.

But end of the day, you'll need a Pi, a Camera, a set of Motors, a Motor Controller, Voltage regulator and Power/Battery pack at the very least.


## So what is the configuration of Pi-O-Steer?
I built Pi-O-Steer around the ThunderBorg kit. I was an early supporter on Kickstarter and got the kit for 150/-. However PiWars rules prohibit bots wider than 225mm in width and the MonsterBorg wheels are about 50mm each :-). You can't possibly fit the MonsterBorg motors and the wheels together into 225 mm. Eitherways, I wasn't planning to use their (rather fine Aluminum) chassis because where's the 'building' in that. Also from very early on, I wanted a bot that I could steer like a car (meaning front wheel steering), so fixed wheel positions for all 4 wheels wasn't going to work for my idea. I shall not repeat my entire journey here, you can read my [PiWars tag archive](https://piofthings.net/tags/piwars) for that.

I will open source my design once I have it code complete, because when we went to PiWars 2018 we were woefully underprepared mostly in Software. Once I have finished tested the software out for PiWars 2018 challenges I'll open source the chassis design. The software is already up on [Github](https://github.com/piofthings/pi-o-steer/tree/v2018). The code is fairly noobish given I am still new to Python so don't derive best practices from it.

I have not included cost of consumables like 3D Print filament or screw drivers and other tools I bought while or before I was building the Bot and will continue to use after it's been built, I have shown them in a separate table.

So the parts-list for bot (and material used in the arena) is as follows:

(The links are _not_ affiliate links, so click without fear of being tracked or price-jacked :-)... I am sharing my limited research and experience, I am not affiliated with any of these shops. Also the costs stated are on the day i.e. May 1, 2018. Some of the items when I purchased them were costlier. If the item is no longer available I have fallen back to my purchase cost).

|                | Item           | Qty     | Each    | Total (Incl VAT)   |
| :------------- | :------------- | :------ | :------ | :------ |
| 1. | [ThunderBorg controller board + Lid (ModMyPi)](https://www.modmypi.com/motor-control-1135/thunderborg-lid/)| 1 | £49.99 | £49.99  
| 2. | [PiBorg branded 300 rpm 12V DC Motors (ModMyPi)](https://www.modmypi.com/motors-mounts-and-wheels-1140/12v-300-rpm-monsterborg-motor-p37uk12/) | 4 | £15.00 | £60.00 |
|3.|RaspberryPi 3B (ModMyPi/Pimoroni/Pi-Supply/ThePiHut) | 1 | £32.00 | £32.00
|4.|[Pixy Camera (AmazonUK)](https://www.amazon.co.uk/Pixy-CMUcam5-Smart-Vision-Sensor/dp/B00IUYUA80/) | 1 | £63.00|£63.00 |
|5.|[Steering Servo Motor (Amazon UK)](https://www.amazon.co.uk/gp/product/B075VQVWSS/) | 1 | £16.99 | £16.99 |
|6.|[Pan Servo Motor (Amazon UK)](https://www.amazon.co.uk/gp/product/B07569WJ1M/) | 1 | £16.99 | £16.99 |
|7.|[Tilt Servo Motor SG92R (ModMyPi)](https://www.modmypi.com/motors-mounts-and-wheels-1140/servo-motor-sg92r-micro/) | 1 | £ 5.99 |£ 5.99 |
|8.| [Golf attachment Servo Motor (Amazon UK)](https://www.amazon.co.uk/gp/product/B015MX9G3G)** | 1 | £25.66|£25.66 |
|9. | [UltraBorg Servo and Ultrasonics controller (ModMyPi)](https://www.modmypi.com/sensors-1136/ultraborg) | 1| £16.00| £16.00 |
|10. | [18650 Lithium ion batteries (AmazonUK) set of 4 each](https://www.amazon.co.uk/gp/product/B01KK9PMPS)| 4 | £20.53 | £82.12 |
|11. | [18650 Lithium ion battery holder set (AmazonUK)](https://www.amazon.co.uk/gp/product/B075TYGXNS/) | 1 | £ 5.99 | £ 5.99
|12. | [Hobbywing UBEC (powering UltraBorg and Servos) (ModMyPi)](https://www.modmypi.com/power-1137/hobbywing-5v-3a-ubec-step-down-converter/) | 1 | £ 4.00 | £ 4.00  
|13. | [Set of 4 Wheels + Tyres (AmazonUK)](https://www.amazon.co.uk/gp/product/B01ABT4VO0/) | 1 |  £11.59  | £11.59
|14. | [Pan head nuts and bolts set (AmazonUK)](https://www.amazon.co.uk/gp/product/B073ZF21NX/) | 1 | £21.89 | £21.89 |
|15. | [9V Battery connector (AmazonUK)](https://www.amazon.co.uk/gp/product/B01CUG0NU8/) | 1 | £ 5.49 | £ 5.49 |
|16. | [4 x GREEN SLIME Bearings (AmazonUK)](https://www.amazon.co.uk/gp/product/B00M0F3HK8) | 1 | £ 1.99 | £ 1.99 |
|17. | [250pcs M2 Hex Socket Screws Bolt with Hex Nuts (AmazonUK)](https://www.amazon.co.uk/gp/product/B075RDC9J4/)| 1 | £ 8.99 | £ 8.99|
|18. | [M3 Nyloc Nut (20 Pack) 3mm Nylon Insert Lock Nuts](https://www.amazon.co.uk/gp/product/B00A6E8MEQ) | 1 | £ 1.24 | £ 1.24 |
|19. | [M3 Wing Nuts (AmazonUK)](https://www.amazon.co.uk/gp/product/B008I5QRJ2) | 1 | £ 2.97 | £ 2.97 |
|20. | [LiPo safety bag (AmazonUK)](https://www.amazon.co.uk/gp/product/B01F5CH8S4) | 1 | £ 6.79 | £ 6.79 |
|21. | [10 m Poster Roll - Black (AmazonUK)](https://www.amazon.co.uk/gp/product/B018JXRPT8) |  2 | £ 5.99 | £ 11.98 |
|22. | [Brass Motor Shaft Hub - 6mm (ModMyPi)](https://www.modmypi.com/motors-mounts-and-wheels-1140/hub-6mm) | 4 | £1.99 | £3.96
| | *Total* | | | £455.62 |

** The £25.66/- spent of 4 Servos was a bit much when only one was used. But in hindsight I should have used these for the tilt motor which would have probably prevented it from failing at the competition.  

As you can see, the Motors + Motor Controller + Batteries is my biggest cost. The ThunderBorg Controller board is also the voltage regulator so it saved me from buying additional circuitry for it.

Pixy Cam thats the single most costliest component is strictly optional. In future I'll try to move away from the Pixy in favour of RaspiCam+OpenCV combination.

Other long term usage items purchased for PiWars that was either not used or can be reused anytime.

|                | Item           | Qty     | Each    | Total   |
| :------------- | :------------- | :------ | :------ | :------ |
|1. | [18650 battery charger (AmazonUK)](https://www.amazon.co.uk/gp/product/B01N237RVS/) | 1 | £14.90 | £14.90
|2. | [ 26 Gauge Silicone Wire Ultra Flexible (AmazonUK)](https://www.amazon.co.uk/gp/product/B01MYTEWXN) | 1 | £8.06 | £8.06|
|3. | [Wera Kraftform 2054 Micro Screwdriver - Hexagon Tip Sw 0.9 / 40 (AmazonUK) ](https://www.amazon.co.uk/gp/product/B0001P18O6) | 1 | £ 3.27 | £ 3.27 |
|4. | [Wera Kraftform 2054 Micro Screwdriver - Hexagon Tip Sw 2.0 / 60 (AmazonUK) ](https://www.amazon.co.uk/gp/product/B0001P18P0) | 1 | £ 2.46 | £ 2.46 |
|5. | [Wera Kraftform 2054 Micro Screwdriver - Hexagon Tip Sw 1.5 / 60 (AmazonUK) ](https://www.amazon.co.uk/gp/product/B0001P18OQ) | 1 | £ 2.65 | £ 2.65 |
|6. | [Wera Kraftform 2054 Micro Screwdriver - Hex-Plus, 1.3 x 40 mm (AmazonUK) ](https://www.amazon.co.uk/gp/product/B003ES5MDU) | 1 | £ 3.35 | £ 3.35 |
|7. | [Flat and Lock Washer Kit (500 Pieces) (AmazonUK)](https://www.amazon.co.uk/gp/product/B00B22VHOS) | 1 | £ 4.67 | £ 4.67 |
|8. | [Dupont Professional Pin Crimping Tool (AmazonUK)](https://www.amazon.co.uk/gp/product/B01G1PQGJQ) | 1 | £15.99 | £15.99 |
|9. | [Dupont Male Female Crimp Pins Adaptor Assortment Kit (AmazonUK)](https://www.amazon.co.uk/gp/product/B0774HCRY1) | 1 | £ 8.99 | £ 8.99 |
|10. | [10pcs Mini Dot Diode Module Head (AmazonUK)](https://www.amazon.co.uk/gp/product/B01MQ151DO/) | 1 | £ 3.34 | £ 3.34 |
|11. | [Rolson 61298 Spring Assortment - 150 Pieces (AmazonUK)](https://www.amazon.co.uk/gp/product/B000QF7JTO)| 1 | £4.89| £4.89|
|12. | [Raspberry Pi 3B+ and 16 Gb SD Card (Pimoroni)](https://shop.pimoroni.com/products/raspberry-pi-3-b-plus) | 1 |	£41.00	|	£41.00 |
|13. | [Hyper Pixel	(Pimoroni) ](https://shop.pimoroni.com/products/hyperpixel)| 1 |	£40.00	|	£40.00 |
|14. | [Explorer pHAT (Pimoroni)](https://shop.pimoroni.com/products/explorer-phat) | 1  | £10.00	|	£10.00 |
|15. | [Button Shim (Pimoroni)](https://shop.pimoroni.com/products/button-shim) | 1 | £ 6.00 | £ 6.00 |
|16. | [Scroll pHAT HD (Pimoroni)](https://shop.pimoroni.com/products/scroll-phat-hd) | 1 | £12.00 | £12.00 |
| | *Total* | | | £181.57 |

If you are wondering why do I have a second Pi 3B+ (the latest model O_o) and a HyperPixel in that list, well they were not a part of the robot. They formed a self contained Wifi hot-spot that I plugged in the main arena and left it there. I was able to connect my laptop and the robot to that hot-spot and ssh into the Robot as and when required. But to be fair you never actually need a separate hot spot, you could very well use your Phone's hotspot or the Pi on the robot itself as a hotspot.

Other interesting items in the second list are the two pHATs and the Button Shim from Pimoroni. These were used to build a 'on Robot' user interface to switch the robot into various modes and the likes. However, after my 3D Printer broke on the second last day, I didn't have a place to mount this combination elegantly enough. So I abandoned the onboard UI and went with SSH and script change to switch between challenges.

### Psst! An open secret...
Most of the hobby/maker shops will offer discount coupons from time to time. Keep a sharp eye out for those and you might be able to save upto 25% at a time. Best way to keep track is sign up to their newsletters. Also, if you are an Education org/charity most of the local maker shops will give you a discount. However if you go all out on Ebay and AmazonUK then all bets are off.

## To summarise
The biggest investment for PiWars is not listed above, it is your time, the cost of which pales in comparison to the hardware.  
However, there is a very definite material cost involved in building a robust competition Robot. I have tried to show you the mid-lower limit and the mid-upper limits :-). Hopefully you will be able to find a sweet spot for yourself. You can spend a lot more money by building custom PCBs, custom Nerf guns, even custom controller boards OR spend much lower by going with one of the smaller than Tiny 4WD kits as listed on the [PiWars site](https://piwars.org/getting-started-with-robotics/).

Happy Robotting 🤖 !

## Updates May 3, 2018
The post has been generally well received and I got some feedback on Twitter, so I thought I would update it.

**[Neal Oldmeadow on Twitter](https://twitter.com/neal_oldmeadow/status/991633047035568128)**   
Neal reported back saying this Tiny4WD based robot costed around £170/-. That's a validation of my Tiny4WD based estimation earlier in the article. Neal came 4th in the beginner's category.

**[Dr. Emma Norling and Tom Onin on Twitter](https://twitter.com/CompSciEmma/status/991629281318010880)**  
Dr. Norling and Tom (both PiWars veterans) pointed out that a lot of the cost may come out of your Maker toolkit you already have (or will go into your Maker toolbox that you will hopefully use for years in the future). Also, opposed to building your first robot from scratch, if you are a repeat participant, you can expect a lot of components from previous robot still useful.

**[Douglas Gore on Twitter](https://twitter.com/DougGore/status/991642901217234944)**  
Doug pointed out I had not clarified the "Poster Roll" line item and arena building costs. This is true. To be well prepared, it is ideal if you prepare arenas for the automated challenges because they are well documented with exact measurements. Testing the bot in simulated conditions gives you a better chance of success on the day. Me (and Doug) both used cardboard packing boxes, black poster paper and white glue to create makeshift track for straight line speed and Somewhere over the rainbow.  I didn't get time to replicate the Minimal Maze. Quite a few people built the entire rigs out of Wood and then paint. If you go down the timber and paint route that will add more to costs and effort.
