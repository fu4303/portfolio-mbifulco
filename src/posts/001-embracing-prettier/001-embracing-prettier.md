---
title: 'Embracing Prettier'
path: '/embracing-prettier'
date: '2019-02-25'
coverImage: './cover.png'
excerpt: "VSCode's format-on-save function was parsing my jsx React components like normal JavaScript. Maddening - yes, but the fix was simple."
---

[Prettier](https://prettier.io/) is "an opinionated code formatter", built to fit into your developer workflow. It's been out in the world for quite a while now, but until today, I had never successfully used it in any project I worked on. In truth, there's a few reasons for this:

1. I was really used to (and really happy with) using [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) for all of my projects. Across the board, I'd configured every node/react/js-based project to use the same airbnb config, and had a functional workflow for ensuring code quality at some level through those lint checks.
2. I was too busy to switch. This is a bit of a bullshit answer, since one of prettier's biggest advertised features is its lightweight setup. That's not to mention the amount of time that prettier _should_ save me once in use. A bad excuse.
3. **I could never get it to work(!)** So - despite being adept at reading through docs, every single time I started down the path of setting up prettier on a project, I couldn't get it to work. Despite my peers shouting from the rooftops about how deliciously sublime prettier makes the development workflow, it seemed like a permanent impasse.

## So what was the problem, then?

Well, it all came down to a formatting issue. The header image for this article tells the story: every time I installed prettier, when I triggered formatting with Visual Studio Code's `formatOnSave` setting, my React/jsx components would get scrambled. After some squinting, it appears that something was telling my IDE to treat these jsx files as pure Javascript, where `<` means "less than", and shouldn't ever be treated as the start of a component `<tag>`.

## The fix

In my case, it came down to a conflicting extension for Visual Studio Code. It turns out that the [beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) plugin takes precedence over Prettier in its default configuration. After some plucking around, I determined that if I _disable_ Beautify in the workspace where I'm using prettier, everything just suddenly... works. 😍

![disable beautify in your project workspace, and everything gets better](img-000-beautify.png)

In my case, that was it! Prettier is now working as avertised.

The jury's still out on whether prettier is lifechanging for me, but it's working, at the very least. My next step was to jump into `.prettierrc`, and override _just a few_ settings:

```json
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "tabWidth": 2
}
```

_(note: this is my first time writing JavaScript without semicolons. I'm really breaking through the glass ceiling now!)_