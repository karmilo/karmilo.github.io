var winWidth;
var winHeight;
var MARGIN_X;
var MARGIN_Y;
var r;
var cx; //第一个数字位置
var cy;
var lastTime=''; //标记时间是否改变
var timeStatus=false;
var addBall=false; //是否需要生成小球
var balls=new Array(); //小球管理数组
window.onload=function(){

	window.canvas=document.getElementById('canvas');
	window.context=canvas.getContext('2d');
	canvas.width=document.body.clientWidth;
	canvas.height=document.body.clientHeight;
	
	window.clockTimeManage=setInterval(function(){
		//获取宽高
		getWH();
		canvas.width=Math.round(winWidth);
		canvas.height=Math.round(winHeight);
		r=Math.round(winWidth*3/7/108)-1;
		MARGIN_X=Math.round(winWidth*2/7);
		MARGIN_Y=Math.round(winHeight/5);
		cx=MARGIN_X;
		cy=MARGIN_Y;
		//获取时间
		var date=new Date();
		var hour=makeTime(date.getHours());
		var min=makeTime(date.getMinutes());
		var sec=makeTime(date.getSeconds());
		var timeStr=hour+min+sec;
		//判断是否需要生成小球
		if(timeStr!=lastTime){
			timeStatus=true;
		}
		makeBitmap(timeStr);
		ballsDrop();
		timeStatus=false;
	},30);
};

function getWH(){
	if (window.innerWidth) winWidth = window.innerWidth; else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;
	if (window.innerHeight) winHeight = window.innerHeight; else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
}

function makeTime(num){
	if(num<10){
		return '0'+num;
	}else{
		return ''+num;
	}
}

function makeBitmap(str){
	context.clearRect(0,0,document.body.clientWidth,document.body.clientHeight);
	cx=MARGIN_X;
	for(var i=0;i<6;i++){
		//查找不同的数字下标
		if(timeStatus&&str.substr(i,1)!=lastTime.substr(i,1)){
			addBall=true;
		}
		//开始绘制单个点阵图
		makeNum(str.substr(i,1));
		cx+=8*(r+1)*2;
		addBall=false;
		//绘制冒号点阵图
		if(i%2==1&&i<5){
			makeNum(10);
			cx+=4*(r+1)*2;
		}
	}
	lastTime=str;
}

function makeNum(num){
	for(var index in digit){
		if(index==num){
			for(var row in digit[index]){
				for(var field in digit[index][row]){
					if(digit[index][row][field]==1){
						context.beginPath();
						context.arc(cx+parseInt(field)*(r+1)*2,cy+parseInt(row)*(r+1)*2,r,0,2*Math.PI);
						context.closePath();
						context.fillStyle="black";
						context.fill();
						if(addBall){
							//新建一个小球实例，添加到数组管理
							if(Math.random()>0.5){
								var vx=-Math.round(Math.random()*(5-2)+2);
							}else{
								var vx=Math.round(Math.random()*(5-2)+2);
							}
							var col=color[Math.round(Math.random()*(color.length-1))];
							balls[balls.length]=new Ball(cx+parseInt(field)*(r+1)*2,cy+parseInt(row)*(r+1)*2,vx,col);
						}
					}
				}
			}
			break;
		}
	}
}
/* 小球类 */
function Ball(x,y,vx,col){
	this.x=x;
	this.y=y;
	this.g=1.5;
	this.vx=vx;
	this.vy=-6;
	this.color=col;
	
	this.drop=function(key){
		this.y+=this.vy;
		this.x+=this.vx;
		if(this.y>=(winHeight-(r+1)*2)){
			this.y=winHeight-(r+1)*2;
			this.vy=(-this.vy*(Math.random()*(0.2)+0.6)); //反弹
		}
		if(this.x>=(winWidth-(r+1)*2)||this.x<=(r+1)*2){
			delete balls[key]; //优化
		}
		context.beginPath();
		context.arc(this.x,this.y,r,0,2*Math.PI);
		context.closePath();
		context.fillStyle=this.color;
		context.fill();
		this.vy+=this.g;
	}
}

function ballsDrop(){
	for(var key in balls){
		balls[key].drop(key);
	}
}