{{{
  "title": "Introducing JerryBot",
  "tags": ["JerryBot","RaspberryPi"],
  "category": "Robotics",
  "date": "May-20-2018",
  "author": "Sumit Kumar Maitra"
}}}

After I blogged about the cost of Pi Wars robot I started thinking, what would it take to get everyone started with building Raspberry Pi controlled robots? The most cost effective kit out there is the [EduKit from CamJam](http://camjam.me/?page_id=1035). It costs £18/- + shipping and needs a Pi + SD Card + batteries. This makes the total minimum cost

|  | Item                       | Units     | Price     | Total     |
|:-- :-------------             | :---------| :---------| :---------|
| 1. | PiZero W (ModMyPi)       | 1         | 9.10      |   9.1     |
| 2. | SD Card 16 GB (Amazon)	| 1	        | 5.90	    |   5.9     |
| 3. | EduKit                   | 1	        | 18.00     |	18.00   |
| 4. | Battery bank             | 1	        | 5.00	    |   5.00    |
| 5. | 3 x AA (Amazon)	        | 1	        | 1.00      |   1.00    |
|| Total ||| £39.00|

I tried to look around and failed to get the cost down any further than this. So for a cheap and reliable set of parts start with [CamJam EduKit](https://thepihut.com/collections/camjam-edukit/products/camjam-edukit-3-robotics).

I wanted to build a robot in similar range but smaller than the one possible with EduKit. No particular reason to make it smaller, just for fun.

So I had to start from scratch again. After a lot of scraping I came up with the following list of parts. My main criteria was to source from UK sellers as much as possible. Some of the Ebay components listed below can be cheaper if obtained from China directly. Similarly, instead of choosing the dual power system using ModMyPi's boost converter, I could have gone with a 2 quid battery bank charging unit from China too. But without testing those, it is not a good idea to suggest them as safe parts. Similarly, DIY LiPo battery units are not for entry level stuff. Finally the 2 quid for DIY Micro USB plug is a bit of a luxury. I could have plugged in the the 5V via the GPIO pin, however again, not the best practice for beginners so trying to set a good example.


|  | Item                       | Units     | Price     | Total     |
|:-- :-------------             | :---------| :---------| :---------|
| 1. | PiZero W (ModMyPi)       | 1         | 9.1       |   9.1     |
| 2. | SD Card 16 GB (Amazon)	| 1	        | 5.9	    |   5.9     |
| 3. | Micro Gear Motors (Ebay) | 2	        | 3.97      |	7.94    |
| 4. | Boost Converter (ModMyPi)| 1	        | 2	        |   2       |
| 5. | 5 x AA (Amazon)	        | 1	        | 3         |   3       |
| 6. | 3 x AA Holder (Ebay)	    | 1         | 1.5       |   1.5     |
| 7. | 2 X AA Holder (Ebay)	    | 1         | 1         |   1       |
| 8. | Pico Con (4Tronix)	    | 1         | 6         |     6     |  
| 9. | DIY USB (ModMyPi)	    | 1	        | 2         |  2        |
| 10. |Rock Candy Controller (optional)	| 0	| 16        |	0       |
| | Total | | | £ 39.44|

Note I've put the Rock Candy controllers as optional and not counted it in the current cost. When I saw last it was 16 quids. I am designing the case with a PiZero (not W) in mind, so you can plug in the controller and control the bot without worrying about bluetooth/wireless control. However, upping the spend from 5 quid for Zero to 10 for the Zero W gives you the ability to ssh into it remotely and control via keyboard foregoing the controller. So, its a choice, and that's why the PiZero W is the suggested board.

Though priced similarly you miss out on the line follower and ultrasonic sensor that comes with the EduKit. They add another couple of Pounds to the JerryBot.

Someday I'll gather enough patience to build my own motor controller which will probably cost half, but still, 6 quid for a kit is a good deal from 4Tronix. Not to mention their superb service.

Next of course is designing the bot. As you can tell from the name it looks like mouse. I got the original idea from a wall-hugging toy my kid had when he was 4-5yo. I wanted to replicate the wall hugging behaviour as an introduction to motors and batteries on Day 1. On Day 2
