---
layout: default
title: Florian Eckerstorfer
permalink: /
use:
    - articles_tags
    - posts_categories
---

Hello, I am **Florian Eckerstorfer**, I study **Software Engineering &amp; Internet Computing** and **Innovation** and work as a **Web Developer** in **Vienna, Europe**.

{{ picture('/img/florian/florian-2.jpg', 'Photo of Florian Eckerstorfer') }}

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
I also like to take [photos](http://42reasons.com) and love to [travel](/travel) and go to [concerts](/concerts).

You can also send me an [email](mailto:florian@eckerstorfer.co) ([GPG Key](/key.asc)).

## Highlighted Articles

<ul class="frontpage__articles">
{% for tag,articles in data.articles_tags %}
    {% if tag == 'highlight' %}
        {% for article in articles %}
        <li>
            <span class="article__header__date">{{ article.date|date('d M Y') }}</span>
            <a href="{{ article.url }}">{{ article.title }}</a>
        </li>
        {% endfor %}
    {% endif %}
{% endfor %}
</ul>
