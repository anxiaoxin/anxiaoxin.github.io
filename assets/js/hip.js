
var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

canvas.width = 980;
canvas.height = 500;


//加载图片
var sImageReady = false;
var sImage = new Image();

sImage.onload = function(){
	sImageReady = true;
}
sImage.src = "../../assets/images/Nicole.png";

var bImageReady = false;
var bImage = new Image();
bImage.onload = function(){
	bImageReady = true;
}
bImage.src = "../../assets/images/Brown.png";


var bombReady = false;
var bombImage = new Image();
bombImage.onload = function(){
	bombReady = true;
};
bombImage.src = "../../assets/images/Sally.png";

//重置游戏
$("#reset").on('click',function(){
	anHip.constructor(canvas.width / 2,canvas.height / 2);
	count = 0;
	pigNums = 1;
	pigHip.speed = 100;
	for(i in pigs){
		if(i != 0){
			delete pigs[i];
		}
	}
	theKingOfPig = null;
	$("#level").val(0);	
});

var theKingOfPig = null;

$("#canNotGetPig").on("click",function(){
	theKingOfPig = new pig();
	theKingOfPig.speed = anHip.speed + 50;
	theKingOfPig.r = 20 + count / 4;
	theKingOfPig.constructor();
});

var speed = 100;
//等级选择
$("#level").on('change',function(e){
	var level = $("#level").val();
	if(level == 0){
		speed = 100;
		points = 0.7
	}else if(level == 1){
		speed = 200;
		points = 0.5
	}else{
		speed = 500;
		points = 0.2
	}

	for(i in pigs){
		pigs[i].speed = speed;
	}
	$("#level")[0].blur();
});

//添加pig
$("#addPig").on('click',function(){
	pigNums += 1;
	pigs[pigNums] = new pig();
	pigs[pigNums].constructor();
	pigs[pigNums].speed = speed;
});

//监听按键方向
var keysDown = {};

addEventListener('keydown',function(e){
	keysDown[e.keyCode] = true;
},false);

addEventListener('keyup', function(e){
	delete keysDown[e.keyCode];
},false);

// 创建anHip对象
var anHip = {           
	speed : 0,
	x : 0,
	y : 0,
	r : 0,
	derc: 0 ,
	constructor : function(x,y){      //构造函数，初始化位置
		this.x = x;
		this.y = y;
		this.speed = 256;
		this.r = 25;
	},
	updateAnHipLocation :function(modifier){
		if(38 in keysDown){
			if(anHip.y > 5){
				anHip.y -= anHip.speed * modifier;	
			}
			
		}
		if(40 in keysDown){
			if (anHip.y < (canvas.height - 30)) {
				anHip.y += anHip.speed * modifier;	
			}
		}
		if(37 in keysDown){
			if(anHip.x > 5){
				anHip.x -= anHip.speed * modifier;	
			}
		}
		if(39 in keysDown){
			if(anHip.x < (canvas.width - 28)){
				anHip.x += anHip.speed * modifier;
			}
		}
		if(17 in keysDown){
			anHip.speed = 600;
		}else{
			anHip.speed = 256;
		}			
	}

};

//定义pid类
var pig = function(){
	this.r = 10;
	//运动方向，随机生成
	this.derc = Math.ceil(Math.random() * 4);
	this.speed = 100;
	this.x = 0;
	this.y = 0;
	//构造函数，设置随机出现的位置
	this.constructor = function(){
		this.x = 32 + (Math.random() * (canvas.width - 64));
		this.y = 32 + (Math.random() * (canvas.height - 64));		
	};
	//判断是否改变方向
	this.changeDirection = function(){
		//是否改变方向
		if (Math.random() > points){
			switch(this.derc){
				case 1:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 1){
								this.derc = derc;
								break;
							}
						};
						break;		
				case 2:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 2){
								this.derc = derc;
								break;
							}
						};
						break;
				case 3:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 3){
								this.derc = derc;
								break;
							}
						};
						break;
				case 4:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 4){
								this.derc = derc;
								break;
							}
						};
						break;
			}	
		}	
	};
	this.updateLocation = function(timesCount,modifier){
		if( timesCount){
			this.changeDirection();
		}
		
		switch(this.derc){
			case 1: 
				if(this.y > 15){
					this.y -= this.speed * modifier;
				}else{
					this.derc = 2;
				}
				break;
			case 2: 
				if(this.y < (canvas.height - 15)){
					this.y += this.speed * modifier;
				}else{
					this.derc = 1;
				}
				break;
			case 3: 
				if(this.x > 15){
					this.x -= this.speed * modifier;	
				}else{
					this.derc = 4;
				}
				break;
			case 4: 
				if(this.x < (canvas.width - 15)){
					this.x += this.speed * modifier;
				}else{
					this.derc = 1;
				}
			 	break;
		}		
	};
}

