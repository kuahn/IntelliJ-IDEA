// Avoid `console` errors in browsers that lack a console.
(function() {
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

    function gestureStart() {
        for (i=0; i<metas.length; i++) {
            if (metas[i].name == "viewport") {
                metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
            }
        }
    }

    if ( navigator.userAgent.match(/iPhone/i) ) {
        for ( i=0; i<metas.length; i++ ) {
            if (metas[i].name == "viewport") {
                metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
            }
        }

        document.addEventListener("gesturestart", gestureStart, false);

        // #tip adjust iphone size
        $('#tip').css('2% 4%');
        $('.medium').css('.4em 1em .42em');
    }
}());
