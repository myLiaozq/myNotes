//第一个";"是为了防止别人写的插件其最后没有";",信得过，可以不写
//函数自执行，提供作用域
//传进来参数有window和document，如果插件用不上，可以不写。目的是为了快速查找window和document。也便于代码压缩
//例如window可能给压缩成w，你代码就报错了
//undefined,是为了防止别人把undefined定义成别的。注意最后传参数没有传第四个参数，正保证undefined是原生的。

;(function($,window,document,undefined){
	//需要设置为直接的名字
	var pluginName = "defaultPluginName";
	//默认配置项
	var defaults = {
		propertyName : "value"
	};
	//插件类
	function Plugin(element,options){
		//拿到dom元素，获得对应jq对象，要$(element)
		this.element = element;
		//覆盖默认配置项
		this.options = $.extend({},defaults,options);
		//缓存配置项
		this._defaults = defaults;
		//缓存插件名字（并没神马用）
		this._name = pluginName;
		//调用初始函数
		this.init();
	}
	Plugin.prototype.init = function(){
		//做你想做的事情
		/*
		1、初始化事件，比如点击触发事件
		2、构建DOM
		3、绑定事件

		 */
	};
	
	//fn就是prototype
	$.fn[pluginName] = function(options){
		//each表示对多个元素调用，用return 是为了返回this，进行链式调用
		return this.each(function(){
			//判断有没有插件名字 如果你不愿意加if 直接new就好了
			if(!$.data(this,'plugin_'+pluginName)){
				//生成插件类实例。
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	};
})(jQuery,window,document);//注意没有传第四个参数。


/************************************************* 第二种 ******************************************************************/

/*

主要分为三步：
1、初始化事件
2、构建DOM
3、绑定事件

 */

var provinces = {
    "A": ["安顺"],
    "B": ["北京","保定"],
    "C": ["重庆","长春"],
    "F": ["福州"],
    "G": ["广州"],
    "H": ["合肥"],
    "J": ["济南"],
    "L": ["柳州"],
    "N": ["南宁"],
    "Q": ["泉州"],
    "S": ["顺德"],
    "T": ["太原"],
    "X": ["西昌","厦门","西安"],
    "Y": ["玉溪","义乌"],
    "Z": ["湛江","增城"],
};

(function ($, win, doc) {
    //默认配置项
    var defaults = {
        propertyName : "value"
    };

    // 创建构造函数
    var CityPicker = function (el, options) {
        this.el = $(el);
        this.options = $.extend({},defaults,options);
        this.cityId = options.cityId;
        this.provinces = provinces;
        this.pro = null;
        this.city = null;
        this.elType = this.el.is('input');

        // 初始化
        this.init(); 
    };

    // 将方法定义在原型中
    var p = CityPicker.prototype;

    p.init = function () {
        this.initEvent(); //初始化事件
        this.preventPopKeyboard();

    };

    p.preventPopKeyboard = function () {
        if (this.elType) {
            this.el.prop("readonly", true);
        }
    };

    // 初始化事件
    p.initEvent = function () {
        var that = this;
        this.el.on("focus", function (e) {
            var pickerBox = $("#"+that.cityId+"-box");
            if (pickerBox[0]) {
                pickerBox.show();
            } else {
                that.create(); //构建DOM
            }
        });
    };

    // 创建DOM
    p.create = function () {
        this.createCityPickerBox();
        this.createSearch();
        this.createProList();
        this.proClick();
        this.createNavBar();
        this.navEvent();
    };

    p.createCityPickerBox = function () {
        var proBox = "<div class='picker-box' id='"+this.cityId+"-box'></div>";
        $("body").append(proBox);
    };

    p.createSearch = function(){
        var that = this;
        var location;
        this.cityId == 'startCity' ? location='出发' : location='到达';

        var searchBox = "<div class='picker-topBox' id='"+this.cityId+"-searchBox'><div class='picker-backBox'><img src='libs/mobile-libs/city/back-arrow.png' id='"+this.cityId+"-back' />"+location+"</div><div class='picker-searchBox'><input type='text' name='' class='local-search-box' id='"+this.cityId+"-input' value='' placeholder='' ><img src='libs/mobile-libs/city/city-search.png' id='"+this.cityId+"-search' /><p class='picker-cancel' id='"+this.cityId+"-cancel'>取消</p></div></div>";
        $("#"+this.cityId+"-box").append(searchBox);
        // input动效
        var width = $(window).width();
        $("#"+this.cityId+"-input").on('click',function(){
            $(this).animate({width:width-100}, 300);
        });
        $("#"+this.cityId+"-cancel").on('click',function(){
            $(this).siblings('input').animate({width:'100%'}, 300);
        });

        // 后退
        $("#"+this.cityId+"-back").on('click',function(){
            $("#"+that.cityId+"-box").hide();
        });
    };

    p.createProList = function () {
        var provinces = this.provinces;
        var proBox;
        var dl = "";
        for (var letterKey in provinces) {
            var val = provinces[letterKey];
            if (provinces.hasOwnProperty(letterKey)) {
                var dt = "<dt id='" + letterKey + "-"+this.cityId+"'>" + letterKey + "</dt>";
                var dd = "";
                for (var proKey in val) {
                    if (val.hasOwnProperty(proKey)) {
                        dd += "<dd data-letter=" + letterKey + ">" + val[proKey] + "</dd>";
                    }
                }
                dl += "<dl>" + dt + dd + "</dl>";
            }
        }

        proBox = "<section class='pro-picker' id='"+this.cityId+"-pro'>" + dl + "</section>";

        $("#"+this.cityId+"-box").append(proBox);
    };

    p.createCityList = function (letter, pro) { //创建城市
        var cities = this.provinces[letter][pro];
        var ul, li = "";
        cities.forEach(function (city, i) {
            li += "<li>" + city + "</li>";
        });

        ul = "<ul class='city-picker'>" + li + "</ul>";
        $("#"+this.cityId+"-box").find(".city-picker").remove().end().append(ul);

        this.cityClick();
    };

    p.proClick = function () { //选中城市
        var that = this;
        $("#"+this.cityId+"-pro").on("click", function (e) {
            var target = e.target;
            if ($(target).is("dd")) {
                that.pro = $(target).html();
                var letter = $(target).data("letter");
                // that.createCityList(letter, that.pro);
                
                if (that.elType) {
                    that.el.val(that.pro);
                } else {
                    that.el.html(that.pro );
                }

                $("#"+that.cityId+"-box").hide();
                // $("#"+that.cityId+"-pro").show();
                // $(this).hide();
            }
        });
    };

    p.cityClick = function () { //选中城市
        var that = this;
        $(".city-picker").on("click", function (e) {
            var target = e.target;
            if ($(target).is("li")) {
                that.city = $(target).html();
                if (that.elType) {
                    that.el.val(that.pro + "-" + that.city);
                } else {
                    that.el.html(that.pro + "-" + that.city);
                }

                $("#"+that.cityId+"-box").hide();
                $("#"+that.cityId+"-pro").show();
                $(this).hide();
            }
        });
    };

    p.createNavBar = function () { //创建侧边拼音栏
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var arr = str.split("");
        var a = "";
        var that = this;
        arr.forEach(function (item, i) {
            a += '<a href="#' + item + '-'+that.cityId+'">' + item + '</a>';
        });

        var div = '<div class="navbar">' + a + '</div>';

        $("#"+this.cityId+"-box").append(div);
    };

    p.navEvent = function () { //手指拖动拼音栏
        var that = this;
        var navBar = $(".navbar");
        var width = navBar.find("a").width();
        var height = navBar.find("a").height();
        navBar.on("touchstart", function (e) {
            $(this).addClass("active"); //增加灰色半透明背景
            that.createLetterPrompt($(e.target).html());
        });

        navBar.on("touchend", function () {
            $(this).removeClass("active");
            $(".prompt-"+that.cityId).hide();
        });
    };

    p.createLetterPrompt = function (letter) { //创建提示字母
        var prompt = $(".prompt-"+this.cityId);
        if (prompt[0]) {
            prompt.html(letter);
            prompt.show();
        } else {
            var span = "<span class='prompt prompt-"+this.cityId+"'>" + letter + "</span>";
            $("#"+this.cityId+"-box").append(span);
        }
    };


    p.changeLetter = function (letter) {
        var prompt = $(".prompt-"+this.cityId);
        prompt.html(letter);
    };

    $.fn.CityPicker = function (options) { //在原型中定义方法
        
        return new CityPicker(this, options);
    };
}(window.jQuery,document));