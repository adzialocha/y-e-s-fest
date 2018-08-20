class Color {
  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

const UPDATE_INTERVAL = 1000 / 24
const MIN_DENSITY = 1
const MAX_DENSITY = 20

const COLORS = [
  new Color(122, 188, 255),
  new Color(255, 255, 255),
  new Color(208, 255, 122),
  new Color(188, 122, 255),
]

const canvasElem = document.getElementById('background-canvas')
const ctx = canvasElem.getContext('2d')

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function updateBackground(density) {
  const width = canvasElem.width
  const height = canvasElem.height

  ctx.clearRect(0, 0, width, height)

  for (let y = 0; y < height; y += 1) {
    if (y % density !== 0) {
      continue
    }

    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, getRandomArrayItem(COLORS))
    gradient.addColorStop(1, getRandomArrayItem(COLORS))
    ctx.fillStyle = gradient
    ctx.fillRect(0, y, width, 1)
  }
}

function resizeCanvas() {
  canvasElem.width = window.innerWidth
  canvasElem.height = window.innerHeight
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', resizeCanvas)

  window.setInterval(() => {
    updateBackground(getRandomArbitrary(MIN_DENSITY, MAX_DENSITY)) 
  }, UPDATE_INTERVAL)

  resizeCanvas()
})
