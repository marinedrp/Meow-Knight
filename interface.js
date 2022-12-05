export class UserInterface {
    constructor(game){
        this.game = game
        this.fontSize = 40;
        this.fontFamily = 'MedievalSharp'
        this.fontColor = 'black'
        this.fontWeight = 'bold '
        this.livesImage = document.getElementById('lives')
        this.gameOverImage = document.getElementById("game-over")
        this.victoryImage = document.getElementById('victory')
        this.x = 0
        this.y = 0
    }
    draw(ctx){
        ctx.save()
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0;
        ctx.font = this.fontWeight + this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'left'
        ctx.fillStyle = this.fontColor
        // score
        ctx.fillText('Score: ' + this.game.score, 30, 60)
        // lives
        for (let i = 0; i < this.game.lives; i++){
            ctx.drawImage(this.livesImage, 40 * i + 30, 80, 30, 30)
        }
        ctx.restore()
        
    }
    drawGameOver(ctx){
        ctx.drawImage(this.gameOverImage, this.x, this.y, this.game.width, this.game.height);
        ctx.font = '50px ' + 'Calligraffitti';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`And then you jumped off a cliff and died?`, this.game.width/2, 350)
        ctx.fillText(`No, wait. That's not what happened.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        const gameOverSound = document.getElementById('game-over-sound')
        gameOverSound.volume = 0.5
        gameOverSound.play()
    }
    drawVictory(ctx){
        ctx.drawImage(this.victoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.font = this.fontWeight + this.fontSize + 'px ' + 'Calligraffitti';
        ctx.textAlign = 'center'
        ctx.fillStyle = this.fontColor
        ctx.fillText(`And this is how Meow-Knight the Brave changed the course of history.`, this.game.width/2, 350)
        ctx.fillText(`All across the realm he was worshiped and adored.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        const victorySound = document.getElementById('victory-sound')
        victorySound.volume = 0.5
        victorySound.play()
    }
}