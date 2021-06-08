class World {
	constructor() {
		this.size = 700;
		this.bounds = {
			min: {
				x: -this.size / 2,
				y: -this.size / 2
			},
			max: {
				x: this.size / 2,
				y: this.size / 2
			},
			width: this.size,
			height: this.size
		};
		this.arms = [];
		this.balls = [];
	}

	render() {
		noStroke();
		fill(20);
		beginShape();
		rect(this.bounds.min.x, this.bounds.min.y, this.bounds.width, this.bounds.height);
		endShape();

		for (let arm of this.arms) {
			arm.render();
		}

		for (let ball of this.balls) {
			ball.render();
		}
	}

	update() {
		for (let arm of this.arms) {
			arm.update();
		}

		for (let ball of this.balls) {
			ball.update();
		}
	}

	getRandomPosition() {
		return createVector(random(this.bounds.min.x, this.bounds.max.x), random(this.bounds.min.y, this.bounds.max.y));
	}
}