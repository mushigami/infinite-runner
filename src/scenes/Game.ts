import Phaser, { Physics } from 'phaser'
import AnimationKeys from '../consts/AnimationKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite;// ! is for non-null assertion

    constructor()
    {
        super('game')
    }

    create()
    {

        const width = this.scale.width;
        const height = this.scale.height;

        this.background = this.add.tileSprite(0,0, width, height, TextureKeys.Background)
            .setOrigin(0, 0)
            .setScrollFactor(0,0)

        const mouse = this.physics.add.sprite(
            width * 0.5,
            height * 0.5,
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).play(AnimationKeys.RocketMouseRun)

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);

        body.setVelocityX(200);

        this.physics.world.setBounds(
            0,0, //x, y
            Number.MAX_SAFE_INTEGER, height -30 // width, height
        )

        // camera
        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);


    }

    update(time: number, delta: number): void {
        
        // scroll the background
        this.background.setTilePosition(this.cameras.main.scrollX);
    }
}