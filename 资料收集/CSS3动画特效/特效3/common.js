/* 
*作者：恒康科技
*时间：2015-4-17
*需要结合jquery和Validform和artdialog一起使用
----------------------------------------------------------*/

//异步加载
function loadScript(url, callback) {
    var script = document.createElement_x("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
            script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}

/*检测浏览器方法
------------------------------------------------*/
var pageurl = window.location.search;
if(pageurl == '?m2w') {
    addCookie('m2wcookie', '1', 0);
}
if(getCookie('m2wcookie') != '1' && browserRedirect()) {
    location.href = '/mobile/index.html';
}
$(window).resize(function () {
    navlen(); pic_h();
});
function navlen(){
    //设置导航长度
    var navtab_w = $("#headMenu .headMenuItem").width();
    var navtab_len = $("#headMenuCenter li").length;
    $("#headMenu").width(navtab_w * navtab_len);
}
function pic_h() {
    //$(".casebar li").each(function (index) {
    //    var C_li_h = $(this).find("a").height();
    //    var imgh = $(this).find("img").height();
    //    $(this).find("img").css({ "margin-top": -(imgh - C_li_h) / 2 });
    //});
    //$(".caselist li").each(function (index) {
    //    var C_li_h = $(this).find("b").height();
    //    var imgh=$(this).find("img").height();
    //    $(this).find("img").css({ "margin-top": -(imgh - C_li_h) / 2 });
    //});
}
$(function () {
    //导航定位
    var navtxt = $(this).find("#navtag").text();
    var n_len = $("#headMenu .headMenuItem a").length;
    for (j = 0; j < n_len; j++) {
        var Ltxt = $("#headMenu .headMenuItem a").eq(j).text();
        if (Ltxt == navtxt) {
            $("#headMenu .headMenuItem a").eq(j).addClass("active");
            break;
        }
    }
    navlen(); pic_h();
    //定位添加样式
    var txt = $("#tit a").text();
    var len = $("#cato_tab a").length;
    for (i = 0; i < len; i++) {
        var ftxt = $("#cato_tab a").eq(i).text();
        if (ftxt == txt) {
            $("#cato_tab a").eq(i).addClass("select");
            break;
        }
    }

    var ser_txt = $(".ntitle a").text();
    var len = $("#pageContain .page").length;
    for (k = 0; k < len; k++) {
        //$("#pageContain .page").removeClass("current
        var f_sertxt = $("#pageContain .page").eq(k).find("dt").text();
        if (f_sertxt == ser_txt) {
            $("#pageContain .page").eq(k).addClass("current");
            break;
        }
    }

    //相应添加背景
    var nnlen = $(".solu_tab a").length;
    for (j = 0; j < nnlen; j++) { 
        if ($(".solu_tab a").eq(0).attr("class") == "select") {
            $("#banner_solu").css({ 'background-image': 'url(../templates/main/images/solu_ba01.png)' });
        }
        else if ($(".solu_tab a").eq(1).attr("class") == "select") {
            $("#banner_solu").css("background-image", "url(../templates/main/images/solu_ba02.png)");
        }
        else if ($(".solu_tab a").eq(2).attr("class") == "select") {
            $("#banner_solu").css("background-image", "url(../templates/main/images/solu_ba03.png)");
        }
        else if ($(".solu_tab a").eq(3).attr("class") == "select") {
            $("#banner_solu").css("background-image", "url(../templates/main/images/solu_ba03.png)");
        }
        else if ($(".solu_tab a").eq(4).attr("class") == "select") {
            $("#banner_solu").css("background-image", "url(../templates/main/images/solu_ba05.png)");
        }
    }

    //在线留言
    $("#Online_Message").click(function () {
        $(".Online_Messagebox").fadeIn(500);
    });
    $(".Online_Messagebox .online_tit i").click(function () {
        $(".Online_Messagebox").fadeOut(500);
    });

    //回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('#goToTop a.topbtn').fadeIn(500);
            $('#goToTop a.topbtn').css({"display":"block","height":"30px"});
        }
        else {
            $('#goToTop a.topbtn').fadeOut(500);
            $('#goToTop a.topbtn').css({"height": "0px" });
        }
    });
    $('#goToTop a.topbtn').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });
});
//浏览器兼容提示语
//window.onload = function () {
//    var DEFAULT_VERSION = "8.0";
//    var ua = navigator.userAgent.toLowerCase();
//    var isIE = ua.indexOf("msie") > -1;
//    var safariVersion;
//    if (isIE) {
//        safariVersion = ua.match(/msie ([\d.]+)/)[1];
//        if (safariVersion <= DEFAULT_VERSION) {
//            showDetail();
//        } else {
//            // 跳转至页面2
//        }
//    } else {
//        // 跳转至页面2
//    }
//}