//定义炸弹类
var bomb = function(){
	this.x = 0;
	this.y = 0;
	this.r = 50;
	this.speed = 0;
	this.derc = 1; 
	//构造函数，设置随机出现的位置
	this.constructor = function(){
		this.x = 32 + (Math.random() * (canvas.width - 64));
		this.y = 32 + (Math.random() * (canvas.height - 64));		
	};
	//判断是否改变方向
	this.changeDirection = function(){
		//是否改变方向
		if (Math.random() > points){
			switch(this.derc){
				case 1:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 1){
								this.derc = derc;
								break;
							}
						};
						break;		
				case 2:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 2){
								this.derc = derc;
								break;
							}
						};
						break;
				case 3:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 3){
								this.derc = derc;
								break;
							}
						};
						break;
				case 4:
						while(1){
							var derc = Math.ceil(Math.random() * 4);
							if(derc != 4){
								this.derc = derc;
								break;
							}
						};
						break;
				case 0:break;
			}	
		}	
	};
	this.updateLocation = function(timesCount,modifier){
		if( timesCount){
			this.changeDirection();
		}
		
		switch(this.derc){
			case 1: 
				if(this.y > 15){
					this.y -= this.speed * modifier;
				}
				break;
			case 2: 
				if(this.y < (canvas.height - 15)){
					this.y += this.speed * modifier;
				}
				break;
			case 3: 
				if(this.x > 15){
					this.x -= this.speed * modifier;	
				}
				break;
			case 4: 
				if(this.x < (canvas.width - 15)){
					this.x += this.speed * modifier;
				}	
			 	break;
			case 0:break;
		}		
	};	
};


//绘图
var drawCircle = function(){

	if(anHip.speed != 0){
		anHipTimes = count / 2;
		anHip.r = 25 + anHipTimes;
	}

	pigHipTimes = count / 4;
	for(i in pigs){
		pigs[i].r = 10  + pigHipTimes;
	}


	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText('Nicole个数：'+pigNums+'个 已收服Nicole:'+count+'个 Brown宽度为：'+anHip.r+' 速度为：'+anHip.speed,20,30);
	ctx.closePath();

	if(count > 30 && count < 70){
		ctx.fillText('技能解锁：按住Ctrl键可以加快移动速度',650,20);
	}

	if(theKingOfPig){
		ctx.beginPath();
		ctx.drawImage(sImage,theKingOfPig.x,theKingOfPig.y,theKingOfPig.r,theKingOfPig.r);
		ctx.closePath();
	}

	for(i in pigs){
		ctx.beginPath();
		ctx.drawImage(sImage,pigs[i].x,pigs[i].y,pigs[i].r,pigs[i].r);
		ctx.closePath();		
	}

	for(i in bombs){
		ctx.beginPath();
		ctx.drawImage(bombImage,bombs[i].x,bombs[i].y,bombs[i].r,bombs[i].r);
		ctx.closePath();

	}

	if(anHip.speed != 0){
		ctx.beginPath();
		ctx.drawImage(bImage,anHip.x,anHip.y,anHip.r,anHip.r);
		ctx.closePath();
	}else{
		if(anHip.r < 200){
			anHip.r += 1;
			ctx.beginPath();
			ctx.drawImage(bImage,anHip.x,anHip.y,anHip.r,anHip.r);
			ctx.closePath();
		}else{
			ctx.beginPath();
			ctx.drawImage(bImage,anHip.x,anHip.y,anHip.r,anHip.r);
			ctx.closePath();
		}
	}	



	ctx.clearRect(0,0,ctx.width,ctx.height);

}

