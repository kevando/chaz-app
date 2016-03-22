- I personally like to keep the initialization stuff in an `app/index.js` file. This would be things like setting up the redux store and initializing firebase. Keeps your application code as clean as possible.
- **Response:** I moved app.js to this index.js

- Avoid using `NavigatorIOS` if possible. It's no longer supported. Consider plain `Navigator` or `ExNavigator` - there are other options as well.
- **Response:** This makes sense, NavigatorIOS was more of a quick solution and I plan to change it later.

- When you're `connect`ing a component only pass the state and actions that are relevant to that component and it's children. I'm not sure if there are any performance implications here but it will at least keep your props cleaner which may help debugging. This should help in places like [this](https://github.com/kevando/chaz/blob/recr-feature/app/containers/ChazApp.js#L110-L117).
- **Response:** So this where probly my biggest confusion with Redux.

- Read through [these docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) a few times to better understand the `connect` function better. It's confusing but powerful.
- **Response:** Thanks! I am still rather confused, but much less so than before and will continue to explore this.

- Put Firebase init in a top level folder and just require it wherever you need it. For example `app/firebase.js`. Would probably only need to use firebase inside of your redux action creators. You should only ever have to instantiate it once.
- **Response:** Ah yes that is some leftover code in `ChazApp.js` I only actually use it in an action file but now that i am going to split that up, I see the value of initializing it in a single spot.

- Follow an eslint style guide. General code style improvements. Stick to es6
- **Response:** Yeah this is me being lazy and quickly taking code from various places. aka my frankenstein

- Can be much more explicitly in how redux is use. Don't just pass all of the redux store to every connected component - only what you need. Same with actions.
- **Response:** Again, this is where I have the biggest confusion and will read more into it. Thanks for pointing this out.

- I never use the `use strict` b/c idk what it actually does
- **Response:** Me neither. more frakenstein stuff

- `app/components` is set up well. They're all "dumb" components which is great. Could also set them up as [stateless functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
- **Response:** Hmm, so when it's simply a render function, I don't need all the other stuff. I like this

- Whenever you start setting nested attributes in a reducer file consider breaking that reducer up into smaller ones via `combineReducers`
- **Response:** Wow, so I started doing this and along with that logger, it really showed me that I was not totally aware of how this all worked.

- Looking at redux actions I like to follow this pattern, and it may be common practice, but when using the thunk middleware set up two associate redux actions. One that serves as a temporary update, dispatched prior to the api call, that serves as optimistic UI and then one that updates the UI with the result of the api call. For example: thunk action = `createUser` would first invoke the `createUserLocal` redux action which instantly updates the store. It then makes the firebase api call. Then it will call a redux action `createUserServer` which knows how to handle the response and writes to the redux store. Your application code only ever interacts with a single, `createUser`, action but you get some optimistic UI built in. optimistic UI FTW
- **Response:** This is awesome and optimistic UI blew my mind when I used meteor (finally I knew how reddit did it with the upvotes!) I am going to implement this

- Confused regarding what `rec` and `recr` are and how they're different
- **Response:** Bad naming convention by me (partly intential so Im forced to change it soon) rec = object recommended and recr = the person who recommended it

- Use this logger middleware to watch how your redux state changes. It's awesome https://github.com/fcomb/redux-logger
- **Response:** Yep. this is awesome. thanks!
- **Redux Data** I store the data in redux with a listener function, so any time that firebase updates, it fires off an event to update my redux data. This works great, but it creates some confusing moments when internet is slow, so I'm not happy with how I implemented it
