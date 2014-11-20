## director.js

===

deps: [jquery]

===

[demo](http://jl-.github.io/director/)

### usage:

```javascript
requirejs(['jquery','director'],function($,director){
    // config.[optional,default attr values:10,30,false,false]
    director.config({
        delay: 10,
        flush_after: 30,
        actors_appear_once: true,
        actors_disappear_once: true
    });

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
        ,{
            appear_once: false
        } /*configs. optional*/
    );

    director.direct(); // just call .direct() only once, you can assign other $actors later.
}); 
```

