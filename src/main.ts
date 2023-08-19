import './style.css'
import { render } from './render'
import { collision, movement, spawn } from './systems'
import { world, GameWorld } from './world'

function pipe(init: GameWorld, ...funcs: Function[]): GameWorld {
  return funcs.reduce((acc, func) => func(acc), init);
}

function game(w: GameWorld): GameWorld {

  const next = pipe(
    w,
    spawn,
    movement,
    collision
  )

  render(next)

  return next
}

const compose = (w: GameWorld) => {
  setTimeout(() => {
    compose(game(w))
  }, 17)
}

compose(game(world))


