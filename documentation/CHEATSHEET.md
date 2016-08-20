

## Lists
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
