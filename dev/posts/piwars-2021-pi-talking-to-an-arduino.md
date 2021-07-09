{{{
  "title": "PiWars at home 2021: Getting a Raspberry Pi talking to an Arduino Pro",
  "tags": ["piwars","piwars-2021"],
  "category": "Robotics",
  "date": "June 28, 2021",
  "author": "Sumit Maitra"
}}}

As outlined in our [last post](/blog/piwars-at-home-2021-back-to-blogging-and-hello-smokey) we had plans to use the PiZero W with an Arduino as a motor driver board. Idea was to write an Arduino driver to control the Motor Controllers, and then have a Python wrapper to call the Arduino from the Pi. This all seemed great from a theoretical perspective. Things start getting quirky when you get down to the metal. Here is our experience.

## Ways for a Pi talk to an Arduino
Usually, if you have a normal Pi with USB ports you just plug the Arduino into the USB port and talk to it over UART. But if you don't want to take the easy way, there are two other ways

- Comminucated over I2C bus using Arduino and Pi GPIO pins
- Communicate over direct UART using Arduino and Pi GPIO pins

Both of these involve using a voltage leveller circuit because Pi GPIO uses 3v3 (3.3V) logic and Ardunio uses 5v logic. So trying to communicate from Arduino to Pi would fry the Pi's GPIO.

