class AnimateChealCaowa {
  constructor(container, bat, initialY, speed) {
    this.counter = 0;
    this.angleCounter = 0;
    this.initialY = initialY || 0;
    this.x = 0;
    this.y = 0;
    this.speed = speed || 0;
    this.angleCheck = 0;
    this.direction = true;
    // eslint-disable-next-line prefer-destructuring
    this.svg = container.getElementsByTagName('path')[0];
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
      if (this.angleCheck >= Math.PI / 2) {
        this.angleCounter =
          Math.PI / 1.6 +
          Math.PI / 2 +
          Math.atan(
            this.svg.getPointAtLength(this.counter * this.svgLength + 2).y -
              this.svg.getPointAtLength(this.counter * this.svgLength).y /
                this.svg.getPointAtLength(this.counter * this.svgLength + 2).x -
              this.svg.getPointAtLength(this.counter * this.svgLength).y
          );
      } else
        this.angleCounter =
          Math.PI / 1.6 +
          Math.atan(
            this.svg.getPointAtLength(this.counter * this.svgLength + 2).y -
              this.svg.getPointAtLength(this.counter * this.svgLength).y /
                this.svg.getPointAtLength(this.counter * this.svgLength + 2).x -
              this.svg.getPointAtLength(this.counter * this.svgLength).y
          );
      this.angleCheck =
        Math.PI / 1.6 +
        Math.atan(
          this.svg.getPointAtLength(this.counter * this.svgLength + 2).y -
            this.svg.getPointAtLength(this.counter * this.svgLength).y /
              this.svg.getPointAtLength(this.counter * this.svgLength + 2).x -
            this.svg.getPointAtLength(this.counter * this.svgLength).y
        );
      this.counter += this.speed;
    } else {
      this.counter = 0;
      this.direction = !this.direction;
      // this.x = this.svg.getPointAtLength(this.counter * this.svgLength).x - 15;
      // this.y = this.svg.getPointAtLength(this.counter * this.svgLength).y - 15;
      // this.angleCounter = Math.atan(
      //   this.svg.getPointAtLength(this.counter * this.svgLength + 2).y -
      //     this.svg.getPointAtLength(this.counter * this.svgLength).y /
      //       this.svg.getPointAtLength(this.counter * this.svgLength + 2).x -
      //     this.svg.getPointAtLength(this.counter * this.svgLength).y
      // );
      // this.prevLength = this.counter * this.svgLength;
    }

    this.bat.setAttribute(
      'style',
      `transform: translate(${this.x}px, ${this.y - this.initialY}px) rotateZ(${
        this.angleCounter
      }rad)`
    );

    requestAnimationFrame(this.moveBat);
  };
}
export default AnimateChealCaowa;
