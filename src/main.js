import Circle from './Circle.js'

const animation = {
    canvasElt: null,
    ctx: null,
    circles: [],
    nbCircles: 50,
    gravity: 0.9,
    elasticity: 0.81,
    colors: ['#654c52', '#1e3857', '#d97cdf', '#e87b1b'],
    init() {
        this.canvasElt = document.createElement('canvas')
        document.body.insertAdjacentElement('afterbegin', this.canvasElt)
        this.ctx = this.canvasElt.getContext('2d')
        this.resizeCanvas()
        window.onresize = () => {
            this.resizeCanvas()
        }
        for (let i = 0; i < this.nbCircles; i++) {
            this.circles.push(new Circle(this))
        }
        this.animate()
    },
    animate() {
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
        for (let i = 0; i < this.nbCircles; i++) {
            this.circles[i].draw()
        }
        window.requestAnimationFrame(() => {
            this.animate()
        })
    },
    resizeCanvas() {
        this.canvasElt.width = window.innerWidth
        this.canvasElt.height = window.innerHeight
    },
    generateChildren(parent) {
        const amount = Math.floor(3 + Math.random() * 5)
        for (let i = 0; i < amount; i++) {
            this.circles.push(new Circle(this, parent))
        }
        this.circles.splice(this.circles.indexOf(parent), 1)
        this.nbCircles = this.circles.length
    },
}

animation.init()
