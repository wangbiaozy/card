//自定义参数；电话号码
var isSubmib = false;
var myUrl = "http://183.240.150.230:3389/userexperience/blacklist2"
var a1,c1,d1,f1,cardType;
var ka01 = 1;
var ka02 = 0;
var ka03 = 0;
var ka04 = 0;
var ka05 = 0;
//a1为判断是否黑名单还是普通人，0未否，1为是
//c1用户是否中奖
//d1是否成长值 点击次数
//f1判断中过什么奖品
//图片预加载
preloadimg(['img/bg.jpg','img/guize.png','img/tc_bg05.png'])
function preloadimg(array){  
    var newimg=[];  
    for(var i=0;i<array.length;i++){  
         newimg[i]=new Image();  
         newimg[i].src=array[i];  
   }  
} 



function openBg(){
	if(resCode==0){
		if(telephone==""||telephone==null){
			//alert("没电话号码");
			$("#loading").remove();
			$('.page01').addClass('cur').removeClass('hide').show();
			//$('.show_txt').show();
		}else{
			//alert("存在号码");
			pdZFB();
		}
	}else{
		//alert("没电话号码");
		$("#loading").remove();
		$('.page01').addClass('cur').removeClass('hide').show();
		//$('.show_txt').show();
	}
}


//支付宝判断方法
function pdZFB(){ 
	//console.log(window.navigator.userAgent);
	if(isZFB()){
		console.log("支付宝");
		insert(telephone);
	}else{
		console.log("-----不在支付宝里面-----");
		//不在支付宝上应该打开的链接  正式的话打开下面3个最后面的隐藏
		$("#loading").hide();
		$('.page01').addClass('cur').removeClass('hide').show();
		$('.show_txt').show();
		/*insert(telephone);*/
	}
	
} 
function isZFB(){
	var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/AlipayClient/i) =='alipayclient'){ 
			return true; 
		}else{ 
			return false; 
		} 
}


//地址栏参数传入页面
function getQueryString(name) {                                       //name为传入参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");     
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;						
}

var resCode = getQueryString('resCode');
var telephone = getQueryString('telephone');
console.log("resCode的赋值为"+resCode+",telephone的赋值为"+telephone);

//先保存电话号码一个 无论他是否黑名单  
function insert(telephone){
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/insert",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.insert=="插入点击成功。"){
				$('.tc,.tc_13').show();
			}
			console.log('ps:用户号码保存成功');
			getWinNum();
		}
	});
}

//然后查询多少人查询总人数
function getWinNum(){
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+'/getWinNum',
		data:{ 'gMobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			$('.page01_txt01 span').html(data.total);
			console.log('ps02:号码参与人数为'+data.total);
			getSendCards();
		}
	});
}

//查询我帮了多少个人跟多少个人帮我
//点击我赠送的
function getSendCards(){
    for(var i=0;i<data.length;i++){
        var newKa = "";
        if(data[i].cardType=='a'){
            newKa = "盛世美颜"
        }else if(data[i].cardType=='b'){
            newKa = "一夜暴富"
        }else if(data[i].cardType=='c'){
            newKa = "免费蹭饭"
        }else if(data[i].cardType=='d'){
            newKa = "运气爆棚"
        }else if(data[i].cardType=='e'){
            newKa = "情投意合"
        }
        if(data[i].gMobile=="null"){
            //没有的时候直接通过
        }else{
            $(".itoxIn01").prepend("<div class='itoxInLi'>送给<span class='itox_Num'>"+data[i].gMobile.substring(0,3)+"****"+data[i].gMobile.substring(7,11)+"</span>赠送的<span class='itox_ka'>"+newKa+"</span>卡<span class='itox_time'>"+data[i].gTime.substring(0,11)+"</span></div>");
        }
    }
    getReceCards();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+'/getSendCards',
		data:{ 'sMobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			$('.itoxIn01 .itoxInLi').remove();
			if(data.status=="无数据"){
				$(".itoxIn01").prepend("<div class='itoxInLi'>无数据</div>");
				console.log('ps03:我赠送的---'+data.status);
			}else{
				for(var i=0;i<data.length;i++){
					var newKa = "";
					if(data[i].cardType=='a'){
						newKa = "盛世美颜"
					}else if(data[i].cardType=='b'){
						newKa = "一夜暴富"
					}else if(data[i].cardType=='c'){
						newKa = "免费蹭饭"
					}else if(data[i].cardType=='d'){
						newKa = "运气爆棚"
					}else if(data[i].cardType=='e'){
						newKa = "情投意合"
					}
					if(data[i].gMobile=="null"){
						//没有的时候直接通过
					}else{
						$(".itoxIn01").prepend("<div class='itoxInLi'>送给<span class='itox_Num'>"+data[i].gMobile.substring(0,3)+"****"+data[i].gMobile.substring(7,11)+"</span>赠送的<span class='itox_ka'>"+newKa+"</span>卡<span class='itox_time'>"+data[i].gTime.substring(0,11)+"</span></div>");	
					}
				}
				console.log('ps03:我赠送的---'+data.length);
			}
			getReceCards();
		}
	});
}

