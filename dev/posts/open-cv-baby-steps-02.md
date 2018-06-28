{{{
  "title": "Open CV Baby steps 2: Capturing video frames",
  "tags": ["OpenCV","Raspbian", "RaspberryPi"],
  "category": "Computer Vision",
  "date": "18-June-2018",
  "author": "Sumit Kumar Maitra"
}}}

In the [introductory post](/blog/open-cv-baby-steps-01.md) we saw how to setup OpenCV on a Raspbian (Desktop) and run a small sample application to convert an image into greyscale. Today we'll see how easy it is to capture frames from a camera and write some text on to each frame and save them.

## Connecting to your capture device and reading from it

Assuming you have one camera connected to your computer/Pi you can connect to the device as shown below. Each capture device you have is numbered starting with zero.

```
import cv2

capture_device_index = 0

cap = cv2.VideoCapture(capture_device_index)

```

The VideoCapture(...) function gives you the capture device. Ideally we want to read from the camera until we are told to stop, so we do a ``` while True: ``` loop and ```read``` from the device as shown below.

Outside the while loop, we make sure we release the capture device and the close all the windows that OpenCV created.

```
while(True):
    ret, frame = cap.read()
    frame = cv2.cvtColor(frame, cv2.IMREAD_COLOR)
    height, width = frame.shape[:2]   

    cv2.imshow('frame',frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):        
        break

cap.release()
cv2.destroyAllWindows()
```

 - The ```cap.read()``` call returns a tuple, with a boolean value ```ret``` and the raw frame ```ret```.

 - We convert the raw stream to an image ```frame``` next and tell OpenCV that we want it in colour. If we wanted we could convert to grayscale here using the cv2.IMREAD_GRAYSCALE constant.

 - Once we have the frame, we grab its height and width using the shape helper. We retrieve only 2 of the three possible values (the third value is the alpha channel).

 - Next we show the frame in a windowed form. This call requires your OpenCV version to be the correctly compiled version for your environment because it uses the appropriate Graphics toolkit to generate the system level Window. If your OpenCV wasn't compiled/installed correctly you may have trouble with this line.

 - Finally we ask OpenCV to wait for user keypress. If uses presses ```q``` the capture device is released and the window is closed.

That was easy! Up next we combine our knowledge from previous post and see how we can save a frame to the disk but before that we will do some manipulation directly on the frame.

## Writing to a captured frame and saving it to disk

Before we continue, we go back and import ```time``` and ```datetime``` dependencies because we'll timestamp each frame.

- We grab one of the fonts available in cv2

```
    font = cv2.FONT_HERSHEY_SIMPLEX
```

- In the while loop, we put in another if condition, to check if user pressed `c` to capture a particular frame.  

```
    while True:
        if cv2.waitKey(1) & 0xFF == ord('c'):  
            ...
```

- Before we capture the frame we create a text message. The message is a concatenation of frameIndex (a zero based index declared outside the ```while``` loop and incremented for each frame we save) and a time stamp of the moment we capture the frame.

```
            txt_message = 'Frame: ' + str(frameIndex) + ': ' + str(datetime.datetime.now())
```
- We superimpose the string on the captured frame using the ```putText``` function


```
            cv2.putText(frame, txt_message,(10, height-20), font, 1, (200,255,155), 2, cv2.LINE_AA)
```

- Now we write the image to disk using the familiar ```imwrite``` command and increment the frameIndex

```
            cv2.imwrite('/home/pi/Pictures/recording/frame' + str(frameIndex) + '.jpg', frame)
            frameIndex += 1
```

## The full code listing is as follows

```
import cv2
import time
import datetime

cap = cv2.VideoCapture(0)
start_time = time.time()
frames_per_second = 5
frameIndex = 0

font = cv2.FONT_HERSHEY_SIMPLEX

while(True):
    ret, raw_frame = cap.read()
    frame = cv2.cvtColor(raw_frame, cv2.IMREAD_COLOR)
    height, width = frame.shape[:2]   

    cv2.imshow('frame',frame)

    if cv2.waitKey(1) & 0xFF == ord('c'):  
        txt_message = 'Frame: ' + str(frameIndex) + ': ' + str(datetime.datetime.now())
        cv2.putText(frame, txt_message,(10, height-20), font, 1, (200,255,155), 2, cv2.LINE_AA)
        cv2.imwrite('/home/pi/Pictures/recording/frame' + str(frameIndex) + '.jpg', frame)
        frameIndex += 1

    if cv2.waitKey(1) & 0xFF == ord('q'):        
        break

cap.release()
cv2.destroyAllWindows()
```

# Creating a Timelapse snapshotting program

We can tweak the code slightly to capture snapshots at regular intervals and create a series of images as a time-lapse as follows:

```
import numpy as np
import cv2
import time
import datetime

cap = cv2.VideoCapture(0)
start_time = time.time()    ' Time start
frames_per_second = 5       ' Frames per second
frameIndex = 0              

font = cv2.FONT_HERSHEY_SIMPLEX

while(True):
    ret, frame = cap.read()
    frame = cv2.cvtColor(frame, cv2.IMREAD_COLOR)
    height, width = frame.shape[:2]   

    cv2.imshow('frame',frame)

    now = time.time()       ' Get current time
    if(now-start_time) > (1/frames_per_second): ' If time difference matches FPS
        cv2.putText(frame,'Frame: ' + str(frameIndex) + ': ' + str(now),(10,height-20), font, 1, (200,255,155), 2, cv2.LINE_AA)
        cv2.imwrite('/home/pi/Pictures/recording/frame' + str(frameIndex) + '.jpg', frame)
        frameIndex += 1
        start_time = now    ' Reset timer

    if cv2.waitKey(1) & 0xFF == ord('q'):        
        break

cap.release()
cv2.destroyAllWindows()

```

All I have done is added a wait timer and when it is tripped it uses the same save functionality as our previous program.

That's how easy it is to read from camera. In fact you can read from a video file using the exact same function call, just provide the file name instead. We'll see more of that hopefully later in this series.
