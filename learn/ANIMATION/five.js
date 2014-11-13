(function() {
	var nodeOne = DK.$(null,"one");
	var nodeTwo = DK.$(null,"two");
	var nodeThree = DK.getClassName("inner_2",DK.$(null,"three"),"div")[0];
	var nodeFour = DK.getClassName("inner_2",DK.$(null,"four"),"div")[0];
	var five = {
		init: function() {
			this.run();
		},
		run:function(){
			nodeOne.style.width="100px";
			nodeTwo.style.height="60px";
			nodeThree.style["-webkit-transform"] = "rotate(0deg)";
			nodeFour.style["-webkit-transform"] = "rotate(0deg)";
		}
	}
	five.init();
})()