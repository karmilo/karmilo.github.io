var content = document.querySelectorAll('.content-section');
var nav = document.querySelector('#nav');
var lis='';
for(var k=0;k<content.length;k++){
	lis = lis +'<li><a href="#'+content[k].id+'"><i class="icon-chevron-right"></i> '+(content[k].querySelector('h1').innerHTML)+'</a></li>';
}
nav.innerHTML=lis+'<a href="#top">返回顶部</a>';