//点击我获得的
function getReceCards(){
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+'/getReceCards',
		data:{ 'gMobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			$('.itoxIn02 .itoxInLi').remove();
			if(data.status=="无数据"){
				$(".itoxIn02").prepend("<div class='itoxInLi'>无数据</div>");
				console.log('ps04:我获得的---'+data.status);
			}else{
				for(var i=0;i<data.length;i++){
					var newKa = "";
					if(data[i].cardType=='a'){
						newKa = "盛世美颜"
					}else if(data[i].cardType=='b'){
						newKa = "一夜暴富"
					}else if(data[i].cardType=='c'){
						newKa = "免费蹭饭"
					}else if(data[i].cardType=='d'){
						newKa = "运气爆棚"
					}else if(data[i].cardType=='e'){
						newKa = "情投意合"
					}
					$(".itoxIn02").prepend("<div class='itoxInLi'>获得<span class='itox_Num'>"+data[i].sMobile.substring(0,3)+"****"+data[i].sMobile.substring(7,11)+"</span>赠送的<span class='itox_ka'>"+newKa+"</span>卡<span class='itox_time'>"+data[i].gTime.substring(0,11)+"</span></div>");	
				}
				console.log('ps04:我获得的---'+data.length);
			}
			query(telephone);
		}
	});
}




//第一步查询是否黑名单,判断是否能参与活动
function query(telephone){
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/check",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data.state);
			if(data.state == true){
				a1 = 0;//解除黑名单默认为0
				console.log('一,此人为黑名单,a1='+a1+'');
				Lucky(telephone);
			}else{
				a1 = 1;
				console.log('一,此人为普通人,a1='+a1+'');
				Lucky(telephone);
			}
		}
	});
};

//第二步查询是否中过奖
function Lucky(telephone){
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/search",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.state == false){
				c1 = 0;
				f1 = 0
				console.log("二.还没中过奖，奖品名称为c1="+c1+",还没中过奖f1="+f1);
				getClick(telephone);
			}else{
				f1 = data.state;
				c1 = 1;
				console.log("二.提醒已经领取奖品c1="+c1+",已经中过奖f1="+f1);
				getClick(telephone);
			}
		}
	});
};

//第三步进来查询点击表
function getClick(telephone){
    topCha();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/getClick",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.total == null||data.total == 0||data.msg == "无数据  "){
				d1 = 0;
				$('.page01_txt02 span').html(2);
				console.log('三、点击没有数据或者数据为0,d1='+d1+'');
			}else{
				d1 = parseInt(data.total);
				var numList = 2-d1;
				$('.page01_txt02 span').html(numList);
				console.log('三、用户今天有点击过,d1='+d1+'');
			}
			topCha();
		}
	});
}

////4.查询各种卡的类型
function topCha(){
    panduanKa();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+'/getAllCards',
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.state == "该号码暂时没有得到卡片"){
				console.log('四、我没卡片');
			}else{
				console.log('四、有卡片');
				for(var i=0;i<data.length;i++){
					//console.log(data[i].total);
					//定义卡的数量
					if(data[i].total == 'a'){
						ka01 = data[i].type
						//console.log('ka01='+ka01);
					}else if(data[i].total == 'b'){
						ka02 = data[i].type
						//console.log('ka02='+ka02);
					}else if(data[i].total == 'c'){
						ka03 = data[i].type
						//console.log('ka03='+ka03);
					}else if(data[i].total == 'd'){
						ka04 = data[i].type
						//console.log('ka04='+ka04);
					}else if(data[i].total == 'e'){
						ka05 = data[i].type
						//console.log('ka05='+ka05);
					}
				}
			}
			console.log('ka01='+ka01+',ka02='+ka02+',ka03='+ka03+',ka04='+ka04+',ka05='+ka05);
			panduanKa();
		}
	});
}

