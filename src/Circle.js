export default class Circle {
    constructor(animation, parent = null) {
        this.animation = animation
        this.canvas = animation.canvasElt
        this.ctx = animation.ctx
        if (parent === null) {
            this.radius = 20 + Math.round(Math.random() * 10)
            this.posX = this.radius + Math.floor(Math.random() * (this.canvas.width - 2 * this.radius))
            this.posY = -this.radius - Math.random()*300
            this.color = animation.colors[Math.floor(Math.random() * animation.colors.length)]
            this.velocityX = 0
            this.velocityY = Math.random() * 20
        } else {
            this.radius = parent.radius / (2 + Math.random() * 2)
            this.posX = parent.posX
            this.posY = parent.posY
            this.color = parent.color
            this.velocityX = Math.random() * 2 - 1
            this.velocityY = parent.velocityY * (Math.random()*(0.8-0.6)+0.6).toFixed(2)
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
            if(this.radius > 5){
                this.animation.generateChildren(this)
            }else{
                this.velocityY = 0
            }
        }

    }

    draw() {
        this.updateCoordinates()
        //this.ctx.clearRect(0, 0, canvasElt.width, canvasElt.height)
        this.ctx.beginPath()
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }
}
