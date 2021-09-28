import { Component, OnInit, ViewChild, ElementRef , HostListener , AfterViewInit } from '@angular/core';
import { ServicioService} from '../../servicio.service';
import * as THREE from 'three';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    elementPosition: any;

    @ViewChild('tituloAbout') aboutTituloElement: ElementRef;

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.elementPosition = this.aboutTituloElement.nativeElement.offsetTop;
    this.servicioService.setData(this.elementPosition - 90);
  }

}
