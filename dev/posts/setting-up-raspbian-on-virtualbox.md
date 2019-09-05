{{{
  "title": "Setting up Raspbian Desktop VM on VirtualBox",
  "tags": ["Raspbian","VirtualBox", "devenv"],
  "category": "Devops",
  "date": "30-August-2019",
  "author": "Sumit Kumar Maitra"
}}}

The RaspberryPi is a tiny and diminutive computer, but I often cannot carry it with me on places like trains for daily commute. In such scenarios it is nice to have the Raspbian Desktop available handy for quick experiments.

Setting up the VM is pretty easy
- Download iso from [official site](https://www.raspberrypi.org/downloads/raspberry-pi-desktop/)
- Create new Machine with whatever configuration you like on VirtualBox (I try to keep it as close as the RaspberryPi I am trying to mimic as possible with respect to RAM and Disk size)
- Load iso file as storage option
- Start machine and select "Install" when the LiveCD loads
- Follow the GUI and done shortly.
- Update system (either using GUI or `sudo apt-get update` followed by `sudo apt-get upgrade`)

## Setting up Virtual Box guest additions
While your Raspbian is ready to use now, you'll see it is an annoying default resolution that you can't change. Wouldn't it be awesome if it could take up the entire screen natively without scaling? To do this you need to install what VirtualBox calls Guests additions.

Guest Additions are offered as an iso image that VirtualBox will load for you from the "Devices" menu. You should see a menu item call "Insert Guest Additions CD image". Click on the menu item to load the image.

- Raspbian will report a removable media has been loaded and ask if it is okay to open it using File Explorer. _Say OK_.

- Open a Terminal window and navigate to the CDROM folder.
```sh
cd /media/cdrom0
```
_Note: I am reporting this for VirtualBox 6, I see two CDROM drives `/media/cdrom` or `/media/cdrom0` and I was able to run this from cdrom0, your mileage may vary._

- Prerequisites: Install the headers for your version of Linux, the VirtualBox installer might need these for doing some post install compilation work.

    ```sh
sudo apt-get install linux-headers-$(uname -r)
    ```

- Run the .sh script
```sh
sudo sh VirtualBoxLinuxAdditions.run
```

- Once this finishes it will ask you to reboot
```sh
sudo reboot now
```

Once the VM reboots you should have a full screen desktop experience ready for use.

### Other settings
- Enable 3D Acceleration in the VM's Display settings and give it about 128Mb or RAM

I wrote this down mostly for myself, because I spend way too much time running circles on exact configuration required. I'll come back and update it if I find I missed something the next time.
