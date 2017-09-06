 ;
 (function(w) {
     var error = "上传控件不支持您的浏览器！";
     // 构造函数
     function UploadImg(option) {
         $u = this;
         $u.option = option;
         $u.init($u.option);
     }
     UploadImg.prototype = {
         //初始化
         init: function() {
             var $u = this;             
             //template
             $u.addupLoader =
                 '<form  enctype="multipart/form-data">' +
                 '<label style="display:block;width:100%;cursor:pointer;height:100%;position: absolute;">' +
                 '<input  style="display:none" type="file" capture="camera"  name="file"/>' +
                 '</label>' +
                 '</form> ' +
                 '<img src=""  width="' + $u.option.viewWith + '"  height="' + $u.option.viewHeight + '" />' +
                 '<div class="upload-progress"><span  class="upload-son">等待中……</span></div>' +
                 '<div class="mask-Div">' +
                 '<div class="mask-show"></div>' +
                 '<div class="button-div">' +
                 '<span class="upload-btn"></span>' +
                 '<span class="deleteImg-btn"></span></div>' +
                 '</div>';
             $u.wrap = $($u.option.el);
             $u._creatFrom();
             $u.eventChange($u.wrap.childNodes);
         },
         //生成form模板
         _creatFrom: function() {
             this.wrap.innerHTML = $u.addupLoader;
         },
         _removeFrom: function() {
             this.wrap.innerHTML = "";
         },
         //事件触发
         /*
          *对于onchange事件若值没有发生改变的话
          *此事件就会失效所以在这里打算将DOM移除
          *直接初始化所有方法和事件
          *
          */
        /**
         *@method (eventChange) 
         *@param {childArr} 参数为数组集合             
         */
         eventChange: function(childArr) {
             var $u = this;
            //提交form表单
             addEvent(childArr[0], 'change', function(e) { 
                //保存当前this对象  
                 var thisForm = this;                           
                 if (!thisForm['file'].files.length == 0) {
                      $u._removeFrom();
                      $u.init();
                      testWidthHeight(e,function(iSsize){
                        if(!iSsize){  
                             alert("上传的尺寸为:长为"+$u.option.Max_Width +"宽为"+$u.option.Max_Height); 
                             return false; 
                         }
                         childArr[2].setAttribute('src', "");
                         childArr[3].style.display = 'block';
                         $u.wrap.style.background = "#f3f3f3";
                         //发送post请求
                         $u.ajaxPost(thisForm, $u.option.url, function(result) {
                             //post成功
                             var data = JSON.parse(result);
                             $u.maskEvent(childArr);
                             childArr[2].setAttribute('src', data.url);
                             childArr[3].style.display = 'none';

                         }, function(error) {
                                 //post 失败 
                                 console.log(error);
                         }, childArr);
                     });
                 } else {         
                     alert("上传个数不能为0");           
                     return false;
                 }

             });
            /**
            *@method (testWidthHeight) 获取上传尺寸大小
            *@param {e} 事件对象
            *@param {callback} 回调函数              
            */
             function testWidthHeight(e,callback) {
                var isSize;
                var forms = e.target;
                var reader = new FileReader();
                reader.onload = function () { 
                     var dataURL = reader.result;  
                     var image = new Image();
                     image.onload=function(){  
                         var width = image.width;
                         var height = image.height;
                         isSize = width <= $u.option.Max_Width && height  <= $u.option.Max_Height; 
                         if(typeof callback == 'function')  {
                                callback(isSize);
                         }                     
                    };         
                    image.src = dataURL;
                }; 
                reader.readAsDataURL(forms.files[0]);   
                return  isSize;    
             }
         },
         //遮罩层上的是事件
         maskEvent: function(childArr) {
             $u = this;
             var addBtn = childArr[4].childNodes[1].childNodes[0];
             var deleBtn = childArr[4].childNodes[1].childNodes[1];
             //当鼠标滑过
             addEvent($u.wrap, "mouseover", function() {
                 if (childArr[2].getAttribute('src')) {
                     childArr[4].style.top = 0;
                 }
             });
             //当鼠标离开
             addEvent($u.wrap, "mouseout", function() {
                 childArr[4].style.top = -300 + 'px';
             });
             //修改
             addEvent(addBtn, 'click', function() {
                 childArr[0][0].click();
             });
             //删除
             addEvent(deleBtn, 'click', function() {
                 $u.wrap.style.backgroundImage = "url(add-bg-upload1.jpg)";
                 childArr[2].setAttribute('src', "");
             });
         },
       /**
        *@method (ajaxPost) 上传方法
        *@param {fm} 当前form表单
        *@param {url} url地址 
        *@param {fnSuc} 成功回调   
        *@param {fnErr} 失败回调 
        *@param {childArr} 节点集合              
        */
         ajaxPost: function(fm, url, fnSuc, fnErr, childArr) {
             var $u = this;
             //进度条
             var proGress = childArr[3].childNodes[0];
             if (window.XMLHttpRequest) {
                 var xhr = new XMLHttpRequest();
             } else {
                 var xhr = new ActiveXObject("Microsoft.XMLHTTP");
             }
             //data数据 
             var data = new FormData(fm);
             xhr.onreadystatechange = function() {
                 if (xhr.readyState == 4) {
                     //成功回调
                     if (xhr.status == 200) {
                         fnSuc(xhr.responseText);
                     } else {
                         if (fnErr) {
                             fnErr(xhr.status);
                         }
                     }
                 }
             };
             //监听上传进度            
             addEvent(xhr.upload, "progress", uploadProgress);
             //post后台
             xhr.open('post', url);
             //发送数据
             xhr.send(data);
             //上传进度
             function uploadProgress(evt) {
                 var loaded = evt.loaded; //已上传的文件大小
                 var allTotal = evt.total; //总大小
                 var per = Math.floor((loaded / allTotal) * 100) + '%';
                 proGress.innerHTML = per;
                 proGress.style.width = per;
             }
         },

     };
     //获取元素
     function $(selectors) {
         return document.querySelector(selectors);
     }
     //事件监听
     function addEvent(el, type, fn) {
         if (el.addEventListener) {
             el.addEventListener(type, fn, false);
         } else if (el.attachEvent) {
             el.attachEvent('on' + type, function() {
                 fn.call(el);
             });
         } else {
             throw new Error('not supported or DOM not loaded');
         }
     }
     //判断浏览器是否存在file属性
     if (window.File && window.FileList) {
              window.UploadImg = UploadImg;
     } else {
        alert(error);
         return false;
     }
    
 })(window);