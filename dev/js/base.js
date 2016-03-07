$(function(){
    // 向传入dom光标所在处插入值
    function insertVal(dom,myValue) {
        if(document.selection){
            dom.focus();
            document.selection.createRange().text = myValue;
            dom.focus();
        }else if(dom.selectionStart || dom.selectionStart == '0'){
            var startPos = dom.selectionStart;
            var endPos = dom.selectionEnd;
            var scrollTop = dom.scrollTop;
            dom.value = dom.value.substring(0, startPos) + myValue + dom.value.substring(endPos, dom.value.length);
            dom.focus();
            dom.selectionStart = startPos + myValue.length;
            dom.selectionEnd = startPos + myValue.length;
            dom.scrollTop = scrollTop;
        }else{
            dom.value += myValue;
            dom.focus();
        }
    }

    // 向指定元素渲染option,第二个参数可以有3种形式
    function renderOption($el,opts){
        var optArr = [];
        if($.type(opts) === "object"){
            for(var i in opts){
                optArr.push($('<option value="'+i+'">'+opts[i]+'</option>'));
            }
        }else if($.type(opts) === "array"){
            if($.type(opts[0]) !== "object"){
                $.each(opts,function(i){
                    optArr.push($('<option value="'+opts[i]+'">'+opts[i]+'</option>'));
                });
            }else{
                $.each(opts,function(i){
                    optArr.push($('<option value="'+opts[i].key+'">'+opts[i].val+'</option>'));
                });
            }
        }
        $el.append(optArr);
    }

    window.base = {
        insertVal: insertVal,
        renderOption: renderOption,
    };
});