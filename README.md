## jquery.director.js

---

deps: [jquery]

### usage:

```javascript
requirejs(['jquery','director'],function($,director){

    director.assign( $('selectors'), /*elements*/
        function($actor){
            // do something when first appear....
            console.log('first appear...'); 
            $actor.addClass('fadeIn');
        }, /* [callback], fired when this element first appear on browser's viewport */
        function($actor,data/* {winScrollTop,winHeight,actorOffsetTop,actorHeight} */){

        }, /* [callback], fired when this element is within win viewport and win is scrolling */
        function($actor){
            // do something when first disappear
            console.log('first disappear');
            $actor.addClass('fadeOut');
        }/*[callback], fired when this element first disappear from browser's viewport */ 
    );
    director.direct();

});
```

