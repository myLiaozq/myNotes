/* 航班基本信息选择 */
var flightInfoSelect = function(){
    /* 固定或无固定出发时间 */
    var departureDateSelect = function(){
        // $('.departureDate .nth-child1 b').show();
        $('.departureDate label i').click(function(){
            $(this).siblings('b').show().parent().siblings('label').children('b').hide();
        });
        $('.departureDate label span').click(function(){
            $(this).siblings('b').show().parent().siblings('label').children('b').hide();
        });
    };
    departureDateSelect();

    // 点击搜索   固定日期和无固定日期切换
    $('.searchAir a').click(function(e){
        e.preventDefault();
        $(this).addClass('active');
        var b = $('.departureDate label b').css('display');
        if(b=='block'){
            window.location.href="LanmeiAirlinesSelectFlight.html";
        }else{
            window.location.href="LanmeiAirlinesSelectDate.html";
        }
        // window.open('LanmeiAirlinesSelectDate.html');
    });

    /* 单程或双程选择 首页 */
    var selectWay = function(){
        $('.radioSelect i').click(function(){
            $(this).addClass('active').parent().siblings('label').children('i').removeClass('active');
            var selectWay = $(this).siblings('span').attr('data-way');
            if(selectWay=='Round Trip'){
                $('.timeSelectEnd').css('visibility','visible');
            }else if(selectWay=='One - way'){
                $('.timeSelectEnd').css('visibility','hidden');
            }else{
                // window.location.href="tpls/EN/LanmeiAirlinesMultiCities.html";
            }
        });
    };
    selectWay();


    /* 单程或双程选择 选择日期 */
    var selectDateWay = function(){
        // $('.selectWay a.nth-child1').addClass('active');
        // $('.timeSelectEnd').hide();
        $('.selectWay a').click(function(e){
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            var selectWay = $(this).attr('data-way');
            var dataMulti = $(this).attr('data-Multi');
            if(selectWay=='Round Trip'){
                $('.timeSelectEnd').css('visibility','visible');
                // window.location.href="LanmeiAirlinesSelectDate.html";
            }else if(selectWay=='One - way'){
                $('.timeSelectEnd').css('visibility','hidden');
                if(dataMulti=="true"){
                    window.location.href="LanmeiAirlinesSelectDate.html";
                } 
            }else{
                if(dataMulti!="true"){
                    window.location.href="LanmeiAirlinesMultiCities.html";
                } 
            }
        });
    };
    selectDateWay();

    /* 起始地点切换 */
    $('#localChangeImg').mouseover(function(){
        $(this).addClass('img02');
    }).mouseout(function(){
        $(this).removeClass('img02');
    });

    $('#localChangeImg').click(function(){
        // $(this).addClass('img02');
        var fromcity = $('#fromcity').val();
        var tocity = $('#tocity').val();
        $('#fromcity').val(tocity);
        $('#tocity').val(fromcity);
    });

    /* 舱位选择 */
    var CabinSelect = function(){
        $('#Cabin').val('Economy');//设置默认值
        $('.dropdownMenu').hide();
        $('#Cabin').click(function(e){
            e.stopPropagation();
            $('.dropdownMenu').show();
        });
        $('.dropdownMenu a').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.dropdownMenu').hide();
            var val = $(this).html();
            $('#Cabin').val(val);
        });
        $('html').click(function(){
            $('.dropdownMenu').hide();
        });
    };
    CabinSelect();

    /* 乘客人数选择 */
    var AdultNum = 1;
    var ChildNum = 0;
    var InfantNum = 0;

    var AdultSelect = function(){
        $('.AdultSelect .addArrow').click(function(){
            var ChildNum = $('#Child').val();//获取小孩人数
            if(parseInt(ChildNum)+AdultNum<5){
                AdultNum++;
                $('#Adult').val(AdultNum);
            }else{
                layer.tips('成人与儿童总计不超5个!', '#Adult',{
                    tips: [2, '#8ec060'],
                    time: 3000
                });
            }
        });
        $('.AdultSelect .downArrow').click(function(){
            $('#Adult').val()>=2 && AdultNum--;
            $('#Adult').val(AdultNum);
        });
    };

    var ChildSelect = function(){
        $('.ChildSelect .addArrow').click(function(){
            var AdultNum = $('#Adult').val();//获取成人人数
            if(parseInt(AdultNum)+ChildNum<5){
                ChildNum++;
                $('#Child').val(ChildNum);
            }else{
                layer.tips('成人与儿童总计不超5个!', '#Child',{
                    tips: [2, '#8ec060'],
                    time: 3000
                });
            }
        });
        $('.ChildSelect .downArrow').click(function(){
            $('#Child').val()>=1 && ChildNum--;
            $('#Child').val(ChildNum);
        });
    };

    var InfantSelect = function(){
        $('.InfantSelect .addArrow').click(function(){
            InfantNum++;
            $('#Infant').val(InfantNum);
        });
        $('.InfantSelect .downArrow').click(function(){
            $('#Infant').val()>=1 && InfantNum--;
            $('#Infant').val(InfantNum);
        });
    };

    AdultSelect();
    ChildSelect();
    InfantSelect();

    // 重置输入框内容
    $('.resetBtn').click(function(){
        AdultNum = 1;
        ChildNum = 0;
        InfantNum = 0;

        var today=new Date();
        function timeResult(time){
            var y = time.getFullYear(); 
            var m = time.getMonth()+1;//获取当前月份的日期 
            var d = time.getDate(); 
            m<10 && (m="0"+m);
            d<10 && (d="0"+d);
            return y+'-'+m+'-'+d;
        }
        
        $('#fromcity').val('');
        $('#tocity').val('');
        $('#timeFrom').val(timeResult(today));
        $('#timeTo').val('');
        $('#Cabin').val('Economy');
        $('#Adult').val('1');
        $('#Child').val('0');
        $('#Infant').val('0');
    });
};

flightInfoSelect();