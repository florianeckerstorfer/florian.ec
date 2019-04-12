---
title: "Mock Gatsby's useStaticQuery with Jest"
date: '2019-04-04T16:31:00.284Z'
description: 'Explanation how we can mock the useStaticQuery React hook provided by Gatsby in Jest'
tags: [gatsby, react, jest, testing, mock]
category: Development
---

When developing this blog I used a React hook for the very first time: `useStaticQuery()` from Gatsby. This hook executes a GraphQL query and returns the data to the component. In my case I use it to query the site metadata in a component and I want to mock the `useStaticQuery()` hook to verify that my components behaves correctly based on the result of the query.

At first I was a bit confused since I have never mocked a React hook before but then I remembered that this is JavaScript where everything is a function and you can easily create a mock of a function using `jest.spyOn()` and then mock the implementation using `.mockImplementation()`.

```javascript
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
useStaticQuery.mockImplementation(() => ({
  site: {
    siteMetadata: {
      author: 'Florian',
      description: 'My description',
      title: 'My Title',
    },
  },
}));
```

As far as I know it is not possible in Jest to spy on a single export from a module, you always have to import the module. However, Gatsby does not have a default export that contains `useStaticQuery`, but you can use the `*` to put all exports from Gatsby into a module.

```javascript
import * as Gatsby from 'gatsby';
```
