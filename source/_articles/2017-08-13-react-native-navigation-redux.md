---
title: React Native, React Navigation and Redux
tags: [ react, react native, react navigation, redux ]
draft: true
---

One thing you need to get right if your [React Native](https://facebook.github.io/react-native/) app should truly feel like a native app is navigation. While React Native does not contain components to implement tab, drawer and stack navigations, there is [React Navigation](https://reactnavigation.org) which provides all of these. React Navigation is a great library that will save you hours of work and is very easy to use if you have a simple app. It also allows you to write your own [Redux](http://redux.js.org) reducers for greater flexibility. However, when your app grows and your navigation patterns get more complicated we found that the documentation was not very helpful and a lot of the solutions we encountered on StackOverflow and Github were either missing information or were not working for us. It took us literally weeks of development, debugging, research and reading of source code to find a solution that covers all of the features we wanted to have.

When we finally knew how all the moving parts worked together and we had a perfectly working navigation a colleague turned to me and asked "this is not that complicated after all, there is just not a single working example covering all of our requirements on the internet." My first thought was that if nobody has covered this yet, I should be the one writing it up.

First, let me walk you through the requirements we have for our navigation:

- Tab Navigation with a stack navigation inside each of the tabs.
- Screens can be part of multiple tabs.
- When pressing on a tab while inside the stack of this tab, you should get back to the root view of this tab.
- When pressing on a tab while on the root screen of this tab, the view should scroll to the top.
- Pressing on a tab can open a modal window. A modal is a screen that slides up from the bottom, hides the tab bar and when closed slides down.

When we first implemented this we encountered a few issues specific to React Navigation and we spent a lot of time solving these additional requirements:

- Back button should work inside the React Navigation header.
- Modals should be implemented with React Navigation, there should be no custom logic to open and close them.

In this article I am going to explain how to implement all of these requirements using React Navigation and Redux step-by-step.

### Table of Contents

1. [Setting up React Navtive and React Navigation](#setting-up-react-navtive-and-react-navigation)
2. [Configuring Nested Navigators](#configuring-nested-navigators)
3. [Using Redux to Manage the Navigation State](#using-redux-to-manage-the-navigation-state)
4. [Resetting the Tab State When Pressing on Active Tab](#resetting-the-tab-state-when-pressing-on-active-tab)
5. [Implementing Scroll to Top When Pressing on Active Screen](#implementing-scroll-to-top-when-pressing-on-active-screen)
6. [Opening Modal Screens from Tab Bar](#opening-modal-screens-from-tab-bar)

### Setting up React Navtive and React Navigation

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

I assume you already have a React Native project, but let's start with a brand new project. (If you don't have set up React Native yet, read *Building Projects with Native Code* section in [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)).

```bash
react-native init ReactNavigationReduxExample
cd ReactNavigationReduxExample/
```

Before you an start writing code you want to test if the React Native project works correctly by running it in iOS Simulator:

```bash
npm start
react-native run-ios
```

Next you need to add React Navigation to your project and rebuild the project:

```bash
npm install --save react-navigation
react-native run-ios
```

The first thing you need to create a `Root` component which you can invoke from both `index.ios.js` and `index.android.js`.

```js
// src/Root.js
import React from 'react';
import AppTabNavigator from './AppTabNavigator';

const Root = () => <AppTabNavigator />;

export default Root;
```

The `AppTabNavigator` component you see above is the next thing you need to implement. This is the instance of `TabNavigator` from React Navigation which you will use in your app as the main tab bar. 

```js
// src/AppTabNavigator.js
import { TabNavigator } from 'react-navigation';

import PhotosScreen from './screens/PhotosScreen';
import CameraScreen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';

export default TabNavigator({
  PhotoTab: { screen: PhotosScreen },
  CameraTab: { screen: CameraScreen },
  ProfileTab: { screen: ProfileScreen },
});
```

You have to create the screens of the tab navigator next. In the next chapter you create a `StackNavigator` for each of these, but right now these are just screens.

*I will omit `import` statements from now on.*

```js
// src/screens/PhotosScreen.js
const title = 'Photos';

export default class PhotosScreen extends React.PureComponent {
  static navigationOptions = { title };

  render() {
    return <View><Text>{title}</Text></View>;
  }
}
```

The static property `navigationOptions` is used by React Navigation to configure the screen and the tab[^react-navigation-navigation-options]. 

The components for `CameraScreen` and `ProfileScreen` look, except for `title` and the class name, exactly the same.

The last thing you do in this chapter is to invoke our `Root` component in `index.ios.js` and `index.android.js`. Replace everything in these files with the following line:

```js
// index.ios.js + index.android.js
AppRegistry.registerComponent('ReactNavigationReduxExample', () => Root);
```

If you run your app in the simulator there should be a tab bar at the bottom (in iOS) and you should be able to switch between tabs.

### Configuring Nested Navigators

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

Most apps need more than just a tab navigation. For example, when you are in the photos tab of Instagram you can press on a user and you get to see the profile of the user while the photos tab is still active. You need a `StackNavigator` as screen in each of your tabs. Because we nest a `StackNavigator` inside a `TabNavigator` we speak of *Nested Navigators*.

First you replace the screens in each with stack navigators, which you can call `PhotoTab`, `CameraTab` and `ProfileTab`.

```js
// src/AppTabNavigator.js
export default TabNavigator({
  PhotoTab: { screen: PhotoTab },
  CameraTab: { screen: CameraTab },
  ProfileTab: { screen: ProfileTab },
});
```

Next you create the tabs:

```js
// src/tabs/PhotosTab.js
export default StackNavigator(
  {
    PhotosScreen: { screen: PhotosScreen },
    ProfileScreen: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'PhotosScreen',
    navigationOptions: {
      tabBarLabel: 'Photos',
    },
  }
);
```

```js
// src/tabs/ProfileTab.js
export default StackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'ProfileScreen',
    navigationOptions: {
      tabBarLabel: 'Profile',
    },
  },
);
```

The syntax of `StackNavigator` looks very similar to `TabNavigator`. You pass the screen configuration as the first argument and additional options as the second argument. There is also `navigationOptions`, where you define the default navigation options[^react-navigation-navigation-options] for this stack. If a screen has the static property `navigationOptions` it will overwrite the default values you provide in the tab. One of the requirements we defined at the start of the article was to be able to put a screen into multiple tabs and in this step you put `ProfileScreen` in `PhotoTab` and `ProfileTab`. In this case it is very important to put the tab configuration (`tabBarLabel` and `tabBarIcon`) in the tab and not the screen. If you put the `tabBarLabel` in the screen then the value set there will show up as tab label in every tab the screen is shown.

To test the stack navigator you can add a button to `PhotosScreen` that navigates to `ProfileScreen` (inside the photots tab).

```
// src/screens/PhotosScreen.js
<Button title="Go to Profile" onPress={() => this.props.navigation.navigate('ProfileScreen')} />
```

You use the `navigate()` function that is part of React Navigation to perform this action. Every screen that is part of a navigator automatically gets the `navigation` property injected. If you run the code in the simulator you can now navigate from the photos screen to the profile screen and use the back button to get back to photos. Every `StackNavigator` by default has a header and React Navigation offers plenty of options to configure it[^react-navigation-headers].

### Using Redux to Manage the Navigation State

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

In this chapter you are going to add [Redux](http://redux.js.org) to your project, which will allow you to fully control the behaviour of React Navigation.

First you need to install Redux and React Redux.

```bash
npm install redux react-redux --save
```

*This is not a tutorial on Redux and I assume you know how Redux works and what actions and reducers are.*

The first thing you need is a reducer. You will create a `tabNavReducer` which will handle all actions related to the tab navigation.

```javascript
// src/reducers/tabNavReducer.js
export default (state, action) => {
  switch (action.type) {
    default:
      return AppTabNavigator.router.getStateForAction(action, state);
  }
};
```

Right now you only need the default case which can be handled by React Navigation, but you are already creating the extendable structure you need in the next few chapters to implement all of our requirements.

When working with Redux you always need to *connect* the component with the state. The component you need to connect in our case is `AppTabNavigator`. In this example you are therefore creating a new `Main` component which will contain the connected tab navigation.

```
// src/Main.js
const Main = ({ dispatch, tabNav }) => (
  <AppTabNavigator navigation={addNavigationHelpers({ state: tabNav, dispatch })} />
);

const mapStateToProps = (state) => ({
  tabNav: state.tabNav,
});

export default connect(mapStateToProps)(Main);
```

The most interesting piece in this piece is `addNavigationHelpers()` which allows you to pass a state and a dispatch function to the navigator. There are still two things missing: the store and passing the store to our app.

Let's start with creating store. For the purpose of this example the store will only contain the `tabNavReducer` you defined earlier in this chapter.

```javascript
// src/createStore.js
const appReducer = combineReducers({
  tabNav: tabNavReducer,
});

export default () => createStore(appReducer);
```

You can use the `Provider` component from React Redux to set the store for your app. To achieve this you replace the content the `Root` component to create a store and use the `Main` component instead of `AppTabNavigator`.

```
const store = createStore();

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
```

If you run the app now in the simulator everything should work as before, but now you are using our custom reducer to handle the navigation.

One last thing before we finish this chapter. In our team we have found some problems with the default *Back* button when using Redux. In this simple example everything should work fine, but if the *Back* button in, let's say the third tab, always takes you back to the first tab we have found that overriding the default back action helps.

```javascript
// src/reducers/tabNavReducer.js
case NavigationActions.BACK:
    return AppTabNavigator.router.getStateForAction(NavigationActions.back(), state);
```

### Resetting the Tab State When Pressing on Active Tab

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

Up until this point all you have done is to setup a pretty standard React Navigation project with Redux. There is plenty of documentation for everything up to this point, but now you are going to tackle a few of the common problems with React Navigatio and Redux. In this chapter I am going to show you how to reset the tab state when pressing on an active tab.

You can see this behaviour, for example, in the Instagram app. When you are in the *Home* tab press on the username of the poster of an image, press on an image, press on the username of someone who liked the picture, go to their list of followers and so on. It doesn't matter how deep you are in the stack of the navigation, whenever you press the *Home* tab again you will navigate directly back to the photos of your followings.

### Implementing Scroll to Top When Pressing on Active Screen

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

### Opening Modal Screens from Tab Bar

<small>Back to <a href="#table-of-contents">Table of Contents</a></small>

[^react-navigation-navigation-options]: [React Navigation: Screen Navigation Options](https://reactnavigation.org/docs/navigators/navigation-options)
[^react-navigation-headers]: [React Navigation: Configuring the Header](https://reactnavigation.org/docs/intro/headers)
