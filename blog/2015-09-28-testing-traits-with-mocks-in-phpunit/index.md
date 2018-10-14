---
title: "Testing Traits with Mocks in PHPUnit"
date: 2015-09-28T00:00:00.000Z
category: Development
tags: [ php, phpunit ]
description: In this article I am going to explain how you can test traits in PHPUnit.
path: /testing-traits-with-mocks-in-phpunit/
published: true
---

If you looked at [Chain](https://github.com/cocur/chain), the library I [released yesterday](https://florian.ec/articles/chain-better-arrays-in-php/) you may have noticed that most of the functionality is implemented in [traits](http://php.net/manual/en/language.oop5.traits.php) to keep single classes small and clean. I also want to keep the tests clean and was delighted to find out that you can mock a class that *uses* a trait.

Creating a mock is pretty straight forward with PHPUnit:

```php
$mock = $this->getMockForTrait('TraitUnderTest');
$mock->foo();
```

In addition you can mock methods of the *using* object that are called by the mock.

```php
$mock->expects($this->any())
     ->method('isBar')
     ->will($this->returnValue(TRUE));
```

**Source:**

- [PHPUnit: Mocking Traits and Abstract Classes](https://phpunit.de/manual/current/en/test-doubles.html#test-doubles.mocking-traits-and-abstract-classes)
