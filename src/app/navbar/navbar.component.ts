import { Component, OnInit } from '@angular/core';
import { LOD } from './lod-control/lod-control.component';
import { Mode } from './mode-control/mode-control.component';
import { RosService } from '../ros.service';
import { Status } from './status/status.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  expanded: boolean = false;
  lod!: LOD;
  mode!: Mode;
  status: Status = Status.OFFLINE;
  maxSpeed = 0.1;

  constructor(private ros: RosService) { }

  ngOnInit(): void {
    this.ros.connected.subscribe(connected => {
      if (connected) {
        this.status = Status.AVAILABLE;
      } else {
        this.status = Status.OFFLINE;
      }
    });
  }

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
