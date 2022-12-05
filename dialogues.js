// function drawDialogues(){
//   let npc1 = levels[1].init.npcs[0]
//   if ((player.position.x + player.width >= npc1.position.x && player.position.x <= npc1.position.x + npc1.width) && keys.space.pressed) {
//       // player.velocity.x = 0
//       // keys.left.pressed = false
//       // keys.right.pressed = false
//       // keys.up.pressed = false
//       // player.currentSprite = player.sprites.idle.image
//       container.classList.add("revealed")
//       console.log(keys.left)
//       console.log(keys.right)
//       console.log(keys.up)
//       console.log(keys.space)
//     } else {
      
//     } 

// }

// drawDialogues()


// function splitStrings(){
//   let currentString = textLines[Math.floor((Math.random() * textLines.length))].string
//   currentString.split("").forEach(character => {
//     var span = document.createElement("span")
//     span.textContent = character;
//     container.appendChild(span);
//     characters.push({
//         span: span,
//         isSpace: character === " ",
//         delayAfter: currentString.speed,
//         classes: textLines.classes || []
//     })
//   })
// }

// console.log(characters)