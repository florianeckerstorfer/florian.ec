---
permalink: blog/webclerks-2019/index.html
title: Recap of Webclerks Community Conference 2019
date: 2019-12-04
tags: [webclerks, conference]
category: Development
description: My recap of the first Webclerks Community Conference, that happened on November 25, 2019 in Vienna, Austria
---
On Monday, November 25, I attended the [Webclerks Community Conference](https://webclerks.at) in Vienna and I wanted to give a short recap of this excellence conference. With nine speakers and two lightning talks during lunch break this was a packed conference with a good mixture of technical, inspiring and philosophical topics.

## Jeremy Keith - Building

[Jeremy Keith](https://adactio.com) started the day with a talk about the words and concepts we in the web community took from other disciplines such as architecture or engineering. Jeremy also took a look at the [pace layers](https://en.wikipedia.org/wiki/Shearing_layers) of the web. TCP/IP is the basis at the bottom, a technology that did not change at all. HTTP sits on top, it changes very slowly. Next comes HTML, which evolves also very relatively slowly. CSS changes more often, but less often than the JavaScript ecosystem (Jeremy calls it JS+). In the JS+ layer things change very often, for example, we experimented with the best ways to embed responsive images in websites. Once we have established a system, the concepts moved down into the HTML layer and they will most likely not change in a very long time now.

The advantage of this layered approach is that once something settles in a bottom layer it does not change anymore, our code will work for a very long time. Browsers can still render websites from two decades ago.

What I took away from this Jeremys talk is that we should always start with the foundation. We should markup our content with semantic HTML, then add styling with CSS and additional functionality with JS on top. When we build a solid foundation the content will be accessible for a very long time.

## Lisa Gringl - Dark UX Pattern

[Lisa Gringl](https://twitter.com/kringal) talked about [Dark UX Patterns](https://www.darkpatterns.org). There is a different between anti patterns, when an inexperiences UX designer creates an experience that is bad for both the user and the company and Dark UX, when an UI is designed to confuse and trick a user into doing something that does not benefit them.

Lisa also walked us through examples of Dark UX and about the consequences. Mostly, Dark Patterns work only in the short-term, since you trick your users into something they will not become loyal customers. Her point was that in the long-term Dark Patterns are bad for your business.

I have to say here that I agree only partly with the last point. In my experience this does not apply to all industries. Most prominently Dark Patterns work very well in the tourism industry, that is why so many of the famous examples of these patterns from hotel booking sites and air travel search engines. My best guess is that people only go on vacation once or twice every year, after a few months most people forget the bad experiences they had on a site and use it again if they think they can get a great deal there.

## Max Böck - Rage Against the Content Machine

In the third talk of the day [Max Böck](https://mxb.dev) talked about the [Indie Web](https://indieweb.org). This topic is of course right up my alley, since I am a big fan of owning your own website and not giving all your content to big Silicon Valley cooperations. Max specifically talked about how we can use RSS, [Micropub](https://www.w3.org/TR/micropub/) and [Webmention](https://www.w3.org/TR/webmention/) to implement the most essential features of social media on our indie websites. So yes, this talk was also a bit of a kick in the butt to finally implement all of this stuff on my website.

## Heydon Pickering - Why Every Interface Should Be Black & White

[Heydon](https://www.heydonworks.com) likes to be controversial. He explained in this talk why every layout he created in the last couple of years is only black and white. Black and white has a great contrast and when you don't have color at your disposal it sparks your creativity to find a solution that does not require colours.

Absolutely uncontroversial is his point that Nazis are bad and that you should not work for Nazis. Agreed.

Heydons talk was a lot of fun. He also wants you to underline your links and I agree once again.

## Che Harvey - Stakeholder-Centric Design

Che talked about how to navigate corporate politics as a designer when joining a new company and how to make a name for yourself in a new workplace. This talk was not super interesting for me since I have over ten years of experience navigating office politics, but Che was a first time speaker and did a great job to get his ideas over.

## Rachel Andrew - Does It Work? Using The New CSS Layout

[Rachel Andrew](https://rachelandrew.co.uk) is one of two acceptable answers to the question "How can I best learn CSS Grid?" (the other one is [Jen Simmons](https://jensimmons.com)). Here Rachel talked about the history of creating layouts on the web (tables, floats) and the current state of the art ([Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout), [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) and [columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns)). First of all asking whether to use Flexbox or CSS Grid is a terrible question. You should use what works for your use case. If it works, it is a good solution. But you should learn and understand how layouts work in CSS and not just copy snippets, because if you know how it works you can better decide whether Flexbox, CSS Grid or columns are the right solution for you.

## Charlie Owen - I'm just an Old Guard Dev in a New Guard world

[Charlie](https://www.sonniesedge.net) took a walk down memory lane and talked about the good and the bad (but mostly the bad) of how we created websites in the 90s and which of these things are better now. But some things are also worse. And that Flash was somehow very cool. And we should be allowed to miss Flash sometimes.

It also made me remember [how we did Ajax before `XMLHttpRequest`](https://micro.florian.ec/2019/11/26/after-charlie-owens.html).

## Remy Sharp - Using a modern web to recreate 1980S horribly slow and loud loading screens

This was a bit crazy. [Remy](https://remysharp.com) decided to recreate the most fun thing from his childhood, the loading screen of the [ZX Spectrum](https://en.wikipedia.org/wiki/ZX_Spectrum), with JavaScript. So basically the ZX stores data on cassettes, so Remy made a web app that can take a photo from his phone, convert it into sound and then transmit it to the ZX over audio. [Here is a video](https://twitter.com/stefankkern/status/1199017722492919810) from when he did that live at the conference.

## Surprise speaker: Vitali Friedman - Bringing Personality Back to the Web

[Vitaly Friedman](https://www.smashingmagazine.com/author/vitaly-friedman/) made a surprise appearance to finish up the conference. He is the co-founder of Smashing Magazine and in his talk he wants to give the web a bit more personality and creativity. The web should be fun and nice, it is boring if every website is just an implementation of [one of two layouts](https://twitter.com/jongold/status/694591217523363840).

## Conclusion

Webclerks was the first conference organised by [Manuel Matuzović](https://www.matuzo.at), [Claudia Laber](https://twitter.com/claudia_laber), [Daniel Lechthaler](https://twitter.com/lctdnl) and [Max Böck](https://mxb.dev) and it was very well organised. Besides the excellent talks there was coffee, snacks and an excellent (and fully vegan) lunch from [Speisen ohne Grenzen](https://www.speisen-ohne-grenzen.at).

I left the conference very exhausted, but also inspired, full of new ideas and also a bit humbled. 👍

On the Webclerks blog they also have a [recap with slides from all talks](https://webclerks.at/blog/recap-webclerks-conference-2019/).
