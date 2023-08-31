import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import SceneKeys from '../consts/SceneKeys';

enum MouseState {
    Running,
    Killed,
    Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container {
    private flames: Phaser.GameObjects.Sprite
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private mouse: Phaser.GameObjects.Sprite
    private mouseState = MouseState.Running


    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        scene.physics.add.existing(this);

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(this.mouse.width, this.mouse.height)
        body.setOffset(this.mouse.width * -0.5, -this.mouse.height);

        this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);

        this.enableJetPack(false);

        this.add(this.flames);
        this.add(this.mouse)

        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    enableJetPack(enabled: boolean) {
        this.flames.setVisible(enabled);
    }

    kill() {
        // don't do anything if not in RUNNING state
        if (this.mouseState !== MouseState.Running) {
            return
        }

        // set state to KILLED
        this.mouseState = MouseState.Killed;
        this.mouse.play(AnimationKeys.RocketMouseDead);

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAccelerationY(0)
        body.setVelocity(1000, 0)
        this.enableJetPack(false);

    }
    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body;
        switch (this.mouseState) {
            case MouseState.Running:
                {

                    // check buttons are down
                    if (this.cursors.space?.isDown) {
                        body.setAccelerationY(-600);
                        this.enableJetPack(true);

                        this.mouse.play(AnimationKeys.RocketMouseFly, true)
                    }

                    else {
                        body.setAccelerationY(0);
                        this.enableJetPack(false);
                    }
                    // check if the body is touching the ground.
                    if (body.blocked.down) {
                        // play run when touching the ground
                        this.mouse.play(AnimationKeys.RocketMouseRun, true)
                    }
                    else if (body.velocity.y > 0) {
                        // play fall when no longer ascending
                        this.mouse.play(AnimationKeys.RocketMouseFall, true)
                    }

                    break

                }

            case MouseState.Killed:
                {
                    body.velocity.x *= 0.99

                    // once less than 5 we can say stop
                    if(body.velocity.x <= 5)
                    {
                        this.mouseState = MouseState.Dead
                    }

                    break;

                }

            case MouseState.Dead:
                {

                    body.setVelocity(0,0);

                    // add this line
                    this.scene.scene.run(SceneKeys.GameOver);
                    
                    break
                }
        }

    }
}