//按照卡的数量显示卡的样式
function panduanKa(){
	//第一个卡片的样式
	if(ka01>0){
		$('.ka li').eq(0).children('.kaImg').attr('src','img/ka11.png');
		$('.yuan01').show().html(ka01);
	}else{
		$('.ka li').eq(0).children('.kaImg').attr('src','img/ka01.png');
		$('.yuan01').hide();
	}
	//第二个卡片的样式
	if(ka02>0){
		$('.ka li').eq(1).children('.kaImg').attr('src','img/ka12.png');
		$('.yuan02').show().html(ka02);
	}else{
		$('.ka li').eq(1).children('.kaImg').attr('src','img/ka02.png');
		$('.yuan02').hide();
	}
	//第三个卡片的样式
	if(ka03>0){
		$('.ka li').eq(2).children('.kaImg').attr('src','img/ka13.png');
		$('.yuan03').show().html(ka03);
	}else{
		$('.ka li').eq(2).children('.kaImg').attr('src','img/ka03.png');
		$('.yuan03').hide();
	}
	//第四个卡片的样式
	if(ka04>0){
		$('.ka li').eq(3).children('.kaImg').attr('src','img/ka14.png');
		$('.yuan04').show().html(ka04);
	}else{
		$('.ka li').eq(3).children('.kaImg').attr('src','img/ka04.png');
		$('.yuan04').hide();
	}
	//第五个卡片的样式
	if(ka05>0){
		$('.ka li').eq(4).children('.kaImg').attr('src','img/ka15.png');
		$('.yuan05').show().html(ka05);
	}else{
		$('.ka li').eq(4).children('.kaImg').attr('src','img/ka05.png');
		$('.yuan05').hide();
	}
	if(c1==0){
		if(ka01>0&&ka02>0&&ka03>0&&ka04>0&&ka05>0){
			$('.btn02').css('zIndex',3);
			$('.btn01').css('zIndex',1);
			$('.i17').show();
		}else{
			$('.btn01').css('zIndex',3);
			$('.btn02').css('zIndex',1);
			$('.i17').hide();
		}
	}else{
		$('.btn01').css('zIndex',3);
		$('.btn02').css('zIndex',1);
		$('.i17').hide();
	}
	playGame()
}

//查询完数据提示窗口
function playGame(){
	console.log('-----------进入游戏准备开始-----------');
	//用户号码
	//var bbb = telephone.toString();
	//var ccc = bbb.substring(0,3) + '****' + bbb.substring(7,11);
	//$('.myNum').html(ccc);
	$('.myPrize').html(f1);
	$("#loading").hide();
	$('.page01').addClass('cur').removeClass('hide').show();
	if($('.btn07').hasClass('btn07_cur')){
		$('.btn07').removeClass('btn07_cur');
		console.log('进入支付宝分享方法');
        $('.tc,.tcIn').hide();
		$('.ka li').removeClass('ka_cur');
		$('.tc,.tc_08').show();

	}
}


//用户操作接口
//点击抽奖
function clickData(){
    choujiang();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/click",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			//console.log(data);
			isSubmib=false;
			if(data.insert=="点击超过最大值2"){
				//alert(' 抱歉，您次数已满');
				$('.tc,.tc_05').show();
			}else{
				choujiang();
			}
		}
	});
}

//抽奖情况
var luckyNum;
//随机数
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
//抽奖流程 抽到随机数代表获奖奖品  高概率正常的概率

 // 1：抽中卡片1，a卡
 // 2：抽中卡片2，b卡
 // 3：抽中卡片3，c卡
 // 4：抽中卡片4，d卡
 // 5：抽中卡片5，e卡

function choujiang(){
	//成立一个随机函数 判断概率
	var ntt = GetRandomNum(1,1000);
	//console.log("随机数为"+ntt);
	if(ntt>0&&ntt<300){//一等奖0.3
		luckyNum = 1;
	}else if(ntt>=300&&ntt<400){//二等奖0.1
		luckyNum = 2;
	}else if(ntt>=400&&ntt<700){//三等奖0.3
		luckyNum = 3;
	}else if(ntt>=700&&ntt<900){//四等奖0.2
		luckyNum = 4;
	}else{//五等奖250
		luckyNum = 5;
	}
	//luckyNum = 1;//指定奖品数字
	winner();
}

