# Roadmap


### 0.7.2
Change all the name from chaz beta to chaz. change icon to purple
clean all the display code
document clicks
add very minimal color scheming with emoji likes (this should help structure mp)
add mixpanel
enable proper log in with logging in state
consider dropping bottom nav bar
look at phone screenshots for design help

### 0.7.3 (ui/ux mvp.. dist this to auten, rob)
Create document that denotes colors and actions. Each tap should be documented here
add back in list filters
add userfeedback in settings (will be cool to turn this into a rec type. reward users with good quality feedback)

### 0.8 (improve ui/ux)

add rec comments
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
