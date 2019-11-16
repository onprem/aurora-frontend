class AnimateChealCaowa {
  constructor(path, bat, initialY, initialX, speed) {
    this.counter = 0;
    this.angleCounter = 0;
    this.initialY = initialY || 0;
    this.initialX = initialX || 0;
    this.x = 0;
    this.y = 0;
    this.speed = speed || 0;
    this.direction = true;
    // eslint-disable-next-line prefer-destructuring
    this.svg = path;
    this.svgLength = this.svg.getTotalLength();
    this.bat = bat;
  }

  moveBat = () => {
    if (parseInt(this.counter, 10) === 1) {
      this.direction = false;
    } else if (parseInt(this.counter, 10) < 0) {
      this.direction = true;
    }

    if (this.direction) {
      this.x = this.svg.getPointAtLength(this.counter * this.svgLength).x + 15;
      this.y = this.svg.getPointAtLength(this.counter * this.svgLength).y + 15;

      const dely =
        this.svg.getPointAtLength(this.counter * this.svgLength + 2).y -
        this.svg.getPointAtLength(this.counter * this.svgLength).y;
      const delx =
        this.svg.getPointAtLength(this.counter * this.svgLength + 2).x -
        this.svg.getPointAtLength(this.counter * this.svgLength).x;
      const angle = Math.atan(Math.abs(dely / delx));

      if (dely < 0 && delx >= 0) this.angleCounter = Math.PI / 2 - angle;
      else if (dely >= 0 && delx >= 0) this.angleCounter = Math.PI / 2 + angle;
      else if (dely >= 0 && delx < 0) this.angleCounter = Math.PI + Math.PI / 2 - angle;
      else this.angleCounter = (3 * Math.PI) / 2 + angle;

      this.counter += this.speed;
    } else {
      this.counter = 0;
      this.direction = !this.direction;
    }

    this.bat.setAttribute(
      'style',
      `transform: translate(${this.x - this.initialX}px, ${this.y - this.initialY}px) rotateZ(${
        this.angleCounter
      }rad)`
    );

    requestAnimationFrame(this.moveBat);
  };
}
export default AnimateChealCaowa;
