;
requirejs.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        director: 'director',
        hl: 'bower_components/highlightjs/highlight.pack'
    },
    shim: {
        hl: {
            init: function(){
                return window.hljs;
            }
        }
    }
});
requirejs(['director','hl'], function(director,hl) {

    director.assign($('.parallax'),null, function($self, data) {
        var speed = 6;
        var offsetY = data.actorOffsetTop > 0 ? data.winHeight - data.actorOffsetTop : 0,
            ypos = -((data.winScrollTop + offsetY) / speed),
            coords = '50% ' + ypos + 'px';
        var styles = {};
        styles.backgroundPosition = coords;
        $self.css(styles);
    })
    // appear
    .assign($('.bi'), function($self) {
        $self.addClass('bounceIn');
    })
    ;

    director.direct();
    $('pre code').each(function(i, block) {
    hl.highlightBlock(block);
  });
});