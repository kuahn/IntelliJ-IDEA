(function() {
    function gestureStart() {
        for (i=0; i<metas.length; i++) {
            if (metas[i].name == "viewport") {
                metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
            }
        }
    }

    var metas = document.getElementsByTagName('meta')
    ,   i
    ,   method
    ,   noop = function () {}
    ,   methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ]
    ,   length = methods.length
    ,   console = (window.console = window.console || {});

    while ( length-- ) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
        for ( i=0; i<metas.length; i++ ) {
            if (metas[i].name == "viewport") {
                metas[i].content = "initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no";
            }
        }

        document.addEventListener("gesturestart", gestureStart, false);

        // #tip adjust iphone size
        $('h1').css('margin','2% 4% 0 4%');
        $('#tip').css('margin','0 4% 4% 4%');
        $('#contributor').css('margin','1% 4% 5% 4%');
        $('.medium').css('padding','.4em 1em .42em');
    }
}());
