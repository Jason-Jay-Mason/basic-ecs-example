import { world } from "./world"
import { Entity } from "./entity"

export type Component = Float32Array & { eids: Entity[] }
export type Tag = Set<number>

function createComponent(): Component {
  const key = Symbol()
  world[key] = new Float32Array(100) as Component
  world[key].eids = []
  return world[key]
}
function createTag(): Tag {
  const key = Symbol()
  world[key] = new Set()
  return world[key]
}

export const Tag = {
  Player: createTag(),
  Enemy: createTag(),
}

export const Component = {
  PositionX: createComponent(),
  PositionY: createComponent(),
  Speed: createComponent(),
  Size: createComponent(),
  ControlesLeft: createComponent(),
  ControlesUp: createComponent(),
  ControlesRight: createComponent(),
  ControlesDown: createComponent(),
}
