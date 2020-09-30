---
permalink: blog/save-safari-session/
title: 'Save Current Safari Session with AppleScript'
date: 2015-07-02
category: Automation
tags: [applescript, 'mac os', automation, safari]
---

John Gruber was guest at the latest episode of [Mac Power Users](http://www.relay.fm/mpu/264) and towards the end he talked with hosts Katie and David about his workflow and some of the scripts, AppleScript and otherwise, he uses. John posted one of these, an AppleScript allows him to retrieve all open URLs from Safari, present them in a list and insert one of them in the current text field to [Gist](https://gist.github.com/gruber/90bb418dcab16ded7630).

In addition John uses an AppleScript to save the URLs of all pages open in Safari into a text file, grouped by window. He did not post this one, but it was easy enough for me to recreate it.

The script needs to do two things, first gather all the URLs and format them in a string and then save this string to a file named with the current date and time. As you can see working with dates is a little bit messy in AppleScript, but the result works quite well.

```applescript
--- Gather the URLs of all open tabs
tell application "Safari"
    set _urls to URL of every tab of every window
end tell

--- Create a string that contains all URLs, grouped by window
set _content to ""
repeat with _window_urls in _urls
    repeat with _url in _window_urls
        set _content to _content & "
- " & _url
    end repeat
    set _content to _content & "
"
end repeat

--- Create a string with the current date and time
set the_mon to month of (current date) as integer as string
if (count characters in the_mon) = 1 then set the_mon to "0" & the_mon
set the_day to day of (current date) as string
if (count characters in the_day) = 1 then set the_day to "0" & the_day
set the_hour to time string of (current date) as string
set the_date to (year of (current date) as string) & "-" & the_mon & "-" & the_day & " " & the_hour

--- Save the string to a folder in Dropbox
set _filename to the_date & ".md"
do shell script "/bin/echo -n " & quoted form of _content & " > $HOME/Dropbox/Documents/Tabs/" & quoted form of _filename
```

I use [Keyboard Maestro](http://www.keyboardmaestro.com/main/) to assign a hotkey to the script and invoke it whenever I want to save all currently open URLs.
