(function(){
	var move = DK.$("move");
	var toleft = DK.$("toleft");
	var toright = DK.$("toright");
	var wrapBd = DK.$("wrapBd");

	var page_count = move.getElementsByTagName("li").length;//焦点图图片数
	var speed = 13;
	var rightnum = 0;
	var page = 1;
	var i = 4;
	var boxwidth = wrapBd.clientWidth;

	var focus = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var self= this;
			DK.event.addEventListener(toright,"click",function(){
				self.adjustMove("right");
			})
			DK.event.addEventListener(toleft,"click",function(){
				self.adjustMove("left");
			})
			
		},
		adjustMove:function(direction){
			if(direction=="right"){
				if(rightnum%boxwidth==0){
					if(page==page_count){
						rightnum = this.toMove(rightnum,0,-speed*(page_count-1));
						page = 1;
					}
					else{
						rightnum = this.toMove(rightnum,rightnum+boxwidth,speed);
						page++;
					}
				}
			}
			else{
				if(rightnum%boxwidth==0){
					if(page==1){
						var will = rightnum+(page_count-1)*boxwidth;
						rightnum = this.toMove(rightnum,will,speed*(page_count-1));
						page = page_count;
					}
					else{
						rightnum = this.toMove(rightnum,rightnum-boxwidth,-speed);
						page--; 
					}
				}
			}
		},
		toMove :function(now,will,speed){
	    	var intervalId = setInterval(function(){
	    		if(speed<0){
					if(now<=(will+speed)){
		                now-=(now-will);
		    			window.clearInterval(intervalId);
	    			}
	    		}
	    		else{
		    		if(now>=(will-speed)){
		                now+=(will-now);
		    			window.clearInterval(intervalId);
		    		}
	    		}
	            move.style.right = now+"px";
				now+=speed;
			},1);
			return will;
		}
	}
	focus.init();
})()