window.onload = function () {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            //alert("ie6");
            window.location = "/updatebrowser.htm";
        }
        if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
            //alert("ie7");
            window.location = "/updatebrowser.htm";
        }
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth) {//这里是重点，你懂的
            //alert("ie8");
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
            //alert("ie9");
        }
    }
}
function showDetail() {
    //msgDiv
    var msgDiv = document.getElementById("msgDiv");
    var bgDiv = document.getElementById("bgDiv");
    bgDiv.style.height = screen.height + "px";
    //关闭提示框
    var msgShut = document.getElementById("msgShut");
    msgShut.onclick = function () {
        bgDiv.style.display = msgDiv.style.display = "none";
    }
    //content
    msgDiv.style.display = bgDiv.style.display = "block";
    var msgDetail = document.getElementById("msgDetail");
    msgDetail.innerHTML = "<p>您当前的浏览器版本过低，浏览过程中可能会带来阅览上的效果问题！建议您升级您本地的IE浏览器版本或者用火狐、谷歌、OPERA打开。<br/><small>IE版本为IE9以上</small><a href='updatebrowser.htm'>马上升级</a></p>";
} 
/*工具类方法
------------------------------------------------*/
//检测是否移动设备来访
function browserRedirect() { 
	var sUserAgent= navigator.userAgent.toLowerCase(); 
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
	var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
	var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
	var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
	var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
	var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
	var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { 
		return true;
	} else { 
		return false;
	} 
}
//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}
//四舍五入函数
function ForDight(Dight, How) {
    Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
    return Dight;
}
//只允许输入数字
function checkNumber(e) {
    var keynum = window.event ? e.keyCode : e.which;
    if ((48 <= keynum && keynum <= 57) || keynum == 8) {
        return true;
    } else {
        return false;
    }
}
//只允许输入小数
function checkForFloat(obj, e) {
    var isOK = false;
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || //小键盘上的0到9  
        (key > 47 && key < 60) ||  //大键盘上的0到9  
        (key == 110 && obj.value.indexOf(".") < 0) || //小键盘上的.而且以前没有输入.  
        (key == 190 && obj.value.indexOf(".") < 0) || //大键盘上的.而且以前没有输入.  
         key == 8 || key == 9 || key == 46 || key == 37 || key == 39) {
        isOK = true;
    } else {
        if (window.event) { //IE
            e.returnValue = false;   //event.returnValue=false 效果相同.    
        } else { //Firefox 
            e.preventDefault();
        }
    }  
    return isOK;  
}
//复制文本
function copyText(txt){
	window.clipboardData.setData("Text",txt); 
	var d = dialog({content:'复制成功，可以通过粘贴来发送！'}).show();
	setTimeout(function () {
		d.close().remove();
	}, 2000);
}
//切换验证码
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
	return false;
}
//全选取消按钮函数，调用样式如：
function checkAll(chkobj){
	if($(chkobj).text()=="全选"){
	    $(chkobj).text("取消");
		$(".checkall").prop("checked", true);
	}else{
    	$(chkobj).text("全选");
		$(".checkall").prop("checked", false);
	}
}
//Tab控制选项卡
function tabs(tabObj, event) {
    //绑定事件
	var tabItem = $(tabObj).find(".tab-head ul li a");
	tabItem.bind(event,  function(){
		//设置点击后的切换样式
		tabItem.removeClass("selected");
		$(this).addClass("selected");
		//设置点击后的切换内容
		var tabNum = tabItem.parent().index($(this).parent());
		$(tabObj).find(".tab-content").hide();
        $(tabObj).find(".tab-content").eq(tabNum).show();
	});
}

