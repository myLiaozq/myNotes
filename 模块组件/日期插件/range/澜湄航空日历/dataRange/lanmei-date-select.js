
//判断window中是否已经引用了jQ.js函数库
if(!window.jQuery){
    throw new Error('本函数库必须依赖于jQuery');
}

;(function($){
    $.fn.extend({
        dateSelect: function (options){
         //各种属性参数默认值
            var defaults = {
                timeFrom:'',
                timeTo:'',
                isSingleDay:false,
                count:2,
            };

            //定义变量
            var options = $.extend(defaults, options);
            var $this = $(this); //传入的元素
            var timeFrom = options.timeFrom;
            var timeTo = options.timeTo;
            var isSingleDay= options.isSingleDay;
            var count = options.count;
            
            return this.each(function (){
               var oDepDate  = new Date();
               var curDate  = new Date(oDepDate.getFullYear(), oDepDate.getMonth(), oDepDate.getDate() + 1);
               var oBackDate = new Date(oDepDate.getFullYear(), oDepDate.getMonth(), oDepDate.getDate() + 2);
               //出发时间实例 
               var oDepCal = new Calendar({
                    id:            '#'+timeFrom,         //触发显示日历元素ID
                    isPopup:       !0,                  //弹出式日历
                    isPrevBtn:     !0,                  //显示上月按钮
                    isNextBtn:     !0,                  //显示下月按钮
                    isCloseBtn:    !0,                  //显示关闭按钮
                    isHoliday:     0,                  //节假日特殊显示 不显示
                    isHolidayTips: !0,                  //显示节假日1~3天/后1~3天信息
                    isDateInfo:    !0,                  //显示日期信息
                    isMessage:     !0,                  //有日历提示信息
                    isCalStart:    !0,                  //标记为开始时间
                    // dateInfoClass: "date-info-start",   //开始时间icon样式
                    range:         {mindate: new Date(curDate), maxdate: "2030-12-31"},    //限制范围（当天——2030-12-31）
                    count:         count,                   //日历个数
                    monthStep:     1,                   //切换上下月日历步长
               });

               //返程时间实例
               if(!isSingleDay){
                  var oBackCal = new Calendar({
                       id:            '#'+timeTo,         //触发显示日历元素ID
                       isPopup:       !0,                  //弹出式日历
                       isPrevBtn:     !0,                  //显示上月按钮
                       isNextBtn:     !0,                  //显示下月按钮
                       isCloseBtn:    !0,                  //显示关闭按钮
                       isHoliday:     0,                  //节假日特殊显示  不显示
                       isHolidayTips: !0,                  //显示节假日1~3天/后1~3天信息
                       isDateInfo:    !0,                  //显示日期信息
                       isMessage:     !0,                  //有日历提示信息
                       isCalEnd:      !0,                  //标记为结束时间
                       // dateInfoClass: "date-info-end",     //结束时间icon样式
                       range:         {mindate: new Date(curDate)},   //限制范围（当天——2020-12-31）
                       count:         count,                   //日历个数
                       monthStep:     1                    //切换上下月日历步长
                  });
               }

               //日期点击函数
               var startTime = oDepDate.getFullYear()+'-'+(oDepDate.getMonth()+1)+'-'+oDepDate.getDate(); //获取开始时间

               function dateClick(obj) {

                switch(this.triggerNode.id) {
                    case timeFrom:
                        startTime = obj["data-date"];

                        if(!isSingleDay){
                          oBackCal.startDate = this.startDate = obj["data-date"];
                          oBackCal.range.mindate = obj["data-date"]; //设置回程时间最小时间
                          oBackCal.render(this.startDate); 
                          oBackCal.focus();
                        }
                       
                        this.render(this.startDate);
                        // _CAL.$("#J_radio_2").checked && oBackCal.focus();
                       
                        $('.cal-prev').hide();
                        break;
                    case timeTo:
                        // _CAL.$("#J_radio_2").checked = !0;
                        oDepCal.endDate = this.endDate = obj["data-date"];
                        oDepCal.render(this.startDate);
                        this.render(this.endDate);
                        break;
                }
               }

               //日期点击自定义事件
               oDepCal.on("dateClick", dateClick);
               if(!isSingleDay){
                 oBackCal.on("dateClick", dateClick);
               }

              // 定义上一个月和下一个月箭头显示隐藏
               $('.cal-prev').hide();

               // 日期显示触发的事件
               oDepCal.on('show', function(e,i,v) {
                   if(oDepDate.getFullYear()==this.year && oDepDate.getMonth()+1==this.month){
                    $('.cal-prev').hide();
                   }else{
                    $('.cal-prev').show();
                   }
               });

               if(!isSingleDay){
                  oBackCal.on('show', function(e,i,v) {
                      if(oDepDate.getFullYear()==this.year && oDepDate.getMonth()+1==this.month){
                       $('.cal-prev').hide();
                      }else{
                       $('.cal-prev').show();
                      }
                  });
               }

               // 点击下一个月时显示上一个月按钮箭头
               oDepCal.on('nextMonthClick', function(e,i,v) {
                   $('.cal-prev').show();
               });
               oDepCal.on('prevMonthClick', function(e,i,v) {

                   if(oDepDate.getFullYear()==this.year && oDepDate.getMonth()+1==this.month){
                    $('.cal-prev').hide();
                   }
               });

               if(!isSingleDay){
                  oBackCal.on('nextMonthClick', function(e,i,v) {
                      $('.cal-prev').show();
                  });
                  oBackCal.on('prevMonthClick', function(e,i,v) {
                   var data = startTime.split('-');
                   var year = parseInt(data[0]);
                   var month = parseInt(data[1]);
                      if(year==this.year && month==this.month){
                       $('.cal-prev').hide();
                      }
                  });
               }


               //为返程实例添加className, 主要为了样式需要
               if(!isSingleDay){
                  oBackCal.container.className = "cal-end";

                  //开启返程实例的鼠标移动范围
                  oBackCal.showRange();
               }

               //开启键盘事件
               // oDepCal.CalStart = oBackCal.CalStart = oDepCal;
               // oDepCal.CalEnd   = oBackCal.CalEnd   = oBackCal;
               // oDepCal.keyup();
               // oBackCal.keyup();

               //默认出发时间和返程时间
               oDepCal.startDate = _CAL.formatStrDate(curDate);
               // oDepCal.endDate   = oBackCal.endDate   = _CAL.formatStrDate(oBackDate);
               oDepCal.setDateInfo(_CAL.formatStrDate(curDate));
               // oBackCal.setDateInfo(_CAL.formatStrDate(oBackDate));
               
               //单程和双程切换 定义公共函数,使从双程切换到单程的时候，选择日期不显示rang
               var radioChange = function(){
                  var oDepInput  = _CAL.$('#'+timeFrom);
                  
                  oDepCal.render(oDepCal.startDate);

                  if(!isSingleDay){
                     var oBackInput = _CAL.$('#'+timeTo);
                      oBackInput.value = oBackCal.oDateInfo.innerHTML = "";
                      oDepCal.endDate  = oBackCal.endDate  = "";
                      oBackCal.render(oBackCal.startDate);
                  }
               };

               //单程和双程切换
              $('.selectWay a').click(function(e){
                e.preventDefault();
                var selectWay = $(this).attr('data-way');
                var dataMulti = $(this).attr('data-Multi');
                if(selectWay=='roundTrip'){
                  
                }else if(selectWay=='oneWay'){
                  radioChange();
                }
              });

              //单程和双程切换 首页
              $('.js-ticket-radio label').click(function(){
                var selectWay = $(this).children('span').attr('data-way');
                if(selectWay=='roundTrip'){
                  
                }else if(selectWay=='oneWay'){
                   radioChange();
                }
              });

            });
        }
    });
})(jQuery);