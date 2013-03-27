var Tip = {
    showTip : function(tipNum) {
        if ( tipNum == 0 ) {
            tipNum = this.tipTotalCount();
        } else if ( !tipNum ) {
            tipNum = 1;
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
                org = '<span id="org">(' + org + ')</span>';
            } else {
                org = '';
            }

            $('#content').text(tip).append(org).append("<br/>" + conts).attr('data-tipId',tipNum);

        }).error(function () {
            Tip.showTip();
        })
    },
    tipTotalCount : function () {
        var isEOF = true
        ,   tipNum = 1;

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

    Tip.showTip();
}());