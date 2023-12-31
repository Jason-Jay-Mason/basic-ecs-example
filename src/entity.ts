import { GameWorld } from "./world"
import { Component } from "./component"
import { Component as C, Tag } from "./component"

export type Entity = number

export function createEntity(c: Component[], w: GameWorld): Entity {
  const eid = w.currentEid++
  for (const component of c) {
    component.eids = [...component.eids, eid]
  }

  return eid
}

type EntInitializer = (w: GameWorld) => Entity

export const createPlayer: EntInitializer = (w) => {
  const eid = createEntity([
    C.PositionX,
    C.PositionY,
    C.ControlesLeft,
    C.ControlesUp,
    C.ControlesRight,
    C.ControlesDown,
    C.Speed
  ], w)
  Tag.Player.add(eid)
  C.Speed[eid] = 20
  C.Size[eid] = 10
  C.PositionY[eid] = w.container.clientHeight / 2
  C.PositionX[eid] = w.container.clientWidth / 2

  return eid
}

export const createEnemy: EntInitializer = (w) => {
  const eid = createEntity([
    C.PositionX,
    C.PositionY,
    C.Size,
    C.Speed
  ], w)
  Tag.Enemy.add(eid)
  C.Speed[eid] = Math.random() * 7
  C.Size[eid] = (Math.random() * 10) + 10
  C.PositionY[eid] = 0
  C.PositionX[eid] = Math.random() * w.canvas.width

  return eid
}

