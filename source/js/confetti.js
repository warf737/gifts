window.confetti = (function() {
  const HALF_PI = Math.PI * 0.5;

// canvas settings
  const drawingCanvas = document.querySelector("#drawing_canvas");
  const viewWidth = drawingCanvas.offsetWidth;
  const viewHeight = drawingCanvas.offsetHeight;
  console.log(`${drawingCanvas.offsetWidth} x ${drawingCanvas.offsetHeight}`);
  const timeStep = (1 / 60);
  let ctx;


  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  function Particle(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

    this.w = 8;
    this.h = 6;
  }

  Particle.prototype = {
    update: function () {
      this.time = Math.min(this.duration, this.time + timeStep);

      var f = Ease.outCubic(this.time, 0, 1, this.duration);
      var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

      var dx = p.x - this.x;
      var dy = p.y - this.y;

      this.r = Math.atan2(dy, dx) + HALF_PI;
      this.sy = Math.sin(Math.PI * f * 10);
      this.x = p.x;
      this.y = p.y;
    },
    draw: function () {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.scale(1, this.sy);

      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

      ctx.restore();
    }
  };

  let particles = [];

  const initDrawingCanvas = () => {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    ctx = drawingCanvas.getContext('2d');

    createParticles();
  };

  const createParticles = () => {
    for (let i = 0; i < 128; i++) {
      const p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
      const p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
      const p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
      const p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

      particles.push(new Particle(p0, p1, p2, p3));
    }
  };

  const update = () => {
    particles.forEach(function (p) {
      p.update();
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    particles.forEach(function (p) {
      p.draw();
    });
  };

  const loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
  };

// math and stuff

  /**
   * easing equations from http://gizma.com/easing/
   * t = current time
   * b = start value
   * c = delta value
   * d = duration
   */
  const Ease = {
    inCubic: function (t, b, c, d) {
      t /= d;
      return c * t * t * t + b;
    },
    outCubic: function (t, b, c, d) {
      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    },
    inOutCubic: function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    },
    inBack: function (t, b, c, d, s) {
      s = s || 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
  };
  const cubeBezier = (p0, c0, c1, p1, t) => {
    const p = new Point();
    const nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
  };

 const onload = ()  => {
    initDrawingCanvas();
    requestAnimationFrame(loop);
  };

 return {
   onload: onload
 }
})();
