var audio = document.querySelector('#audio');
var url=audio.src.substr(0,audio.src.indexOf('.mp3')-1);
audio.addEventListener("error", function(){
    audio.src=url+'1.mp3';
	audio.load();
	audio.play();
	play.querySelector('span').querySelector('span').className='icon-pause';
}, false);
var play = document.querySelector('#play');
play.onclick=function(){
	if(audio.paused){
		audio.play();
		play.querySelector('span').querySelector('span').className='icon-pause';
	}else{
		audio.pause();
		play.querySelector('span').querySelector('span').className='icon-play';
	}
}
var next = document.querySelector('#next');
next.onclick=function(){
	var src=audio.src;
	var fileName=src.substr(src.indexOf('.mp3')-1,1);
	fileName++;
	audio.src=url+fileName+'.mp3';
	audio.load();
	audio.play();
	play.querySelector('span').querySelector('span').className='icon-pause';
}
var prev = document.querySelector('#prev');
prev.onclick=function(){
	var src=audio.src;
	var fileName=src.substr(src.indexOf('.mp3')-1,1);
	fileName--;
	audio.src=url+fileName+'.mp3';
	audio.load();
	audio.play();
	play.querySelector('span').querySelector('span').className='icon-pause';
}