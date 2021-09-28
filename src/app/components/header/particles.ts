import p5 from "p5";
import * as matter from 'matter-js';
export class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
    _p5: p5;
    x:number;
    y:number;
    r:number;
    xSpeed:number;
    ySpeed:number;
    altura:number;
    shapeT:number;
    alturaSegunda:number;
    nivel:number;
    _world:any;
    particleBodie:any;
  constructor(p5: p5){
    this._p5 = p5;
    this.altura = this._p5.windowHeight + this._p5.windowHeight/8;
    this.alturaSegunda = this._p5.windowHeight*2;
    this.r = this._p5.random(4,8);
    this.shapeT = this._p5.random(-2,2);
    this.nivel=0;
    this.restartValues();
  }

  restartValues()
  {
    this.x = this._p5.random(0,this._p5.width);
    this.y = this._p5.random(0,this.altura);
    this.xSpeed = this._p5.random(-4,4);
    this.ySpeed = this._p5.random(-2,3);

  }

// creation of a particle.
  createParticle() {
   
    if(this.shapeT > 0 )
    {
      this.particleBodie = matter.Bodies.rectangle(this.x,this.y,this.r,this.r,{
        collisionFilter: {
            mask: 0x0001
        }, className:"cuadrado", width:this.r });
    }else
    {
      this.particleBodie  = matter.Bodies.circle(this.x,this.y,this.r,{
        collisionFilter: {
            mask: 0x0001
        }, className:"circulo", width:this.r});
    }

    this.particleBodie.friction = 0;
    this.particleBodie.frictionAir = 0;

    return this.particleBodie;
  }

  dibujaParticula(valX:number,valY:number)
  {

    this._p5.noStroke();
    this._p5.fill('rgba(250,247,247,0.5)');

    if(this.shapeT > 0 )
    {
      this._p5.square(valX,valY,this.r);
    }
    else{
      this._p5.circle(valX,valY,this.r);
    }
  }

// setting the particle in motion.
  moveParticle(valX:number,valY:number) {

    var salida = false;
    if((valX < -60 || valX > this._p5.width+60) || (valY < -60 || valY > this.alturaSegunda+200))
      salida = true;
      
    return salida;
  }


  getPosx()
  {
    return this.x;
  }

  getPosy()
  {
    return this.y;

  }

  getR()
  {
    return this.r;

  }

  getShapeT()
  {
    return this.shapeT;
  }

  setForce()
  {
    this.nivel=1;

  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particulaActual,particles) {
    particles.forEach(element =>{
      let dis = this._p5.dist(particulaActual.x,particulaActual.y,element.position.x,element.position.y);
      if(dis<180) {
        this._p5.stroke('rgba(250,247,247,0.7)');
        if(element.className == "cuadrado"  && this.shapeT > 0)
        { 
          this._p5.line(particulaActual.x+this.r/2,particulaActual.y+this.r/2,element.position.x+element.width/2,element.position.y+element.width/2);
        }
        else if(element.className == "circulo" && this.shapeT > 0)
        {
          this._p5.line(particulaActual.x+this.r/2,particulaActual.y+this.r/2,element.position.x,element.position.y);
         
        }
        else if(element.className == "cuadrado"  && this.shapeT < 0)
        {
          this._p5.line(particulaActual.x,particulaActual.y,element.position.x+element.width/2,element.position.y+element.width/2); 
        }
        else{
          this._p5.line(particulaActual.x,particulaActual.y,element.position.x,element.position.y);
        }
      }
    });
  }
}
