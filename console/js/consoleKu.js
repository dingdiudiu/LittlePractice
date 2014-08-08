if(typeof window.DIU === 'undefined'){
    window.DIU = {};
}
DIU .$ = function(id){
    return document.getElementById(id);
}
DIU.Tag = function(tag){
    return document.getElementsByTagName(tag);
}
DIU.create = function(text){
	var ul = DIU.Tag('ul')[0];
    var li = DIU.make("li");
	li.innerHTML = text;
    ul.appendChild(li);
	//  var ul = DIU.Tag('ul')[0];
	// var newNode = [];
	// var li = '<li>'+text+'</li>';
	// newNode.push(li);
	// ul.innerHTML = newNode.join("");

}
DIU.make = function(name){
	return document.createElement(name);
}
DIU.show = function(elem){
	elem.style.display="block";
}
DIU.hidden = function(elem){
	elem.style.display="none";
}
DIU.addcss = function(node,attribute,value){ 
	node.style[attribute]=value;   
}

DIU.event = {
    addEvent: function(elem, type, fun){
    	if (elem.addEventListener) {
			elem.addEventListener(type, fun, false);
		} else if (elem.attachEvent) {
			elem.attachEvent('on' + type, fun);
		} else{
			elem['on' + type] = fun;
		}
    },
    settimeout : function(time,elem){
    	setTimeout(function(){
			elem.style.display="none";
    	}, time);
    }
};

