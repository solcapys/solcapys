import { Component , AfterViewInit} from '@angular/core';
import anime from 'animejs'
declare var anime: any;
import sal from 'sal.js'
import jump from 'jump.js'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  title = 'solcapys';


ngAfterViewInit(): void {

sal({
//  once: false,
});
  }


}
