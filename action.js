function Test (args) {
	this.name = args.name;
	this.set = args.set;
	this.unset = args.unset;
	this.values = args.values;
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
		!setTest() && TestArea.showResults();
	}
	
	TestArea.showResults = function () {
		//TODO
	}
	
	/**
	 * Private functions
	 */
	function setTest (test) {
		if( test === undefined ) {
			test = current+1;
		}
	
		//test could be the index in list[]
		if( typeof test === 'number' )  {
			if( test < list.length-1 ) { //try the next one
				test = list[test];
			} else {
				return false;
			}
		}
		
		if( test instanceof Test ) {
			//reset the old test, if any
			var previous = list[current-1];
			if( previous instanceof Test) {
				TestArea.container.classList.remove(previous.name);
				
				if( typeof previous._unset === 'function' ) {
					previous.unset();
				}
			}
			
			//set the new test
			if( typeof test.set === 'function' ) {
				test.set();
				
				TestArea.test.setAttribute('data-test-name', test.name);
				setButtonsValues(test.values);
			}
			return true;
		} else {
			return false
		}
	}
	function setButtonsValues (values) {
		//shuffle values and set only the first two
		//this also works if "values" are more than two
		values = shuffle(values);
		for(var i = TestArea.buttons.length-1; i >=0 ; i--) {
			TestArea.buttons[i].setAttribute('data-value', values[i]);
		}
	}
	
	document.addEventListener('DOMContentLoaded', TestArea.init, false);
	
	window.TestArea = TestArea;
	
	
		//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	
	function shuffle (o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
	};
}());