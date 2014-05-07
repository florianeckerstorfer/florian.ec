---
title: Create a keyboard shortcut to queue songs in Spotify on OS X
tags: [ bettertouchtool, osx, spotify ]
---

I spent the last hour trying to set the easiest and most reliable way to create a keyboard shortcut for Spotifys *Add to Queue* functionality on OS X. Since I found no solution for this I decided to post it here.

*Update June 14, 2013: In the last update Spotify moved __Queue__ in the context menu from the second position to the 6th. I updated the article accordingly (but not the screenshot).*

There is no menu bar entry for this functionality in Spotify and therefore no way to use an ApplyScript. I had to simulate mouse clicks to get this done. There exists a range of different tools to set keyboard shortcuts, but I personally prefer [BetterTouchToul](http://www.bettertouchtool.net) from Andreas Hegenberg.

[![BetterTouchTool](/img/spotify-queue-keyboard-shortcut/bettertouchtool-800.png)](/img/spotify-queue-keyboard-shortcut/bettertouchtool.png)

In the main BetterTouchTool window you first need to add *Spotify* to the list of applications. Just press the small plus button in the bottom of the list. I created two shortcuts. One for adding all tracks in the current view to the queue and another one for adding all currently selected tracks to the queue.

Let's first create the shortcut for adding all tracks in the current view to the queue. Manually we would first press **Cmd+A** to select all tracks, then click the right mouse button and select the second entry from the context menu. We need to create a new shortcut by pressing the *Add New Shortcut* button in the lower right corner. Define your favourite shortcut to it (I mapped the CAPSLOCK key to Crtl+Option+Shift+Command[^capslockkey] and used **CL+Q**) and set *Trigger Other Keyboard Shortcut* to **Cmd+A**. Click *Attach Another Action* and set *Trigger Prefefined Action* to *Rightclick*. Next we need to attach <strike>two</strike> six more actions that <strike>both</strike> all should trigger the *Down* key. The last action we need to attach is the *Enter* key.

The shortcut to add only the selected songs to the queue is very similar, just set the shortcut to trigger *Rightclick* instead of *Cmd+A*.

*Please note that the mouse has to be hovered over the selected songs when triggered the shortcut.*

Feedback to this article is welcome and especially appreciated if you know how to improve these shortcuts to also work without hovering the mouse over the selected songs. Please [email](mailto:florian@eckerstorfer.co) me or contact @Florian_ on [Twitter](http://twitter.com/Florian_).

[^capslockkey]: [A useful Caps Lock key - BrettTerpstra.com](http://brettterpstra.com/2012/12/08/a-useful-caps-lock-key/)
