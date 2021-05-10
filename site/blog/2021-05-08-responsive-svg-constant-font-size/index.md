---
permalink: blog/responsive-svg-constant-font-size/
title: Responsive SVGs with Constant Font Size
date: 2021-05-08
category: Development
tags: [svg, css]
description: In this post I present an overview of some techniques to keep the size of text constant in responsive SVGs.
---

{{ description }} At the moment there is no perfect solution, but we will discuss a technique that gets us close to the result we want.

One of the great things about SVGs is that they are vector graphics and responsive by default. SVGs images are scaled based on the image width and look sharp at whatever size they are rendered. We can even use CSS and media query to adapt SVGs images based on the viewport. Since the whole SVG is scaled based on its width, the size of text is scaled together with the image. In most cases this is the behaviour we want: text should be bigger if the image gets bigger and smaller if the image gets smaller, but in some cases you want the SVG to scale to the width of its parent element, but the font size should stay constant, compared to the text in the surrounding HTML.

1. [Setting the Stage](#setting-the-stage)
2. [Fixing the Font Size at Breakpoints](#breakpoints)
3. [Fixing the Text Alignment](#text-alignment)
4. [A Formula to Scale the Font Size](#formula)
5. [Improvising with Fluid Typography](#fluid-typography)
6. [Conclusion](#conclusion)

## Setting the Stage <a name="setting-the-stage"></a>

Let's take a look at a [first example](/blog/responsive-svg-constant-font-size/example1-scaling.html), where the font size is together with the image. The SVG image in this example has a width of _320px_, the text is set in font size _16px_, and the image width is set to _100%_. When the browsers viewport width matches the image width of 320px, the text is rendered in 16px. If we increase the width of the viewport to 640px, the font size is increased to 32px.

<figure>
  <iframe src="/blog/responsive-svg-constant-font-size/example1-scaling.html" width="100%" height="248px">
    Could not render frame
  </iframe>
  <figcaption>The text in example 1 scales with the image. When the image is rendered at double the size, the font size is also doubled.</figcaption>
</figure>

If the graphic is integrated into the design of the page it is often desirable that the font size stays constant, no matter the width of the viewport. I recently encountered such a situation when I wanted to render a graph directly in SVG without the help of a Javascript-based visualisation library.

## Fixing the Font Size at Breakpoints <a name="breakpoints"></a>

Let's get back to our example image, at 640px width the size of the text is doubled to 32px. Because the image has the same width as the minimum viewport we want to support, we need to half the font size for the 640px viewport width. In a first attempt we can scale down the font at that breakpoint.

```css
svg text {
  font-size: 16px;
}

@media (min-width: 640px) {
  svg text {
    font-size: 8px;
  }
}
```

With this CSS in place the text has the correct size at the 320px breakpoint and the 640px breakpoint, but is scaled with the image for all other viewport widths. If the image matches the bigger viewport with, the text would appear smaller for the smaller viewport and we need to double the font size at the 320px.

<figure>
<iframe src="/blog/responsive-svg-constant-font-size/example2-breakpoints.html" width="100%" height="248px">
  Could not render frame
</iframe>
<figcaption>The text in example 2 grows with the size of image, but is scaled to the correct size at a specific breakpoint. View this example at 640px or 320px for the correct result.</figcaption>
</figure>

If we resize the browser window to 470px width with [example two](/blog/responsive-svg-constant-font-size/example2-breakpoints.html) open the text is rendered in font size 24px. We can add another breakpoint:

```css
@media (min-width: 470px) {
  svg text {
    font-size: 12px;
  }
}
```

## Fixing the Text Alignment <a name="text-alignment"></a>

After adding the breakpoints at 470px and 640px viewport width, the font size is correct at these two viewports, the position of the text is off. By default the coordinates that define the position in an SVG point to the bottom left corner of the text and therefore text that was centered in the original version is no longer centered, because the width of the text box is smaller and the coordinates no longer point to the center.

The good news is that we SVG provides as with attributes to define where a text elements coordinates should be anchored. For the `x` coordinate we have the `text-anchor` ([MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)) attribute with possible values of `start`, `middle`, and `end`. The `y` coordinate is controlled by the attribute `dominant-baseline` ([MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline)) and its possible values are `auto` (bottom), `middle`, and `hanging` (top).

For example, if our element should be centered on both the x- and y-axis:

```css
svg text {
  dominant-baseline: middle;
  text-anchor: middle;
}
```

<figure>
<iframe src="/blog/responsive-svg-constant-font-size/example3-text-align.html" width="100%" height="248px">
  Could not render frame
</iframe>
<figcaption>In example 3 we use <code>text-anchor</code> and <code>dominant-baseline</code> to define where the x and y coordinates point to.</figcaption>
</figure>

## A Formula to Scale the Font Size <a name="formula"></a>

By using breakpoints to scale down the font size gives us the possibility to have the correct font size for certain viewports, but we will not be able to cover all possible viewports. Instead it would be better if we could come up with a formula that calculates the correct font size dynamically based on the width of the viewport. Math and `calc()` to the rescue.

We already know that we need to divide the font size by 2 if the width of the image doubles and if we quadruple the size of the image, we need to divide the font size by 4. In short, we need to divide the base font size by the scaling factor of the image to get the target font size:

```
[font size] / ([viewport width] / [image width])
```

When I came up with this formula I was super happy and I was wondering why I couldn't find it anywhere when I look for a solution of my constant font size problem. The devil is in the details, as they say and in this case the details are the constraints of [`calc()`](<https://developer.mozilla.org/en-US/docs/Web/CSS/calc()>) and therefore which kind of formulas we can use in CSS. If we put the numbers from our example above in the formula above, we would get the following CSS:

```css
svg text {
  font-size: calc(16px / (100vw / 320));
}
```

Sadly this will not work, because the divisor in `calc()` needs to be a `<number>` and a `<number>` in CSS is unit-less. However, we need to use `100vw`, because it's the only way that we get the width of the viewport into our formula. I tried for a couple of hours other ways to calculate the scaling factor, but I was not able to come up with a formula that worked with the restrictions of `calc()`.

Solution, you're so close and still so far away.

Side note: If you want to learn more about how `calc()` works, CSS-Tricks does have a [A Complete Guide to calc() in CSS](https://css-tricks.com/a-complete-guide-to-calc-in-css/).

## Improvising with Fluid Typography <a name="fluid-typography"></a>

After the setback with the formula that scales the font size down based on the scaling factor of the image, my mind wandered back to a technique that I have considered in the beginning, but rejected because the math does not work out perfectly: [Fluid Typography](https://css-tricks.com/snippets/css/fluid-typography/).

Fluid Typography is used to scale the font size between a minimum and maximum font size when the size of the viewports increases. Normally we use this technique to increase the font size when the viewport width increases, but we can switch the `minimum size` and `maximum size` parameters to get a negative scaling factor and decrease the font size when the viewport width increases:

```
[minimum size] + ([minimum size] - [maximum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))
```

Let's put in the numbers of a base font size of 16px, an image width of 320px and a maximum viewport width of 640px:

```
16px + (8 − 16) × ((320px − 320px)/320) = 16px
16px + (8 − 16) × ((480px − 320px)/320) = 12px
16px + (8 − 16) × ((640px − 320px)/320) = 8px
```

It works for these numbers, but as I said in the beginning the math does not work out perfectly and we can see this if we increase the maximum viewport width to 1280px:

```
16px + (4 − 16) × ((1280px − 320px) / 960) = 4px
16px + (4 − 16) × ((1024px − 320px) / 960) = 7.2px
16px + (4 − 16) × ((960px − 320px) / 960) = 8px
16px + (4 − 16) × ((640px − 320px) / 960) = 12px
16px + (4 − 16) × ((320px − 320px) / 960) = 16px
```

Well, this doesn't look as right anymore. The problem is that the Fluid Typography formula scales the font size linearly between min and max, but we need the font size for the viewport with a width of 640px to always be 8px. With Fluid Typography the value depends on the maximum viewport, which makes the formula only work correctly if the maximum width is double the minimum width.

This is not perfect, but we can work with that. Our pages will not be going up to an infinite viewport width, we can apply the formula at each breakpoint where the image size doubles:

```css
.graphic svg text {
  font-size: calc(16px + (8 - 16) * ((100vw - 320px) / (640 - 320)));
}

@media (min-width: 641px) {
  .graphic svg text {
    font-size: calc(8px + (4 - 8) * ((100vw - 640px) / (1280 - 640)));
  }
}

@media (min-width: 1280px) {
  .graphic svg {
    width: 1280px;
  }

  .graphic svg text {
    font-size: 4px;
  }
}
```

The important part in the calculation for the 641 to 1280px breakpoint is that we need to use 8px as the base font size now and that 640px is our minimum viewport width for this breakpoint.

The last part is defining the absolute maximum width of the image. Because the font size calculations for the previous breakpoint is based on the viewport width (not the actual width of the image), the font size will further decrease even if the image no longer gets bigger. Therefore we replace our formula with the minimum font size at the maximum viewport width breakpoint.

<figure>
<iframe src="/blog/responsive-svg-constant-font-size/example4-fluid.html" width="100%" height="248px">
  Could not render frame
</iframe>
<figcaption>The font size in example 4 is scaled down and the size of the text appears to be constant even when the image gets bigger.</figcaption>
</figure>

## Conclusion <a name="conclusion"></a>

That actually works exactly as we want, it's just not as elegant as we would like it to be. Depending on how much the image can increase in size we need to add multiple breakpoints, whenever the width of the image doubles. Since, at the time of writing, we [cannot use container queries](https://caniuse.com/css-container-queries) we need to write our media queries based on the viewport. If the image is part of a CSS Grid or Flexbox we also need to add additional queries when the layout effects the width of the image.
