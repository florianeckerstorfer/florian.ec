---
slug: keyboard-maestro-peak
title: 'Keyboard Maestro Nerdery: Peak'
date: 2014-09-28
category: Automation
tags: [keyboard maestro, shortcut, osx, productivity]
---

Most of the time I have too many applications and windows open on my Mac. Even on my 24 inch external display there is not much space left when I have PHPStorm or Sublime Text open and there is less space when I am not at home and only have 13 inches. When I write code or text I regularly look things up in another window, specifications for a feature, an API documentation or some other stuff and therefore I press `Cmd+Tab` very very often. If the information I need to get my work done is in more than one other window this system starts to fail completely.

Recently I caught myself pressing `Cmd+Tab` to get to Safari, then `Ctrl+Tab` to get to the next tab, `Cmd+Tab` to get back into PHPStorm and after a few minutes this process starts again. What I needed was a way to temporarily hide the current top-most window to peak into the background.

In this article I am going to create a **Peak** keyboard shortcut using [Keyboard Maestro](http://www.keyboardmaestro.com) to do exactly this. When the shortcut is pressed the current top-most window is hidden, pressing the shortcut a second time shows the window again. I am going to share not only the code for the shortcut, but also the process on how to create it.

There exist many different applications to manage keyboard shortcuts, but Keyboard Maestro is probably the most powerful one. Compared to the many free alternatives the price point of €30 for KM looks quite hefty, but it has many unique features, such as variables, loops and conditionals. This means that you can add states to your shortcuts, which is a lot more powerful than it sounds at first glance. Without support for these features, and the great AppleScript support, I would not be able to implement the **Peak** shortcut.

But let's get started.

The main problem I encountered when I started working on the shortcut was that the first invocation hides the window and I don't have a way to retrieve the previously active window when activating the shortcut the next time. Therefore I need two states, either I am currently "peaking", that is, a window is currently hidden or I am not peaking and no window is hidden. Since the macro editor in Keyboard Maestro is in part visual I am going to post pseudo code for now.

```
if peakStatus is not "hidden" then
    PeakAppName = name of topmost application
    PeakWindowName = name of topmost window of application PeakAppName
    hide window PeakWindowName of application PeakAppName
    PeakStatus = "hidden"
else
    show window PeakWindowName of application PeakAppName
    PeakStatus = ""
end if
```

In Keyboard Maestro there exists no way to determine the name of the top-most application or the name of the first window of an application. But I can use AppleScript to get these values and Keyboard Maestro allows me to assign the return value of an AppleScript to a variable and that's what I am going to do.

```applescript
tell application "System Events"
    set frontApp to first application process whose frontmost is true
    name of frontApp
end tell
```

Getting the name of the first window of the top-most application is a little bit more complicated. First I get the name of the application and then I tell that application to give me the name of first window.

```applescript
tell application "System Events"
    set frontApp to first application process whose frontmost is true
    set frontAppName to name of frontApp
end tell

tell application frontAppName
    name of window 1
end tell
```

However, there are some application that don't return a list of windows (inclding Sublime Text and Spotify) and don't allow to set the visibility of a single window. In this case I am going to hide the complete application instead of just a single window. Therefore I need to replace the `name of window 1` to include a fallback. When I can't the name of the window I store an empty string and later will decide between the two cases.

```applescript
try
    name of window 1
on error errMsg
    ""
end try
```

I now have the name of the application and window and using the _save results to variable_ option in Keyboard Maestro these values are safely stored in a variable. Currently I am still in the _not hidden_ part of the pseudo code and the last piece still missing is the code to actually hide the window. First I retrieve the names of the application and window from KM and then there is a case distinction wether I have the window name. If I have the name of the window I tell the application to hide the window. Otherwise I use _System Events_ to hide the complete application.

```applescript
tell application "Keyboard Maestro Engine"
    set frontAppNameVar to make variable with properties {name:"PeakAppName"}
    set frontAppName to value of frontAppNameVar
    set windowNameVar to make variable with properties {name:"PeakWindowName"}
    set windowName to value of windowNameVar
end tell

if windowName is not equal to "" then
    tell application frontAppName
        set visible of window windowName to false
    end tell
else
    tell application "System Events"
        set visible of process frontAppName to false
    end tell
end if
```

The code in the _hidden_ part of the pseudo code is a little bit easier. The name of the application and window are already stored in a variable and I only have to retrieve these values and show the application. Once again I need to make distinction wether I have the name of the window. If I have the window name I tell the application to show the window, otherwise I use _System Events_ to show the application and then activate it.

```applescript
tell application "Keyboard Maestro Engine"
    set frontAppNameVar to make variable with properties {name:"PeakAppName"}
    set frontAppName to value of frontAppNameVar
    set windowNameVar to make variable with properties {name:"PeakWindowName"}
    set windowName to value of windowNameVar
end tell

if windowName is not equal to "" then
    tell application frontAppName
        set visible of window windowName to true
    end tell
else
    tell application "System Events"
        set visible of process frontAppName to true
    end tell
    tell application frontAppName to activate
end if
```

Creating the macro in Keyboard Maestro now is just a matter of arranging several pre-defined actions. You can find the text version of the macro below or take a look at the [screenshot](http://cdn.florian.ec/DcLAATTF6p5v9w.png) of how it should look like in KM.

```
If All Conditions Met
    The variable ‘PeakStatus’ is not ‘hidden’
    Execute the Following Actions:
        Execute AppleScript
            tell application "System Events"
                set frontApp to first application process whose frontmost is true
                name of frontApp
            end tell
        Save trimmed to variable ‘PeakAppName’.
        Execute AppleScript
            tell application "System Events"
                set frontApp to first application process whose frontmost is true
                set frontAppName to name of frontApp
            end tell

            tell application frontAppName
                try
                    name of window 1
                on error errMsg
                    ""
                end try
            end tell
        Save trimmed to variable ‘PeakWindowName’.
        Set Variable ‘PeakStatus’ to Text
            hidden
        Execute AppleScript
            tell application "Keyboard Maestro Engine"
                set frontAppNameVar to make variable with properties {name:"PeakAppName"}
                set frontAppName to value of frontAppNameVar
                set windowNameVar to make variable with properties {name:"PeakWindowName"}
                set windowName to value of windowNameVar
            end tell
            if windowName is not equal to "" then
                tell application frontAppName
                    set visible of window windowName to false
                end tell
            else
                tell application "System Events"
                    set visible of process frontAppName to false
                end tell
            end if
            Display results in a window.
        Otherwise, Execute the Following Actions:
            Set Variable ‘PeakStatus’ to Text
            Execute AppleScript
                tell application "Keyboard Maestro Engine"
                    set frontAppNameVar to make variable with properties {name:"PeakAppName"}
                    set frontAppName to value of frontAppNameVar
                    set windowNameVar to make variable with properties {name:"PeakWindowName"}
                    set windowName to value of windowNameVar
                end tell

                if windowName is not equal to "" then
                    tell application frontAppName
                        set visible of window windowName to true
                    end tell
                else
                    tell application "System Events"
                        set visible of process frontAppName to true
                    end tell
                    tell application frontAppName to activate
                end if
            Display results in a window.
```

As I am writing this I realise that it would have been a lot easier to just write one long AppleScript instead of using the pre-defined actions to compose several smaller ones. But since I sunk enough time in writing this macro I leaving it this way for now.

If you don't want to retype everything from this article, you can download the macro and import it into Keyboard Maestro: [peak.kmmacros](http://tyrion.florian.ec/peak.kmmacros).
