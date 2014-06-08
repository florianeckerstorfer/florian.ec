---
title: Getting Started with Swift
tags: [ swift, programming ]
slug: swift-getting-started
---

{% block summary %}

Last Monday Apple released a new programming language for the iOS and Mac platforms: [Swift](https://developer.apple.com/swift/). Currently I am about half way through the [The Swift Programming Language](https://itunes.apple.com/at/book/swift-programming-language/id881256329?l=en&mt=11) book from Apple and I want to help you getting started to write some code in Swift. This is not a exhaustive guide, it introduces you to some of the basic concepts of Swift.

{% endblock %}

{% block content %}

<div class="note">
    <strong>Note</strong>
    <p>While I don't intend to write an exhaustive guide to Swift the article in its current form still misses some crucial pieces.</p>
</div>

To get started with Swift you need the new Xcode 6 Beta. You can download it from Apples [Developer area](https://developer.apple.com/xcode/downloads/) after you have logged in with your developer account. You need enroll either in the iOS or Mac developer program for $100 per year.

Open Xcode and create a new file (File > New > File) and select the **Playground** template in iOS > Source:

[{{ picture('/img/articles/swift-getting-started/xcode-new-file.png', 'Xcode 6 Beta New File Dialog') }}](/img/articles/swift-getting-started/xcode-new-file-original.png)

Next you need to select a folder where to save your playground file and enter a filename. If you have done that you should see a new window where you can start to write some Swift code.

[{{ picture('/img/articles/swift-getting-started/xcode-new-swift-file.png', 'New Swift Playground in Xcode 6 Beta') }}](/img/articles/swift-getting-started/xcode-new-swift-file-original.png)

## Constants & Variables

Constants and variables can be used to hold a value. The difference between constants and variables is that constants have a constant value, once you assign a value to a constant you cannot change that value. Variables on the other hand have a variable value, you can change the value of a variable any time you want. You can define constants with the `let` keyword and variables using the `var` keyword.

<pre><code class="swift">// Define a constant
let myFirstConstant = "Hello Constant"

// Define a variable
var myFirstVariable = "Hello Variable"

// Change the value of the variable
myFirstVariable = "Another value"

// This will raise an error
// myFirstConstant = "Another value"</code></pre>

<div class="article__note">
    <strong>Note</strong>
    <p>Maybe you have noticed that the semicolon at the end of each line is missing. In Swift you don't need to add a semicolon at the end of a statement if each statement is on its own line. If you want two write two statements on a single line you have to separate them with a semicolon.</p>
    <pre><code class="swift">let one = 1; var two = 2</code></pre>
</div>

Now that we have defined a variable and a constant we need to learn a little bit about types. Swift is a strongly typed language, each variable and constant needs to have a type. It supports all major types like strings, integers, floats, booleans and so own. In a strongly typed language you normally have to define the type everytime you define a variable or constant. As you have seen in the previous example we didn't define a type for `myFirstConstant` and `myFirstVariable`. We can omit the type when Swift can infer the type. In the example above Swift was able to infer that the type of `myFirstConstant` and `myFirstVariable` is `String` because we set the value immediately to a string value. However, we could have also provided the type explicetely.

<pre><code class="swift">let myFirstConstant: String = "Hello Constant"
var myFirstVariable: String = "Hello Variable"</code></pre>

In this example we can omit the type because Swift can infer it based on the value. If you define a variable and don't immediately assign a value you have to define the type.

<pre><code class="swift">var one: Int
var two: Int</code></pre>

Here are a few more example with other types supported by Swift.

<pre><code class="swift">var anInteger: Int = 1
var anBoolean: Bool = true
var aString: String = "Hello"
var aDouble: Double = 4.2
var aFloat: Float = 9.9</code></pre>


## Arrays

Array is a type that can contain multiple values of the same type. For example, if you want to create a list of the houses in Game of Thrones.

<pre><code class="swift">var houses = [ "Stark", "Lannister", "Baratheon", "Greyjoy" ]</code></pre>

Swift can infer the type of `houses` based on the value. We could also explicetly state the type of the array.

<pre><code class="swift">var houses: String[] = [ "Stark", "Lannister", "Baratheon", "Greyjoy" ]</code></pre>

Of course we can also create an array of integers.

<pre><code class="swift">var favNumbers = [ 3, 7, 42, 69 ]</code></pre>

We can access the element of an array by using the index syntax. Like in most other programming languages the first index of an array is `0`.

<pre><code class="swift">houses[0]
// "Stark"

houses[1]
// "Lannister"</code></pre>

Unlike in more low-level languages like Objective C or C types in Swift have methods and operations. For example, we can count the elements in an array

<pre><code class="swift">houses.count
// 4</code></pre>

Arrays are ordered, therefore each element has an index (must be unique) and there are no gaps in the list of indeces. If you have an array with 5 elements and you remove the element with index 2, the element at index 4 will be moved to index 2 and the element at index 4 will be moved to index 3.

## Collections

Collections are somewhat similar to arrays, but while arrays are ordered (each element has an index and the array is orderd by this index) collections are unordered. The index of an collection does not have to be an integer, but can be a string or a double.

<pre><code class="swift">var lords = [ "stark": "ned", "lannister": "tywin", "baratheon": "robert" ]</code></pre>

Just like arrays you can access elements in a collections using their index.

<pre><code class="swift">lords["stark"]
// "ned"</code></pre>

## Loops

One of the most common things you want to do with an array or a collection is that you want to step through each element. Swift offers a number of different types of loops. The probably easiest one to understand is the **for-in** loop.

<pre><code class="swift">for house in houses {
    house
}</code></pre>

<div class="article__note">
    <strong>Note</strong>
    <p>If you type this code in a playground in Xcode you will see the number of times the body of the loop is executed. In the example above this would be four times. You can click on the circle icon right to this to view the value of the variable <code>house</code> in each iteration.</p>

    <a href="/img/articles/swift-getting-started/xcode-for-in-original.png">{{ picture('/img/articles/swift-getting-started/xcode-for-in.png', 'Value of variable in for-in loop in Xcode') }}</a>
</div>

If you don't want to iterate through an array or collection but rather iterate to a range of values you can use the range operator. In fact, in Swift there are two range operators. The **closed range operator** is `a...b` and returns all numbers between `a` and `b` including `a` and `b`. The **half-closed range operator** is `a..b` and returns the numbers between `a` and `b` including `a` but excluding `b`.

<pre><code class="swift">for i in 1...5 {
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
// 4</code></pre>

Swift also supports "normal" for loops, while and do while loops.

## Conditionals

Conditionals allow you to add conditions to your code.

<pre><code class="swift">if num == 5 {
    "Number is 5"
}</code></pre>

Swift supports all major operators known from other programming languages like `==`, `!=`, `>`, `<`, `>=`, `<=` and so on.

<hr>

Please note that this article can be considered as a working draft. At this point it includes some of the basic concepts of the Swift programming language, but there exists a lot of stuff that is not covered. If you are eager to learn more please read [The Swift Programming Language](https://itunes.apple.com/at/book/swift-programming-language/id881256329?l=en&mt=11) from Apple.

{% endblock %}
