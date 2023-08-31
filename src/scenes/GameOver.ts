import Phaser from 'phaser'

import SceneKeys from '../consts/SceneKeys'

export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.GameOver)
    }
    create()
    {
        // object destructuring
        const { width, height } = this.scale;

        // x, y will be middle of screen
        const x = width * 0.5;
        const y = height * 0.5;

        // add the text with some styling
        this.add.text(x, y, 'Prase SPACE to play again', {
            fontSize: '32px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0},
            padding: { left: 15, right: 15, top: 10, bottom: 10}
        })
            .setOrigin(0.5)
    }
}