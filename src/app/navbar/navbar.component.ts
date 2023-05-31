import { Component, OnInit } from '@angular/core';
import { LOD } from './lod-control/lod-control.component';
import { Mode } from './mode-control/mode-control.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  expanded: boolean = false;
  lod!: LOD;
  mode!: Mode;
  maxSpeed = 0.1;

  constructor() { }

  onLODChange(lod: LOD) {
    console.log("LOD: " + lod);
  }
  onModeChange(mode: Mode) {
    console.log("Mode: " + mode);
  }

  onMaxSpeedChange(event: number) {
    this.maxSpeed = event / 100;
    console.log("Max Speed: " + this.maxSpeed)
  }

}
