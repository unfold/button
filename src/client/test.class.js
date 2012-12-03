function Test (args) {
	this.name = args.name;
	this.set = args.set;
	this.unset = args.unset;
	this.values = args.values;
}

(function () {
	var TestArea = {};

	TestArea.list = [];

	var list = TestArea.list;
	var current = -1;

	TestArea.init = function () {
		TestArea.container = document.getElementById('test');
		TestArea.buttons = TestArea.container.getElementsByTagName('button');

		TestArea.container.addEventListener('click', buttonClick, false);

		if(list.length) {
			setTestId(0);
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
		!setTestId() && TestArea.showResults();
	}

	TestArea.showResults = function () {
		//TODO
		console.log('done');
	}

	/**
	 * Private functions
	 */
	function setTestId (id) {
		if( id === undefined ) {
			id = current+1;
		}

		//test could be the index in list[]
		if( typeof id === 'number' )  {
			if( id < list.length ) { //try the next one
				var test = list[id];
			} else {
				return false;
			}
		}

		if( test instanceof Test ) {
			//reset the old test, if any
			var previous = list[current];
			if( previous instanceof Test) {
				TestArea.container.classList.remove(previous.name);

				if( typeof previous.unset === 'function' ) {
					previous.unset();
				}
			}

			//set the new test
			TestArea.container.setAttribute('data-test', test.name);
			setButtonsValues(test.values);
			if( typeof test.set === 'function' ) {
				test.set();
			}

			current++;

			return true;
		} else {
			return false
		}
	}

	function buttonClick (e) {
	  e = e || window.event;
		var button = e.target || e.srcElement;

	  if(button.tagName.toLowerCase() === 'button') {
			var test = TestArea.list[current]
			var value = button.getAttribute('data-value');

			Observations.insert({test: test.name, value: value, time: new Date()})

	  	//todo: do something with the acquired values

			TestArea.next();
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
