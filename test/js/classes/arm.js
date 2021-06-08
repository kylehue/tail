class Arm {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.body = new Tail(0, 0, 1, 20);
		for(var i = 0; i < random(1, 6); i++){
			this.body.addSegment(random(20, 40));
		}
		this.width = 10;
		this.target = random(game.world.balls);
	}

	render() {
		noFill();
		strokeWeight(this.width);
		for (let seg of this.body.segments) {
			stroke(90);
			noFill();
			beginShape();
			vertex(seg.pointA.x, seg.pointA.y);
			vertex(seg.pointB.x, seg.pointB.y);
			endShape();
			fill(130);
			noStroke();
			beginShape();
			circle(seg.pointB.x, seg.pointB.y, this.width * 1.3);
			fill(190);
			circle(seg.pointB.x, seg.pointB.y, this.width * 0.6);
			endShape();
		}
	}

	update() {
		this.body.setTarget(this.target.position);
		this.body.setSource(this.position.x, this.position.y);
	}
}