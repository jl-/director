## jquery.director.js

---

deps: [jquery]

### usage:

```javascript
requirejs(['jquery','director'],function($,director){
    director.assign( $('selectors'), /*elements*/

    function($actor){
        // do something when first appear....

    }, /* [callback], fired when this element first appear on browser's viewport */

    function($actor,data/* {winScrollTop,winHeight,actorOffsetTop,actorHeight} */){
        // do something when $acto is within browser's viewport and window is scrolling

    }, /* [callback], fired when this element is within win viewport and win is scrolling */

    function($actor){
        // do something when first disappear

    }/*[callback], fired when this element first disappear from browser's viewport */ 
    );

    director.direct(); // just call .direct() only once, you can assign other $actors later.
}); 
```

