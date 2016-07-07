var audio = document.querySelector('#audio');
var title=document.querySelector('#title');
title.innerHTML=music[audio.currentSrc.substr(audio.currentSrc.indexOf('.mp3')-1,1)];
var url=audio.src.substr(0,audio.src.indexOf('.mp3')-1);
audio.addEventListener("error", function(){
	playMusic(url+'1.mp3');
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
	playMusic(url+fileName+'.mp3');
}
var prev = document.querySelector('#prev');
prev.onclick=function(){
	var src=audio.src;
	var fileName=src.substr(src.indexOf('.mp3')-1,1);
	fileName--;
	playMusic(url+fileName+'.mp3');
}
function playMusic(url){
	audio.src=url;
	audio.load();
	audio.play();
	title.innerHTML=music[audio.src.substr(audio.src.indexOf('.mp3')-1,1)];
	play.querySelector('span').querySelector('span').className='icon-pause';
}