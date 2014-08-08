window.dd = {
	$:function(id){
		return document.getElementById(id);
	},
	create:function(name){
		return document.createElement(name);
	},
	event =  {
	    addEventListener: function(ele, type, fun){
	        if(window.addEventListener){
	            ele.addEventListener(type, fun, false);
	        }else{
	            ele.attachEvent('on' + type, fun);
	        }
	    }
	}
}