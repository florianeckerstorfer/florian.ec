---
permalink: blog/on-file-management/
title: On File Management
date: 2021-11-14
category: Productivity
tags: [productivity, file system]
description: "I use just three folders to store all my files: Inbox, Workspace, and Archive and use a bit of automation to keep the mental burden of storing files low and use search to access files."
---

## Part 1: The Mess I Created

A few years ago I had to declare bankruptcy on my file system. Up to this point I had sorted all my files into a complicated hierarchy of folders: folders with sub-folders with sub-folders with sub-folders with sub-folders. You get the gist. Every time I created a new document, downloaded something, or wanted to permanently store an email attachment, I had to make a lot of tiny decisions which folder, which sub-folder, which sub-sub-folder is the one correct place for this file.

When I was later looking for that file I had to retrace my thoughts on where I might have put it. For my most commonly accessed files this was easy to do, but still involved a lot of clicks or keyboard commands to get there. Less accessed files became increasingly hard to find just by navigating through the hierarchy of my file system. Instead I was starting to give my files proper names and use Spotlight to find them. 

I reached the point where I was using precious mental energy to make many tiny decisions on where to place a file, but I only ever accessed these files through Spotlight searches. Why was I putting all that energy into sorting my files into a system of organisation when I was not using that system to access them?

## Part 2: A New Start
Fuck it. Instead of hundreds of folders I created three brand new folders:

* Inbox
* Workspace
* Archive

*Inbox* holds all incoming files that I haven’t look at yet. Receipts saved from emails, photos sent through IM and so on.

