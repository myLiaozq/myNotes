var languageSelect = function(){
	/* 语言切换 */
	$('.languageBox').click(function(e) {
		e.stopPropagation();
		$('.languageDownMenu').show();
		$('.ENbottomLine').show();
		$('.languageSelect').addClass('active');
	});
	$('.languageBox>ul').on('click','li a',function(e){
		e.stopPropagation();
		var img = $(this).css('background-image');
		var span = $(this).children('span').html();
		$('.languageSelect').css('background-image',img);
		$('.languageSelect').children('span').html(span);
		$('.languageSelect').removeClass('active');
		$('.languageBox>ul').hide();
		$('.ENbottomLine').hide();
	});
	$('html').click(function(){
		$('.languageSelect').removeClass('active');
		$('.languageBox>ul').hide();
		$('.ENbottomLine').hide();
	});
};

languageSelect();