# chaz
iOS app written with React Native.

#### Configure Development environment

```sh
$ karma start
git clone https://github.com/kevando/chaz.git
npm3 install
npm start
```
Run xcode simulator

For more information about setting up a local dev environment, see the [React Native Documentation](https://facebook.github.io/react-native/docs/getting-started.html#content)

## Deployment Steps
### Build Steps
 - update version
 - do i need to bundle?
 - uncomment line
 - Disable logging (I think)
 - change to generic ios device
 - product > archive

### iTunes stuff
 - validate (optional)
 - upload to app store
 - uncheck "include bitcode"

### Distributing beta to new users (Internal Testing via Testflight)
 - log into itunesconnect
 - check latest build and distribute

 Add iTunes Connect User
 anna got email

 clicked ok to terms
 has to log into itunes connect

 she now shows up as admin under users

 add her to internal tester list under app
 save it, and she gets notified via email

 she checks email on phone
 she has to download testflight
 and enter the app code (she didnt have to do this)

## Screenshots

#### Welcome Sceen:
![alt text][welcome]

#### Empty Sceen (no recommendations):
![alt text][empty]

#### Recomendation List (aka queue):
![alt text][list]

#### Add Rec (with quick add for recommender):
![alt text][add rec]

#### Friend List (score value based only on graded recs):
![alt text][friend list]

[welcome]: https://i.imgur.com/0rM849v.png "Welcome Screen"
[empty]: https://i.imgur.com/ONu91qL.png "Empty Screen"
[list]: https://i.imgur.com/bTAd5Ib.png "Rec List"
[add rec]: https://i.imgur.com/Rey2jLN.png "Rec Add"
[friend list]: https://i.imgur.com/nelxzjt.png "Friend List"



### Libs & Resources
https://github.com/wix/react-native-navigation
https://medium.com/@spencer_carli
https://github.com/michaelcontento/redux-storage
https://facebook.github.io/react-native/docs/flexbox.html
https://docs.fabric.io/apple/beta/beta-walkthrough.html
