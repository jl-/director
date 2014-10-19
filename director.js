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
            winOldScrollTop = -1,
            winScrollTop,
            winHeight,
            actorOffsetTop,
            actorHeight,
            actorIndex,
            $actor = null;

        function scrollCheck() {
            winScrollTop = $window.scrollTop();
            if (winScrollTop !== winOldScrollTop) {
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
                winOldScrollTop = winScrollTop;
            }
            if (actors.length > 0) {
                window.setTimeout(scrollCheck, 600);
            }
        }
        window.setTimeout(scrollCheck, 600);
        delete director.direct;
    };

    return director;
});