(function() {
	var topButton = DK.getClassName("topFace",null,"div")[0];
	var cube = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			DK.EventUtil.addHandler(topButton, "click", this.change)
		},
		change:function(){
			topButton.className=DK.changeClassName(topButton.className,"close","open")
		}
	}
	cube.init();
})()