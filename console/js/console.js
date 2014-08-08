console = (function(){

	var bool=false;         
	var pageX;         
	var pageY; 
	var needMove=false;
	var ePageX;      
    var ePageY; 
    var close = DIU.$('close');
    var article = DIU.Tag('article')[0];
	var aWidth = article.offsetWidth;
	var aHeight = article.offsetHeight;
	
	var pElement = DIU.Tag('body')[0];  
	var pWidth = pElement.offsetWidth;
	var pHeight = pElement.offsetHeight;  

	function init(){
		document.onselectstart=function (){return false;}; 
		bindEvent();
  
	}

	function bindEvent(){
		DIU.event.addEvent(close,'click', function(event){
			control();
		});
		var mousehandle = function(event){
				mousemove(event);
			}
		DIU.event.addEvent(document,'keyup', function(event){
			consoleBehavior(event);/
		});
		DIU.event.addEvent(article,'mousedown', function(event){
			mousedown(event);
			var a  = 1;
			DIU.event.addEvent(document,'mouseup', function(event){
				 article.removeEventListener("mousemove",mousehandle);
			});
			
			DIU.event.addEvent(article,'mousemove', mousehandle);
		});

	}

	function consoleBehavior(event){
		if (event.keyCode == 123 && event.ctrlKey) {
				control();
   			}
	}
	function control (){
    	if(article.style.display=="none"){
			DIU.show(article);
    	}
    	else{
			DIU.hidden(article);
    	}
	}
	function mousedown(event){
		needMove=true;               
		pageX = event.pageX-article.offsetLeft; 
		pageY = event.pageY-article.offsetTop;  
	    DIU.addcss(article,"cursor","move"); 
	    // article.style.cursor="move";  
	}
	function mousemove(event){
		if(!needMove)
			return;
		ePageX = event.pageX;      
	    ePageY = event.pageY;

	    var x = ePageX-pageX;              
	    var y = ePageY-pageY;  
	    if (x<0){  
			// needMove=false; 
			x = 0; 
	    } 
	    if (x>(pWidth-aWidth)){  
			// needMove=false; 
			x = pWidth-aWidth; 
	    }  
	    if (y<0){   
			y = 0;
			// needMove=false;  
	    }  
	    if (y>(window.screen.height-20-aHeight)){   
			y = window.screen.height-20-aHeight;
			// needMove=false;  
	    }  
	    // article.style.left = x+"px";  
	    // article.style.top = y+"px";  
	    DIU.addcss(article,"left", x+"px");              
	    DIU.addcss(article,"top", y+"px");   

	} 
	return{
		run:init
	}

})();

console.run();