*Workspace* is the place to put files I am actively working on. Some files are in this folder temporarily (a design I'm currently working on) and move into *Archive* after I finished the project, while other stay in this folder permanently (the spreadsheet where I keep track of my finances).

*Archive* contains files for digital eternity. Presentations I already gave, old receipts, etc.

All of these folders are synched to the cloud, which allows me to access them from all my devices. I used Dropbox in the beginning (when it still was just a folder that syncs), but now I have great success with iCloud Drive. There were a bunch of other services in between those two.

One thing I learned about folders in the process is that there is a limit of how many files you can put into a folder. Especially when you want to sync them. Therefore there is actually one folder per month in *Archive*.

The first step to make this system work for me was to give files good names. For example, receipts follow the schema `CompanyName Receipt YY-MM-DD` , pictures of me that I use as an avatar `florian-avatar-july-2020`.

I spent a lot of time for the initial migration to make sure that files have good names, however, I focused my efforts on the parts of my file system that I knew I would need to access frequently. Most of the initial filing into the monthly subfolders of *Archive* was done by a script and the last modified date of the file.

## Part 3: Exceptions Make Rules Work

To be honest, not all of my files are in these three folders. Every good rule needs exceptions.

The biggest one is code: source code is not particularly well suited to be stored in a cloud folder, especially if it is a JavaScript project with lots of dependencies in `node_modules`. Therefore I have a *Development* folder outside of iCloud Drive that holds all my source code. However, when I retire a project and plan to no longer work on it, I zip the folder and move it into *Archive*.

Another exception is music. For most of the time I used the system I listened to music via Apple Music, but I still have a lot of MP3. Ripped CDs, digital versions when I buy vinyl, or music that is not available on streaming platforms and I therefore bought. I keep the canoncial copy of these files in a *Music* folder in iCloud Drive, mostly because iTunes Match keeps messing up.

Then there are notes. Over the years I used many different systems to take notes and organise them: Notes (from Apple), [Bear](https://bear.app), [Drafts](https://getdrafts.com), and others. At some point I switched to a more formal knowledge management system: [DEVONthink](https://www.devontechnologies.com/apps/devonthink), [Craft](https://www.craft.do), and now [Obsidian](https://obsidian.md). Therefore the number of documents (Pages, Markdown or plain text) that are stored directly in the file system has gone down over the years, but I still have many other types of files for which my three folder system works great. I still use Drafts as place where text starts, but it is only a convinient temporary holding place and the text will move to a note in Obsidian or a file in my *Archive*.

## Part 4: Automate the Hell Out Of It

Like any other system of organisation my three folders requires some discipline to keep them tidy. I have a repeating task in [Things](http://culturedcode.com/things/) to review files in *Inbox*, which includes giving them proper names and moving them into either *Workspace*, *Archive*, or into one of my exception folders. This is a very low-tech automation, but necessary to not get lazy with manually cleaning up.

The next automation is in the form of a couple of helpers to move files into the correct place. I use an app called [Service Station](https://servicestation.menu) to add items to the Finder context menu:

- Move to Inbox
- Move to Workspace
- Move to Archive

The *Move to Inbox* and *Move to Workspace* scripts are identical, they take a list of files and move them into the *Inbox* or *Workspace* folder respectivly:

```applescript
on serviceStationDidSelect(targetedURL, selectedItemURLs, menuKind)
	set targetDir to "/Users/fec/Library/Mobile Documents/com~apple~CloudDocs/Florian/Inbox"
	set sourceFiles to my theSplit(selectedItemURLs, ",")
	
	tell application "System Events"
		repeat with i from 1 to number of items in sourceFiles
			set sourceFile to (item i of sourceFiles)
			move sourceFile to (targetDir)
		end repeat
	end tell
end serviceStationDidSelect

on theSplit(theString, theDelimiter)
	-- save delimiters to restore old settings
	set oldDelimiters to AppleScript's text item delimiters
	-- set delimiters to delimiter to be used
	set AppleScript's text item delimiters to theDelimiter
	-- create the array
	set theArray to every text item of theString
	-- restore the old setting
	set AppleScript's text item delimiters to oldDelimiters
	-- return the result
	return theArray
end theSplit
```

The *Move to Archive* script has an additional step. I can select if the files belongs into the archive of the current month, previous month, or next month. Since I clean up my *Inbox* and *Workspace* on a weekly basis I rarely need to put a file into the archive of another month. Here is the script:

```applescript
on serviceStationDidSelect(targetedURL, selectedItemURLs, menuKind)
	set theCurrentMonth to (do shell script "date +'%Y-%m'")
	set thePrevMonth to (do shell script "date -v-1m +'%Y-%m'")
	set theNextMonth to (do shell script "date -v+1m +'%Y-%m'")
	
	set theMonthChoices to {theCurrentMonth, thePrevMonth, theNextMonth}
	set theMonth to choose from list theMonthChoices with prompt "Move into the following Archive:" default items {theCurrentMonth}
	
	if theMonth is false then
		return
	end if
	
	set targetFolder to "/Users/fec/Library/Mobile Documents/com~apple~CloudDocs/Florian/Archive/" & theMonth
	
	set sourceFiles to my theSplit(selectedItemURLs, ",")
	
	-- Create month folder if it does not exist
	set targetFolderPosix to POSIX path of (targetFolder as text)
	do shell script "mkdir -p " & quoted form of targetFolderPosix
	
	-- Move all selected files into target folder
	tell application "System Events"
		repeat with i from 1 to number of items in sourceFiles
			set sourceFile to (item i of sourceFiles)
			move sourceFile to (targetFolder)
		end repeat
	end tell
end serviceStationDidSelect
```

Lastly, I use [Hazel](https://www.noodlesoft.com) to move files automatically without me intervention. For *Inbox* I have two rules configured in Hazel:

- If the file name ends with a date (in `YYYY-MM-DD` format), move the file into the sub-folder of *Archive* for that date.
- If the file has not been modified in over a quarter, move the file into the sub-folder of *Archive* for the modified date.

Files in *Workspace* are moved according to this one rule:

- If the file has not been modified in over a year, move the file into the sub-folder of *Archive* for the modified date.

## Conclusion

I use this system for many years now and I'm very happy with it. I need to use very little mental energy when storing a file in my file system and search has gotten good enough that I never have a problem finding a file again. Good naming helps a lot with that, but in a pinch full-text search comes in handy. While this often means looking through a long list of files, it happens rarely enough to not be a problem. Automation helps reduce the effort in putting the files in the correct place. Repeating tasks are an easy way to keep me on top of manual organisation tasks.

The important learning for me was that I need to store a lot more files than I need to access on a regular basis. My three-folder system is a great way for me to reduce the effort of storing files, while still making them accessible through search. Current and regularly used files are even more accessible because I can always find them in *Workspace*.