var tip = {
    showTip : function(tipNum) {
        var num = tipNum || 1;

        $.ajax({
            url: "model/tip"+ num +".json",
            dataType: "json"
        }).done(function (data) {
            var tip = data.tip || "Error"
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
                org = " (" + org + ")";
            } else {
                org = "";
            }

            $('#content').text(tip).append(org).append("<br/>" + conts).attr('data-tipId',num);

        }).error(function () {
            tip.showTip();
        })
    }
}

$('#nextTip').bind('click', function() {
    var id = (parseInt($('#content').attr('data-tipId'), 10)) + 1;
    tip.showTip(id);
    return false;
});

$('#previousTip').bind('click', function() {
    var id = (parseInt($('#content').attr('data-tipId'), 10)) - 1;
    tip.showTip(id);
    return false;
});

(function () {
    tip.showTip();
}());