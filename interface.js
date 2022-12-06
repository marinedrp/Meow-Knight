export class UserInterface {
    constructor(game){
        this.game = game
        this.x = 0
        this.y = 0
        this.fontSize = 40;
        this.fontFamily = 'MedievalSharp'
        this.fontColor = 'black'
        this.fontWeight = 'bold '
        this.livesImage = document.getElementById('lives')
        this.gameOverImage = document.getElementById("game-over")
        this.gameOverSound = document.getElementById('game-over-sound')
        this.victoryImage = document.getElementById('victory')
        this.victorySound = document.getElementById('victory-sound')
        this.container = document.getElementById('container')
        this.text = ["Now is not the time for a bath.", "Oh it's you.", "Just because I can talk doesn't mean I don't like getting scratched behind the ears.", "Enthusiasm? On a week day? My word.", "Your request is noted and ignored.", "This world is host by goblins and flying mushrooms and you're surprised by me?", "Don't touch me I'm super important.", "A waste of my talents!", "Need any help?", "I would suggest that you get moving and decide on a plan.", "Everything is in decline in this world. So is my mood.", "Have I missed it? Have I missed the battle?", "Did you talk to Master Ruby?", "What's wrong with you? You seem... Happy."]
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

        // energy bar
        let energyBarColor = ctx.createLinearGradient(0, 0, 0, 700);
        energyBarColor.addColorStop(0, "orange");
        energyBarColor.addColorStop(1, "black");
        ctx.fillStyle = energyBarColor
        ctx.fillRect(30, 130, this.game.energy, 30)
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
        this.gameOverSound.volume = 0.5
        this.gameOverSound.play()
    }
    drawVictory(ctx){
        ctx.drawImage(this.victoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.font = this.fontWeight + this.fontSize + 'px ' + 'Calligraffitti';
        ctx.textAlign = 'center'
        ctx.fillStyle = this.fontColor
        ctx.fillText(`And this is how Meow-Knight the Brave changed the course of history.`, this.game.width/2, 350)
        ctx.fillText(`All across the realm he was worshiped and adored.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        this.victorySound.volume = 0.5
        this.victorySound.play()
    }
    drawDialogues(){
        if (this.game.keys.space.pressed && (this.game.player.checkWitchCollision() || this.game.player.checkRubyCollision())){
            this.container.classList.add("revealed")
        } else if (!this.game.player.checkWitchCollision() || !this.game.player.checkRubyCollision()) {
            this.container.classList.remove("revealed")
            this.game.keys.space.pressed = false
        } 

    }
}

