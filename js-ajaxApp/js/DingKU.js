var DK = function(){}
DK.creatXHR = function(){
	if(typeof XMLHttpRequest !="undefined"){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){
		if(typeof argument.callee.activeXString != "string"){
			var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
			for(i=0,len = versions.length;i<len;i++){
				try{
					new ActiveXObject(versions[i]);
					argument.callee.activeXString = versions[i];
					break;
				}catch(ex){
					//跳过
				}
			}
		}
		return new ActiveXObject(argument.callee.activeXString);
	}else{
		throw new Error("No XHR object available.")
	}
}
DK.$ = function(id){
	return document.getElementById(id);
}
DK.Tag = function(Tag){
	return document.getElementsByTagName(Tag);
}