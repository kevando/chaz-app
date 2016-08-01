# Developers
Here are some resources and notes about the development of chaz.

### Development guidelines
 - function prefixes
 - render(functions that return renderable object)
 - on(callbacks for events, most likely a user click)


## Libs & Resources
- https://medium.com/@spencer_carli
- https://github.com/michaelcontento/redux-storage
- https://facebook.github.io/react-native/docs/flexbox.html
- https://docs.fabric.io/apple/beta/beta-walkthrough.html
- [Chat UI]: https://github.com/FaridSafi/react-native-gifted-chat

## Configure Development environment*

```sh
git clone https://github.com/kevando/chaz.git
npm3 install
npm start
```

\* The package.json file is totally incomplete and these instructions won't  work. If you'd like to set up a local instance, open an issue and I will update everything proper.

## Distribution Steps
### Build Steps
 - update version
 - uncomment js line in AppDelegate
 - Disable logging package (optional)
 - xcode: change to generic ios device
 - xcode: product > archive

### uploading to iTunes
 - validate (optional)
 - upload to app store
 - uncheck "include bitcode"
 - This will take about 10 minutes for Apple to validate

### Notifying existing users (Internal Testing via Testflight)
 - log into itunesconnect
 - check latest build and distribute

### Adding new beta test users
 - Add iTunes Connect Admin User by Apple ID email
 - They get an email and agree to terms
 - Now this user shows up in iTunes connect
 - Click to the app and add this user
 - Save
 - User will now get an email and have to download test flight
 - Enter the redeem code (optional)
