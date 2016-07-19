# Roadmap


### 0.7.6


remove name from loginscreen, also remove pulse code
add some sort of timeout to loading recs from firebase
fix bug where add rec modal is not dismissed on load state
consider building a more sophisticated onboarding messaging system
add this to the onboarding doc, and implement it in redux State
also watch ui video at this point

Do a fabric deploy, possibly as a different app name so not to overwrite

loading recs for the first time shouldnt need to happen. the app should be aware
there are no recs after the first login

make rec data immutable, get this working solid. load recs from visible List

consider updating firebase npm and adding ref to state
https://github.com/erikras/react-redux-universal-hot-example/issues/252

way better venmo style add rec
way better data validation, not case sensitive, no empty strings
modal does not dismiss on addRec
update recr does not pull from list
add back filters

also lots of bugs
add date to rec view and rec list
improve profile page a bit, also make swiping the right direction, you are the yellow
be more considerate about what props each component needs, and where/when to send them
recr comments aka reminder
add rec from recr page
add rec button to recr view
update readme and reply to doorbell, also update onboarding with funnel thoughts

logout doesnt work
change initial root to undefined (which should work), and figure out why its acting weird. check load(store)
clean up as much code as possible esp app.js
re-enable fabric tracking

 - added fabric tracking to analytics middleware
 - changed login button to a yellow heart
 - removed auth listener, changed auth to custom device token
 - added back in redux storage
 - added rec loading state, and move rec display to RecList component

### 0.7.7
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
