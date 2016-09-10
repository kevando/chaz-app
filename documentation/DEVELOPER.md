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
- [Hot Push]: https://github.com/Microsoft/react-native-code-push
- [Tinder Swipe example]: https://github.com/brentvatne/react-native-animated-demo-tinder
- [Animation lib looks dope]: https://github.com/oblador/react-native-animatable

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



## Immutablejs Cheatsheet
The docs are not easy to read, so here are some quick notes on some of the functions that I need

### Lists
Assume we have a List of recs like:

`const recList = List.of(
  {id:1,title:'shawshank'},
  {id:2,title:'death star'},
  );`


#### Get most recent item in a List
`recList.last()`

#### Replace a rec item in a List
```
return recs.update(
  recs.findIndex(function(rec) {
    return rec.get("id") === action.payload.id;
  }), function(rec) {
    return Map(action.payload); // return entire rec
    //return rec.set("note", action.payload.note); sets individual field
  }
);
```

#### Iterate a List

you need to define the return value
```onboard.get('steps').map(function(step,index){
  // var status = "pending"; // does not error
  return(
    <View style={styles.row} key={step.get('label')} >
      <View style={styles.left}><Text style={label}>{index}. {step.get('label')}</Text></View>
      <View style={styles.right}><Text style={value}>status</Text></View>
    </View>
  );
  ```

this notation returns what is ever in loop
```
  onboard.get('steps').map((step,index) => (
    // var status = "pending"; // this will throw an error
      <View style={styles.row} key={step.get('label')} >
        <View style={styles.left}><Text style={label}>{index}. {step.get('label')}</Text></View>
        <View style={styles.right}><Text style={value}>status</Text></View>
      </View>
  ```  

### Filter a List
return this.props.recs.filter(rec => rec.get('type') == activeFilter);


### Find in a Map
var result = map.find(function(obj){return obj.get('id') === 4;});


append to map
var recWithRecr = rec.set('recr', recr)
