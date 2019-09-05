{{{
  "title": "Setting up PiHole with Virgin Media Hub 3",
  "tags": ["pihole","raspberrypi"],
  "category": "Projects",
  "date": "12-August-2019",
  "author": "Sumit Kumar Maitra"
}}}

After years of procrastination I finally got around to setting up [PiHole](https://pi-hole.net/) on one of the Raspberry Pis that's been running another project. Setting up PiHole is easy... I mean really easy.

```bash
sudo curl -sSL https://install.pi-hole.net |sudo  bash
```

I have added `sudo` at two places making the command slightly different from the official command. If all goes well you should see the installer tick off everything. If you have run the installer second time, you may see some line items not being reinstalled, that's fine.

If you go to the url of the Pi now you should see PiHole Admin page. For example, a freshly baked RaspberryPi with Raspbian host the Pi Hole at
```sh
http://raspberrypi.local/admin
```
That's all there is to installing the Pi Hole. Next the network configuration to make it work seamlessly.


## What is this DNS server hoopla and why does Pi Hole want to be one?
DNS stands for [domain name system](https://en.wikipedia.org/wiki/Domain_Name_System). It is what helps you map the name of a site to the actual IP address of where it is hosted because [piofthings.net](https://piofthings.net) is lot easier to remember than 46.235.225.189 (don't type that into your browser, there are additional things at play but here and this is not the place to explain them ;-)...).

So basically a DNS server translates a name into an IP address, and if it doesn't have the IP address it refers to an upstream DNS server that does it for your DNS server (and so on).

The Pi Hole maintains a giant list of naughty domain names (and other filter criteria) and whenever any computer on your network tries to access anything from the naughty list, instead of looking the actual IP up, simply returns a No Content (this can and does potentially break sites, but mostly ones that host ads and possibly malware).

So the Pi Hole doesn't actually intercept your Internet traffic, merely becomes a telephone directory (who remembers those?) for your computers.

# How do I setup Pi Hole as a DNS server

Well, as all things, depends.

Any WiFi router you have bought yourself, is likely to have a [DHCP server](https://) and DNS server IP Addresses configurable.
