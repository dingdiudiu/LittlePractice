if(typeof window.DK === 'undefined'){
    window.DK = {};
}

DK.$ = function(id){
    return document.getElementById(id);
}

DK.event = {
    addEventListener: function(ele, type, fun){
        if(window.addEventListener){
            ele.addEventListener(type, fun, false);
        }else{
            ele.attachEvent('on' + type, fun);
        }
    }
};