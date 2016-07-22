# Roadmap
Link to trello board

### 0.7.6
Goal here is to create easy process to user getting first grade

change initial root to undefined (which should work), and figure out why its acting weird. check load(store)
clean up as much code as possible esp app.js
re-enable fabric tracking

merge back in previous data

 - added fabric tracking to analytics middleware
 - changed login button to a yellow heart
 - removed auth listener, changed auth to custom device token
 - added back in redux storage
 - added rec loading state, and move rec display to RecList component
 - Removed step name from login
 - Add Rec modal dismisses
 - Removed currentRec (for now) and recView loads from redux list

### 0.7.7
Add these notes to Trello for Austen to see
timeout to loading recs from firebase/login to give app a sense of caedance (ux/onboarding)

consider building a more sophisticated onboarding messaging system
with messages living in redux to let user know how they are progressing (watch ui vid)
that includes feedback like 'your first rec!' this could solve some of the ux issues

consider updating firebase npm and adding ref to state
https://github.com/erikras/react-redux-universal-hot-example/issues/252

sorting be recr score.. really just improve recr score and recr list now
sort by recrs
major bugs on add/edit/remove grade
ask recr for more recs
give recr feedback
add "alert me" option to recs
integrate notifications

### 0.7.8
refactor stuff for better tracking

### 0.8
introduce friends list feature


### 0.9
sorting by friend grades

profile page with our own rec/recrs/grade score
ability to store recs i send (ui can be like yo login screen)
you can store recs you send
get a chaz bitly url (chaz.co or wahtever)


### 1.0
Release this version to the app store or external testing
add basic chat feature. focus on empathy
option to send "Started watching" to friend that gave rec
remove dependency on internet access.




### 2.0 (Visit Spencer)
 - Spend 2 days with spencer and refactor redux and firebase to a meteor server, refactor router, redesign data, add chat. possibly make this app like a tutorial app for spencer. open source it
 - Talk to spencer about
 - more data (rec type, recr score by type, grade by type, "why I liked it" aspect of the grade)
 - User tracking
 - pitch open sourcing this for his class
 - explore this..  https://github.com/FaridSafi/react-native-gifted-messenger
 - chaz integrate w podcasts somehow
 - Get it ready for useronboarding.com



### KNOWN CONCERNS
 - Currently and rec change re-populates/renders entire rec list in state
