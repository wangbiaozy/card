//自定义参数；电话号码
var isSubmib = false;
var myUrl = "http://183.240.150.230:3389/userexperience/blacklist2"

//地址栏参数传入页面
function getQueryString(name) {                                       //name为传入参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");     
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;						
}

//图片预加载
preloadimg(['img/listBg.jpg','img/ka21.png','img/ka22.png','img/ka23.png','img/ka24.png','img/ka25.png'])
function preloadimg(array){  
    var newimg=[];  
    for(var i=0;i<array.length;i++){  
         newimg[i]=new Image();  
         newimg[i].src=array[i];  
   }  
} 


var sMobile = getQueryString('sMobile');
var cardType = getQueryString('cardType');
var myCode = getQueryString('myCode');
console.log("sMobile的赋值为"+sMobile+",cardType的赋值为"+cardType+",myCode的赋值为"+myCode);


//判断时间
//判断今天的日期
function getData(){ 
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/getSysTime",
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data.time);
			var nian = data.time.substring(5,7)+data.time.substring(8,10);//格式为2017-05-31 23:09:32 展示位2位数 代表时
			var myTimer = data.time.substring(11,13);
			//console.log('日期为nian='+nian+'');
			var newH1 = parseInt(nian);
			var newTime1 = parseInt(myTimer);
			if(newH1<226){//测试开放今天
				console.log('~~~~~~~~~~活动正常时间~~~~~~~~~~');
				$("#loading").hide();
			}else{
				console.log('~~~~~~~~~~活动结束~~~~~~~~~~');
				$("#loading").hide();
				$('.listTc_01').hide();
				$('.listTc_05').show();
			}
		}
	});

} 

//拿我的好友的卡片
function na(sMobile,cardType,randomNum,gMobile){
	$.ajax({
		url:myUrl+'/getShareCard',
		data:{ 'sMobile': sMobile , 'cardType':cardType , 'randomNum':randomNum , 'gMobile':gMobile ,'flag':1},  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			$('.listTcIn').hide();
			if(data.status=="无数据"){
				//alert('数据已存在，不插入')
				$('.listTc_04').show();
			}else{
				//alert('成功插入');
				//用户号码
				var bbb = sMobile.toString();
				var ccc = bbb.substring(0,3) + '****' + bbb.substring(7,11);
				$('.listTc_02_ka01').html(ccc);
				if(cardType=='a'){
					$('.listTc_02_ka02').html('盛世美颜');
					$('.listTc_02_ka21').attr("src","img/ka21.png");
				}else if(cardType=='b'){
					$('.listTc_02_ka02').html('一夜暴富');
					$('.listTc_02_ka21').attr("src","img/ka22.png");
				}else if(cardType=='c'){
					$('.listTc_02_ka02').html('免费蹭饭');
					$('.listTc_02_ka21').attr("src","img/ka23.png");
				}else if(cardType=='d'){
					$('.listTc_02_ka02').html('运气爆棚');
					$('.listTc_02_ka21').attr("src","img/ka24.png");
				}else if(cardType=='e'){
					$('.listTc_02_ka02').html('情投意合');
					$('.listTc_02_ka21').attr("src","img/ka25.png");
				}
				$('.listTc_02').show();
			}
		}
	});
}

