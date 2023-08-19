import { GameWorld } from "./world"
import { Component } from "./component"
import C from "./component"

export type Entity = number

export function createEntity(c: Component[], s: GameWorld): Entity {
  const eid = s.currentEid++
  for (const component of c) {
    component.eids = new Int32Array([...component.eids, eid])
  }

  return eid
}


export function createPlayer(w: GameWorld): Entity {
  const eid = createEntity([
    C.PositionX,
    C.PositionY,
    C.ControlesLeft,
    C.ControlesUp,
    C.ControlesRight,
    C.ControlesDown,
    C.Speed
  ], w)
  C.Player.add(eid)
  C.Speed[eid] = 20
  C.Size[eid] = 10
  C.PositionY[eid] = w.container.clientHeight / 2
  C.PositionX[eid] = w.container.clientWidth / 2

  return eid
}

export function createEnemy(w: GameWorld): Entity {
  const eid = createEntity([
    C.PositionX,
    C.PositionY,
    C.Size,
    C.Speed
  ], w)
  C.Enemy.add(eid)
  C.Speed[eid] = Math.random() * 7
  C.Size[eid] = (Math.random() * 10) + 10
  C.PositionY[eid] = 0
  C.PositionX[eid] = Math.random() * w.canvas.width

  return eid
}
