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

    getMagnitude(velocityX, velocityY) {
        return Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    }

    reportCollisions(engine) {
        Matter.Events.on(engine, 'collisionStart', (event) => {

            console.log(this.getMagnitude(this.body.velocity.x, this.body.velocity.y));
            if (window.max) {
                if (event.pairs[0].bodyA.id != this.body.id) window.max.outlet(event.pairs[0].bodyA.id, this.getMagnitude(this.body.velocity.x, this.body.velocity.y));
                else if (event.pairs[0].bodyB.id != this.body.id) window.max.outlet(event.pairs[0].bodyB.id, this.getMagnitude(this.body.velocity.x, this.body.velocity.y));
            }
        })
    }

    draw(p) {
        p.ellipse(this.body.position.x, this.body.position.y, this.radius);
    }
}