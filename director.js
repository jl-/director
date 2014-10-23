;
define(['jquery'], function($) {
    var director = {};
    var actors = [];


    director.assign = function($actor, acb, dcb) {
        if (typeof acb === 'function' || typeof dcb === 'function') {
            $actor.each(function() {
                var $self = $(this);
                $self.onappear = acb;
                $self.ondisappear = dcb;
                actors.push($self);
            });
        }
    };

    director.direct = function() {
        var $window = $(window),
            winScrollTop,
            winHeight,
            actorOffsetTop,
            actorHeight,
            actorIndex,
            staging = true,
            $actor = null;
        $window.scroll(function(){
            staging = true;
        });

        function action() {
            if (staging) {
                winScrollTop = $window.scrollTop();
                winHeight = $window.height();
                for (actorIndex = actors.length - 1; actorIndex >= 0; actorIndex--) {
                    $actor = actors[actorIndex];
                    if (!$actor.onappear && !$actor.ondisappear) {
                        actors.splice(actorIndex, 1);
                        continue;
                    }
                    actorOffsetTop = $actor.offset().top;
                    actorHeight = $actor.height();

                    if (winScrollTop + winHeight > actorOffsetTop && actorOffsetTop + actorHeight > winScrollTop) {
                        $actor.appearing = true;
                        if ($actor.onappear) {
                            $actor.onappear.call(this, $actor);
                            delete $actor.onappear;
                        }
                    } else if ($actor.appearing && $actor.ondisappear) {
                        $actor.ondisappear.call(this, $actor);
                        delete $actor.ondisappear;
                    }
                }
                staging = false;
            }
            if (actors.length > 0) {
                window.setTimeout(action, 600);
            }
        }
        window.setTimeout(action, 600);
        delete director.direct;
    };

    return director;
});