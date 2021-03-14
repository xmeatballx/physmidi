let inc = -1;
let gravity = 0.001;
let friction = -0.9;
let spring = 0.0005;
let lines = new Array(80);
let balls = new Array();

const sketch = function (p) {
    class Line {
        constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.rotation = 0;
            this.length = 30;
            this.dx = 0;
            this.dy = 0;
        }

        display() {
            p.push();
            p.strokeWeight(5);
            p.translate(this.x1, this.y1);
            p.rotate(this.rotation);
            p.line(0, -25, 0, 25);
            p.pop();
        }

        fill(r, g, b) {
            this.rotation += .25;
        }
    }

    class Ball {
        constructor(x, y, diameter) {
            this.x = x;
            this.y = y;
            this.diameter = diameter;
        }

        display() {
            p.ellipse(this.x, this.y, 30);
        }
    }

    p.setup = () => {
        p.createCanvas(innerWidth, innerHeight);
        let xOffset = p.width / gridSize;
        let yOffset = p.height / gridSize;
        for (let y = yOffset - (yOffset / 2) + (yOffset - 20); y < p.height - yOffset; y += yOffset) {
            for (let x = xOffset - (xOffset / 2); x < p.width; x += xOffset) {
                if (inc < lines.length) inc++;
                else inc = 0;
                lines[inc] = new Line(x, y, x, y + (yOffset - 20));
            }
        }
    }

    p.draw = () => {
        p.background(255);
        for (let i = 0; i < lines.length; i++) {
            lines[i].display();
        }
        for (let i = 0; i < balls.length; i++) {
            balls[i].checkLineCollisions(lines);
            balls[i].bounce();
            balls[i].display();
        }
    }

    p.mouseDragged = () => {
        for (let i = 0; i < lines.length; i++) {
            if (p.mouseX > lines[i].x1 - 20 && p.mouseX < lines[i].x1 + 20 && p.mouseY > lines[i].y1 && p.mouseY < lines[i].y2) {
                lines[i].fill(255, 0, 0);
            }
        }
    }

    p.mouseClicked = () => {
        console.log("click");
        balls.push(new Ball(p.mouseX, p.mouseY));
    }
}

const myP5 = new p5(sketch);