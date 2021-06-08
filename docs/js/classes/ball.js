class Ball {
	constructor() {
		this.position = createVector();
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(1, 5));
		this.radius = random(5, 20);
		this.color = color("#ff3761").levels;
		this.tail = new Tail(0, 0, 1, 1);
		for(var i = 5; i >= 0; i--){
			this.tail.addSegment(30);
		}
	}

	render() {
		noStroke();
		fill(this.color);
		beginShape();
		circle(this.position.x, this.position.y, this.radius * 2);
		endShape();

		for (let seg of this.tail.segments) {
			strokeWeight(this.radius)
			stroke(this.color[0],this.color[1],this.color[2], 60);
			noFill();
			beginShape();
			vertex(seg.pointA.x, seg.pointA.y);
			vertex(seg.pointB.x, seg.pointB.y);
			endShape();
		}
	}

	update() {
		this.position.add(this.velocity);
		this.tail.setTarget(this.position);

		if (this.position.x - this.radius <= game.world.bounds.min.x || this.position.x + this.radius >= game.world.bounds.max.x) {
			this.velocity.x = -this.velocity.x;
		}

		if (this.position.y - this.radius <= game.world.bounds.min.y || this.position.y + this.radius >= game.world.bounds.max.y) {
			this.velocity.y = -this.velocity.y;
		}
	}
}