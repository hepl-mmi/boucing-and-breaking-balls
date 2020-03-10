export default class Circle {
    constructor(animation, parentCircle = null) {
        this.animation = animation
        this.canvas = animation.canvasElt
        this.ctx = animation.ctx
        if (parentCircle === null) {
            this.radius = 20 + Math.round(Math.random() * 10)
            this.posX = this.radius + Math.floor(Math.random() * (this.canvas.width - 2 * this.radius))
            this.posY = -this.radius - Math.random() * 300
            this.color = animation.colors[Math.floor(Math.random() * animation.colors.length)]
            this.velocityX = 0
            this.velocityY = Math.random() * 20
        } else {
            this.radius = parentCircle.radius / (2 + Math.random() * 2)
            this.posX = parentCircle.posX
            this.posY = parentCircle.posY
            this.color = parentCircle.color
            this.velocityX = Math.random() * 2 - 1
            this.velocityY = parentCircle.velocityY * (Math.random() * (0.8 - 0.6) + 0.6).toFixed(2)
        }
    }

    updateCoordinates() {
        this.velocityY += this.animation.gravity
        this.posX += this.velocityX
        this.posY += this.velocityY
        if (this.posX + this.radius >= this.canvas.width || this.posX <= this.radius) this.velocityX *= -1
        if (this.posY + this.radius >= this.canvas.height) {
            this.posY = this.canvas.height - this.radius
            this.velocityY *= -(this.animation.elasticity)
            if (this.radius > 5) {
                this.animation.generateChildren(this)
            } else {
                this.animation.deleteBall(this)
            }
        }
    }

    draw() {
        this.updateCoordinates()
        this.ctx.beginPath()
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }
}
