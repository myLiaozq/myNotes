/*
@copyright:liaozq
@email:245822113@qq.com
@date:2016-12-04
*/
//判断window中是否已经引用了jQ.js函数库
if(!window.jQuery){
	throw new Error('本函数库必须依赖于jQuery');
}
;(function ($){
   
   $.fn.extend({
        MSDL: function (options){/*MultiSelectDropList*/
		 //各种属性参数默认值
		 var defaults = {
			resWidth: '200',//选择结果的宽 
			conWidth: '200',//下拉列表宽 
			maxheight: '250',//下拉列表最大高度
			pageSize: '5',//页面显示元素个数
           	url: null,//下拉列表中的数据
           	data_display:"display",	// 显示值
           	data_value:"value",	// 向后台传输值
           	checkBox:"checkbox",	// 单选或多选
			selectokTxt: '确定',//确认文本
			keyWordField: 'keyWord',//关键词搜索用的字段属性名称
			defaultRadio: {"display":"--请选择--","value":""},//默认值
			defaultMult: [{"display":"--请选择--","value":""}],//默认值
		 };

		 //定义变量
		 var options = $.extend(defaults, options);
		 var $this = $(this); //传入的元素
		 var selectId = $this.attr('id'); //获取元素id
		 var selectResult = selectId+'_btn'; //显示结果的容器button
		 var valueResult = selectId+'_val';//向后台传输的值
		 var spanResult = selectId+'_result';//显示的选择值
		 var labelId = selectId+'_label'; //用label绑定input
		 var createPage = selectId+'_page';//分页
		 var searchbox = selectId+'_search';//关键词搜索
		 var url = options.url; //json
		 var pageSize = options.pageSize; // 页面元素个数
		 var data_display = options.data_display; // 显示值
		 var data_value = options.data_value; // 向后台传输值
		 var checkBox = options.checkBox; // 单选
		 var keyWordField = options.keyWordField;
		 var defaultRadio = options.defaultRadio;//单选默认值
		 var defaultMult = options.defaultMult;//多选默认值
         var beforeData = options.beforeData;
		 return this.each(function (){
		 	//创建DOM
			//1. 创建 选择输出值
			var $ipt = $('<button type="button" class="btn btn-default selectResult" id="'+selectResult+'"><input type="text" value="" name="'+valueResult+'" style="display:none" id="'+valueResult+'"/><span class="'+spanResult+' spanResult">--请选择--</span><span class="caret"></span></button>');
			//2.下拉选项包裹
			var $container = $('<div class="containers"></div>');
			//3.创建 确认按钮  
			var $top = $('<div class="top"></div>');//外层div包裹
			var $loading = $('<div class="search_loading">查询中...</div>');//搜索加载
            var $btn = $('<a class="btn btn-info btn-xs ok">'+options.selectokTxt+'</a>');
			//4.下拉中的内容 content层
			var $content = $('<div class="content"></div>');//外层div包裹
			//5.搜索框
            var $searchbox = $('<input type="text" placeholder="输入关键词过滤" id="'+searchbox+'" class="searchbox" />');
            //6.创建分页
            var $_page_ = $('<div class="'+createPage+' pageStyle"></div>');
		   
   			//6.把top层和content层加到$container下
            $searchbox.appendTo($container);	
            $content.appendTo($container);	
   			$_page_.appendTo($container);
		    $loading.appendTo($top);
		    $btn.appendTo($top);
   			$top.appendTo($container);
            //把$ipt和$container加到$(this)下
			$ipt.appendTo($this);
   			$container.appendTo($this);	

   			// 设置CSS样式
			$ipt.width(options.resWidth);//设定文本框宽度
			$this.width(options.resWidth);
			$ipt.width(parseInt(options.resWidth)-26);//减去padding
			$container.width(parseInt(options.conWidth)-20);
			$this.css('display','inline-block');
			$this.css('position','relative');
			$container.css('position','absolute');
			$container.css('z-index','99999');
			$container.css('background','#fff');

			// 选择后的值
			var selResult = $ipt.children('.'+spanResult);
			var valResult = $ipt.children('#'+valueResult);

			var opt_arr = []; // 存储选中数值label
			var opt_arr_val = []; // 存储选中数值val

			// 设置默认值
			if(checkBox!='radio'){
				for(var i = 0; i<defaultMult.length; i++){
					opt_arr.push(defaultMult[i].display);
					opt_arr_val.push(defaultMult[i].value);
				}
				selResult.html(opt_arr.join(','));
				valResult.val(opt_arr_val.join(','));
			}else{
				selResult.html(''+defaultRadio.display+'');
				valResult.val(''+defaultRadio.value+'');
				$btn.remove();//删除确定按钮
			}

			var pageCount = 0; // 总数据数量
			// getData(1,0,pageSize,true,""); // 从后台调用数据

			//ajax请求
			function getData(p,startIndex,pageSize,newPage,keyWord,beforeData){//startIndex数据开始的索引,pageSize每页条数
				
				$.ajax({
					url: url,
					type: 'POST',
					dataType: 'json',
					data: {
					      "start":startIndex,
						   "length":pageSize,
						   "keyWordField":keyWord,
						   "havedSelect":beforeData
					},
					beforeSend: function(obj){
						$loading.show();
					},
					success: function(data) {
						$loading.hide();//隐藏loading
						$content.empty();//清空内容
						pageCount = Math.ceil(data.recordsTotal/pageSize);//总页数
						//获取数据
						var json = [];
						var values = [];
						for(var i = 0; i < data.data.length ; i++){
							json.push(data.data[i][data_display]);
							values.push(data.data[i][data_value]);
						}
						// 显示的内容 如果正常获取后台数据，可以取消pageJson和valJson
						var pageJson = json;//json.slice(startIndex,pageSize*p+1);
						var valJson = values;//values.slice(startIndex,pageSize*p+1);

						var totalRecord = pageJson.length;
						var h = ( (totalRecord * 22) > parseInt(options.maxheight) ) ? options.maxheight : "'" + totalRecord * 22 + "'";
						$content.height(h);

						for(var i = 0; i < totalRecord; i++){
						   var $list = $('<div><input type="'+checkBox+'" value='+valJson[i]+' id="'+labelId+'_'+i+'"/><label for="'+labelId+'_'+i+'">'+pageJson[i]+'</label><br></div>');
						   $list.appendTo($content);
						}

			            //获取input和label
						var $dropList = $content.children().children('input');
						var $dropListLabel = $content.children().children('label');

						$dropListLabel.click(function(e){//点击label阻止冒泡
							e.stopPropagation();
						});
						
						//勾选选项
						$dropList.click(function (e){
							e.stopPropagation();
						    if ($(this).is(':checked')){
						   		//单选或者多选
						   		if(opt_arr[0]=='--请选择--'){opt_arr=[]}//如果不设置默认值，则选择时清除 --请选择--
						   		if(opt_arr_val[0]==''){opt_arr_val=[]}//如果不设置默认值，则选择时清除 --请选择--
						   		if(checkBox!='radio'){
						   			opt_arr.push($(this).next('label').html());
						   			opt_arr_val.push($(this).val());
						   		}else{
						   			$(this).parent().siblings().children('input').attr("checked",false); 
						   			$(this).attr("checked",true); 
						   			selResult.html('');
						   			selResult.html($(this).next('label').html());
						   			valResult.val('');
						   			valResult.val($(this).val());
						   			$container.hide();//隐藏内容框
						   		}
						    }else{
						   		if(checkBox!='radio'){
							   		for(var i=0; i<$dropList.length; i++){
						   	             if($(this).next('label').html() == opt_arr[i]){
						   	             	opt_arr.splice(i, 1);  
						   	             }
						   	             if($(this).val() == opt_arr_val[i]){
						   	             	opt_arr_val.splice(i, 1);  
						   	             }
						   	         }
					   	         }else{
					   	         	selResult.html('--请选择--')
					   	         }
						    };
							
							// 显示选中的值
							if(checkBox!='radio'){
								selResult.html(opt_arr.join(','));
								valResult.val(opt_arr_val.join(','));
							}
							//显示请选择
							if(selResult.html()==''){selResult.html('--请选择--')}
						});

						// 分页时保存选项
						function setChecked(){
							var opt_arr_temp=[];
							var opt_arr_val_temp=[];
					       for(var i=0;i<$dropList.length;i++){
					           var id = $dropList[i].nextSibling.innerHTML;
					           //兼容ie8
					           if(!Array.indexOf)
					           {
					               Array.prototype.indexOf = function(obj)
					               {              
					                   for(var i=0; i<this.length; i++)
					                   {
					                       if(this[i]==obj)
					                       {
					                           return i;
					                       }
					                   }
					                   return -1;
					               }
					           }
								
					           if(checkBox!='radio'){
   					           		if(opt_arr.indexOf(id,0)!=-1){
   					           		    $dropList[i].checked = true;
										if(pageCount==1){
											opt_arr_temp.push(id);
											opt_arr_val_temp.push(id);
										}
   					           		}else{
   					           		    $dropList[i].checked = false;
   					           		}
   					           }else{
   					           		if(selResult.html()==id){
   					           			$dropList[i].checked = true;
   					           		}else{
   					           			$dropList[i].checked = false;
   					           		}
   					           }
					       }
						   if(pageCount==1){
							if(opt_arr.length>0&&opt_arr[0]!='--请选择--'){
						    opt_arr = opt_arr_temp;
							opt_arr_val=opt_arr_val_temp;
							selResult.html(opt_arr.join(','));
							valResult.val(opt_arr_val.join(','));
							}
						   }
                            
					    }
						setChecked(); 

						if(newPage){renderPage()}
					}
				})
			}

			//分页调用
			function renderPage(){
		        $("."+createPage).createPage({
		            pageCount:pageCount,
		            current:1,
		            backFn:function(p){
		            	var keyWord = $('#'+searchbox).val();
		            	var startIndex = (p-1)*pageSize;
		                getData(p,startIndex,pageSize,false,keyWord,beforeData);
		            }
		        });
	        }
		    
		    //向后台搜索关键词
		    var _tick = null;
		    $('#'+searchbox+'').on('keyup',function(event) {
		    	//获取输入的关键词
		    	var kw = $(this).val();
		    	if (_tick) clearTimeout(_tick);
		    	_tick = setTimeout(function() {
		    		//$loading.show();
					getData(1,0,pageSize,true,kw);    	
                }, 1000);
		    });

		    $container.hide();//开始隐藏

			/* $ipt.one("click",function (e){//文本框处于编辑
				e.stopPropagation();//阻止冒泡
				getData(1,0,pageSize,true,"",beforeData); // 从后台调用数据
				$container.show();
			}); */
			$ipt.click(function (e){//文本框处于编辑
				e.stopPropagation();//阻止冒泡
				getData(1,0,pageSize,true,"",beforeData);
				$container.show();
				//$loading.show();
			});
			
			$btn.click(function (e){//点击 确定 按钮 
				e.stopPropagation();//阻止冒泡
			    $container.hide();
			});

			$('html').click(function(e){//点击空白处隐藏
				$container.hide();
			});

			$searchbox.click(function(e){
				e.stopPropagation();//阻止冒泡
			});
		 });
	 },
   });
})(jQuery);