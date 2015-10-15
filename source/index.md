---
layout: default
title: Florian Eckerstorfer
permalink: /
use:
    - articles_tags
    - posts_categories
---

I study **Software Engineering &amp; Internet Computing** and **Innovation** and work as a **Web Developer** in **Vienna**.

{{ picture('/img/florian/florian.jpg', 'Photo of Florian Eckerstorfer') }}

You can find me at numerous social networks and web services, including
    [Twitter](http://twitter.com/Florian_),
    [Pinboard](https://pinboard.in/u:florian.eckerstorfer),
    [Instagram](http://instagram.com/florian_) and
    [Last.fm](http://www.last.fm/user/feredir)</a>.
    You can find code I write on
    [Github](https://github.com/florianeckerstorfer),
    [Packagist](https://packagist.org/users/florianeckerstorfer/),
    [NPM](https://www.npmjs.org/~florianeckerstorfer) and
    [RubyGems](https://rubygems.org/profiles/florianeckerstorfer)</a>.
    I also like to take [photos](http://42reasons.com).

You can also send me an [email](mailto:florian@eckerstorfer.co).

## Highlighted Articles {{page.tag}}

<ul>
{% for tag,articles in data.articles_tags %}
    {% if tag == 'highlight' %}
        {% for article in articles %}
        <li>
            <a href="{{ article.url }}">{{ article.title }}</a>
            <span class="article__header__date">({{ page.date|date('d M Y') }})</span>
        </li>
        {% endfor %}
    {% endif %}
{% endfor %}
</ul>
