function Test (name, set, unset) {
	this.name = name;
	this._set = set;
	this._unset = unset;
}

(function () {
	var TestArea = {};
	
	var list = [];
	var current = 0;
	
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
		if( current instanceof Test) {
			current._destroy();
		}
	}
	
	TestArea.add = function (test) {
		if( test instanceof Test ) {
			list.push(test);
		}
	}
	
	//unsets the current test and sets the next one
	TestArea.next = function (test) {
		current++;
		if( !setTest(list[current]) ) {
			TestArea.showResults();
		}
	}
	
	TestArea.showResults = function () {
		//TODO
	}
	
	/**
	 * Private functions
	 */
	var setTest = function (test) {
	
		//test could be the index in list[]
		if( !isNaN( test ) ) try {
			test = list[test];
		} catch (e) {}
		
		if( test instanceof Test ) {
			var previous = list[current-1];
			if( previous instanceof Test) {
				TestArea.container.classList.remove(previous.name);
				if( typeof previous._unset === 'function' ) {
					previous._unset();
				}
			}
			if( typeof test._set === 'function' ) {
				test._set();
			}
			return true;
		} else {
			return false
		}
	}
	
	document.addEventListener('DOMContentLoaded', TestArea.init, false);
	
	window.TestArea = TestArea;
}());