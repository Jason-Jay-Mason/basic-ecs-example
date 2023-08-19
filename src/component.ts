import { world } from "./world"

export type Component = Float32Array & { eids: Int32Array }

function createComponent(): Component {
  const key = Symbol()
  world[key] = new Float32Array(100) as Component
  world[key].eids = new Int32Array(0)
  return world[key]
}

export default {
  PositionX: createComponent(),
  PositionY: createComponent(),
  Speed: createComponent(),
  Size: createComponent(),
  ControlesLeft: createComponent(),
  ControlesUp: createComponent(),
  ControlesRight: createComponent(),
  ControlesDown: createComponent(),
  Player: createComponent(),
  Enemy: createComponent(),
}