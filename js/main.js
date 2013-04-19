var Tip = {
    params : {
        totalCount : undefined
    },
    showTip : function(tipNum) {
        if ( !tipNum ) {
            // caching
            if ( !this.params.totalCount ) {
                tipNum = this.params.totalCount = this.totalCounter();
            } else {
                tipNum = this.params.totalCount;
            }
        } else if ( tipNum === (this.params.totalCount + 1) ) {
            tipNum = 1
        } else if ( tipNum === 0) {
            tipNum = this.params.totalCount;
        }

        $.ajax({
            url : "model/tip"+ tipNum +".json",
            dataType : "json"
        }).done(function (data) {
            var tip = data.tip || ""
            ,   org = data.org
            ,   imgs = data.imgs || []
            ,   conts = ""
            ,   img
            ,   src
            ,   nl
            ,   i
            ,   ln;

            for ( i = 0, ln = imgs.length; i < ln; i++ ) {
                img = imgs[i];

                if ( typeof img != 'string' ) {
                    src = img.src;
                    nl = (img.nl === false ? "" : "<br/>");
                }

                conts += '<img src="'+ src +'"/>' + nl;
            }

            if ( org ) {
                org = '<span id="org" class="hidden">(' + org + ')</span>';
            } else {
                org = '';
            }

            $('#content').html(tip).append(org).append("<br/>" + conts).attr('data-tipId',tipNum);

            if ( $('input[name="latestTipShow"]').is(':checked') ) {
                docCookies.setItem("latestTipNum", $('#content').attr('data-tipId'));
            }

            if ( $('#org').length > 0 ) {
                $('#originalText').removeClass('hidden');
            } else {
                $('#originalText').addClass('hidden');
            }

        }).error(function () {
            Tip.showTip();
        })
    },
    totalCounter : function () {
        var isEOF = true
        ,   tipNum = 1;

        $.ajax({
            url : "/properties.json",
            dataType : "json",
            async : false
        }).done(function (data) {
            tipNum = data.totalCount;
        }).error(function () {
            while ( isEOF ) {
                $.ajax({
                    url : "model/tip"+ tipNum +".json",
                    dataType : "json",
                    async : false
                }).done(function () {
                    tipNum = tipNum + 1;
                }).error(function () {
                    tipNum = tipNum - 1;
                    isEOF = false;
                })
            }
        })

        return tipNum;
    }
};

// init Tip
(function () {
    $('#nextTip').bind('click', function() {
        var id = (parseInt($('#content').attr('data-tipId'), 10)) + 1;
        Tip.showTip(id);
        return false;
    });

    $('#previousTip').bind('click', function() {
        var id = (parseInt($('#content').attr('data-tipId'), 10)) - 1;
        Tip.showTip(id);
        return false;
    });

    $('input[name="latestTipShow"]').bind('change', function() {
        if ( $(this).is(':checked') ) {
            docCookies.setItem("latestTipNum", $('#content').attr('data-tipId'));
        } else {
            docCookies.removeItem("latestTipNum");
        }
    });

    $('#originalText').bind('click',function() {
        if ( $('#org').hasClass('hidden') ) {
            $('#org').removeClass('hidden');
        } else {
            $('#org').addClass('hidden');
        }
    });

    if ( docCookies.getItem("latestTipNum") ) {
        $('input[name="latestTipShow"]').attr('checked', true);
        Tip.showTip(docCookies.getItem("latestTipNum"));
    } else {
        Tip.showTip();
    }
}());