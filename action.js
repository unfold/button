var Test = function (name, create, destroy) {
	this._name = name;
	this._create = create;
	this._destroy = destroy;
}

(function () {
	var TestArea = {};
	
	TestArea._list = [];
	
	TestArea.init = function () {
		TestArea.container = document.getElementById('test');
		TestArea.buttons = TestArea.container.getElementsByTagName('button');
		for(var i = TestArea.buttons.length-1; i >=0 ; i--) {
			if( typeof randomize === 'undefined') {
				var randomize = Math.round(Math.random());
			} else {
				var randomize = randomize?0:1;
			}
			TestArea.buttons[i].classList.add('b'+randomize);
		}
	}
	
	TestArea.reset = function () {
		if( TestArea.current instanceof Test) {
			TestArea.current._destroy();
		}
	}
	
	TestArea.addTest = function (test) {
		if( test instanceof Test ) {
			TestArea._list.push(test);
		}
	}
	
	TestArea._setTest = function (test) {
		if( test instanceof Test ) {
			if( TestArea.current instanceof Test) {
				TestArea.current._destroy();
			}
			test._create();
		}
	}
	
	document.addEventListener('DOMContentLoaded', TestArea.init, false);
	
	window.TestArea = TestArea;
}());