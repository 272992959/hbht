$(function(){
    //another form menu
    $('.toggle_another_form').on('click', function() {
        $('.sidebar').toggleClass('another_form');
        $(window).resize();
    });

    //buttons
    $("body").on("click",".buttons .btn",function(){
        $(this).next("ul").show();
    }).on("click",".buttons ul li",function(e){
        var text = $(this).text();
        var ul = $(this).closest("ul");
        ul.prev(".btn").text(text);
        $(this).closest("ul").hide();
        e.preventDefault();
    });

    // toTop
    var scrollTimeout = 0;
    var toggleToTopBtn = function(){
        var topVal = $(window).scrollTop();
        $("#to_top").toggleClass("show",topVal > 300);
    };
    toggleToTopBtn();
    $(window).scroll(function(){
        scrollTimeout && clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(toggleToTopBtn,100);
    });
    $("body").on("click","#to_top",function(){
        $('body,html').animate({ scrollTop: 0 }, 500);
    });

    // single control show-hidden
    $('body').on("change",":radio,[data-show]:checkbox,select",function(e){
        var type = $(this).attr("type");
        var check = $(this).is("select") ? "selected" : "checked";
        var name = $(this).attr("name");

        if(type === "checkbox"){
            var show = $(this).attr("data-show");
            $(show).toggleClass("hidden",!$(this).prop(check));
            $(":input",$(show).filter(".hidden")).prop("disabled",true);
            $(":input",$(show).not(".hidden")).prop("disabled",false).first().focus();
        }else{
            var $controls = type === "radio" ? $('[name="'+name+'"][data-show]') : $('option[data-show]',this);
            $controls.each(function(){
                var show = $(this).attr("data-show");
                $(show).toggleClass("hidden",!$(this).prop(check));
                $(":input",$(show).filter(".hidden")).prop("disabled",true);
                $(":input",$(show).not(".hidden")).prop("disabled",false).first().focus();
            });
        }
    });

    $.fn.operTip = function(content,other){
        var paramObj = {
            $ct: $(this),
            timeout: 2000,
            noClose: true,
            content: content,
            css: {
                padding: "5px",
                "box-shadow": "none",
            }
        };
        if($.type(other) === "object"){
            $.extend(true, paramObj, other);
        }else if($.type(other) === "number"){
            paramObj.timeout = +other;
        }else if($.type(other) === "string"){
            paramObj.theme = other;
        }
        new Tip(paramObj);
    };
});