//显示浮动窗口
function showWindow(obj){
	var tit = $(obj).attr("title");
	var box = $(obj).html();
	dialog({
		width:500,
		title:tit,
		content:box,
		okValue:'确定',
		ok:function (){ }
	}).showModal();
}

/*页面级通用方法
------------------------------------------------*/
//智能浮动层函数
$.fn.smartFloat = function() {
	var position = function(element) {
		var top = element.position().top, pos = element.css("position");
		var w = element.innerWidth();
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls > top) {
				if (window.XMLHttpRequest) {
					element.css({
						width: w,
						position: "fixed",
						top: 55
					});	
				} else {
					element.css({
						top: scrolls
					});	
				}
			}else {
				element.css({
					position: pos,
					top: top
				});	
			}
		});
	};
	return $(this).each(function() {
		position($(this));						 
	}); 
};
//搜索查询
function SiteSearch(send_url, divTgs, channel_name) {
    var strwhere = "";
    if (channel_name !== undefined) {
        strwhere = "&channel_name=" + channel_name
    }
	var str = $.trim($(divTgs).val());
	if (str.length > 0 && str != "输入关健字") {
	    window.location.href = send_url + "?keyword=" + encodeURI($(divTgs).val()) + strwhere;
	}
	return false;
}
//链接下载
function downLink(point, linkurl){
	if(point > 0){
		dialog({
			title:'提示',
			content:"下载需扣除" + point + "个积分<br />重复下载不扣积分，需要继续吗？",
			okValue:'确定',
			ok:function (){
				window.location.href = linkurl;
			},
			cancelValue: '取消',
			cancel: function (){}
		}).showModal();
	}else{
		window.location.href = linkurl;
	}
	return false;
}
//计算积分兑换
function numConvert(obj){
	var maxAmount = parseFloat($("#hideAmount").val()); //总金额
	var pointCashrate = parseFloat($("#hideCashrate").val()); //兑换比例
	var currAmount = parseFloat($(obj).val()); //需要转换的金额
	if(currAmount > maxAmount){
		currAmount = maxAmount;
		$(obj).val(maxAmount);
	}
	var convertPoint = currAmount * pointCashrate;
	$("#convertPoint").text(convertPoint);
}

