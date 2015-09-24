---
title: "The Problem with Online Advertisement"
tags: [ ads, privacy, tracker, advertisement, ad blocker, content blocker ]
slug: the-problem-with-online-advertisement
---
{% block summary %}
On Wednesday Apple released iOS 9 and one of its features is the [WebKit Content Blocker API](https://www.webkit.org/blog/3476/content-blockers-first-look/) which allows developers to create ad and tracker blockers for iOS. Apple did not create an ad blocker themselves, but they gave developers the possiblity to create one and many have done so. I use <del>Peace</del> ([has been pulled from the App Store](http://www.marco.org/2015/09/18/just-doesnt-feel-good)) by [Marco Arment](http://marco.org), but I have also heard good things about <del>Crystal</del> ([Crystal now whitelists ads from companies that pay](http://www.wsj.com/articles/propelled-by-apple-ad-blocking-cottage-industry-emerges-1443115929)). While many people want to use this apps to get rid of ads, I want to reduce the amount of tracking I am exposed to. In this article I am going to explain how you can be tracked on the internet and why it is a problem.
{% endblock %}

{% block content %}
There are many ways to track users across the web, and I want to begin with the most basic one. When you open a website in a browser or when an app you are using is talking to a server the data is most likely transferred over the HTTP protocol (or HTTPS if it is a secure connection). If you are reading this article right now in a web browser you leave something like this on my server:

```
42.42.42.42 - - [17/Sep/2015:18:10:29 -0400] "GET /articles/thoughts-on-apple-music/ HTTP/1.1" 200 3190 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9"
```

The interesting parts, from a privacy perspective are the IP address (the first part) and the user agent (the last part).  In the example above the IP address is `42.42.42.42` (obviously not my real one), which is the internet address of my computer (or of my home network). The user agent is an identifier of my browser, each browser and each version has its own user agent. There is a [massive amount of different user agents](http://useragentstring.com/pages/useragentstring.php). Because user agents are different based on the operating system you are using, the browser, the version of the browser and sometimes even the plugins you have installed it is possibly to identify people soley on their user agent. The Electronic Frontier Foundation (EFF) has done some research on [user agent tracking](https://www.eff.org/deeplinks/2010/01/tracking-by-user-agent) in 2010.

At this point I should mention that by identifying I don't mean that they know your name, it just means that if you access the site a few days or weeks later they can recognize that you are the same person.

Addtionally if you are running JavaScript on a site you can extract even more information. For example, the `Screen` object in JavaScript contains information about your display, which includes the size of your screen and the pixel density. You can also retrieve the width and the height of the browser window. Combining all these types of information, IP address, user agent, screen sizes and so on you can be identified within a pretty large group of people already and we haven't even started with cookies yet.

Cookies are key-value pairs that a site can leave in your browser. When you visit the same site later it can read the value from the cookie it had written before. This is pretty useful, without the concept of logging into a website would not work. But this technique can also be used to track users across a long time span.

All these techniques described above are useful to develop websites, a web server can't send us the page we requested if it does not know our IP address, without cookies it would not be possible to create websites that require a login and the information about our screen and browser are useful to developers to create a better user experience. But the thing is, a website can include arbitrary resources from other servers. This can be either images, styles, or JavaScript code. And these scripts get access to the same information than the main websites you visited.

Well, expect cookies, because for a few years now most browsers block so called *third party cookies*, which means that now only the website you are visiting can set a cookie, not images, stylesheets, and scripts that are loaded from a different server. However, advertising is a shady business and advertisers and tracking companies always try to find bugs and tricks to circumvent this. Not only the shady ones, even Google does it. Examples [here](http://9to5mac.com/2012/02/17/google-reportedly-forcing-advertising-cookies-upon-iphone-users-regardless-of-safari-privacy-settings/) and [here](http://www.rimmkaufman.com/blog/how-redirectors-solve-the-third-party-cookie-problem/24032011/).

The problem I have with advertisement and tracking companies is that they are everywhere. I can absolutely live with the fact the website I am visiting is knowing which pages I access, but the problem is that the same ad servers and trackers are included everywhere and if these companies can get enough identifying data from your browser they can track your browsing history quit accurately. They chould know which food you like, if you have financial probems, if you are looking for a partner, and, of course, what kind of porn you like. I am also a little bit scared that some governments have deals with these companies and got a backdoor for this information. Ever since Snowden you can never know. Some may just have some pretty weak security and hackers can get into their servers.

Nowadays we rarely type an URL into the address bar of our browser. Instead we click on links on Facebook or Google and thus we often don't know the site we are browsing to and we don't know which type of trackers they include. And most publishers of content include dozens of them. If you look at news sites or blogs you will often find over twenty differnet third party resources. [The Verge](http://theverge.com), for example, includes 116 resources from 65 different serves on a single page. Not all of these are trackers or advertisement, but still my information is sent to another server.

Using content blockers does not fully solve this problem, but at least it gives users more control over our data. Currently it looks like that whenever an advertiser is coming to a publisher and saying include this JavaScript on your page the publisher says *yes, of course.* If more people are starting to use ad blockers publishers will need to think about different ways of monetizing their content or about different ways to display advertisement.

**Update September 24, 2015:**
Removed the links to both Peace and Crystal from the article. Peace [has been pulled from the App Store](http://www.marco.org/2015/09/18/just-doesnt-feel-good) and Crystal now [accepts payments from advertises to whitelists](http://www.wsj.com/articles/propelled-by-apple-ad-blocking-cottage-industry-emerges-1443115929) ads. Doesn't feel good to recommend Crystal anymore.
{% endblock %}
