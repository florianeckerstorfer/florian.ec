---
permalink: blog/last-fm-apple-music-2021/
title: Last.fm and Apple Music in 2021
date: 2021-03-20
category: Apple
tags: [apple music, last.fm, music, streaming]
description:
---

In 2015, shortly after Apple Music came out I [wrote an article about Apple Music and scrobbling to Last.fm](/blog/apple-music-last-fm-scrobbling/) and I still get occasionally questions about it. To celebrate the 15th anniversary of [my Last.fm account](https://www.last.fm/user/feredir), I thought it might be time to revisit the topic.

## Mac OS

Back then scrobbling worked on the Mac for music you have added to your library, but songs that you played directly from Apple Music were not scrobbled. This was caused by Apple not exposing these streamed songs as the currently playing song in the AppleScript API, which in my experience most scrobblers use to find the currently playing track in Music.app (née iTunes). Apple has fixed this a couple of years ago and in my experience everything you play in Music.app is now exposed through AppleScript and therefore scrobbled.

For the last couple of years I have used the [official Last.fm Mac app](http://www.last.fm/download) to scrobble the music I play through Music.app.

## iOS

Things are a lot more different on iOS. In 2015 we had to use apps that detected the songs played in the Music app on iOS and scrobble them to Last.fm. While this worked, it worked not very well. Apple has introduced [MusicKit](https://developer.apple.com/musickit/), which allows third-party developers to create Apple Music clients and some of them integrate Last.fm as well.

[Soor](https://apps.apple.com/us/app/id1439731526) and [Marvis](https://apps.apple.com/us/app/marvis-pro/id1447768809) are two great third-party Apple Music clients and I switch between the two of them occasionally. In addition to Last.fm scrobbling, both Soor and Marvis better align with my expectations to a music app, compared to Apples Music app. For example, I only care about two of the five items in Musics main navigation (Library and Search), while Soor and Marvis focus much more on listening to music that you have added to your library.

Bonus: Since the release of iOS 14 both Soor and Marvis contain beautiful widgets that shows your currently playing song on your homescreen.

![Marvis widget on iOS 14 homescreen](/blog/2021-03-20-last-fm-apple-music-2021/marvis-homescreen.png)

🎸
