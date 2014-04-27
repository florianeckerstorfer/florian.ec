---
title: Rebuild Jekyll and Compass when a file changes
tags: [ jekyll, compass, guard, ruby ]
---

This blog uses Jekyll to build the HTML code, Compass for the stylesheets and JavaScript is concatenated and minified. Lately I have written more articles and every time I changed the layout or the text I had to manually recompiled using my [Makefile](https://github.com/braincrafted/braincrafted.com/blob/148b44472bb39a3ad10dfc7f24b6c0e8c7c4699b/Makefile). Every time those extra keystrokes hurt me on the inside.

Jekyll and Compass each have a watch command built in and there are tools for the JavaScript part, but I don't want to start three different watchers every time I work on braincrafted.com. Another problem  is that after Compass build the CSS files, Jekyll needs to run to put CSS files into the correct directory.

There are numerous tools and libraries available to watch for files changes, but I decided to use [Guard](https://github.com/guard/guard) pretty quickly because it fulfulls all my requirements:

1. Exclude files and directories
2. Define multiple groups of files
3. Execute a Makefile

Requirement number 1 is important because the builders will place the generated HTML, CSS and JavaScript files in a subdirectory of the watched directory. The second requirement allows me to only execute the  builders necessary for a specific file. For example, if a HTML file is changed I only want to run Jekyll. Executing `Makefile`s allows me to reuse my existing build scripts and saves me some work.

Installation of Guard was pretty easy, at least after I reinstalled my messed up Ruby installation and the syntax for the `Guardfile` is straight forward.

<pre><code class="ruby"># ./Guardfile

# Notification via Growl when files change
notification :growl

# Ignore the following diretories and files
ignore %r{^_site/}, %r{/Guardfile/}, %r{/config.rb/}, %r{/code/}, %r{/css(-dev)?/}, %r{/js/}

guard :shell do

    # When HTML and Markdown files are modified run Jekyll
    watch(/^.*\.(md|htm|html|xml)/) do |m|
        `make build-jekyll run-dev`
        n "Built HTML for braincrafted.com"
        m[0]
    end

    # When JavaScript is modified build JS and Jekyll
    watch(/^js-dev\/.*\.js/) do |m|
        `make build-js build-jekyll run-dev`
        n "Built HTML and JavaScript for braincrafted.com"
        m[0]
    end

    # When Sass is modified build CSS and Jekyll
    watch(/^sass\/(.*)\.s[ac]ss/) do |m|
        `make build-css build-jekyll run-dev`
        n "Built HTML and CSS for braincrafted.com"
        m[0]
    end

end
</code></pre>

I added a target to my `Makefile` to make things even more intuitive.

<pre><code class="bash"># ./Makefile

watch:
    @echo "Watching for changes..."
    @bundle exec guard</code></pre>

Since I was already at it, I also wanted Safari to automatically reload the page (or open it in a new tab if it is not already open). I inlined some lines of AppleScript in my `Makefile` to accomplish this.

<pre><code class="bash"> # ./Makefile

DEV_URL         = http:\/\/braincrafted.com.dev
PROD_URL        = http:\/\/braincrafted.com

define OPEN_SCRIPT
tell application "Safari"
    set alreadyOpen to false
    set reloadURL to "__OPEN_URL__"

    repeat with x from 1 to number of windows
        repeat with y from 1 to number of tabs in window x
            set tabURL to URL of tab y of window x
            if tabURL starts with reloadURL then
                set URL of tab y of window x to tabURL
                set alreadyOpen to true
                set current tab of window x to (tab y of window x)
            end if
        end repeat
    end repeat

    if alreadyOpen is false then
        tell front window
            set current tab to (make new tab with properties {URL:reloadURL})
        end tell
    end if

end tell
endef

# Required because by default $OPEN_SCRIPT is interpretated as a command
export OPEN_SCRIPT

run-dev:
    @echo "Open site in development environment... \c"
    @echo "$$OPEN_SCRIPT" | sed "s/__OPEN_URL__/${DEV_URL}/" | osascript
    @echo "${CHECK} Done"

run:
    @echo "Open site in production environment...  \c"
    @echo "$$OPEN_SCRIPT" | sed "s/__OPEN_URL__/${PROD_URL}/" | osascript
    @echo "${CHECK} Done"</code></pre>

When I now change something in the project, the updated page is already loaded when I switch to Safari.

### Resources

- [Guard README](https://github.com/guard/guard/blob/master/README.md)
- [Guard::Shell](https://github.com/guard/guard-shell)
- [Generate a List of Open Safari Tabs with AppleScript](http://mac.tutsplus.com/tutorials/automation/create-a-list-of-open-safari-tabs-with-applescript/)
- [Reload Safari tabs in the background via AppleScript](http://hints.macworld.com/article.php?story=20090526225003768)
- [AppleScript To open a collection of Safari tabs](http://hints.macworld.com/article.)php?story=20110415065236737
- [Is it possible to create a multi-line string variable in a Makefile](http://stackoverflow.com/questions/649246/is-it-possible-to-create-a-multi-line-string-variable-in-a-makefile)

Feedback to this article is welcome. Please [email](mailto:florian@eckerstorfer.co) me or contact @braincrafted on [Twitter](http://twitter.com/braincrafted) or [App.net](https://alpha.app.net/braincrafted).
