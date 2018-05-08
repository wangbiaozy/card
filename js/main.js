//可视窗体对象，获取可视区域高宽，返回windowSize.width,windowSize.height
var windowSize=new WindowSize();
windowSize.getWH();


//初始化,调整尺寸
function init(){
	$("#container,.page,.list,.page_list").width(windowSize.width);
	$("#container,.page").height((windowSize.width)*2.32);
	$(".itox,.itoxIn").height((windowSize.width)*0.7);
	$(".guize").height((windowSize.width)*0.6);
	$('.list,.page_list').height((windowSize.width)*1.608);
	page=$(".page");
	for(var i=0;i<page.length;i++){
		page[i]=$(page[i]);
	}
	var mySize = windowSize.width/windowSize.height;
	if(mySize>0.65){
		//屏幕大于0.65修改样式
		//console.log('变样式'+mySize);
		$('.tc').addClass('new');
	}else{
		//console.log('不变'+mySize);
		$('.tc').removeClass('new');
	}
}

$(function(){
	$('.btn01').on('touchend', function(e) {
		clickData();
    });
	
	//关闭所有弹窗
	$('.btn03,.close,.btn12,.tc_bg05').on('touchend', function(e) {
        $('.tc,.tcIn').hide();
    });
	
	//弹出活动规则
	$('.btn04').on('touchend', function(e) {
        $('.tc,.tcIn').hide();
        $('.tc,.tc_13').show();
    });

	//亲请登录
	$('.show_txt').on('touchend', function(e) {
        $('.tc,.tc_01').show();
    });

	//亲请登录
	$('.show_txt03').on('touchend', function(e) {
        $('.tc,.tc_15').show();
    });

	//活动规则
	$('.i11').on('touchend', function(e) {
        $('.tc,.tc_04').show();
    });
	
	//分享给好友咯
	$('.i12').on('touchend', function(e) {
        $('.tc,.tc_14').show();
    });
	
	//点击卡放大图
	$('.ka li').on('touchend', function(e) {
		$(this).addClass('ka_cur').siblings().removeClass('ka_cur');
		if($('.ka li').eq(0).hasClass('ka_cur')){
			if(ka01==0){
				console.log('不操作');
			}else if(ka01==1){
				//alert('很抱歉，要1张以上才可以送');
				$('.tc,.tc_06').show();
			}else{
				$('.tc07_ka01').html(ka01);
				$('.tc07_ka02').html('盛世美颜');
				$(".tc07_ka21").attr("src","img/ka21.png");
				$('.tc,.tc_07').show();
			}
		}else if($('.ka li').eq(1).hasClass('ka_cur')){
			if(ka02==0){
				console.log('不操作');
			}else if(ka02==1){
				//alert('很抱歉，要1张以上才可以送');
				$('.tc,.tc_06').show();
			}else{
				$('.tc07_ka01').html(ka02);
				$('.tc07_ka02').html('一夜暴富');
				$(".tc07_ka21").attr("src","img/ka22.png");
				$('.tc,.tc_07').show();
			}
		}else if($('.ka li').eq(2).hasClass('ka_cur')){
			if(ka03==0){
				console.log('不操作');
			}else if(ka03==1){
				//alert('很抱歉，要1张以上才可以送');
				$('.tc,.tc_06').show();
			}else{
				$('.tc07_ka01').html(ka03);
				$('.tc07_ka02').html('免费蹭饭');
				$(".tc07_ka21").attr("src","img/ka23.png");
				$('.tc,.tc_07').show();
			}
		}else if($('.ka li').eq(3).hasClass('ka_cur')){
			if(ka04==0){
				console.log('不操作');
			}else if(ka04==1){
				//alert('很抱歉，要1张以上才可以送');
				$('.tc,.tc_06').show();
			}else{
				$('.tc07_ka01').html(ka04);
				$('.tc07_ka02').html('运气爆棚');
				$(".tc07_ka21").attr("src","img/ka24.png");
				$('.tc,.tc_07').show();
			}
		}else if($('.ka li').eq(4).hasClass('ka_cur')){
			if(ka05==0){
				console.log('不操作');
			}else if(ka05==1){
				//alert('很抱歉，要1张以上才可以送');
				$('.tc,.tc_06').show();
			}else{
				$('.tc07_ka01').html(ka05);
				$('.tc07_ka02').html('情投意合');
				$(".tc07_ka21").attr("src","img/ka25.png");
				$('.tc,.tc_07').show();
			}
		}
    });
	
	//点击分享按钮分享给好友
	$('.btn07').on('touchend', function(e) {
		$('.btn07').addClass('btn07_cur');
		//第一步生成验证码
		createCode();
		if($('.ka li').eq(0).hasClass('ka_cur')){
			cardType = 'a';
			//sendCard('a',myCode);
		}else if($('.ka li').eq(1).hasClass('ka_cur')){
			cardType = 'b';
			//sendCard('b',myCode);
		}else if($('.ka li').eq(2).hasClass('ka_cur')){
			cardType = 'c';
			//sendCard('c',myCode);
		}else if($('.ka li').eq(3).hasClass('ka_cur')){
			cardType = 'd';
			//sendCard('d',myCode);
		}else if($('.ka li').eq(4).hasClass('ka_cur')){
			cardType = 'e';
			//sendCard('e',myCode);
		}
		sendCard(cardType,myCode);
    });
	
	//关闭所有弹窗
	$('.tc07_close').on('touchend', function(e) {
        $('.tc,.tcIn').hide();
		$('.ka li').removeClass('ka_cur');
    });
	
	//点击相对的盒子进行切换
	$('.iboxIn').on('touchend', function(e) {
        $(this).addClass('iboxIn_cur').siblings().removeClass('iboxIn_cur');
		$('.itoxIn').eq($(this).index()).addClass('itox_cur').siblings().removeClass('itox_cur');
    });

	//点击相对的盒子进行切换
	$('.btn02').on('touchend', function(e) {
        guafen();
    });

	//点击我的奖品出现 弹窗
	$('.i15').on('touchend', function(e) {
        if(c1==0){
			//没中奖
			$('.tc,.tc_12').show();
		}else{
			if(f1=="每日优鲜百元礼包"){
				$('.tc,.tc_11').show();
			}else{
				$('.tc,.tc_10').show();
			}
		}
    });

});

//验证码
var myCode;
function createCode(){ 
	myCode = "";
	var codeLength = 6;//验证码的长度 
	//var checkCode = document.getElementById("code"); 
	var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//随机数 
	for(var i = 0; i < codeLength; i++) {//循环操作 
		var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35） 
		myCode += random[index];//根据索引取得随机数加到code上 
	}
	//console.log(myCode);
} 





