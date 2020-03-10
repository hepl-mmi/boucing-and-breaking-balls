import Circle from './Circle.js'

const animation = {
    startTime: 0,
    nextBallDelay: 60,
    canvasElt: null,
    ctx: null,
    circles: [],
    gravity: 1,
    elasticity: 0.91,
    colors: ['#654c52', '#1e3857', '#d97cdf', '#5FF6B7', '#e87b1b', '#56A6B7', '#A6A6FF', '#56FFB7'],
    init() {
        this.canvasElt = document.createElement('canvas')
        document.body.insertAdjacentElement('afterbegin', this.canvasElt)
        this.ctx = this.canvasElt.getContext('2d')
        this.resizeCanvas()
        window.onresize = () => {
            this.resizeCanvas()
        }
        //this.ctx.globalAlpha = 0.2
        this.addBall()
        this.animate()
    },
    addBall(parent = null) {
        this.circles.push(new Circle(this, parent))
    },
    animate() {
        window.requestAnimationFrame(() => {
            this.animate()
        })

        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
        this.startTime++
        if (this.startTime >= this.nextBallDelay) {
            this.addBall()
            this.nextBallDelay = Math.random() * 30
            this.startTime = 0
        }
        this.circles.forEach(circle => {
            circle.draw()
        })

    },
    resizeCanvas() {
        this.canvasElt.width = window.innerWidth
        this.canvasElt.height = window.innerHeight
    },
    generateChildren(parent) {
        const amount = Math.floor(3 + Math.random() * 5)
        for (let i = 0; i < amount; i++) {
            this.addBall(parent)
        }
        this.deleteBall(parent)
    },
    deleteBall(ball) {
        this.circles.splice(this.circles.indexOf(ball), 1)
    }
}

animation.init()
