---
title: Kinda like the opposite of regular expressions
date: 2013-10-20T00:00:00.000Z
category: Development
tags: [ library, php, regular expressions ]
path: /kinda-like-the-opposite-of-regexp/
published: true
---

Regular expressions can match a pattern in a text and return the matches. However, what if we want find all texts that would match a given pattern. I created ExpExp, a PHP library, that allows you to do this.

Two years ago I have written a library for a project to generate strings based on a given pattern called ExpExp. ExpExp takes a pattern (a subset of regular expressions) and returns all strings that would match the pattern. For example, the pattern `foo(bar|baz)` would expand to `foobar` and `foobaz`.

Last week I found the library again and I decided, mostly for fun and pleasure, to add new features and to rewrite the whole code. I also moved to code to the Braincrafted namespace. You can find it on [Github](http://github.com/braincrafted/expexp).

While my goal is to support as many patterns supported by regular expressions as possible, it will ever be only a subset. For example, the star operator in regular expressions matches an infinite amount of infinite long strings. ExpExp can never support such things. Let's stop talking about what's not possible, but about the features that work right now.

## Features

ExpExp currently supports the following operators:

- Parentheses
- Disjunction
- Repetition
- Alternation
- Character classes
- Dot operator
- Optional operator

I am now going to discuss these operators in more detail.

### Parentheses

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>foo(bar)</code></td>
            <td><code>['foobar']</code></td>
        </tr>
    </tbody>
</table>

### Disjunction

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>foo[abc]</code></td>
            <td><code>['fooa', 'foob', 'fooc']</code></td>
        </tr>
    </tbody>
</table>

### Repetition

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>foo{3}</code></td>
            <td><code>foo</code></td>
            <td></td>
        </tr>
        <tr>
            <td><code>foo{1,3}</code></td>
            <td><code>['foo', 'foofoo', 'foofoofoo']</code></td>
            <td></td>
        </tr>
        <tr>
            <td><code>foo{,3}</code></td>
            <td><code>['', 'foo', 'foofoo', 'foofoofoo']</code></td>
            <td>Alias for <code>foo{0,3}</code></td>
        </tr>
        <tr>
            <td><code>foo(bar){2}</code></td>
            <td><code>foobarbar</code></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Alternation

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>foo|bar</code></td>
            <td><code>['foo', 'bar']</code></td>
        </tr>
        <tr>
            <td><code>foo(bar|baz)</code></td>
            <td><code>['foobar', 'foobaz']</code></td>
        </tr>
    </tbody>
</table>

### Character classes

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>[[:lower:]]</code></td>
            <td><code>['a', 'b', 'c', ..., 'z']</code></td>
        </tr>
        <tr>
            <td><code>[[:lower:][:upper:]]</code></td>
            <td><code>['a', ..., 'z', 'A', ..., 'Z']</code></td>
        </tr>
    </tbody>
</table>

Other character classes are

<table>
    <thead>
        <tr>
            <th>Character class</th>
            <th>Description</th>
            <th>Regular expression</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>upper</code></td>
            <td>Uppercase characters</td>
            <td><code>[A-Z]</code></td>
        </tr>
        <tr>
            <td><code>lower</code></td>
            <td>Lowercase characters</td>
            <td><code>[a-z]</code></td>
        </tr>
        <tr>
            <td><code>digit</code></td>
            <td>Digits</td>
            <td><code>[0-9]</code></td>
        </tr>
        <tr>
            <td><code>word</code></td>
            <td>Alphanumeric characters and underscore</td>
            <td><code>[A-Za-z0-9_]</code></td>
        </tr>
        <tr>
            <td><code>space</code></td>
            <td>Space characters</td>
            <td><code>[\t\n\r ]</code></td>
        </tr>
        <tr>
            <td><code>vspace</code></td>
            <td>Vertical space characters</td>
            <td><code>[\n\r]</code></td>
        </tr>
        <tr>
            <td><code>hspace</code></td>
            <td>Horizontal space characters</td>
            <td><code>[\t ]</code></td>
        </tr>
        <tr>
            <td><code>punct</code></td>
            <td>Punctuation characters</td>
            <td><code>[!"#$%&amp;'()*+,-./:;&lt;=>?@[]^_{|}~`]</code></td>
        </tr>
    </tbody>
</table>

There are also multiple shortcuts available:

<table>
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Character classes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>\d</code></td>
            <td><code>digit</code></td>
        </tr>
        <tr>
            <td><code>\w</code></td>
            <td><code>word</code></td>
        </tr>
        <tr>
            <td><code>\s</code></td>
            <td><code>space</code></td>
        </tr>
        <tr>
            <td><code>\v</code></td>
            <td><code>vspace</code></td>
        </tr>
        <tr>
            <td><code>\h</code></td>
            <td><code>hspace</code></td>
        </tr>
    </tbody>
</table>

### Dot operator

The dot operator is replaced by all characters from the `word` character class.

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>foo.</code></td>
            <td><code>['fooa', 'foob', ..., 'foo_']</code></td>
        </tr>
    </tbody>
</table>

### Optional operator

The optional operator allows you to make a character or the content inside a parentheses optional.

<table>
    <thead>
        <tr>
            <th>Pattern</th>
            <th>Expansions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>abc?</code></td>
            <td><code>['abc', 'ab']</code></td>
        </tr>
        <tr>
            <td><code>foo(bar)?</code></td>
            <td><code>['foobar', 'foo']</code></td>
        </tr>
    </tbody>
</table>

### Combination

Of course you can combine all of these operators. For example,

```
ab(cde|[xyz])
```

will expand to

- `abcde`
- `abx`
- `aby`
- `abz`

## Use Cases

I don't think there are many use cases in real life for this library, but it was fun and challenging project.

## Installation

If you want to play around with ExpExp or find a use cases in one of your project you can use [Composer](http://getcomposer.org) to install it:

```json
{
    "require": {
        "braincrafted/expexp": "dev-master"
    }
}
```

I already have tagged some versions, so you can use, for example, `0.2.*` to get a (relative) stable release.

## Usage

Pass the pattern to the `expand()` method and ExpExp will return an array with all expansions:

```php
use Bc\ExpExp\ExpExp;

$e = new ExpExp();
$result = $e->expand('abc|xyz');
```

That's it.
