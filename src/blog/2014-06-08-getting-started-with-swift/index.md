---
slug: swift-getting-started
title: Getting Started with Swift
date: 2014-06-08
category: Development
tags: [swift, programming]
---

Last Monday Apple released a new programming language for the iOS and Mac platforms: [Swift](https://developer.apple.com/swift/). Currently I am about half way through the [The Swift Programming Language](https://itunes.apple.com/at/book/swift-programming-language/id881256329?l=en&mt=11) (iBook Store) book from Apple and I want to help you getting started to write some code in Swift. This is not a exhaustive guide, it introduces you to some of the basic concepts of Swift.

---

**Note:** While I don't intend to write an exhaustive guide to Swift the article in its current form still misses some crucial pieces.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Constants & Variables](#constants-and-variables)
3. [Arrays](#arrays)
4. [Collections](#collections)
5. [Loops](#loops)
6. [Conditional Statements](#conditional-statements)
7. [Optional Variables](#optional-variables)
8. [Updates](#updates)

## Getting Started

To get started with Swift you need the new Xcode 6 Beta. You can download it from Apples [Developer area](https://developer.apple.com/xcode/downloads/) after you have logged in with your developer account. You need enroll either in the iOS or Mac developer program for \$100 per year.

Open Xcode and create a new file (File > New > File) and select the **Playground** template in iOS > Source:

![Xcode 6 Beta New File Dialog](/content/blog/2014-06-08-getting-started-with-swift/xcode-new-file.png)

Next you need to select a folder where to save your playground file and enter a filename. If you have done that you should see a new window where you can start to write some Swift code.

![New Swift Playground in Xcode 6 Beta](/content/blog/2014-06-08-getting-started-with-swift/xcode-new-swift-file.png)

## Constants & Variables

Constants and variables can be used to hold a value. The difference between constants and variables is that constants have a constant value, once you assign a value to a constant you cannot change that value. Variables on the other hand have a variable value, you can change the value of a variable any time you want. You can define constants with the `let` keyword and variables using the `var` keyword.

```swift
// Define a constant
let myFirstConstant = "Hello Constant"

// Define a variable
var myFirstVariable = "Hello Variable"

// Change the value of the variable
myFirstVariable = "Another value"

// This will raise an error
// myFirstConstant = "Another value"
```

---

**Note:** Maybe you have noticed that the semicolon at the end of each line is missing. In Swift you don't need to add a semicolon at the end of a statement if each statement is on its own line. If you want two write two statements on a single line you have to separate them with a semicolon.

```swift
let one = 1; var two = 2
```

---

Now that we have defined a variable and a constant we need to learn a little bit about types. Swift is a strongly typed language, each variable and constant needs to have a type. It supports all major types like strings, integers, floats, booleans and so own. In a strongly typed language you normally have to define the type everytime you define a variable or constant. As you have seen in the previous example we didn't define a type for `myFirstConstant` and `myFirstVariable`. We can omit the type when Swift can infer the type. In the example above Swift was able to infer that the type of `myFirstConstant` and `myFirstVariable` is `String` because we set the value immediately to a string value. However, we could have also provided the type explicetely.

```swift
let myFirstConstant: String = "Hello Constant"
var myFirstVariable: String = "Hello Variable"
```

In this example we can omit the type because Swift can infer it based on the value. If you define a variable and don't immediately assign a value you have to define the type.

```swift
var one: Int
var two: Int
```

Here are a few more example with other types supported by Swift.

```swift
var anInteger: Int = 1
var anBoolean: Bool = true
var aString: String = "Hello"
var aDouble: Double = 4.2
var aFloat: Float = 9.9
```

In general variables also have to have a value. However, Swifts has the concept of <a href="#optional-variables">Optional Variables</a> that I will cover in a later chapter.

## Arrays

Array is a type that can contain multiple values of the same type. For example, if you want to create a list of the houses in Game of Thrones.

```swift
var houses = [ "Stark", "Lannister", "Baratheon", "Greyjoy" ]
```

Swift can infer the type of `houses` based on the value. We could also explicetly state the type of the array.

```swift
var houses: String[] = [ "Stark", "Lannister", "Baratheon", "Greyjoy" ]
```

Of course we can also create an array of integers.

```swift
var favNumbers = [ 3, 7, 42, 69 ]
```

We can access the element of an array by using the index syntax. Like in most other programming languages the first index of an array is `0`.

```swift
houses[0]
// "Stark"

houses[1]
// "Lannister"
```

Unlike in more low-level languages like Objective C or C types in Swift have methods and operations. For example, we can count the elements in an array

```swift
houses.count
// 4
```

Arrays are ordered, therefore each element has an index (must be unique) and there are no gaps in the list of indeces. If you have an array with 5 elements and you remove the element with index 2, the element at index 3 will be moved to index 2 and the element at index 4 will be moved to index 3.

## Collections

Collections are somewhat similar to arrays, but while arrays are ordered (each element has an index and the array is orderd by this index) collections are unordered. The index of an collection does not have to be an integer, but can be a string or a double.

```swift
var lords = [ "stark": "ned", "lannister": "tywin", "baratheon": "robert" ]
```

Just like arrays you can access elements in a collections using their index.

```swift
lords["stark"]
// "ned"
```

## Loops

One of the most common things you want to do with an array or a collection is that you want to step through each element. Swift offers a number of different types of loops. The probably easiest one to understand is the **for-in** loop.

```swift
for house in houses {
    house
}
```

---

**Note:** If you type this code in a playground in Xcode you will see the number of times the body of the loop is executed. In the example above this would be four times. You can click on the circle icon right to this to view the value of the variable <code>house</code> in each iteration.

## ![Value of variable in for-in loop in Xcode](/content/blog/2014-06-08-getting-started-with-swift/xcode-for-in.png)

If you don't want to iterate through an array or collection but rather iterate to a range of values you can use the range operator. In fact, in Swift there are two range operators. The **closed range operator** is `a...b` and returns all numbers between `a` and `b` including `a` and `b`. The **half-closed range operator** is `a..b` and returns the numbers between `a` and `b` including `a` but excluding `b`.

```swift
for i in 1...5 {
    i
}
// 1
// 2
// 3
// 4
// 5

for j in 1..5 {
    j
}
// 1
// 2
// 3
// 4
```

Swift also supports "normal" for loops, while and do while loops.

---

**Note:** If you have already experience in another programming language you might be wondering if I forgot the parentheses in the `for` statement. I didn't. In Swift you don't use parenthesis when writing _Control Flow_ (`for`, `while`,`if`,`switch`, …) statements.

---

## Conditional Statements

Conditional statements allow you to execute only when a certain condition is met. The conditional is often also called an _expression_ and we say that an expression _is true_ or _is false_ or _is evaluated to true_ or _is evaluated to false_.

```swift
let num = 5
if num == 5 {
    "Number is 5"
}
// "Number is 5"
```

Swift supports all major operators known from other programming languages like `==`, `!=`, `>`, `<`, `>=`, `<=` and so on.

Often you need to execute code when an expression is valid and another piece of code when the expression is not valid. Like any other programming language, Swift has an `else` statement.

```swift
let num = 10
if num == 5 {
    "Number is 5"
} else {
    "Number is not 5"
}
// "Number is not 5"
```

In the above example this is the same as if you would write two `if` statements, one with a positive expression, one with the negated expression.

```swift
let num = 10
if num == 5 {
    "Number is 5"
}
if num != 5 {
    "Number is not 5"
}
// "Number is not 5"
```

However this will not always work. For example, consider the following piece of code:

```swift
let num = 10
if num > 5 {
    "Number is greater than 5"
}
if num > 3 {
    "Number is grater than 3"
}
// "Number is greater than 5"
// "Number is greater than 3"
```

If you only want to output one of the two lines you either have to adapt the second conditional to `num > 3 && num <= 5` or you need to use `else`. Using `else` is a lot more elegant and readable.

```swift
let num = 10
if num > 5 {
    "Number is greater than 5"
} else {
    "Number is grater than 3"
}
// "Number is greater than 5"
```

You can also combine the `if` and `else` statements to implement multiple conditionals.

```swift
let num = 42
if num == 5 {
    "Number is 42"
} else if num == 42 {
    "You've found the answer"
} else {
    "Number is not 5 and not the answer"
}
// "You've found the answer"
```

## Optional Variables

As mentioned in the [Constants & Variables](#constants-variables) chapter Swift requires you to always set a value for a variable for you can read it. In other programming languages variables have a default value (for example, `null` in PHP or `undefined` in JavaScript) when you use a variable before it has a value assigned. When you execute the following code snippet you will get a compiler error.

```swift
var foo: Int

if foo == 5 {
    "The value is 5"
}
// Compiler error: "error: variable 'foo' used before being initialized"

```

This behaviour helps you catch a lot of errors where you forgot to assign a value or assigned a value to the wrong variable. However, there exist situations where you cannot assign a value to variable because we don't know the value yet. For example, when retrieving data using an HTTP request we may not have a value when the request fails. For such cases you can specifically define a variable as _optional_ and assign `nil` to the variable. If you explicitely state that a variable is optional it is your responsibility to check whether a value has been asigned before using it. You can define an optional variable by adding a question mark `?` to the type definition.

```swift
var foo: Int?

if foo {
    "Foo is initialized"
} else {
    "Foo is not initialized"
}
// "Foo is not initialized"
```

In this example the conditional evaluates to `true` if the variable `foo` has a value assigned (is not `nil`) and to `false` otherwise (is `nil`). You can also assign `nil` later to a variable.

```swift
var foo: Int?
foo = 5

if foo {
    "Foo is initialized"
} else {
    "Foo is not initialized"
}

foo = nil

if foo {
    "Foo is initialized"
} else {
    "Foo is not initialized"
}
// "Foo is initialized"
// "Foo is not initialized"
```

It's important to note that only the variable name (`foo` in the examples above) is only a valid `LogicValue` that can be used in a conditional if the variable is optional. The following example will throw a compiler error:

```swift
var bar: Int = 5
if bar {
    "Bar is initialized"
}
// Compiler error: "type 'Int' does not conform to protocol 'LogicValue'"
```

It is a common scenario that you have a variable with an optional value and after you check that it has a value it should always have a value. You can use `var foo = optionalFoo` inside the conditional to assign the optional value to a non-optional value.

```swift
var foo: Int? = 5

if var bar = foo {
    bar = 7
    bar = nil
}
// Compiler error: "could not find an overload for '__conversion' that accepts the supplied arguments"
```

The first assignment `bar = 7` goes through, however, the compiler will throw an error when you want to assign `nil` to `bar`.

It is worth noting that constants can also have an optional type.

```swift
let foo: Int?

if foo {
    "init"
} else {
    "not init"
}
```

---

Please note that this article can be considered as a working draft. At this point it includes some of the basic concepts of the Swift programming language, but there exists a lot of stuff that is not covered. If you are eager to learn more please read [The Swift Programming Language](https://itunes.apple.com/at/book/swift-programming-language/id881256329?l=en&mt=11) (iBook Store) from Apple. You can read the book also [online](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH3-XID_0). If you want to try things out and don't want to type every example you can download the [Swift Tour](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html#//apple_ref/doc/uid/TP40014097-CH2-XID_1) as a playground file.

---

## Updates

- **June 8, 2014**
  - Extended and rewritten section on [Conditional Statements](#conditional-statements)
  - Added [Table of Contents](#table-of-contents)
- **June 15, 2014**
  - Added chapter on [Optional Variables](#optional-variables)
