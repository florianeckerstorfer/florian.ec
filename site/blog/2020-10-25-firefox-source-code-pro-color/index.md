---
permalink: blog/firefox-source-code-pro-colour/
title: Firefox cannot render Source Code Pro in colour
date: 2020-10-25
category: Development
tags: [firefox, source code pro, browser bug]
description: Firefox cannot render text that uses the font Source Code Pro in colour. In this article I'm going to show how to fix this bug by subsetting Source Code Pro.
---
Yesterday I encountered a weird bug where the code examples on this website are always black in Firefox. This is a problem since black text on a dark grey background is basically unreadable. 

![Firefox not rendering text set in Source Code Pro in colour](/blog/2020-10-25-firefox-source-code-pro-color/firefox-bug.png "Firefox not rendering text set in Source Code Pro in colour.")

![Safari (displayed) and Chrome render text set in Source Code Pro in colour](/blog/2020-10-25-firefox-source-code-pro-color/safari.png "Safari (displayed) and Chrome render text set in Source Code Pro in colour.")

Since the design updates a week or so ago I was using the font [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) from Adobe for the code examples At first I thought the problem are [variable fonts](https://en.wikipedia.org/wiki/Variable_fonts), but I also use the variable font variants of [Source Sans Pro](https://github.com/adobe-fonts/source-sans-pro) and [Source Serif Pro](https://github.com/adobe-fonts/source-serif-pro) on this site and they render fine. Maybe the problem is with `<pre>` and `<code>` tags I use for the code examples? Or is it [PrismJS](https://prismjs.com/), the library that applies syntax highlighting to my code examples? Nope, nope and nope. This leaves me with Source Code Pro as the culprit.

After going down some variable fonts and `<code>` rendering bugs I finally [found a Github issue](https://github.com/adobe-fonts/source-code-pro/issues/217) that describes the same problem I was having and which linked to a [Firefox bug ticket](https://bugzilla.mozilla.org/show_bug.cgi?id=1520157). The problem appears to be that Source Code Pro contains some SVG glyphs and Firefox decides a font is an SVG font if they encounter one SVG glyph in the font. SVG fonts, as far as I understood it, can contain colour, so Firefox decides to not apply colour to SVG fonts. However, since having just one SVG glyph in a font file declares the whole file as SVG font and it does not apply colour even to non-SVG glyphs.

Can I fix this issue with Source Code Pro or do I have to switch to a different font? Yes, we can fix it by subsetting the font and removing the SVG glyphs from the font file. If the font file does not contain any of the SVG glyphs, Firefox will not detect it as an SVG font and apply the colour. Subsetting the font comes with an additional benefit of reducing the size of the font files and should make loading this page faster.

## Subsetting Source Code Pro

I have tried subsetting fonts in the past, and I was a bit overwhelmed back then, but the tooling got a lot better and it was not too hard to accomplish.

First I installed [fonttools](https://github.com/fonttools/fonttools) and [brotli](https://github.com/google/brotli) (which is required to create WOFF and WOFF2 feels):

```bash
pip3 install fontfoools
pip3 install brotli
```

Before running the subset command, I needed to come up with the list of characters I want to include in my font. Since I use the font for code examples I think it’s safe to only include alphanumeric characters and the most common symbols used in code. I also decided to not include any of the open type features, such as ligatures, in the subsetted fonts and came up with the following command:

```bash
pyftsubset source-code.otf \
    --unicodes="U+0020-007E" \
    --layout-features="" \
    --flavor="woff2" \
    --output-file="source-code.woff2"
```

I also want to generate a WOFF font to support Internet Explorer 11. 

```bash
pyftsubset source-code.otf \
    --unicodes="U+0020-007E" \
    --layout-features="" \
    --flavor="woff" \
    --output-file="source-code.woff"
```

After using the newly subsetting font Firefox renders my code examples in the correct colour:

![Firefox rendering Source Code Pro in colour](/blog/2020-10-25-firefox-source-code-pro-color/firefox-fixed.png "Firefox rendering Source Code Pro in colour.")

In addition to fixing the bug I could also decrease the loading time of the site by reducing the file size of the font files quite dramatically:

- `source-code.woff`: 123 KB → 14 KB
- `source-code.woff2`: 105 KB → 12 KB

Next I will look at the other fonts I am using on this site and see if I can optimise them as well. Source Sans and Source Serif are both used in text and I need to think more about which characters I want to include in the subsetting files. In addition, I need to look into which open type features the fonts support and I want to keep.