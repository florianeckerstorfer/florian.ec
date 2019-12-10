---
permalink: blog/apple-music-last-fm-scrobbling/index.html
title: 'Apple Music and Last.fm: Does it Scrobble?'
date: 2015-07-08
category: Apple
tags: [apple music, last.fm, music, streaming]
---

Ever since Apple announced [Apple Music](https://www.apple.com/music/) at WWDC I was wondering whether it was possible to scrobble played tracks to [Last.fm](http://last.fm). As expected, iTunes on OS X and the Music app on iOS do not directly support scrobbling, but I wanted to see if there are other ways.

In this post I am going to explore third-party apps that allow scrobbling on OS X and iOS and explain when and what will be scrobbled.

## iTunes on OS X

Scrobbling played songs from iTunes always required a third-party application. There is the [official Last.fm Mac app](http://www.last.fm/download), but for the last couple of years I used [Simplify](https://geo.itunes.apple.com/us/app/simplify-for-spotify-rdio/id448003584?mt=12&uo=4&partnerId=11&at=11lSjE). Simplify can scrobble from iTunes, Rdio, Spotify and others and can also display the currently playing song in the menu bar. But does Simplify work with Apple Music? It depends.

It depends whether iTunes reports the currently playing track via AppleScript or not. We can test whether scrobbling works using a small AppleScript

```applescript
tell application "iTunes"
    tell current track to artist & " - " & name
end tell
```

First of all, scrobbling works for everything that is in _My Music_ (that is, your library). It does not matter if the song is stored locally, streamed from iTunes Match, streamed from Apple Music, or a song from Apple Music that was _made available offline_. The same is true for playlists, scrobbling works for you local playlists, as well as _Apple Music Playlists_. But now things get complicated.

Let's take a look at the _For You_ and _New_ sections.

- If you play a song, album, or playlist directly in the _For You_ section it will **not scrobble.**
- If you play from the detail view of a playlist that you previously added to _My Music_ it **scrobbles.**
- If you play a playlist directly from the _For You_ section it will **not scrobble.**
- If you play a song, or album that you previously added to _My Music_ from the detail view it will **not scrobble.**
- If you search for a song, album, or artist and play from the search results it will **not scrobble.**
- Everything in _Radio_, including _Beats 1_ will **not scrobble.**

Basically, only music in _My Music_ and _Playlists_ will scrobble, with the one exception of _saved playlists_.

## Music on iOS

Scrobbling on iOS is a little bit trickier. Again, you need a third-party software. [CloudScrob](https://geo.itunes.apple.com/us/app/cloudscrob-for-last.fm/id467016532?mt=8&uo=4&partnerId=11&at=11lSjE) (€0,99) and [QuietScrob](https://geo.itunes.apple.com/us/app/quietscrob-background-last.fm/id741599377?mt=8&uo=4&partnerId=11&at=11lSjE) (free, with €0,99 In-App purchase), both worked in principal for me, but QuietScrob can run in the background, while you have to open CloudScrob to scrobble to Last.fm. Unlike Simplify on OS X, scrobbling with QuietScrob is not immediate but happes in bulk every 30 minutes (or so).

It looks like the same restrictions as for scrobbling with iTunes and Simplify on OS X apply. However, in addition scrobbling **does not work** when playing an _Apple Music Playlist_.

CloudScrob has not been updated since November 2013, but QuietScrob latest update is from May 20, so there is hope that developers will find ways to scrobble additional methods of listening on Apple Music.

I am [feredir](http://www.last.fm/user/feredir) on Last.fm.

## Updates

- _8 July 2015, 18:15:_ Add note about background scrobbling in QuietScrob
