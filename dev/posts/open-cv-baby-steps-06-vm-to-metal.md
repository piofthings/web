{{{
  "title": "OpenCV Baby steps 6: From VM to metal, OpenCV 3.4.2 on RaspberryPi",
  "tags": ["OpenCV", "PiWars", "PiWars-2019", "RaspberryPi"],
  "category": "Computer Vision",
  "date": "August 08, 2018",
  "author": "Sumit Kumar Maitra"
}}}

Last weekend a fellow PiWars competitor ([Vishal](https://electrobotify.wordpress.com/)) pinged me and said my instructions for installing OpenCV on RaspberryPi were not working. OpenCV was getting installed but Python wouldn't load it, with missing dependency errors. My entire OpenCV series is for the sole purposes of a gentle introduction to OpenCV including how to set it up. If it wasn't working, we had a _major_ problem. Time to go digging...

I downloaded the latest Raspbian Stretch and flashed it on a 16Gb SD Card. Popped it in, booted up, let the new Raspbian update itself and installed OpenCV using pip3. Tried to load OpenCV to check it's version and sure enough it went splat! Same error as Vishal was getting.

![Dependency error](/posts/images/opencv/step-6-open-cv-3-4-2-error.jpg)

I said, oh well, only a few missing dependencies lets install them. After 10 minutes of error->install->error->install loop I hit an error that couldn't easily trck back to a dependency library. Sent a few frantic tweets to Ben Nuttall but he was away so couldn't respond immediately. So I went digging and found [this post](https://quirkymonk.wordpress.com/2015/08/10/how-to-install-opencv-3-0-for-python-3-4-in-debian-jessie/) that looked a bit dated but still applied to Python 3.

Gingerly I tried to install all the dependencies listed. After a couple of hiccups i finally managed to get the installation going. If you want to avoid the hiccups here is the cleaned up dependency list:  

```bash
sudo apt get install ibjpeg-dev libtiff5-dev libjasper-dev libpng12-dev build-essential cmake git pkg-config libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libatlas-base-dev gfortran python3.4-dev python3-numpy python3-scipy python3-matplotlib ipython3 python3-pandas python3-notebook python3-tk libtbb-dev libeigen3-dev yasm libopencore-amrnb-dev libopencore-amrwb-dev libtheora-dev libvorbis-dev libxvidcore-dev libx264-dev libqt4-dev libqt4-opengl-dev sphinx-common texlive-latex-extra libv4l-dev libdc1394-22-dev
```

As you can see it is a really long list and it takes a good 30 minutes to install it (depends on your internet speed upto a certain extent).

Once the installation finished I tried to get the OpenCV version from the Python shell and yay!

![OpenCV installed and loaded](/posts/images/opencv/step-6-opencv-installed-and-loaded.jpg)

That was installing OpenCV. However I still had to get my code running on the RaspberryPi. Turns out there were issues with that too. OpenCV does not compile any GUI toolkit by default on ARM, so ```imshow``` doesn't work. So all the work I had done to create windows and sliders etc. was not going to work. Turns out the ```matplotlib``` library however does work for ARM so it works swell on RaspberryPi. So I had to do a quick tweak on the load_image.py to get it working on the RaspberryPi. Instead of using ```cv2.imshow``` I did ```plt.imshow(img)```. This was ofcourse thanks to a [StackOverflow post here](https://stackoverflow.com/questions/41067007/trouble-with-cv2-imshow-function).

Here is the updated code for ```load_image.py```.

```python3
#!/usr/bin/env python3

import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('./SampleImages/All.jpg',cv2.IMREAD_GRAYSCALE)
plt.imshow(img)
cv2.waitKey(0)
cv2.destroyAllWindows()

```

I am going to redo all the samples with the RaspberryPi in mind going forward and port the existing ones and copy them to the ```/pi``` subfolder.

## In conclusion
While some people prefer compiling their OS, if you are among those who don't (I don't), you'll need to discover the tools that will help you work with existing binaries and distributions. It's all part of a learning curve.

I had a nice discussion with Dave Hones and Ben Nuttall on twitter and learnt some more about how to discover dependencies. I'll try them out and report back if there are any differences from the list above. But for now, if you are in a hurry to test out OpenCV for PiWars, you need the above dependencies.

Also remember, if you are going to run your Pi Headless then there are separate python packages you can theory

```bash
pip3 install opencv-python-headless
pip3 install opencv-contrib-python-headless
```

As per David the headless doesn't need the QT dependencies only.

More as things happen, happy Computer Vision experiments on the Pi
