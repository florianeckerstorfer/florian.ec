---
slug: /testing-traits-with-mocks-in-phpunit
title: 'Testing Traits with Mocks in PHPUnit'
date: 2015-09-28
category: Development
tags: [programming, php, phpunit, traits]
---

If you looked at [Chain](https://github.com/cocur/chain), the library I
[released yesterday](https://florian.ec/articles/chain-better-arrays-in-php/) you may have noticed that
most of the functionality is implemented in [traits](http://php.net/manual/en/language.oop5.traits.php) to keep
single classes small and clean. I also want to keep the tests clean and was delighted to find out that you can mock
a class that _uses_ a trait.

Creating a mock is pretty straight forward with PHPUnit:

```php
$mock = $this->getMockForTrait('TraitUnderTest');
$mock->foo();
```

In addition you can mock methods of the _using_ object that are called by the mock.

```php
$mock->expects($this->any())
     ->method('isBar')
     ->will($this->returnValue(TRUE));
```

**Source:**

- [PHPUnit: Mocking Traits and Abstract Classes](https://phpunit.de/manual/current/en/test-doubles.html#test-doubles.mocking-traits-and-abstract-classes)
