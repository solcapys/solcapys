import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  elementAboutPosition: any;
  constructor() { }

  getData(): any{
    return this.elementAboutPosition;
  }

  setData(val: any){
   this.elementAboutPosition = val;
 }

}
