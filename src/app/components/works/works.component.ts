import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { EngineService } from './engine.service';


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) { }

  ngOnInit(): void {


  }

}
