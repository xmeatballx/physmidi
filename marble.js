class Marble {
    constructor(engine, x, radius) {
        this.x = x;
        this.radius = radius;
        this.body = Bodies.circle(this.x, 0, this.radius);
        this.life = 0;
        this.lifespan = 250;
        engine.add(engine.world, this.body);
        this.body.friction = 20;
    }

    reportCollisions(engine) {
        Matter.Events.on(engine, 'collisionStart', (event) => {
            if (window.max) {
                if (event.pairs[0].bodyA.id != this.body.id) window.max.outlet(event.pairs[0].bodyA.id);
                else if (event.pairs[0].bodyB.id != this.body.id) window.max.outlet(event.pairs[0].bodyB.id);
            }
        })
    }

    draw(p) {
        p.ellipse(this.body.position.x, this.body.position.y, this.radius);
    }
}