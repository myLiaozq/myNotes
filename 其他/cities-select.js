/* 城市选择 */
var citiesSelect = function(){
    var labelFromcity = new Array();
    labelFromcity ['热门城市'] = new Array(0,1,2,3);
    labelFromcity ['A-F'] = new Array(0,3,4,5,6,28,29);
    labelFromcity ['G-J'] = new Array(1,7,8,9,30,31,32,33,37,40);
    labelFromcity ['K-N'] = new Array(10,11,12,34,35,38);
    labelFromcity ['P-W'] = new Array(13,14,15,16,17,18,22,24,25,36);
    labelFromcity ['X-Z'] = new Array(2,19,20,21,26,27,39);
    labelFromcity ['国际城市'] = new Array(41,42,43,44,45,46,47,48,49);
    var hotList = new Array(14,15,16,17,18,19);
    $('#fromcity').querycity({'data':citysFlight,'tabs':labelFromcity,'hotList':hotList});
    $('#tocity').querycity({'data':citysFlightTo,'tabs':labelFromcity,'hotList':hotList});
};

/* 城市选择 版本1*/
var citiesSelect1=function(){
    // 点击空白隐藏
    $('html').click(function(){
        $('.selectAirCommon>div ul').hide();
        $('.selectAirCommon>div .inputDown').removeClass('active').siblings('.bottomLine').hide();
        $('.clear').hide(); //隐藏清楚按钮
    });

    $('#timeFrom').click(function(){
        $(this).addClass('active');
    });
    $('#timeTo').click(function(){
        $(this).addClass('active');
    });

    var fromcityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];
    var tocityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];
    $.each(fromcityData,function(i,val){
        $('.fromcityMenu').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
    });
    $.each(tocityData,function(i,val){
        $('.tocityMenu').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
    }); 

    $('.selectAirCommon>div>div .inputDown').click(function(e){
        e.stopPropagation();
        if($(this).val()!==''){
            $(this).siblings('.clear').show();
            var browser=navigator.appName; 
            var b_version=navigator.appVersion; 
            var version=b_version.split(";"); 
            var trim_Version=version[1].replace(/[ ]/g,""); 
            if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
                // alert("IE 8.0"); 
                $(this).siblings('.clear').hide();
            } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") { 
                // alert("IE 9.0"); 
                $(this).siblings('.clear').hide();
            } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE10.0") { 
                // alert("IE 9.0"); 
                $(this).siblings('.clear').show();
            } 
        }else{
            $(this).siblings('.clear').hide();
        }
        $('.selectAirCommon>div>div .inputDown').removeClass('active').siblings('.bottomLine').hide();
        $(this).addClass('active').siblings('.bottomLine').show();
        $('.selectAirCommon>div>div ul').hide();
        $(this).siblings('ul').show();
    });

    $('.selectAirCommon>div>div ul').on('click','li a',function(e){
        e.preventDefault();e.stopPropagation();
        var val = $(this).html();
        $(this).parent().parent().hide().siblings('.bottomLine').hide().siblings('input').val(val);
        $('.selectAirCommon>div>div .inputDown').removeClass('active');
            // 自动获取焦点
            var inputId = $(this).parent().parent().siblings('input').attr('id'); 
            var focusInput = $(this).parent().parent().parent();
            if(inputId=='fromcity'){
                // $('#tocity').click();
                focusInput.siblings('.localSelectEnd').children('#tocity').click();
            }else if(inputId=='tocity'){
                focusInput.siblings('.timeSelectStart').children('#timeFrom').focus();
            }
        });

    // 清空输入框数据
    $('.clear').click(function(){
        $(this).siblings('input').val('');
    });

    // 模糊匹配
    $('.Autocomplete').keyup(function(event) {
        $(this).siblings('ul').empty();
        var getClass = $(this).siblings('ul').attr('class');
        var cityData;
        getClass=='fromcityMenu' ? cityData=fromcityData : cityData=tocityData;
        var currentVal = $(this).val().toLowerCase();
        var srdata = [];
        for (var i = 0; i < cityData.length; i++) {
            if (currentVal.trim().length > 0 && cityData[i].toLowerCase().indexOf(currentVal) > -1) {
                srdata.push(cityData[i]);
            }
        }
        var that = this;
        $.each(srdata,function(i,val){
            $(that).siblings('ul').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
        });
        if(currentVal===''){
            $.each(cityData,function(i,val){
                $(that).siblings('ul').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
            });
        }
    });
};

// citiesSelect();
citiesSelect1();