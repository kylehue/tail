class Tail {
	constructor(x, y, segmentCount, segmentLength) {
		this.position = {
			x: x || 0,
			y: y || 0
		};

		segmentCount = segmentCount || 0;

		this.segments = [];

		for (var i = 0; i < segmentCount; i++) {
			this.addSegment(segmentLength);
		}
	}

	setTarget() {
		let x = typeof arguments[0] == "object" ? arguments[0].x : arguments[0];
		let y = typeof arguments[0] == "object" ? arguments[0].y : arguments[1];
		this.position.x = x;
		this.position.y = y;
	}

	addSegment(segmentLength, position) {
		position = typeof position == "number" ? position : 0;

		let segment = {
			pointA: {
				x: this.position.x,
				y: this.position.y
			},
			pointB: {
				x: this.position.x,
				y: this.position.y
			},
			angle: 0,
			length: segmentLength
		};

		this.segments.splice(position, 0, segment);
		return segment;
	}

	getLastSegment() {
		return this.segments[this.segments.length - 1];
	}

	update() {
		for (var i = this.segments.length - 1; i >= 0; i--) {
			const currentSegment = this.segments[i];
			const nextSegment = this.segments[i + 1];
			if (nextSegment) {
				currentSegment.pointA.x = nextSegment.pointB.x;
				currentSegment.pointA.y = nextSegment.pointB.y;
				currentSegment.angle = Math.atan2(currentSegment.pointA.y - currentSegment.pointB.y, currentSegment.pointA.x - currentSegment.pointB.x);
				currentSegment.pointB.x = currentSegment.pointA.x - Math.cos(currentSegment.angle) * currentSegment.length;
				currentSegment.pointB.y = currentSegment.pointA.y - Math.sin(currentSegment.angle) * currentSegment.length;
			}

			if (currentSegment == this.getLastSegment()) {
				currentSegment.pointA = this.position;
				currentSegment.angle = atan2(this.position.y - currentSegment.pointB.y, this.position.x - currentSegment.pointB.x)
				currentSegment.pointB.x = currentSegment.pointA.x - Math.cos(currentSegment.angle) * currentSegment.length;
				currentSegment.pointB.y = currentSegment.pointA.y - Math.sin(currentSegment.angle) * currentSegment.length;
			}
		}
	}
}