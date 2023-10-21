---
title: 'Build Your Own Router With pfSense'
excerpt: 'All it takes to build your own powerful router is an old computer and a network card'
coverImage: '/assets/blog/build-your-own-router-with-pfsense/cover.jpg'
date: 2022-04-22T05:35:07.322Z
author:
  name: Eli Connelly
  picture: '/assets/blog/authors/eli.jpeg'
ogImage:
  url: '/assets/blog/build-your-own-router-with-pfsense/cover.jpg'
published: true
---

Building your own pfSense router can feel like a big undertaking, but it does not have to be.
All it takes is an older computer with a built-in ethernet port and a network card.
In my case, I ended up buying an old HP desktop PC and a 10Gb network card with two ports.
In this post, I will go over my hardware and pfSense settings to create the best router I have ever owned.

My ISP recently updated my line to 10Gb, but the hardware to support that speed is difficult to come by and expensive when you can find it. 
The 1Gb limit of my hardware felt like a challenge. I wanted to see if I could take full advantage of my Internet speed without 
spending thousands of dollars. This setup definitely costs more than a traditional router, but it offers a lot of advanced features.

# The Hardware
This all starts with a cheap HP desktop computer. It is running a 7th generation core i5 processor. The router itself 
does not need much memory. I bought a computer with 8 Gb of RAM and a 1 TB SSD.

# The Software
You can download pfSense for free from [pfsense.og](https://www.pfsense.org/). Installing it requires a spare flash drive
for booting into