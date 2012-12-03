TestArea.add(new Test({
	name: 'color',
	values: ['Red', 'Blue', 'Black', 'Yellow', 'Green', 'White']
}));

TestArea.add(new Test({
	name: 'position',
	values: ['Top left', 'Bottom right', 'Top right', 'Bottom left']
}));

TestArea.add(new Test({
	name: 'attraction',
	values: ['Repulsion', 'Attraction'],
	set: (function() {
		var mousePosition = { x: 0, y: 0 };

		var applyForce = function(element, target, multiplier) {
			var position = element.position();
			var distance = {
			    x: position.left + element.width() * 0.5 - target.x,
			    y: position.top + element.height() * 0.5 - target.y
			};

			var length = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
			var angle = Math.atan2(distance.y, distance.x);

			var translate = {
				x: Math.cos(angle) * Math.sqrt(length) * multiplier,
				y: Math.sin(angle) * Math.sqrt(length) * multiplier
			}

			element.css({
				marginLeft: translate.x,
				marginTop: translate.y
			});
		}

		var applyForces = function() {
			applyForce($('button[data-value=Repulsion]'), mousePosition, 18);
			applyForce($('button[data-value=Attraction]'), mousePosition, -6);
		};

		$(document).on('mousemove', function(e) {
			mousePosition = { x: e.clientX, y: e.clientY };
		});

		return function() {
			$(document).on('mousemove', applyForces);
			applyForces();
		};
	})(),

	unset: function() {
		$(document).off('mousemove');
		$('button').css({
			marginLeft: '',
			marginTop: ''
		});
	}
}));

TestArea.add(new Test({
	name: 'font',
	values: ['Comic Sans', 'Arial', 'Georgia']
}));

TestArea.add(new Test({
	name: 'shape',
	values: ['Square', 'Circle', 'Triangle', 'Trapezium']
}));