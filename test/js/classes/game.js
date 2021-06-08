class Game {
	constructor() {
		this.camera = new Camera2D(drawingContext, {
			zoomTransitionSpeed: 0.1,
			moveTransitionSpeed: 0.05
		});

		this.mouse = createVector();
		this.movement = createVector();
	}

	setup() {
		this.world = new World();

		for (var i = 0; i < 1; i++) {
			this.world.balls.push(new Ball())
		}
		
		for (var i = 0; i < 20; i++) {
			let pos = this.world.getRandomPosition();
			this.world.arms.push(new Arm(pos.x, pos.y));
		}
		
	}

	render() {
		this.camera.begin();
		this.camera.moveTo(this.movement.x, this.movement.y);
		this.camera.zoomTo(this.world.size);
		this.world.render();
		this.camera.end();
	}

	update() {
		let mouse = this.camera.screenToWorld(mouseX, mouseY);
		this.mouse.set(mouse.x, mouse.y);
		this.movement.set(mouse.x, mouse.y);
		this.movement.setMag(50);
		this.world.update();
	}
}