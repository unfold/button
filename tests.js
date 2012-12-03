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
	values: ['repulsion', 'attraction'],
	set: function() {
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

		document.addEventListener('mousemove', function(e) {
			var position = { x: e.clientX, y: e.clientY };

			applyForce($(TestArea.buttons[0]), position, 18);
			applyForce($(TestArea.buttons[1]), position, -6);
		});
	},
	unset: function() {
		document.removeEvent
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