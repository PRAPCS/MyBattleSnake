const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: '',
    color: '#233455',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var gameData = request.body

 
  move = avoidWall(gameData)
  
 


  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function avoidWall(gameData){
  var ranMove=['up','down','left','right']
  var  move= ranMove[Math.floor(Math.random()*4)]
 
if(gameData.you.head.y==0)
  move='left'

  if(gameData.you.head.x==0)
  move='up'
  if(gameData.you.head.y==10)
  move='right'
  if(gameData.you.head.x==10)
  move='down'
  if(gameData.you.head.x==10 && gameData.you.head.y==0)
  move='left'

  return move
}



function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
