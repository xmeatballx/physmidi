class Obstacle {
    constructor(engine, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = Math.random(90);
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height);
        Matter.Body.setStatic(this.body, true);
        this.body.restitution = 0;
        Body.rotate(this.body, this.rotation);
        engine.add(engine.world, this.body);
    }

    draw(p) {
        p.push();
        p.translate(this.body.position.x, this.body.position.y)
        p.rotate(this.rotation);
        p.stroke(1);
        p.rect(0, 0, this.width, this.height);
        p.pop();
    }
}