{{{
  "title": "Open CV Baby Steps 01: Installation",
  "tags": ["OpenCV","Raspbian", "RaspberryPi"],
  "category": "Computer Vision",
  "date": "14-June-2018",
  "author": "Sumit Kumar Maitra"
}}}

I always wanted to learn OpenCV, because it was a massive step up from my Computer Graphics theory class back in the University days. Also I dream that all my the pictures I have ever taken will one day be collated, indexed and searchable with context like place, scene, people in the image so on and so forth. So learning OpenCV is the natural first step towards that (no, I will not use a my images as training material for some corporate AI engine, I wear a tin-foil-hat, sue me!). Of course everything had to run off (one or more) RaspberryPi!

So finally with the deadline of PiWars 2018 gone, I decided to roll up my sleeves and start learning OpenCV. I am starting this series as someone who doesn't know any OpenCV, only familiar with Python and Linux environments. Don't really know when it will end, but hopefully it will cover doing the PiWars 2018 challenges using a camera.

## Installing OpenCV on Raspbian Desktop (ONLY)

 ** As of August 2018 these instructions apply to Raspbian Desktop ONLY. For RaspberryPi, refer to [my post here.](/blog/opencv-baby-steps-06-from-vm-to-metal) **

To be fair, getting started with OpenCV used to be pretty daunting until now. Recently Ben Nuttall and Dave Hones of the RaspberryPi foundation have done something super cool, they built [PiWheels](www.piwheels.org). Basically it is a Python Wheels host for Raspberry Pi specific ARM builds of python libraries. This makes it easier to use certain libraries that don't have ARM versions hosted by PyPi. Included in this list of libraries is OpenCV with all optimisations for Raspberry Pi turned on. There is no reason to fear OpenCV installation any more!

Before you start, you should try and uninstall any OpenCV packages that may have come with your distribution of Debian. Raspbian and actually comes with a version installed that's not ideal.


```bash
sudo apt-get purge libopencv*
```

Once done, install OpenCV.

```bash
pip3 install opencv-python

pip3 install opencv-contrib-python
```

Done!

Don't believe it, fire up Python 3 shell and run the following

```bash
~ $ python3
>>> import cv2 as cv
>>> print(cv.__version__)
3.4.1
>>>
```

You should see the latest OpenCV version which as of today is 3.4.1

_Disclaimer: I am currently doing this on Rasbian Desktop in a VirtualBox VM, if anything is different on Raspbian on actual Pi I shall mention it when I hit it_

## My first open CV program  
Ideally I would like to jump into grabbing images from the camera directly but I haven't configured a camera to work with the VM yet, so maybe next time. For now, here's a static image, being loaded from disk, converted into gray scale and saved back to disk.

```python
import cv2

img = cv2.imread('/home/pi/Pictures/image1.jpg',cv2.IMREAD_GRAYSCALE)
cv2.imwrite('/home/pi/Pictures/image1-grayscale.jpg', img)

```

That's easy right?  
- Import Open CV
- Image Read as grayscale
- Write image


## References

The goto reference for Python and OpenCV is the site by [Adrian](www.pyimagesearch.com). While brilliant, it maybe a little confusing if you are starting from zero like me.

I found [pythonprogramming.net](https://pythonprogramming.net/loading-images-python-opencv-tutorial/) an easier place to start.

Also don't forget the official [Open CV documentation](https://docs.opencv.org/trunk/d6/d00/tutorial_py_root.html)

## Update June 12, 2018
I figured out that if you install OpenCV using wheels you should uninstall libraries that came with the Debian installation first. So I've updated the instructions above to make it unambiguous.
