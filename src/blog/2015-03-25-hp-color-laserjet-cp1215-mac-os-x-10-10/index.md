---
permalink: blog/hp-color-laserjet-cp1215-mac-os-x-10-10/index.html
title: 'Installing HP Color LaserJet CP1215 on Mac OS X 10.10 Yosemite'
date: 2015-03-25
category: Mac OS
tags: [mac os, hp color laserjet cp1215, printer]
---

In 2009 I got a HP Color LaserJet CP1215. Unfortunately this printer is not compatible with OS X. Six years ago I managed to install the printer by using open source tools and drivers. In 2012 I got a new MacBook Pro and needed to install the printer again and I [wrote about the process on my old blog](http://webadventures.at/2012/06/10/hp-cp1215-osx/). Now three more years have passed and when OS X 10.10 Yosemite came out I decided to do a clean install, but I didn't install the printer because I didn't need it. A few month have passed since then and now I needed to use the printer again and thus I had to install it again.

This is part tutorial, part reminder for myself on how to install this fucking printer.

You need GCC to compile C code. In my opinion the best way to get GCC is to install [Xcode](http://itunes.apple.com/at/app/xcode/id497799835?mt=12) from the Mac App Store. In Xcode you have to install the Command Line Tools (Preferences > Downloads > Components).
You also need [Homebrew](http://mxcl.github.com/homebrew/) to install some libraries.
Open a Terminal window and install `wget` and `gnu-sed`.

```shell
$ brew install wget
$ brew install gnu-sed
$ brew install ghostscript
```

[Download](http://www.linuxfoundation.org/collaborate/workgroups/openprinting/macosx/hpijs) and install Foomatic RIP and HIPJS for Mac OS X. The page also includes a download for Ghostscript, but I used Homebrew to install it. The links state that Foomatic RIP and HIPJS are for OS X 10.8, but for me they work fine on 10.10 Yosemite.

Next you need to install `foo2zjs`. Terminal:

```shell
$ wget -O foo2zjs.tar.gz http://foo2zjs.rkkda.com/foo2zjs.tar.gz
$ tar zxf foo2zjs.tar.gz
$ cd foo2zjs
$ make
$ ./getweb 1215
$ sudo make install
$ sudo make cups
$ cupsctl WebInterface=yes
```

Open the CUPS web interface: [http://localhost:631](http://localhost:631)

1. Add a printer by clicking on _Adding Printers and Classes_ and then _Add Printer_. Enter your Mac OS X user name (must be an administrator) and your password.
2. Select the printer (I connected the printer to my AirPort Express and it showed up in the list automatically) and click the submit button.
3. Enter a name and description and submit the form again.
4. Select _HP_
5. Select _HP Color LaserJet CP1215 Foomatic/foo2hp (en)_
6. Click on _Add Printer_
7. Set _Color Mode_ to _Color_ and _Bits Per Plane_ to _2 Bits Per Plane_. **Submit**.

Done.

_Please note that I cannot give support on installing this fucking printer on OS X. If you send me emails about this printer I will ignore them._
