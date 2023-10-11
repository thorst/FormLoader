# jQuery-FormLoader
A small helper library that scans a container for all input elements and gets or    sets their respective values.


jQuery is a dependency to shorten the code, but certainly nothing is too complex
here, so this dependency will be removed in a sibling library. But if you're
already using jQuery, may as well save some space by using this version.

## Example
index.html
```
<div id="myForm">
 <input type="text" name="name">
  <button id="btnScrape">Scrape</button>
</div>
```

index.js
```
import FormLoader from 'FormLoader.js';

$(function(){

  // Populate the form
  let o = {name:"Test Name"};
  let formLoader = new FormLoader($("#myForm"));
  formLoader.deserialize(o);

  // Scrape the form
  $("#btnScrape").click(function(e){
    e.preventDefault();
    console.log(formLoader.serialize);
  });
})
```

The above code will populate the name input once the page completes loading. When you push the button it will grab
the value of the name feild and write it to the console. This is obviously most relevant when you have a form with
many fields.
