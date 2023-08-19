import { GameWorld } from "./world";
import C from "./component"

export function render(w: GameWorld) {
  w.canvas.width = w.container.clientWidth
  w.canvas.height = w.container.clientHeight
  if (w.ctx) {
    w.ctx.font = "20px serif";
    w.ctx.fillStyle = 'white'
    w.ctx.fillText(`Score: ${Math.round(w.score / 1000)} high: ${w.highScore / 1000}`, 20, 40)
    C.Player.forEach(eid => {
      w.ctx.fillStyle = '#f8f8f2'
      w.ctx.shadowColor = '#f1fa8c'
      w.ctx.shadowBlur = 10
      w.ctx.beginPath()
      w.ctx.arc(C.PositionX[eid], C.PositionY[eid], C.Size[eid], 0, 2 * Math.PI)
      w.ctx.fill()
      w.ctx.shadowBlur = 7
    })

    C.Enemy.forEach(eid => {
      switch (true) {
        case C.Speed[eid] < 7:
          w.ctx.fillStyle = '#44475a'
          w.ctx.shadowColor = '#44475a'
          break
        case C.Speed[eid] < 9:
          w.ctx.fillStyle = '#6272a4'
          w.ctx.shadowColor = '#6272a4'
          break
        default:
          w.ctx.fillStyle = '#8be9fd'
          w.ctx.shadowColor = '#8be9fd'
          break
      }
      w.ctx.beginPath()
      w.ctx.arc(C.PositionX[eid], C.PositionY[eid], C.Size[eid], 0, 2 * Math.PI)
      w.ctx.fill()
    })
  }
}


