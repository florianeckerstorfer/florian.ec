---
slug: ios-search-bar-ionic
title: 'Replicating the iOS Search Bar with Ionic'
date: 2015-07-25
category: Development
tags: [ios, ionic, cordova, search, ux]
---

In iOS there is a very specific interaction when using a search bar in a list view. When the user focuses the input field, the field moves into the header and the cancel button slides in from the right. The interaction looks like this in Contacts, but it is also used in Mail and apps like Tweetbot.

![iOS Search Bar Interaction](/content/blog/2015-07-25-ios-search-bar-ionic/ios-search-bar-ionic)

I wanted to replicate the functionality in [Ionic](http://ionicframework.com), a HTML5 framework to create mobile apps using [Cordova](http://cordova.apache.org).

I am going to show you how to create a `ion-search-bar` directive as well as the required CSS to replicate this functionality with Ionic. Lets first take a look at the markup that describes our interface

```html
<ion-nav-bar>
  <!-- Nav Bar Stuff -->
</ion-nav-bar>
<ion-search-bar placeholder="Search Books"></ion-search-bar>
<ion-content class="has-header has-search-bar">
  <!-- Content Stuff -->
</ion-content>
```

This is pretty simple. Please note that I added a `has-search-bar` class to the `ion-content` element. Now we need a directive to actually create the search bar. The code pretty straight forward (as straight forward as Angular can be), the important stuff happens in the event handler for `focus` and `blur`.

```javascript
angular
  .module('florian.directives', [])
  // Create a `ion-search-bar` directive
  .directive('ionSearchBar', function($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: { search: '=?filter' },
      link: function(scope, element, attrs) {
        scope.placeholder = attrs.placeholder || '';
        scope.search = { value: '', focus: false };
        if (attrs.class) {
          element.addClass(attrs.class);
        }

        // We need the actual input field to detect focus and blur
        var inputElement = element.find('input')[0];

        // This function is triggered when the user presses the `Cancel` button
        scope.cancelSearch = function() {
          // Manually trigger blur
          inputElement.blur();
          scope.search.value = '';
        };

        // When the user focuses the search bar
        angular.element(inputElement).bind('focus', function() {
          // We store the focus status in the model to show/hide the Cancel button
          scope.search.focus = 1;
          // Add a class to indicate focus to the search bar and the content area
          element.addClass('search-bar-focused');
          angular
            .element(document.querySelector('.has-search-bar'))
            .addClass('search-bar-focused');
          // We need to call `$digest()` because we manually changed the model
          scope.$digest();
        });
        // When the user leaves the search bar
        angular.element(inputElement).bind('blur', function() {
          scope.search.focus = 0;
          element.removeClass('search-bar-focused');
          angular
            .element(document.querySelector('.has-search-bar'))
            .removeClass('search-bar-focused');
        });
      },
      template:
        '<div class="search-bar bar bar-header item-input-inset">' +
        '<label class="item-input-wrapper">' +
        '<i class="icon ion-ios-search placeholder-icon"></i>' +
        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
        '</label>' +
        '<button class="button button-clear button-positive" ng-show="search.focus" ng-click="cancelSearch()">' +
        'Cancel' +
        '</button>' +
        '</div>',
    };
  });
```

All the styling and animation is defined in CSS, or in my case in Sass. If you look at the template code in the directive above you can see that I am (misusing) the `bar-header` to position the search bar. Therefore we need to move the search bar and the content area a few pixels down in the unfocused state and back up in the focused state. One thing in the code below is still bothering me but I couldn't figure out a nicer solution and that is the `margin-right` right in `button.ng-hide`. What happens is that Angular hides the cancel button using `display: none` but this cannot be animated and I could not figure out another way to move the _Cancel_ button off screen in an animatable way. If you have any suggestions please contact me.

```css
.search-bar {
  top: 44px;
  transition: all ease-in-out 250ms;
  z-index: 15;

  button,
  input {
    transition: all ease-in-out 250ms;
  }

  button.ng-hide {
    margin-right: -67px;
  }

  &.search-bar-focused {
    top: 0;
  }
}

.has-search-bar {
  margin-top: -2px;
  top: 88px;
  transition: top ease-in-out 250ms;

  &.search-bar-focused {
    top: 44px;
  }
}
```

This code works great in the browser (I tested it in Safari, Chrome and Firefox), but on iOS we need to consider the status bar at the top. Bascially we need to add `20px` to all the `top` values and remove the top margin of the input field when the search bar is not focused. As you can see in the very first selector, that code is not required if your app runs in fullscreen.

```css
.platform-ios.platform-cordova:not(.fullscreen) {
  .search-bar.bar-header {
    height: 44px;
    top: 64px;

    &.search-bar-focused {
      height: 64px;
      top: 0;
    }
  }

  .search-bar.bar-header.item-input-inset {
    .item-input-wrapper {
      transition: all ease-in-out 250ms;
      margin-top: 0 !important;
    }
  }

  .search-bar.search-bar-focused.bar-header.item-input-inset {
    .item-input-wrapper {
      margin-top: 19px !important;
    }
  }

  .has-search-bar {
    top: 108px;

    &.search-bar-focused {
      top: 64px;
    }
  }
}
```

In iOS simulator the interaction looks like this:

![/content/blog/2015-07-25-ios-search-bar-ionic/ionic-search-bar.gif](iOS Search Bar Interaction)

If you look closely at the animation and the one above with the original iOS behaviour you can see that I am not using a grey background for the search bar. Personally I like the white background better.
