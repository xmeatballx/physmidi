const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

let engine, world;
class MatterEngine {
    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;
    }

    run() {
        Engine.run(this.engine);
    }

    add(world, body) {
        World.add(world, body);
    }
}