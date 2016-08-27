#### 0.9
- refactored app so its offline by default
- Changed navigator API
- Added some janky animation to welcome page
- Added recr
- added custom error logging to fabric (not sure if this works)

### 0.7.8
 - added fabric tracking to analytics middleware
 - changed login button to a yellow heart
 - removed auth listener, changed auth to custom device token
 - added back in redux async storage
 - added rec loading state, and move rec display to RecList component
 - Removed step name from login, now authenticates by device ID
 - Add Rec modal dismisses
 - Removed currentRec and recView loads from redux list
 - Removed recr and grade for now to focus on ux simplicity
 - Added recType and some filters

### 0.7.5 (focus on phase 1)
 - Remove dude from rec input, auto pull up keyboard
 - Fixed log out bug
 - Remove grade, delete rec
 - redirect to rec view after adding rec
 - improved reclistItem style
 - Removed friend list screen

 ## Screenshots
Here are some selected screens from the latest version.
### Welcome Sceen:
![alt text][welcome]

### Empty Sceen (no recommendations):
![alt text][empty]

### Recomendation List (aka queue):
![alt text][list]

### Add Rec (with quick add for recommender):
![alt text][add rec]

### Friend List (score value based only on graded recs):
![alt text][friend list]

[welcome]: https://i.imgur.com/0rM849v.png "Welcome Screen"
[empty]: https://i.imgur.com/ONu91qL.png "Empty Screen"
[list]: https://i.imgur.com/bTAd5Ib.png "Rec List"
[add rec]: https://i.imgur.com/Rey2jLN.png "Rec Add"
[friend list]: https://i.imgur.com/nelxzjt.png "Friend List"


### 0.7.4 (dist: Rob and Anna)
 - Allows recr assign from a list
 - Delete Recr if he has no recs
 - Improved rec view
 - Changed settings to profile

### 0.7.3
 - Added google analytics tracking through custom middleware


### 0.7.2 (dist to austen)
 - Removed bottom tabs, added rec button
 - Improved reclistitem,recview,recrview
 - Improved some of the display code
 - Added emoji and some color style
 - Changed launch icon color
 - Added log in screen back

### 0.7.1
 / deploy make sure it builds
 - totally refactored with new router
 - Add Rec is now a page
 - Improved listitem


### 0.6
 - Fixed sort/filter & added sort by best
 - Added some emoji stuff and updated react and all the modules, except firebase.
 - Mostly for dist with a new xcode project
 - Create a color scheme that works for the background app image, which is required for dist
 - Updated color scheme a bit
 - Added indexOn to recrs.name in firebase
 - Also disabled async storage for this version. for testing
