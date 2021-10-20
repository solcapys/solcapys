import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import capysRarity from '../../../assets/csv_full_traits.json';
import { defer, fromEvent, interval } from 'rxjs';

export interface CapysTotal {
  Capys: string
  Ranking: number
  background: string
  background_count: number
  background_percentage: number
  boca: string
  boca_count: number
  boca_percentage: number
  cig: string
  cig_count: number
  cig_percentage: number
  cuerpo: string
  cuerpo_count: number
  cuerpo_percentage: number
  ear: string
  ear_count: number
  ear_percentage: number
  gorro: string
  gorro_count: number
  gorro_percentage: number
  lentes: string
  lentes_count: number
  lentes_percentage: number
  ojos: string
  ojos_count: number
  ojos_percentage: number
  ropa: string
  ropa_count: number
  ropa_percentage: number
}

@Component({
  selector: 'app-rarity',
  templateUrl: './rarity.component.html',
  styleUrls: ['./rarity.component.css']
})
export class RarityComponent implements OnInit {


  dtOptions: DataTables.Settings = {};

  capysDataTotal : CapysTotal[] = capysRarity;
  capysResp=[];

  constructor() { 
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers'
    };


  }



  
}
