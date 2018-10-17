{{{
  "title": "PiWars 2019 - So it begins",
  "tags": ["piwars-2019", "piwars"],
  "category": "Robotics",
  "date": "September-18-2018",
  "author": "Sumit Kumar Maitra"
}}}

I sent my PiWars 2019 application in about ten days ago (weekend before last). I wasn't ready to the extent I wanted, but then again, you never are, and I didn't want to wait for the last two weekends. Hopefully the application has enough meat to see it through the first round of eliminations. I can't reveal much about the application until the results are announced so, suffice to say, brand new, built from scratch, robot, by the same team as last year. It does have a new name though :).

![PiWars 2019 - Team Pi-o-steer's initial design](/posts/images/pi-wars/pi-wars-2019-it-begins.jpg)

## The Goal
This year our aim is to build it to compete in all challenges, so, after wrapping our heads around OpenCV, next challenge is to build the Meteor shooter. Frankly speaking Fusion 360 has had its moments of joys as well as utter frustration. However, once you know its limitations you can work around them mostly. My issues mostly stem around its 'cloud integration' because I use it on my daily train commute and internet can be very spotty. After the first couple of days I just stuck it in offline mode while on train. Problem solved. However, designing the chassis has taken its toll. I am staying away from Fusion 360 a bit longer, till I have the chassis printed and wheels on the ground. Will start with the Meteor shooter after that.

## Sensors
We are moving to ToF sensors this year (away from Ultrasonics last year), so I had to look up how to integrate them with the Pi. After initial trepidation it turned out to be rather easy. I got myself a couple of "TCA9548A I2C multiplexers" and a bunch of "GY-VL53L0XV2V I2C IIC VL53L0X Time-of-Flight ToF Ranging Sensors" from eBay. These are clones of Adafruit's designs. The quality of the clones maybe dodgy but you can piggy back on their documentation, or just get the Adafruit ones.

Fortunately for me, the I2C Multiplexer and the ToF sensors seem to be working in tandem. Each I2C muxer can support upto 8 additional I2C devices. I've tried with 2 ToF sensors and they worked fine. I'll probably tag on my Steering Servos controller (a 4Tronix PiconZero) as well. Advantage of the PiconZero is it is powered completely independently so I can give it a separate power supply just for the servos motors.

### Battery sensor
Last year, the Thunderborg did a stellar job of monitoring battery levels for me and I didn't loose any batteries. This year however I have no backup, so planning to use a ADS1015 with a voltage divider to sense battery health. This ADC again from Adafruit is nicely setup to return data over I2C. This will either be my 6th or 8th I2C device depending on whether I fry any ToF sensors while building this or not.

That's the plan so far. There is a lot to it actually, but that's what I have wrapped my head around so far, more as things happen.

Except for the pan-servo (which I think I blew last year), everything has been acquired. I might go for a new steering servo as well, to prevent cannibalising my steering servo from Pi-o-steer.

Fingers crossed we make it first up. If we don't we'll still continue to build and hope to showcase on the day.
