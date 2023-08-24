import { Component as C, Tag } from './component'
import { Entity, createEnemy, createPlayer } from "./entity"
import { GameWorld } from './world'

type System = (w: GameWorld) => GameWorld

export const spawn: System = (w) => {
  if (Tag.Player.size < 1) {
    const eid = createPlayer(w)
    Helpers.mountControles(eid)
  }

  if (Tag.Enemy.size < w.maxEnemies) {
    createEnemy(w)
  }

  return w
}

export const movement: System = (w) => {
  C.Speed.eids.forEach((eid: Entity) => {
    if (Tag.Player.has(eid)) {
      switch (true) {
        case C.ControlesLeft[eid] && C.PositionX[eid] > 20:
          C.PositionX[eid] = C.PositionX[eid] - C.Speed[eid]
          break
        case C.ControlesUp[eid] && C.PositionY[eid] > 30:
          C.PositionY[eid] = C.PositionY[eid] - C.Speed[eid]
          break
        case C.ControlesRight[eid] && C.PositionX[eid] < w.canvas.width - 20:
          C.PositionX[eid] = C.PositionX[eid] + C.Speed[eid]
          break
        case C.ControlesDown[eid] && C.PositionY[eid] < w.canvas.height - 30:
          C.PositionY[eid] = C.PositionY[eid] + C.Speed[eid]
      }

    }
    if (Tag.Enemy.has(eid)) {
      C.PositionY[eid] = C.PositionY[eid] + C.Speed[eid]
      if (C.PositionY[eid] > w.canvas.height) {
        C.PositionX[eid] = Math.random() * w.canvas.width
        C.Size[eid] = (Math.random() * 10) + 10
        C.PositionY[eid] = 0
        C.Speed[eid] = C.Speed[eid] + (5 / C.Speed[eid])
      }
    }
  })

  return w
}

export const collision: System = (w) => {
  w.score = w.score + 17
  const players = Array.from(Tag.Player)
  const enemies = Array.from(Tag.Enemy)
  players.forEach(player => {
    enemies.every(enemy => {
      const collision = Math.hypot(
        C.PositionY[player] - C.PositionY[enemy],
        C.PositionX[player] - C.PositionX[enemy]) <
        (C.Size[player] + C.Size[enemy])
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

  Tag.Player.forEach(eid => {
    C.PositionY[eid] = w.container.clientHeight / 2
    C.PositionX[eid] = w.container.clientWidth / 2
  })

  Tag.Enemy.forEach(eid => {
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
