/*!
 * Jquery.director
 * 
 *
 */
(function(factory) {
    if(typeof define === 'function' && define.amd){
        define(['jquery'],factory);
    }else{
        window.director = factory(Jquery);
    }
})(function($) {

    var director = {};
    director.actors = [];
    director.options = {
        delay: 10,
        flush_after: 30,
        actors_appear_once: true,
        actors_disappear_once: true
    };

    function throttle(fn, delay, mustRunAfter) {
        var timer = null,
            t_pre = +new Date();
        return function() {
            var context = this,
                args = arguments,
                t_curr = +new Date();
            clearTimeout(timer);
            if (t_curr - t_pre >= mustRunAfter) {
                fn.apply(context, args);
                t_pre = t_curr;
            } else {
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            }
        };
    }

    director.config = function(conf) {
        $.extend(director.options, conf);
    };

    director.assign = function($actor, onAppear, onActing, onDisappear, options) {
        if (typeof onAppear === 'function' || typeof onActing === 'function' || typeof onDisappear === 'function') {
            $actor.each(function() {
                var $self = $(this);
                $self.onAppear = onAppear;
                $self.onActing = onActing;
                $self.onDisappear = onDisappear;
                $self.options = $.extend({}, options);
                director.actors.push($self);
            });
        }
        return this;
    };

    director.direct = function() {
        var $window = $(window),
            data = {},
            actorIndex,
            $actor = null;

        function action() {
            data.winHeight = $window.height();
            data.winWidth = $window.width();
            for (actorIndex = director.actors.length - 1; actorIndex >= 0; actorIndex--) {
                $actor = director.actors[actorIndex];
                if (!$actor.onAppear && !$actor.onActing && !$actor.onDisappear) {
                    director.actors.splice(actorIndex, 1);
                    continue;
                }

                data.winScrollTop = $window.scrollTop();
                data.actorOffsetTop = $actor.offset().top;
                data.actorHeight = $actor.outerHeight();

                if (data.winScrollTop + data.winHeight > data.actorOffsetTop && data.actorOffsetTop + data.actorHeight > data.winScrollTop) {
                    if (!$actor.appearing && $actor.onAppear) {
                        $actor.onAppear.call(this, $actor);
                        if ($actor.options.appear_once === true || ($actor.options.appear_once !== false && director.options.actors_appear_once)) {
                            delete $actor.onAppear;
                        }
                    }
                    if ($actor.onActing) {
                        $actor.onActing.call(this, $actor, data);
                    }
                    $actor.appearing = true;
                } else if ($actor.appearing) {
                    $actor.appearing = false;
                    if ($actor.onDisappear) {
                        $actor.onDisappear.call(this, $actor);
                    }
                    if ($actor.options.disappear_once === true || ($actor.options.disappear_once !== false && director.options.actors_disappear_once)) {
                        delete $actor.onDisappear;
                    }
                }
            }
        }
        action();
        $window.scroll(throttle(action, director.options.delay, director.options.flush_after));
        delete director.direct;
    };
    return director;
});
