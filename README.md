# FormLoader
A small helper library that scans a container for all input elements and gets or    sets their respective values.


jQuery is a dependency to shorten the code, but certainly nothing is too complex
here, so this dependency will be removed in a sibling library. But if you're
already using jQuery, may as well save some space by using this version.

## Example
index.html
```
<div id="myForm">
 <input type="text" class="form-control" name="name">
  <button id="btnScrape">Scrape</button>
</div>
```

index.js
```
import FormLoader from 'FormLoader.js';
let o = {name:"Test Name"};
let formLoader = new FormLoader($("#myForm"));
formLoader.deserialize(o);
$(function(){
  $("#").click(function(){
    console.log(formLoader.serialize);
  });
})
```
