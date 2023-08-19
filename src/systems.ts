import C from './component'
import { Entity, createEnemy, createPlayer } from "./entity"
import { GameWorld } from './world'

type System = (w: GameWorld) => GameWorld

export const spawn: System = (w) => {
  if (C.Player.eids.length < 1) {
    const eid = createPlayer(w)
    Helpers.mountControles(eid)
  }

  if (C.Enemy.eids.length < w.maxEnemies) {
    createEnemy(w)
  }

  return w
}

export const movement: System = (w) => {
  C.ControlesLeft.forEach((eid: Entity) => {
    switch (1) {
      case C.ControlesLeft[eid]:
        C.PositionX[eid] = C.PositionX[eid] - C.Speed[eid]
        break
      case C.ControlesUp[eid]:
        C.PositionY[eid] = C.PositionY[eid] - C.Speed[eid]
        break
      case C.ControlesRight[eid]:
        C.PositionX[eid] = C.PositionX[eid] + C.Speed[eid]
        break
      case C.ControlesDown[eid]:
        C.PositionY[eid] = C.PositionY[eid] + C.Speed[eid]
    }
  })
  C.Enemy.eids.forEach((eid: Entity) => {
    C.PositionY[eid] = C.PositionY[eid] + C.Speed[eid]
    if (C.PositionY[eid] > w.canvas.height) {
      C.PositionX[eid] = Math.random() * w.canvas.width
      C.Size[eid] = (Math.random() * 10) + 10
      C.PositionY[eid] = 0
      C.Speed[eid]++
    }
  })
  return w
}

export const collision: System = (w) => {
  w.score = w.score + 17
  C.Player.eids.forEach(eid => {
    C.Enemy.eids.every(enemy => {
      const collision = Math.hypot(
        C.PositionY[eid] - C.PositionY[enemy],
        C.PositionX[eid] - C.PositionX[enemy]) <
        (C.Size[eid] + C.Size[enemy])
      if (collision) {
        Helpers.loseGame(w)
        return false
      }
      return true
    })
  })
  return w
}

const Helpers = {
  mountControles,
  loseGame
}

function loseGame(w: GameWorld) {
  if (w.score > w.highScore) {
    w.highScore = w.score
  }
  w.score = 0

  C.Player.eids.forEach(eid => {
    C.PositionY[eid] = w.container.clientHeight / 2
    C.PositionX[eid] = w.container.clientWidth / 2
  })

  C.Enemy.eids.forEach(eid => {
    C.Speed[eid] = Math.random() * 7
    C.Size[eid] = (Math.random() * 10) + 10
    C.PositionY[eid] = 0
    C.PositionX[eid] = Math.random() * w.canvas.width
  })
}

function mountControles(eid: Entity): void {
  window.onkeydown = (e) => {
    switch (e.key) {
      case "a":
        C.ControlesLeft[eid] = 1
        break
      case "w":
        C.ControlesUp[eid] = 1
        break
      case "d":
        C.ControlesRight[eid] = 1
        break
      case "s":
        C.ControlesDown[eid] = 1
        break
    }
  }

  window.onkeyup = (e) => {
    switch (e.key) {
      case "a":
        C.ControlesLeft[eid] = 0
        break
      case "w":
        C.ControlesUp[eid] = 0
        break
      case "d":
        C.ControlesRight[eid] = 0
        break
      case "s":
        C.ControlesDown[eid] = 0
        break
    }
  }
}
