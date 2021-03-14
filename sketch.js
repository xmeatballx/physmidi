inlets = 2;
const sketch = function (p) {
    let obstacles = [];
    let marbles = [];
    let gridSize = 10;
    let PhysicsEngine = new MatterEngine();

    p.setup = () => {
        PhysicsEngine.run();
        window.max.bindInlet('spawn', function (b, slider, friction, bounce, lifespan) {
            let marble = new Marble(PhysicsEngine, slider, 5);
            marble.body.friction = friction;
            marble.body.restitution = bounce;
            marble.lifespan = lifespan / p.frameRate();
            marbles.push(marble);
            marble.reportCollisions(PhysicsEngine.engine);
            window.max.bindInlet('controls', function (gravity, speed) {
                PhysicsEngine.world.gravity.scale = gravity;
                PhysicsEngine.engine.timing.timeScale = speed;
            });
            window.max.bindInlet('randomize', function () {
                obstacles.forEach((obstacle) => {
                    // obstacle.rotation = Math.random(180);
                    Body.rotate(obstacle.body, Math.random(180));
                })
            });
        });

        p.createCanvas(171, 160);
        p.rectMode(p.CENTER);
        let xOffset = p.width / gridSize;
        let yOffset = p.height / gridSize;

        for (let y = yOffset - (yOffset / 2) + (yOffset + 20); y < p.height - yOffset; y += yOffset) {
            for (let x = xOffset - (xOffset / 2); x < p.width; x += xOffset) {
                let obstacle = new Obstacle(PhysicsEngine, x, y, 1, 10)
                obstacles.push(obstacle);
            }
        }
    };

    function getDistance(p1, p2) {
        console.log(p1 + '\n' + p2)
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;
        return Math.sqrt(a * a + b * b);
    };

    p.mouseDragged = () => {
        obstacles.forEach((obstacle) => {
            mouseDistance = getDistance(new p5.Vector(obstacle.x, obstacle.y), new p5.Vector(p.mouseX, p.mouseY));
            if (mouseDistance < 10) {
                obstacle.rotation += mouseDistance / 25;
            }
        })
    }

    p.draw = () => {
        p.background(125, 125, 125);
        obstacles.forEach((obstacle) => {
            obstacle.draw(p);
        })

        marbles.forEach((marble) => {
            if (marble.life < marble.lifespan) {
                marble.life++;
            }
            else {
                Matter.World.remove(PhysicsEngine.world, marble.body);
                marbles.shift();
            };
            marble.draw(p);
        })
    };
}

const myP5 = new p5(sketch);