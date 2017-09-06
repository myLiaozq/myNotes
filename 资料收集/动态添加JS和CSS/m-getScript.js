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

		document.write('<script src="./libs/mobile-libs/swiper/lm-swiper.min.js"></script>');
		document.write('<script type="text/javascript" src="libs/mobile-libs/city/lm-cityPicker.js"></script>');
		document.write('<script type="text/javascript" src="libs/mobile-libs/date/lm-dateRange.js"></script>');
		document.write('<script type="text/javascript" src="libs/mobile-libs/mobileSelect/mobileSelect.js"></script>');

	}
};

isPc();