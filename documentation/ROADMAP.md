# Product Roadmap
Here is a grouped list of planned features, broken out by version. To understand why it's done like this, check out the onboarding doc.

# 0.9 workspace ------------------------------------------------------------

look at popup animated and try to understand how this works

onboarding mvp is there!
work on transitions, profile page with onboard status, logout button


/ ui improvements
recrs (create popup for when there are many recrs to choose from)

firebase sync: fix welcome message and how it pulls from fb on "auth" and where it sets initial scene
analytics middleware
and thats a release

better rec keyboard
better edit text status and onComplete feedback
look at origami for ui ideas

---
Cleanup
app.js code add comments from app_old.js
do something better w app loading scene and appcheckuser
consider better file structure
dropdown overlay is all bugged and FUCKED UP

add mixpanel back, WITH VERSIONING
remember to migrate user data




 - refactored app so its offline by default
 - Changed navigator API
 - Added some janky animation to welcome page
 - Changed the navbar height from to

=---

# 0.10 (resume of 0.8 basically)

created the initial onboarding (first 3 steps)
kinda janky but i think it should work great once i get the wording better
probably should store the conditions to move to the next step in the onboarding

store onboard status in firebase
then go through evernote, clean notes and get ui ideas

edit rec type

recr view pages with rec List
rec grades with recr scores


add onboarding progress to profile screen with current process

validate recr does not already exists
assign emoji faces to recrs, give it some order or random

improve styling across the board, while i build onboarding
list style, focus on making look good for all situations (w recr)
  yik yak for inspiration
this screen says alot. very confusing... https://i.imgur.com/7hvrZdy.png

get this ready to deploy to fabric, I want to test asap how grading will work
login is pretty much set now how I want it. Code is janky as fuck tho. so fix that
need to be careful about onboarding getting out of sync. how to protect?

remove blue from filter nav shit

# /0.8 workspace ------------------------------------------------------------

### Version 0.8
 - Significantly improve the onboarding
 - Add Rec commments
 - Introduce the recommender
 - refactored to new firebase + offline support

### Version 0.9
 - Introduce Rec grades
 - Add hyperlink ability
 - Add reminders (with notifications)

### Version 1.0 (Release to app store)
 - Add Friend List page
 - Add a profile page that displays user's rec/recr/grade/score data
 - Add ability to save recs that I give people
 - Remove dependency on internet access.

### Version 1.x
 - Chat feature
 - option to send "Started watching" to friend that gave rec
 - Get it ready for useronboarding.com
 - Premium service: we find links to the shit you get rec'd
