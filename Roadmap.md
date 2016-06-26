# Roadmap


### Version 0.5
#### Version I plan to push to people
include app flow (dev doc)
default to sort by newest
i think filters have a bug
add recs to recr view page
fix auth flow. Manually create usernames. limits access
refactor firebase database to correct names (create data versioning scheme)
hopefully fix

### notes ------------------


probly just storing the auth token in the state

chaz todo

username auth
imsg onboarding
start migrating ui/ux ideas from evernote to here


beta onboarding idea:
 username > optional phone# to be a good beta tester
 "Chaz helps you remember the awesome things your friends tell you about" (this needs to be KILLER)
  chaz encourages you to develop deeper/better relationships with the people in your life by helping you remember why the recommend things do you
  giving us your phone number helps us communicate updates we make to your content
    for example, if you write down "that jim carey movie where he is a pet detective, we want to change it to ace venture, but we want to make sure you get a heads up"

  create user paths based on the "moment" in which they first open the app
    rather than guessing what their moment is, ask!



UI concepts
horizontal scroll
onDelete = this rec will self destruct in 5 seconds. your friend gets notified if it blows up



data

users/id/
  recs(id,title,grade,recr_id,createdAt)
  recrs(id,recs,)


Figure out how to fucking load recs corretly
sorting kinda works

### 0.3
Sets in place the data structure for the MVP
Integrates GA tracking
All firebase code is refactored into Redux format
Create objects for recrs

### 0.4
Address onboarding issues
  Ask Rob what our beta onboarding should be like (assuming YC)
Implement color coordinated design
deploy using codepush



Add notifications
