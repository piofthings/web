{{{
  "title": "PiWars at home 2021: Getting a Raspberry Pi talking to an Arduino Pro",
  "tags": ["piwars","piwars-2021"],
  "category": "Robotics",
  "date": "September 30, 2021",
  "author": "Sumit Maitra",
  "draft": true
}}}

As outlined in our [last post](/blog/piwars-at-home-2021-back-to-blogging-and-hello-smokey) we had plans to use the PiZero W with an Arduino as a motor driver board. Idea was to write an Arduino driver to control the Motor Controllers, and then have a Python wrapper to call the Arduino from the Pi. This all seemed great from a theoretical perspective. Things start getting quirky when you get down to the metal. Here is our experience.

## Pi to Arduino and GPIO logic levels
Before we talk about any integration options, it is important to point out Raspberry Pi and (most Arduinos) have one fundamental difference. The Raspberry Pi's GPIO pins consider 3.3V as ON or 1 and ~0V as OFF or 0. Arduino's (most of them anyway) consider ~5V as ON or logic level 1 and ~0V as OFF or 0. Hence Pis are known to operate at 3.3v logic level and Arduinos 5v logic level. This is also referred to as 3.3V tolerant or 5V tolerant.

Tying an Arduino GPIO pin to a Pi GPIO pin directly is likely to damage the Pi GPIO pins because they are not 5V tolerant.

Solution is quite simple, you get `Logic level converters` that sit between a Pi and Ardunio's GPIO pins and take Pis 3.3V and convert it to 5V for Arduino and vice versa.

You could build a Logic level converter yourself, but they are available for less than a quid each, so just save time and get yourself a set. [Here is one on Amazon UK](https://www.amazon.co.uk/gp/product/B07RDHR315/) (_Please note none of the external links are affiliate links. I've done my best to remove trackers from the link_).

## Ways for a Pi talk to an Arduino
Usually, if you have a normal Pi with USB ports you just plug the Arduino into the USB port and talk to it over UART. But if you don't want to take the easy way, there are two other ways

- Communicate over I2C bus using Arduino and Pi GPIO pins
- Communicate over direct UART using Arduino and Pi GPIO pins

### Wiring up a Pi to an Ardunio to communicate over I2C
Wiring up a Pi with an Arduino using a Logic level converter is pretty easy. Following diagram should be self-explanatory.

![PiWars 2021 - How to wire up a Pi with an Arduino via I2C](/dev//posts/images/pi-wars/2021/pi-to-arduino-i2c.jpg)  

| Wire  | Pi GPIO Physical Pin Number | LLC Low side            | LLC High side (5v) | Arduino      | Notes                                                   |
| :---- | :-------------------------- | :---------------------- | :----------------- | :----------- | :------------------------------------------------------ |
| Blue  | 1 (3v3)                     | 3.3 V Voltage reference | HV (5V reference)  | VCC (5V pin) | -                                                       |
| Black | 9 (GND)                     | GND                     | GND                | GND          | -                                                       |
| Grey  | 3 (SCL)                     | TX Pin                  | TX Pin             | SCL Pin ID 2 | -                                                       |
| White | 5 (SDA)                     | TX Pin                  | RX Pin             | SDA Pin ID 3 | -                                                       |
| Red   | 2 (5v)                      | -                       | -                  | Raw Input    | Powering the arduino from the Pi is not a good practice |

