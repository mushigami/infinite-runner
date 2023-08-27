import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';


export default class RocketMouse extends Phaser.GameObjects.Container
{
    private flames: Phaser.GameObjects.Sprite
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private mouse: Phaser.GameObjects.Sprite


    constructor(scene: Phaser.Scene, x: number, y: number)
    {
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

    enableJetPack(enabled: boolean){
        this.flames.setVisible(enabled);
    }

    preUpdate(){
        const body = this.body as Phaser.Physics.Arcade.Body;

        // check buttons are down
        if(this.cursors.space?.isDown)
        {
            body.setAccelerationY(-600);
            this.enableJetPack(true);

            this.mouse.play(AnimationKeys.RocketMouseFly, true)
        }

        else{
            body.setAccelerationY(0);
            this.enableJetPack(false); 
        }
        // check if the body is touching the ground.
        if(body.blocked.down)
        {
            // play run when touching the ground
            this.mouse.play(AnimationKeys.RocketMouseRun, true)
        }
        else if(body.velocity.y > 0)
        {
            // play fall when no longer ascending
            this.mouse.play(AnimationKeys.RocketMouseFall, true)
        }
    }
}