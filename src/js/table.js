//table
var table = {
    opt: {
        info: "显示 start ~ end 条，共 num 条记录 "
    },
    init: function(opt) {
        var $this = this;
        $.extend(true, this.opt, opt);
        $.ajax({
            url: this.opt.url,
            dataType: "json"
        }).always(function(data) {
            $this.render(data);
        });
        this.event();
    },
    render: function(data) {
        this.renderTh(data);
        this.renderTd(data.data);
        this.renderPage(data);
    },
    renderTh: function(data) {
        var tr = $("<tr>");
        var ths = $.map(this.opt.col, function(n) {
            var th = $("<th>").html(n.title);
            if (n.sort) {
                if (n.key === data.sort) {
                    th.addClass("sort_" + data.sortDir);
                } else {
                    th.addClass("sort");
                }
            }
            return th[0];
        });
        tr.append(ths);
        $(this.opt.sel).append($("<thead>").append(tr));
    },
    renderTd: function(data) {
        var $this = this;
        var trs = $.map(data, function(m) {
            var tr = $("<tr>");
            var tds = $.map($this.opt.col, function(n) {
                var td = $("<td>");
                if (n.render) {
                    n.render(td,m[n.key]);
                } else {
                    td.html(m[n.key]);
                }
                return td[0];
            });
            tr.append(tds);
            return tr;
        });
        $(this.opt.sel).append($("<tbody>").append(trs));
    },
    renderPage: function(data){
        var pageNum = data.pageNum,pageSize = data.pageSize,num = data.num,div = $("<div>").addClass("page grid");

        var info = this.renderInfo(pageNum,pageSize,num);
        div.append(info);

        
        var buttons = this.renderButton(pageNum,pageSize,num); 
        div.append(buttons);

        $(this.opt.sel).after(div);
    },
    event: function(){
        $(this.opt.sel).on("click",".sort,.sort_asc,.sort_desc",function(){
            alert($(this).index());
        });
    },
    renderInfo: function(pageNum,pageSize,num){
        var start = (pageNum-1)*pageSize+1;
        var end = Math.min(pageNum*pageSize,num);
        this.opt.info = this.opt.info.replace("start",start).replace("end",end).replace("num",num);
        return $("<div>").addClass("table_info ct_5-2").text(this.opt.info);
    },
    renderButton: function(pageNum,pageSize,num){
        var div = $("<div>").addClass("table_btns ct_5-3");
        var allPage = Math.ceil(num/pageSize);
        var button = $("<button>").attr("type","button").addClass("btn btn_outline");
        var isFirst = pageNum === 1;
        var isLast = pageNum === allPage;
        var firstButton = button.clone().addClass("first").text("首页").toggleClass("active",isFirst);
        var lastButton = button.clone().addClass("last").text("末页").toggleClass("active",isLast);
        var prevButton = button.clone().addClass("prev").text("上一页").toggleClass("active",isFirst);
        var nextButton = button.clone().addClass("next").text("下一页").toggleClass("active",isLast);
        var gotoButton = button.clone().addClass("goto active").text("跳至");
        var curPage = $('<label><input class="curPage" type="text" value="'+pageNum+'">页</label>');
        div.append([firstButton,prevButton,gotoButton,curPage,nextButton,lastButton]);
        
        // 分页按钮事件
        div.on("keyup",".curPage",function(){
            var thisVal = $(this).val();
            var invalid = thisVal == pageNum || isNaN(thisVal) || thisVal < 1 || thisVal > allPage;
            gotoButton.toggleClass("active",invalid);
        }).on("keydown",".curPage",function(e){
            if(e.keyCode === 13 && !gotoButton.is(".active")){
                gotoButton.trigger("click");
            }
        }).on("click",".firstButton",function(e){
            
        }).on("click",".lastButton",function(e){
            
        }).on("click",".prevButton",function(e){
            
        }).on("click",".nextButton",function(e){
            
        }).on("click",".gotoButton",function(e){
            
        });
        return div;
    }
};