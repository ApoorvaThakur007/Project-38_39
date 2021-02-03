class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("gameState")
        gameStateRef.on("value",(data) => {
            gameState = data.val()
        })
    }

    update(state){
        database.ref("/").update({
            gameState : state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val()
                player.getCount()
            } 
            form = new Form()
            form.display()
        }
        car1 = createSprite(100,height-50)
        car1.addImage(car1Img)
        car1.scale = 3
        car2 = createSprite(500,height-50)
        car2.addImage(car2Img)
        car2.scale = 3
       /* car3 = createSprite(500,height-50)
        car3.addImage(car3Img)
        car4 = createSprite(700,height-50)
        car4.addImage(car4Img)*/
        cars = [car1,car2]
    }

    play(){
        form.hide()
        Player.getPlayerInfo()


        if(allPlayers !== undefined){
            background("grey")
            image(trackImg,0,-displayHeight*3.9,width,height*5)
            var index = 0
            var x = 200
            var y = 0         
            for (var plr in allPlayers){
                index = index+1
                x = x+500
                y = displayHeight-allPlayers[plr].distance
                cars[index-1].x = x
                cars[index-1].y = y
                if(index === player.index){
                    cars[index-1].x=mouseX
                    //stroke(100)
                    //fill("red")
                    //ellipse(x,y,100,100)
                    //cars[index-1].shapeColor = "red"
                    camera.position.x = width/2
                    camera.position.y = cars[index-1].y
                    spawnObstacle()
                }
            }
        }
        //player.x = World.mouseX

        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance += 50
            player.update()
           
        }


        if(player.distance > 4950 || car1.isTouching(obsG) || car2.isTouching(obsG)){
            gameState = 2;
        }

        drawSprites();
    }

    end(){
    
        console.log("Game Ended!")
    }
}