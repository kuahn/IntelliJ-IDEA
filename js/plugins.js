var docCookies = {
    getItem: function (sKey) {
        if (!sKey || !this.hasItem(sKey)) {
            return null;
        }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toGMTString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) {
            return;
        }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = unescape(aKeys[nIdx]);
        }
        return aKeys;
    }
};

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
