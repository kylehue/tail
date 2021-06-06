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

		if (segmentCount) {
			this.updateSegmentTargets();
		}
	}

	setPosition() {
		let x = typeof arguments[0] == "object" ? arguments[0].x : arguments[0];
		let y = typeof arguments[0] == "object" ? arguments[0].y : arguments[1];
		this.position.x = x;
		this.position.y = y;
	}

	addSegment(segmentLength, position) {
		position = typeof position == "number" ? position : this.segments.length;
		let segment = new Segment(segmentLength);
		let target;
		if (this.segments[position]) {
			target = this.segments[position].pointB;
		}
		segment.setTarget(target);
		this.segments.splice(position, 0, segment);
		return segment;
	}

	getLastSegment() {
		return this.segments[this.segments.length - 1];
	}

	updateSegmentTargets() {
		for (var i = this.segments.length - 1; i >= 0; i--) {
			let segment = this.segments[i];
			let target;
			if (this.segments[i + 1]) {
				target = this.segments[i + 1].pointB;
			}
			segment.setTarget(target);
		}

		if (this.segments.length) {
			let lastSegment = this.getLastSegment();
			lastSegment.setTarget(this.position);
		}
	}

	update() {
		for (let segment of this.segments) {
			segment.update();
		}

		this.updateSegmentTargets();
	}
}

class Segment {
	constructor(segmentLength) {
		this.length = segmentLength || 10;
		this.target = null;

		this.angle = 0;

		this.pointA = {
			x: 0,
			y: 0
		};

		this.pointB = {
			x: this.length,
			y: 0
		}
	}

	setTarget() {
		let x = typeof arguments[0] == "object" ? arguments[0].x : arguments[0];
		let y = typeof arguments[0] == "object" ? arguments[0].y : arguments[1];
		let position = {};
		position.x = x || 0;
		position.y = y || 0;
		this.target = position || null;
	}

	update() {
		this.pointA.x = Math.cos(this.angle) * this.length;
		this.pointA.y = Math.sin(this.angle) * this.length;
		if (this.target) {
			this.angle = Math.atan2(this.target.y - this.pointB.y, this.target.x - this.pointB.x);

			let targetDistance = dist(this.pointB.x, this.pointB.y, this.target.x, this.target.y);

			this.pointA.x = this.target.x;
			this.pointA.y = this.target.y;
			this.pointB.x = this.pointA.x - Math.cos(this.angle) * this.length;
			this.pointB.y = this.pointA.y - Math.sin(this.angle) * this.length;
		}
	}
}