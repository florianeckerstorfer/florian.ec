---
permalink: blog/sticky-notes-ios-lockscreen/
title: Create Sticky Notes on iOS Lockscreen with Drafts
date: 2020-01-31
tags: [ios, pushcut, drafts]
category: Productivity
description: Using Pushcut I wrote a script to put notes from Drafts on the iOS lockscreen.
---

<video src="/blog/2020-01-31-sticky-notes-ios/drafts-pushcut-notification.mp4" loop autoplay muted>
{% responsiveImg '/blog/2020-01-31-sticky-notes-ios/drafts-notification.png', 'Pushcut notification is appearing on the lock screen saying Create Sticky Notes in iOS Lock Screen with... I am using Pushcut to send notes from Drafts to my iOS lock screen.' %}
</video>

Sometimes I put a post-it note on the back of my phone with I bit of information I need quick access to. Yesterday I was in one of the situations and I had the text already in a Drafts note. Therefore the note is already on my phone, but to view it I have to unlock my phone, go to the homescreen, open [Drafts](https://getdrafts.com), look for the specific note and open it. I would prefer if I could just glance at my phone and view my note.

I remembered that I recently downloaded [Pushcut](https://www.pushcut.io) on my phone. Pushcut is an iOS app that allows you to create notifications based on certain triggers, which in turn can have actions associated with them. Besides it being very well integrated with Shortcuts it also provides you with a *Webhook URL*. Since I am writing my notes in Drafts I can create an action that calls the *Webhook URL* and trigger a notification.

The first step is to create a new notification in Pushcut, we just need a name and then press *Save*. Once we have saved the notification we can copy the *Webhook URL*. Pushcut has a [pretty good documentation for their API](https://www.pushcut.io/support.html), which tells us that we need to send a `POST` request to the webhook URL and send the title and text of the notification.

Since we now have the Webhook URL we now can create a new action in Drafts (I am using the Mac version, but this should also work on iOS) and add a *Script* step.

![Screenshot of Drafts Edit Action Screen, the depicted code is shown below](/blog/2020-01-31-sticky-notes-ios/drafts-script.png)

Drafts provides a pretty nice API to send HTTP requests, so we use it to `POST` the `title` and `text` of the notification to the *Webhook URL*.

```javascript
const http = HTTP.create();
const response = http.request({
  "url": "https://api.pushcut.io/SECRET/notifications/Sticky%20Note",
  "method": "POST",
  "data": {
    "text": draft.content.substring(draft.title.length).trim(),
    "title": draft.title.trim(),
  }
});
```

In addition to be able send a title and text of the notification we can also define actions. We will define an action that opens the note in Drafts.

```javascript
const openDraftsAction = {
  "name": "Open Draft",
  "url": draft.permalink
};

const http = HTTP.create();
const response = http.request({
  "url": "https://api.pushcut.io/SECRET/notifications/Sticky%20Note",
  "method": "POST",
  "data": {
    "text": draft.content.substring(draft.title.length).trim(),
    "title": draft.title.trim(),
    "defaultAction": openDraftsAction,
    "actions": [openDraftsAction],
  }
});
```

That's it.
