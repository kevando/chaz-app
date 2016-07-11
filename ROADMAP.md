# Roadmap




### 0.7.3



 - Added google analytics tracking through custom middleware


### 0.8 (fix display)
make ui way more basic. look at trello app for this, and iphone settings
rec view screen font is too small, recr view: make score bigger
add back filters
recr screen with score large like
rec comment
recr comments
add deleteRec back
add userfeedback in settings (will be cool to turn this into a rec type. reward users with good quality feedback)

### 0.9
profile page with our own rec/recrs/grade score
ability to store recs i send (ui can be like yo login screen)

### 0.8


Loading state is pulsing heart, with random color
 update colors to scheme, probly want to create style sheet
this is the first version with recr view and rec view
fun loading states that make sense based on how data goes in
try to indicate something is new or recently added, or updated UI trick here (emoji)
add Rec View, make this editable (because people will make typos)
add settings page with feedback form
add analytics (try using segment and or mixpanel)
refactor style code like spencer said to
change styling to more like podcasts/trello, consider ui improvement to add/edit flow
  add friend % to rec list,  and improve some of the styling with emojis

recr view has list of their recs, sortable, filterable
add recr % to global rec list
people like clearing the red app notification number so use this to get users to complete recs
you can store recs you send

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