//抽中对应的卡片
function winner(){
	if(luckyNum==1){
		//抽中了a卡
		$('.ka21').attr('src','img/ka21.png');
		chouka('a');
	}else if(luckyNum==2){
		//抽中了b卡
		$('.ka21').attr('src','img/ka22.png');
		chouka('b');
	}else if(luckyNum==3){
		//抽中了c卡
		$('.ka21').attr('src','img/ka23.png');
		chouka('c');
	}else if(luckyNum==4){
		//抽中了d卡
		$('.ka21').attr('src','img/ka24.png');
		chouka('d');
	}else{
		//抽中了e卡
		$('.ka21').attr('src','img/ka25.png');
		chouka('e');
	}
}

//抽卡对应的接口
function chouka(cardType){
    $('.tc,.tc_03').show();
    getClick();
	$.ajax({
		url:myUrl+'/getCard',
		data:{ 'mobile': telephone , 'cardType':cardType},  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			$('.tc,.tc_03').show();
			getClick(telephone);
		}
	});
}

//瓜分流量
//*1为1G   500
//*2为500  3000
//*3为150  5000
//*4为70   8000
//*5为每日优先百元礼包

var mylucky;
function guafen(){
	//成立一个随机函数 判断概率
	var ntt = GetRandomNum(1,10000);
	//console.log("随机数为"+ntt);
	if(ntt>0&&ntt<101){//一等奖1 0.01
		mylucky = 1;
	}else if(ntt>=101&&ntt<1101){//二等奖500 0.1
		mylucky = 2;
	}else if(ntt>=1101&&ntt<2601){//三等奖150 0.15
		mylucky = 3;
	}else if(ntt>=2601&&ntt<4601){//四等奖70 0.2
		mylucky = 4;
	}else{//五等奖250
		mylucky = 5;
	}
	if(a1==0){
		mylucky = 5;//指定奖品数字
	}
	myWin()
}

//对应奖品中奖
function myWin(){
	if(mylucky==1){//一等奖
		//console.log("---一等奖---");
		save(telephone,"1G",1);	
	}else if(mylucky==2){//二等奖
		//console.log("---二等奖---");
		save(telephone,"500M",2);	
	}else if(mylucky==3){//三等奖
		//console.log("---三等奖---");
		save(telephone,"150M",3);	
	}else if(mylucky==4){//四等奖
		//console.log("---四等奖---");
		save(telephone,"70M",4);	
	}else{
		//alert('抱歉没中奖！');
		save(telephone,"每日优鲜百元礼包",5);	
	}
}

function save(telephone,myPrizeName,myPtype){
	$.ajax({
		url:myUrl+"/save",
		data:{ 'mobile': telephone , 'prizeName':myPrizeName , 'type':myPtype },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			if(data.save=="保存成功！"){
				//console.log('恭喜你成功保存你的奖品了！');
				$('.myPrize').html(myPrizeName);
				if(mylucky == 5){
					$('.tc,.tc_11').show();
				}else{
					$('.tc,.tc_10').show();
				}
				Lucky(telephone);
			}else if(data.state=="抱歉，该奖品已抽完！"){
				mylucky = 5;//指定奖品数字
				myWin();
			}else{
				//console.log('抱歉没中奖！');
				$('.tc,.tc_09').show();
			}
		}
	});
}


//判断时间
//判断今天的日期
function getData(){ 
	if(isSubmib){
		return;
	}
	isSubmib=true;
    openBg();
	$.ajax({
		url:myUrl+"/getSysTime",
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			////console.log(data.time);
			var nian = data.time.substring(5,7)+data.time.substring(8,10);//格式为2017-05-31 23:09:32 展示位2位数 代表时
			var myTimer = data.time.substring(11,13);
			console.log('日期为nian='+nian+'');
			var newH1 = parseInt(nian);
			var newTime1 = parseInt(myTimer);
			if(newH1<226){//测试开放今天
				console.log('~~~~~~~~~~活动正常时间~~~~~~~~~~');
				openBg();
			}else{
				console.log('~~~~~~~~~~活动结束~~~~~~~~~~');
				$("#loading").hide();
				$('.page01').addClass('cur').removeClass('hide').show();
				$('.show_txt03').show();
			}
		}
	});

} 

//送卡的接口
function sendCard(cardType,randomNum){
    topCha();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+'/sendCard',
		data:{ 'mobile': telephone , 'cardType':cardType , 'randomNum':randomNum },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			topCha();
		}
	});
}


