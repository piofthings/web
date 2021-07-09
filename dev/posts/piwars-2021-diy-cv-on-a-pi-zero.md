{{{
  "title": "PiWars at home 2021: DIY Computer Vision (CV) on a Raspberry Pi Zero W",
  "tags": ["piwars","piwars-2021"],
  "category": "Robotics",
  "date": "June 28, 2021",
  "author": "Sumit Maitra"
}}}


Having setup the chassis and motor drivers successfully, the first challenge we took up was [Up the Garden Path](https://piwars.org/2021-vpw/challenges/up-the-garden-path/). 

This a variation of the line follow challenge with additional complexity of detecting and selecting right forks to take in the path. There were additional points to be gained for using voice commands to control the bot.

Given our bot was based on a PiZero W we didn't attempt to add voice control at all. We felt any kind of ML library just wouldn't be effective on a general purpose computer like the Pi Zero W. The Pi Pico wasn't in the market yet and when it did arrive we weren't sure if we had the time to experiment and play around with its edge ML features.

We started with [Brian Starkey's talk at PiWars MiniConference 2020](https://www.youtube.com/watch?v=17OTAuuFP_M). This is a brillaint starting point if you want to think in terms of raw image processing and computer vision.

## Camera capture and Thresholding at a fast enough rate in Python

Since Brian's code was in Go, I had to start fresh in Python and start at image capture level. So I started with the [PiCamera documentation](https://picamera.readthedocs.io/en/release-1.13/)

PiCamera's documentation is brilliant and on any other modern Raspberry Pi, it would have done sufficiently well enough to be used as is. However on a RaspberryPi Zero I really struggled with framerates.

### To Numpy or not to Numpy is the question


I was frankly at my wits end and actively considering switching to Go for atleast the capture bit, with the following code. It was almost exactly the same as the documentation, and yet I would get only 3-5 frames per second.  


<pre>
<code class="language-python">

# To Slow don't copy paste, only for demo purposes
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import os
import sys
from struct import *
import array
import numpy as np

class Thresholding:
        __width = 0
        __height = 0
        __stream = None
        def __init__(self, width, height):
                self.__width = width
                self.__height = height

        def with_stream(self, stream, stretch_contrast=False):
                stream.seek(0)
                # Load the Y (luminance) data from the stream

                Y = np.fromfile(stream, dtype=np.uint8, count=self.__width*self.__height).reshape((self.__height, self.__width))
                return self.with_np_array(Y, stretch_contrast)

        def min_max(self, row, row_width):
                min = row[0]
                max = row[0]
                for r in range(1, row_width):
                        c = row[r]
                        if(c < min):
                                min = c
                        if(c > max):
                                max = c

                return (min, max)


        def with_np_array(self, y_array, stretch_contrast=False):
                #np.set_printoptions(threshold=sys.maxsize, linewidth=1000) 

                (y_height, y_width) = y_array.shape
                thresholded = np.empty((y_height, y_width), dtype=np.uint8)
                r = 0 
                c = 0
                ratio = 1
                for r in range(0, y_height): # y_array:
                        if stretch_contrast:
                                row = y_array[r]
                                (darkest, brightest) = self.min_max(row, y_width)
                                #darkest = np.min(row) #.argmin()
                                #brightest = np.max(row) #.argmax()
                                diff = brightest - darkest #row[brightest] - row[darkest]
                                ratio = int(255/diff)

                        c=0
                        for c in range(0, y_width): #pixel in row:
                                pixel = y_array[r,c]
                                if stretch_contrast:
                                        pixel = (pixel - darkest) * ratio
                                if pixel < 136:
                                        thresholded[r,c] = 1
                                else:
                                        thresholded[r,c] = 255
                return thresholded

        def get_rgb_grayscale(self, stream):
            stream.seek(0)
            Y = np.fromfile(stream, dtype=np.uint8, count=self.__width*self.__height).reshape((self.__height, self.__width))
            U = np.ones((self.__height, self.__width))
            V = np.ones((self.__height, self.__width))
            YUV = np.dstack((Y, U, V))[:self.__height, :self.__width, :].astype(np.float)
            M = np.array([[1.164,  0.000,  1.596],    # R
                        [1.164, -0.392, -0.813],    # G
                        [1.164,  2.017,  0.000]])   # B
            RGBG = YUV.dot(M.T).clip(0, 255).astype(np.uint8)
            stream.seek(0)
            Y = np.fromfile(stream, dtype=np.uint8, count=self.__width*self.__height).\
                    reshape((self.__height, self.__width))
            # Load the UV (chrominance) data from the stream, and double its size
            U = np.fromfile(stream, dtype=np.uint8, count=(self.__width//2)*(self.__height//2)).\
                    reshape((self.__height//2, self.__width//2)).\
                    repeat(2, axis=0).repeat(2, axis=1)
            V = np.fromfile(stream, dtype=np.uint8, count=(self.__width//2)*(self.__height//2)).\
                    reshape((self.__height//2, self.__width//2)).\
                    repeat(2, axis=0).repeat(2, axis=1)
            YUV = np.dstack((Y, U, V))[:self.__height, :self.__width, :].astype(np.float)
            YUV[:, :, 0]  = YUV[:, :, 0]  - 16   # Offset Y by 16
            YUV[:, :, 1:] = YUV[:, :, 1:] - 128  # Offset UV by 128
            # YUV conversion matrix from ITU-R BT.601 version (SDTV)
            #              Y       U       V
            M = np.array([[1.164,  0.000,  1.596],    # R
                        [1.164, -0.392, -0.813],    # G
                        [1.164,  2.017,  0.000]])   # B
            # Take the dot product with the matrix to produce RGB output, clamp the
            # results to byte range and convert to bytes
            RGBC = YUV.dot(M.T).clip(0, 255).astype(np.uint8)
            i=Image.fromarray(np.hstack((RGBC,RGBG)),"RGB")  
            return i
</code>
</pre>

Brian again came to rescue. He deduced `Numpy` array initialisation had an overhead that was slowing things down. I had blind faith in `Numpy` being the fastest way to do array manipulation in Python. All the docs say it is as close to metal you can get with Python code, but no. Turns out using `bytearray` and `memoryview` are orders of magnitude faster than using `Numpy`. I went from 3-4 frames per second to > 25 frames per second when we switched to using `bytearray` and `memoryview`.

I also figured out the importance of CPU cycles when using a low powered computer and stopped writing code as if I was writing a Web Server. As a result, instead of capturing a frame first, then thresholding it in the next step, I decided to capture and threshold (and calculate bot vector) in the same loop. This helped avoid making extra inmemory copies of the frame data. This essentially coupled my `capture` code and `threshold` code fairly tightly, but it was a price to pay for the efficiency gains.

## Capture in YUV, get grayscale image and save as PGM file
The following bit of code encapsulates the following
- Camera initialisation
- Capturing 32x32 frames in YUV format (the PiCamera does the resizing in hardware so it is the fastest you can get)
  - The capture code uses `use_video_port=true` as an additional optimisation for faster capture
- Saves the Y portion that is the grayscale portion of the image (free grayscaling)
- Then it sends off the raw data off the the `Line` processor that manipulates the same frame and applies thresholding to it
- When it comes back from the line follower we convert it to PGM format and save it. PGM format is natively supported in Linux and OSX so you can preview them easily

<pre>
<code class="language-python">
#!/usr/bin/env python3
import picamera
import sys
import os
import warnings
import time
from timeit import default_timer as timer
from datetime import datetime
import traceback

sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), "../models")))

from frame_data import FrameData
from row_data import RowData

sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), "../detection")))

from line import Line

class CaptureThreshold():
    __frame_processor_queue = None
    __camera = None
    __line_processor = None
    __width = 32
    __height = 32
    __framerate = 30

    def __init__(self, queue, width, height, framerate, set_speed):
        self.__framerate = framerate
        self.__frame_processor_queue = queue
        self.__width = width
        self.__height = height
        self.__line_processor = Line(queue, set_speed)
        self.__camera = picamera.PiCamera(resolution='{:d}x{:d}'.format(width, height), framerate=framerate)
        self.__camera.start_preview()
        # Wait for 3s to settle
        time.sleep(3)

    def write_pgm(self, filename, w, h, data):
        with open(filename, 'wb') as f:
            f.write("P5\n{:d} {:d}\n255\n".format(w, h).encode('utf8'))
            f.write(data)

    
    def start_capture(self, threshold, stretch, save):
        data = bytearray(b'\0' * (self.__width * (self.__height * 2)))
        start = timer()
        prev = start
        i = 0
        folderName = "captures/" + datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
        if not os.path.exists(folderName):
            os.makedirs(folderName)

        try:
            for foo in self.__camera.capture_continuous(data, 'yuv', use_video_port=True):
                i = i + 1
                if save:
                    # Save original
                    self.write_pgm("{:s}/grayscale_{:d}.pgm".format(folderName, i), self.__width, self.__height, data)

                self.__line_processor.process_bytearray(data, self.__width, self.__height, threshold, stretch, i)

                if save:
                    # Save result
                    self.write_pgm("{:s}/processed_{:d}.pgm".format(folderName, i), self.__width, self.__height, data)

                now = timer()

            print("{:d} frames in {}, {} fps".format(i, now - start, i / (now - start)))
        except Exception as e:
            print(e)
            traceback.print_exc()



    def stop_capture(self):
        if self.__camera:
            self.__camera.stop_preview()
        # exit(0)


if __name__ == '__main__':
    lineDetector = CaptureThreshold()
    lineDetector.start_capture(32,32, True, True, True)
    timer.suspend(3)
    lineDetector.stop_capture()
    </code>
</pre>

## Thresholding and line following aka the `Line` Processor

Thresholding in this case, is the process of converting  grayscale frame of capture into either black or white so it is easy for us to process and figure out which way we should be going.
The `Line` processor takes the grayscale frame data and applies Thresholding by picking a 'mid-ish' point between 0 and 255. There was an option to do pixel stretching too if required but since we were using a black course with black walls and white lines we were getting fairly consistent results without needing to do Pixel stretching. Refer to [Brian's talk](https://www.youtube.com/watch?v=17OTAuuFP_M) for more about Pixel stretching.

Brian warned me to go easy with division and floating point math on the PiZero so I kept it down to one division operation (for Thresholding without Pixel stretching). The following function in our `Line.py` class did the actual Thresholding. I created a class called `FrameData` to capture additional frame metadata that was sent off to a delegate function that was the hook out of the calculation and back into the main program, where the speed value calculated by `Line` processor was actually converted to values that the Motor driver could use.  

<pre class="line-numbers">
<code class="language-python">
    def process_bytearray(self, data, width, height, thresh=True, stretch=True, index = -1):
        y = 0
        out = []
        frame_data = FrameData()
        frame_data.index = index
        frame_data.width = width
        frame_data.height = height
        self.ideal_center = frame_data.width/2
        average_out=[]
        average_out = [0 for i in range(width)]         
        contiguous_whitepixel_count = [0 for i in range(height)]         

        try:
            while y < height:
                row_white_count = 0
                prev_col_is_white = False
                row_data = RowData()

                row = memoryview(data)[y*width:(y+1)*width]
                if stretch:
                    minval = 255
                    maxval = 0
                    for val in row:
                        if val < minval:
                            minval = val
                        if val > maxval:
                            maxval = val

                    diff = maxval - minval

                    factor = 1
                    if diff != 0:
                        factor = 255/diff

                x = 0
                for val in row:
                    if stretch:
                        val = int((val - minval) * factor)
                    if thresh:
                        if val > 96:
                            val = 255
                        else:
                            val = 0
                        row[x] = val
                    else:
                        row[x] = val

                    average_out[x] = (average_out[x] + val)
                    if( y == height - 1):
                        average_out[x] = int(average_out[x] / height)

                    if val == 255:
                        if prev_col_is_white == False:
                            prev_col_is_white = True
                            row_white_count = row_white_count + 1
                    else:
                        prev_col_is_white = False
                    
                    x = x + 1
                contiguous_whitepixel_count[y] = row_white_count
                row_data.contiguous_whitepixel_count = contiguous_whitepixel_count
                y = y + 1
                out.append(row.tolist())

            if self.__set_speed_func  != None:
                frame_data.rows = out
                self.nomalize_avg(average_out, width)
                frame_data.average_row = average_out
                self.get_shape(height, frame_data, contiguous_whitepixel_count)
                self.calculate_speed(frame_data)
                self.prev_frame_data = frame_data
                self.__set_speed_func(frame_data)
        except Exception as e:
                print(e)
                traceback.print_exc()
</code>
</pre>

## Gathering samples and telemetry
Before I could get on to coding the challenge I needed to see what the bot was seeing. So I created a 'simulation' mode where the bot only captured images but had nothing controlling the wheels. I then manually carried the bot around the track to capture images that it was seeing and saved them as .pgm files. This gave me a good set of data to look at. 

Here is a sample of the regular images vs thresholded images. You can see the whole lot in the source control repository

![[PiWars 2021 - Garden Path from the bots' eyes](/posts/images/pi-wars/2021/sample-images-garden-path.jpg)](/posts/images/pi-wars/2021/sample-images-garden-path.jpg)

Next I built a switch to run my line processor through images captured instead of the camera feed, and do the whole thresholding and steering logic, without needing the bot to be driven around the track. 

I wrote out each bit of information that the Robot saw as as CSV output, written out to the console. Each line was one frame of data.  If required I could redirect the console to a csv file and open it in a spreadsheet app.


The key takeaways from this 

## Detecting forks on the way
