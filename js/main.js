var tip = {
    showTip : function(tipNum) {
        var num = tipNum || 1;

        $.ajax({
            url: "model/tip"+ num +".json",
            dataType: "json"
        }).done(function (data) {
                var tip = data.tip || "Error"
                    ,   imgs = data.imgs || []
                    ,   id = data.id || ""
                    ,   conts = ""
                    ,   img
                    ,   src
                    ,   i
                    ,   ln;

                for ( i = 0, ln = imgs.length; i < ln; i++ ) {
                    img = imgs[i];

                    if ( typeof img != 'string' ) {
                        src = img.src;
                    }
                    conts += '<br/><img src="'+ src +'"/>';
                }

                $('#content')
                    .text(tip)
                    .append(conts)
                    .attr('data-tipId',id);
            }).error(function () {
                tip.showTip();
            })
    }
}

$('#nextTip').bind('click', function() {
    var id = (parseInt($('#content').attr('data-tipId'), 10)) + 1;
    tip.showTip(id);
});

$('#previousTip').bind('click', function() {
    var id = (parseInt($('#content').attr('data-tipId'), 10)) - 1;
    tip.showTip(id);
});

(function () {
    tip.showTip();
}());