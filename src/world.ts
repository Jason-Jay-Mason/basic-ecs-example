import { Component } from './component'

export type GameWorld = {
  [key: symbol]: Component
  currentEid: number
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  container: HTMLElement
  maxEnemies: number
  score: number
  highScore: number
}

const canvas = document.getElementById('game') as HTMLCanvasElement
const container = document.getElementById('container') as HTMLDivElement
const ctx = canvas.getContext('2d')

export const world: GameWorld = {
  currentEid: 0,
  container,
  canvas,
  score: 0,
  highScore: 0,
  ctx: ctx!,
  maxEnemies: 10,
}
