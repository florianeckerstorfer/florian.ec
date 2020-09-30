---
permalink: blog/chain-better-arrays-in-php/
title: 'Chain: Better Arrays in PHP'
date: 2015-09-28
category: Development
tags: [php, array, library]
---

The array functions in PHP are, like many other things in PHP, a mess. One problem is the inconsistency in the API,
for example, `array_map()` accepts a callback as first parameter and the array as second; on the other hand,
`array_filter()` accepts the array as first parameter and a callback as second. In general, wrapping the function
around the array produces code that is hard to read and is not very nice to look at.

In the following example we generate an array with `10` elements with a value of `20`, then we assign to each
element a random number between `0` and the elements value (that is, `20`) and then filter the array to only contain
_odd_ values.

```php
$arr = array_filter(
    array_map(
        function ($v) { return rand(0, $v); },
        array_fill(0, 10, 20)
    ),
    function ($v) { return $v & 1; }
);
```

How long do you need to look at the following piece of code to understand it?

```php
echo array_sum(array_intersect(
    array_diff([1, 2, 3, 4, 5], [0, 1, 9]),
    array_filter([2, 3, 4], function ($v) { return !($v & 1); })
));
```

I use the kind of array operations frequently in other languages, but only very seldom in PHP. Today while taking
a walk I thought about this problem and a possible solution. What I came up with is
[Chain](https://github.com/cocur/chain), an object-oriented wrapper for arrays that allow chaining of array
manipulations.

First let us take a look at what the above examples look like with Chain. The first one is pretty straight forward,
create a filled array, map and filter.

```php
$chain = Chain::fill(0, 10, 20)
    ->map(function ($v) { return rand(0, $v); })
    ->filter(function ($v) { return $v & 1; });
```

The second example is also pretty straight forward I believe

```php
echo (new Chain([1, 2, 3, 4, 5]))
    ->diff([0, 1, 9])
    ->intersect((new Chain([2, 3, 4]))->filter(function ($v) { return !($v & 1); }))
    ->sum();
```

By using Chain the information is defined in the order we need to understand it. First we define an array, then we
create a diff and intersect it with another chain, which is filtered. Lastly we build the sum of the resulting array.

There exist three kind of methods:

1. methods to create the array,
2. methods to manipulate the array,
3. and methods to retrieve the array, a property of the array or reduce the array to a single value.

Currenty you can create a `Chain` by passing an array to the constructor or by using the static `::fill()` method which
works exactly like `array_fill()`.

Methods that manipulate an array always modify the internal representation of the array and return an instance
to the `Chain` object (that is, they are chainable). When a method accepts an array as parameter it also accepts an
`Chain` object instead.

The last kind of method are those that return some kind of value, not the object. This includes `->count()`, `->sum()`
and `->reduce()`. If you want to retrieve the underlaying array you can use the public property `->array`.

Take a look at the [Chain](https://github.com/cocur/chain) project on Github; I started with a very basic implementation
this evening and implemented some methods. There are still many array functions missing but I hope I to add them very
soon.

If you want to help out I would appreciate pull requests very much. You will see that implementing new methods is
very easy. I decided to use traits for this project, mostly because the amount of array functions in PHP would make
the `Chain` class and the associated test class huge. By using traits we have a lot of small classes and a lot of
small and simple test classes.