//判断是否吃掉
var ifEat = function(){

	for(i in pigs){
		var distance = anHip.r - pigs[i].r;
		x_distance = Math.abs(anHip.x + anHip.r / 2 - pigs[i].x - pigs[i].r / 2);
		y_distance = Math.abs(anHip.y + anHip.r / 2 - pigs[i].y - pigs[i].r / 2);

		if ((x_distance < distance) && (y_distance < distance)){
			count += 1;
			pigs[i].constructor();
		}
	}

	for(i in bombs){
		var distance = Math.abs(anHip.r - bombs[i].r);
		x_distance = Math.abs(anHip.x + anHip.r / 2 - bombs[i].x - bombs[i].r / 2);
		y_distance = Math.abs(anHip.y + anHip.r / 2 - bombs[i].y - bombs[i].r / 2);

		if ((x_distance < distance) && (y_distance < distance)){
				for(i in pigs){
					pigs[i].speed = 0;
				}
				anHip.speed = 0;
		}
	}

	if(theKingOfPig){
		leaveAnHip();
	}
};


//判断pigKing对于anHip的距离
var leaveAnHip = function(){
	if((theKingOfPig.x - anHip.x -anHip.r) < 50 && (theKingOfPig.x - anHip.x - anHip.r) > 0){
			theKingOfPig.derc = 2;
			theKingOfPig.speed = anHip.speed + 80;
	}

	if((theKingOfPig.x + theKingOfPig.r - anHip.x) < 0 && (theKingOfPig.x + theKingOfPig.r - anHip.x) > -50){
		theKingOfPig.derc = 1;
		theKingOfPig.speed = anHip.speed + 80;
	}

	if((theKingOfPig.y + theKingOfPig.r - anHip.y) < 0 && (theKingOfPig.y + theKingOfPig.r - anHip.y) > -50){
		theKingOfPig.derc = 4;
		theKingOfPig.speed = anHip.speed + 80;
	}

	if((theKingOfPig.y - anHip.y -anHip.r) < 50 && (theKingOfPig.y - anHip.y -anHip.r) > 0){
		theKingOfPig.derc = 3;
		theKingOfPig.speed = anHip.speed + 80;
	}

};

//判断是否爆炸
var boom = function(){

};

var controler = function(dela){

	//判断是应该有炸弹，并控制炸弹的个数与速度

	//更新anHip的坐标
	if(anHip.speed != 0){
		if(theKingOfPig){
			var anHipX = anHip.x + anHip.r / 2;
			var anHipY = anHip.y + anHip.r / 2;
			var theKingOfPigX = theKingOfPig.x + theKingOfPig.r / 2;
			var theKingOfPigY =  theKingOfPig.y + theKingOfPig.r / 2;
			var destance = anHip.r + theKingOfPig.r;
			var X = Math.abs(anHipX - theKingOfPigX);
			var Y = Math.abs(anHipY - theKingOfPigY);
			var realDestance = parseInt(Math.sqrt((Math.pow(X,2) + Math.pow(Y,2))));
			if(realDestance > destance){
				anHip.updateAnHipLocation(dela / 1000);   	
			}				
		}else{
			anHip.updateAnHipLocation(dela / 1000);   
		}
	
			
	}
	
	//更新pigHip的坐标
	if (times == 10){
		for(i in pigs){
			pigs[i].updateLocation(true,dela / 1000);
			if(theKingOfPig){
				theKingOfPig.updateLocation(true,dela / 1000);
			}
			times = 0;
		}
	}else{
		for(i in pigs){
			pigs[i].updateLocation(false,dela / 1000);
			if(theKingOfPig){
				theKingOfPig.updateLocation(false,dela / 1000);
			}
			
		}
		return times;
	}

	//bombs Controle
	
	if(anHip.speed != 0){
		ifEat();
	}

};


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

times = 0;
var main = function(){
	var now = new Date();
	var dela = now - then;
	times += 1;

	controler(dela);

	drawCircle();
	then = now;
	requestAnimationFrame(main);

};


//定义pig出现的个数，并用于索引pigs
pigNums = 1;		
//吃的小Hip数
var count = 0;
//改变运行方向的概率
var points = 0.7
// 炸弹数
bombNums = 0;
bombs = {}
var bomb = new bomb();
bombs[0] = bomb;
bombs[0].constructor();

var pigs = {};		//定义pigs对象用于存储pig
anHip.constructor(canvas.width / 2,canvas.height /2);
var pigHip = new pig();

pigs[0] = pigHip;
pigs[0].constructor();

var then = new Date();


main();