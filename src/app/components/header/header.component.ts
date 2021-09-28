import { Component, OnInit, ViewChild, ElementRef , HostListener , AfterViewInit} from '@angular/core';
import p5 from "p5";
import {Particle} from './particles'
import jump from 'jump.js';
import { ServicioService } from '../../servicio.service';
import * as matter from 'matter-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public isMenuOpen: boolean = false;
  sticky: boolean = false;


  canvas: any;
  sw = 2;
  c = [];
  strokeColor = 0;
  particles = [];
  fuenteMono1:any;
  sizeRaton = 0;
  scala = 0;
  imgsolcapys:any;
  //st = 'Ornitorrin-cut, es un proyecto multidisciplinario, nacido  de la reunión de distintas  naturalezas en equilibrio, destinado a crear piezas y alimentos visuales de alta gama    S u i    g e n e r i s.';
  st = "SolCapys Project:";
  st2="Solana Capybaras";
  Liquido:any;
  contiene:any;
  Engine:any;
  world:any;
  Bodies:any;
  particulasMundo =[];
  mouseCircular:any;
  Body:any;
 

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {


///----------------------------------
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN
    const sketch = s => {

      s.preload = () =>
      {
        this.sizeRaton = s.windowWidth/30;
        this.fuenteMono1 = s.loadFont("assets/fonts/RobotoMono-Regular.ttf");
        this.imgsolcapys = s.loadImage('assets/logo.png');
        this.scala=0.4;
      }


      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight*2);
        canvas2.parent('sketch-holder');
        canvas2.position(0,0);
        canvas2.style("z-index : 1");
        s.background(5,25,36);

        this.Engine = matter.Engine.create('sketch-holder');
        this.world = this.Engine.world;
        this.Body = matter.Body;

        s.image(this.imgsolcapys, s.windowWidth/4, 10);

        for(let i = 0; i<s.windowWidth/60; i++){
            this.particles.push(new Particle(s));
              
        }

        for(let j = 0;j<this.particles.length;j++){

          this.particulasMundo.push(this.particles[j].createParticle());
          this.Body.applyForce( this.particulasMundo[j], {x: this.particulasMundo[j].position.x, y: this.particulasMundo[j].position.y}, {x: s.random(-0.001,0.001), y: s.random(-0.001,0.001)});

        }
              
        this.world.gravity.y=0;
        this.mouseCircular = matter.Bodies.circle(s.mouseX, s.mouseY, this.sizeRaton/2,{
          collisionFilter: {
              mask: 0x0001
          }});

        matter.World.add(this.world,this.particulasMundo);
        matter.World.add(this.world,this.mouseCircular);    
        matter.Engine.run(this.Engine);

      };

      s.draw = () => {
      s.background(5,25,36);
      //s.fill('#ED225D');
      //s.textStyle(s.ITALIC);
      //s.textSize(s.windowWidth/28);
      //s.text(this.st, s.windowWidth/11, s.windowHeight - s.windowHeight/2, s.windowWidth, s.windowHeight); // Text wraps within text box
      //s.textStyle(s.NORMAL);
      //s.textSize(s.windowWidth/30);
      //s.text(this.st2, (s.windowWidth/9)*3, s.windowHeight - s.windowHeight/2, s.windowWidth, s.windowHeight); // Text wraps within text box

      s.textStyle(s.NORMAL);
      s.textSize(s.windowWidth/20);
      s.text(this.st2, s.windowWidth/12, s.windowHeight - s.windowHeight/2 + s.windowHeight/3, s.windowWidth, s.windowHeight); // Text wraps within text box



      s.imageMode(s.CENTER);
      s.image(this.imgsolcapys, s.windowWidth/2, s.windowHeight/4,this.scala*s.windowWidth, this.scala*this.imgsolcapys.height*s.windowWidth/this.imgsolcapys.width);

     this.mouseCircular.position.x = s.mouseX;
     this.mouseCircular.position.y = s.mouseY;
      
      if(s.mouseY > s.windowHeight + 20 && s.mouseY < s.windowHeight*2 + 20)
      {
        s.triangle(this.mouseCircular.position.x - this.sizeRaton/2, this.mouseCircular.position.y + this.sizeRaton/2, this.mouseCircular.position.x + this.sizeRaton/2, this.mouseCircular.position.y + this.sizeRaton/2, this.mouseCircular.position.x, this.mouseCircular.position.y - this.sizeRaton/2);     
      }
      else
      {
        s.ellipse(this.mouseCircular.position.x, this.mouseCircular.position.y, this.sizeRaton, this.sizeRaton);
      }

       ;

       let eliminados = 0;
    for(let j = 0;j<this.particles.length;j++){
      
      this.particles[j].dibujaParticula(this.particulasMundo[j].position.x,this.particulasMundo[j].position.y);
      this.particles[j].joinParticles(this.particulasMundo[j].position,this.particulasMundo);
      if(this.particles[j].moveParticle(this.particulasMundo[j].position.x,this.particulasMundo[j].position.y))
      {
        matter.World.remove(this.world,this.particulasMundo[j]);
        this.particulasMundo.splice(j,1);
        this.particles.splice(j,1);
        j--;   
        eliminados++;
        

      }
   }
  
    for(let j = 0;j<eliminados;j++){

        this.particles.push(new Particle(s));
        this.particulasMundo.push(this.particles[this.particles.length-1].createParticle());
        matter.World.add(this.world,this.particulasMundo[this.particulasMundo.length-1]);
        this.Body.applyForce( this.particulasMundo[this.particulasMundo.length-1], {x: this.particulasMundo[this.particulasMundo.length-1].position.x, y: this.particulasMundo[this.particulasMundo.length-1].position.y}, {x: s.random(-0.001,0.001), y: s.random(-0.001,0.001)});

    }

    eliminados = 0;

      };


    };

    this.canvas = new p5(sketch);

///-----------------------------------


  }
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
  public onClickScrollRaton() {
    jump(this.servicioService.getData());
  }


}
