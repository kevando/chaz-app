# Roadmap


### 0.7.2
style rec then clean kitchen
style recr
style recr list
add rec to recr view
go back and fix style on rec item
clean all the display code
add very minimal color scheming with emoji likes (this should help structure mp)
look at phone screenshots for design help
change icon to purple

add mixpanel logging
 Rec Added {rec title}

 - Removed bottom tabs, added rec button

### 0.7.3 (ui/ux mvp.. dist this to auten, rob)
Create document that denotes colors and actions. Each tap should be documented here
add back in list filters
enable proper log in with logging in state
add userfeedback in settings (will be cool to turn this into a rec type. reward users with good quality feedback)


### 0.8 (improve ui/ux)

add rec comments
profile page with our own rec/recrs/grade score
make login very much like snapchat
all data entry should operate like that (input,add,keyboard)
better rec view page
create some sort of style guide
friend page has friend data
probly need to look more into immutable, so data isnt sucha  bitch to work with
add "logging in" state
incorp color scheme
mp tracking
Loading state is pulsing heart, with random color
 update colors to scheme, probly want to create style sheet
add filter back in
this is the first version with recr view and rec view
GIANT BUTTONS, like yo
fun loading states that make sense based on how data goes in
try to indicate something is new or recently added, or updated UI trick here (emoji)
now that i have friend lists, refactor the firebase/state data so it makes more sense
friend score as emoji scale. make this part of the improved design shit
add Rec View, make this editable (because people will make typos)
add settings page with feedback form
add analytics (try using segment and or mixpanel)
refactor style code like spencer said to
change styling to more like podcasts/trello, consider ui improvement to add/edit flow
  add friend % to rec list,  and improve some of the styling with emojis

recr view has list of their recs, sortable, filterable
add recr % to global rec list
people like clearing the red app notification number so use this to get users to complete recs


### 0.9 (Improve onboarding)
use emoji's for the categories, user score, grades, (more data)
animate log in, fun screen when there is no, or few recs

### 0.9
Your rec list is basically your chat list. but chat is super duper limited.
  keep the absolute core of empathy only here


### 1.0
 - Spend 2 days with spencer and refactor redux and firebase to a meteor server, refactor router, redesign data, add chat. possibly make this app like a tutorial app for spencer. open source it
 - more data (rec type, recr score by type)
 - App notifications.
change load screen
 ios/chaz/base/launchscreen.xib (line 21)


### KNOWN CONCERNS
 - Currently and rec change re-populates/renders entire rec list in state
