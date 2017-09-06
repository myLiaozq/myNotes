var isPc = function(){
	// 判断手机端或者PC端
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}

	var flag = IsPC(); //true为PC端，false为手机端

	var root = '';

	if(flag){ //PC端
		
	}else{ //移动端
		document.write('<link rel="stylesheet" type="text/css" href="libs/mobile-libs/swiper/lm-swiper.css">');
		document.write('<link rel="stylesheet" type="text/css" href="libs/mobile-libs/city/lm-cityPicker.css">');
		document.write('<link rel="stylesheet" type="text/css" href="libs/mobile-libs/date/lm-dateRange.css">');
		document.write('<link rel="stylesheet" type="text/css" href="libs/mobile-libs/mobileSelect/mobileSelect.css">');
		
		
		
	}
};

isPc();