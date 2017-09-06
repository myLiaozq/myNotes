$(function(){
	
	 $('body').running();
	
	$(window).bind("scroll",function(){ 

		var top=$(window).scrollTop();
		
		$('.list .item').each(function(){
			if ($(this).offset().top -top< $(window).height() - 200){
				$('.list .item').removeClass('selected');
				$(this).addClass('selected');
			};							   
		})
		
	});  
	 
			
})

