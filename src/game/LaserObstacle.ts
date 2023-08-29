import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys';

export default class LaserObstacle extends Phaser.GameObjects.Container
{
    constructor(scene: Phaser.Scene, x:number, y:number)
    {
        super(scene, x, y);

        const top = scene.add.image(0,0,TextureKeys.LaserEnd).setOrigin(0.5, 0)
        const middle = scene.add.image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
            .setOrigin(0.5, 0);
        middle.setDisplaySize(middle.width, 200);

        // create a bottom that is flipped and below the middle
        const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
            .setOrigin(0.5, 0)
            .setFlipY(true);

        // add them all to the container
        this.add(top);
        this.add(middle);
        this.add(bottom);
        
    }
}