//执行删除操作
function ExecDelete(sendUrl, checkValue, urlObj){
	//检查传输的值
	if (!checkValue) {
		dialog({title:'提示', content:'对不起，请选中您要操作的记录！', okValue:'确定', ok:function (){}}).showModal();
        return false;
	}
	dialog({
        title: '提示',
        content: '删除记录后不可恢复，您确定吗？',
        okValue: '确定',
        ok: function () {
            $.ajax({
				type: "POST",
				url: sendUrl,
				dataType: "json",
				data: {
					"checkId": checkValue
				},
				timeout: 20000,
				success: function(data, textStatus) {
					if (data.status == 1){
						var tipdialog = dialog({content:data.msg}).show();
						setTimeout(function () {
							tipdialog.close().remove();
							if($(urlObj)){
								location.href = $(urlObj).val();
							}else{
								location.reload();
							}
						}, 2000);
					} else {
						dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					dialog({title:'提示', content:'状态：' + textStatus + '；出错提示：' + errorThrown, okValue:'确定', ok:function (){}}).showModal();
				}
			});
        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();
}

//单击执行AJAX请求操作
function clickSubmit(sendUrl){
	$.ajax({
		type: "POST",
		url: sendUrl,
		dataType: "json",
		timeout: 20000,
		success: function(data, textStatus) {
			if (data.status == 1){
				var d = dialog({content:data.msg}).show();
				setTimeout(function () {
					d.close().remove();
					location.reload();
				}, 2000);
			} else {
				dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			dialog({title:'提示', content:"状态：" + textStatus + "；出错提示：" + errorThrown, okValue:'确定', ok:function (){}}).showModal();
		}
	});
}

//=====================发送验证邮件=====================
function sendEmail(username, sendurl) {
	if(username == ""){
		dialog({title:'提示', content:'对不起，用户名不允许为空！', okValue:'确定', ok:function (){}}).showModal();
		return false;
	}
	//提交
	$.ajax({
		url: sendurl,
		type: "POST",
		timeout: 60000,
		data: { "username": username },
		dataType: "json",
		success: function (data, type) {
			if (data.status == 1) {
				var d = dialog({content:data.msg}).show();
				setTimeout(function () {
					d.close().remove();
				}, 2000);
			} else {
				dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			 dialog({title:'提示', content:"状态：" + textStatus + "；出错提示：" + errorThrown, okValue:'确定', ok:function (){}}).showModal();
		}
	});
}
//=====================发送手机短信验证码=====================
var wait = 0; //计算变量
function sendSMS(btnObj, valObj, sendUrl) {
	if($(valObj).val() == ""){
		dialog({title:'提示', content:'对不起，请填写手机号码后再获取！', okValue:'确定', ok:function (){}}).showModal();
		return false;
	}
	//发送AJAX请求
	$.ajax({
		url: sendUrl,
		type: "POST",
		timeout: 60000,
		data: { "mobile": $(valObj).val() },
		dataType: "json",
		beforeSend: function(XMLHttpRequest) {
			$(btnObj).unbind("click").removeAttr("onclick"); //移除按钮事件
		},
		success: function (data, type) {
			if (data.status == 1) {
				wait = data.time * 60; //赋值时间
				time(); //调用计算器
				var d = dialog({content:data.msg}).show();
				setTimeout(function () {
					d.close().remove();
				}, 2000);
			} else {
				$(btnObj).removeClass("gray").text("发送确认码");
				$(btnObj).bind("click", function(){
					sendSMS(btnObj, valObj, sendurl); //重新绑定事件
				});
				dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(btnObj).removeClass("gray").text("发送确认码");
			$(btnObj).bind("click", function(){
				sendSMS(btnObj, valObj, sendurl); //重新绑定事件
			});
			dialog({title:'提示', content:"状态：" + textStatus + "；出错提示：" + errorThrown, okValue:'确定', ok:function (){}}).showModal();
		}
	});
	//倒计时计算器
	function time(){
		if (wait == 0) {
			$(btnObj).removeClass("gray").text("发送确认码");
			$(btnObj).bind("click", function(){
				sendSMS(btnObj, valObj, sendurl); //重新绑定事件
			});
		}else{
			$(btnObj).addClass("gray").text("重新发送(" + wait + ")");
			wait--;
			setTimeout(function() {
				time(btnObj);
			},1000)
		}
	}
}

/*表单AJAX提交封装(包含验证)
------------------------------------------------*/
function AjaxInitForm(formObj, btnObj, isDialog, urlObj, callback){
	var argNum = arguments.length; //参数个数
	$(formObj).Validform({
		tiptype:3,
		callback:function(form){
			//AJAX提交表单
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: $(formObj).attr("url"),
                type: "post",
                dataType: "json",
                timeout: 60000
            });
            return false;
		}
	});
    
    //表单提交前
    function formRequest(formData, jqForm, options) {
        $(btnObj).prop("disabled", true);
        $(btnObj).val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
		if (data.status == 1) {
            $(btnObj).val("提交成功");
			//是否提示，默认不提示
			if(isDialog == 1){
				var d = dialog({content:data.msg}).show();
				setTimeout(function () {
					d.close().remove();
					if (argNum == 5) {
						callback();
					}else if(data.url){
						location.href = data.url;
					}else if($(urlObj).length > 0 && $(urlObj).val() != ""){
						location.href = $(urlObj).val();
					}else{
						location.reload();
					}
				}, 2000);
			}else{
				if (argNum == 5) {
					callback();
				}else if(data.url){
					location.href = data.url;
				}else if($(urlObj)){
					location.href = $(urlObj).val();
				}else{
					location.reload();
				}
			}
        } else {
			dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
            $(btnObj).prop("disabled", false);
            $(btnObj).val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
		dialog({title:'提示', content:'状态：'+textStatus+'；出错提示：'+errorThrown, okValue:'确定', ok:function (){}}).showModal();
        $(btnObj).prop("disabled", false);
        $(btnObj).val("再次提交");
    }
}
//显示评论AJAX分页列表
function AjaxPageList(listDiv, pageDiv, pageSize, pageCount, sendUrl, defaultAvatar) {
    //pageIndex -页面索引初始值
    //pageSize -每页显示条数初始化
    //pageCount -取得总页数
	InitComment(0);//初始化评论数据
	$(pageDiv).pagination(pageCount, {
		callback: pageselectCallback,
		prev_text: "« 上一页",
		next_text: "下一页 »",
		items_per_page:pageSize,
		num_display_entries:3,
		current_page:0,
		num_edge_entries:5,
		link_to:"javascript:;"
	});
	
    //分页点击事件
    function pageselectCallback(page_id, jq) {
        InitComment(page_id);
    }
    //请求评论数据
    function InitComment(page_id) {                                
        page_id++;
		$.ajax({ 
            type: "POST",
            dataType: "json",
            url: sendUrl + "&page_size=" + pageSize + "&page_index=" + page_id,
            beforeSend: function (XMLHttpRequest) {
				$(listDiv).html('<p style="line-height:35px;">正在狠努力加载，请稍候...</p>');
			},
			success: function(data) {
				var strHtml = '';
				for(var i in data){
					strHtml += '<li>' + 
					'<div class="avatar">';
					if(typeof(data[i].avatar) != "undefined"){
						strHtml += '<img src="' + data[i].avatar + '" />';
					}else{
						strHtml += '<img src="' + defaultAvatar + '" />';
					}
					strHtml += '</div>' +
					'<div class="inner">' +
					'<p>' + unescape(data[i].content) + '</p>' +
					'<div class="meta">' +
					'<span class="blue">' + data[i].user_name + '</span>\n' +
					'<span class="time">' + data[i].add_time + '</span>' +
					'</div>' +
					'</div>';
					if(data[i].is_reply == 1){
						strHtml += '<div class="answer">' +
						'<div class="meta">' +
						'<span class="right time">' + data[i].reply_time + '</span>' +
						'<span class="blue">管理员回复：</span>' +
						'</div>' + 
						'<p>' + unescape(data[i].reply_content) + '</p>' +
						'</div>';
					}
					strHtml += '</li>';
				}
				$(listDiv).html(strHtml);
            },
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$(listDiv).html('<p style="line-height:35px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>');
			}
        });
    }
}

//初始化视频播放器需配合ckplayer.js使用
function initCKPlayer(boxId, videoSrc, playerSrc){
	var flashvars={
        f:videoSrc,
        c:0,
        loaded:'loadedHandler'
    };
    var video=[videoSrc];
    CKobject.embed(playerSrc,boxId,'video_v1','100%','100%',false,flashvars,video);
}

//导航二级菜单
//$(".toppart").on(function () { $(this).addClass("toppart-open"); }, function () { $(this).removeClass("toppart-open"); });