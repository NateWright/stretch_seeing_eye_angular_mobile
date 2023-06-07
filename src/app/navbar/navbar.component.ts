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
  lod: LOD = LOD.LOW;
  mode: Mode = Mode.ESCORT;
  status: Status = Status.OFFLINE;
  maxSpeed = 0.1;

  constructor(private ros: RosService) { }

  ngOnInit(): void {
    this.ros.status.subscribe(status => {
      this.status = status;
      if (this.status !== Status.OFFLINE) {
        this.updateParams();
      }
    });
  }
  updateParams() {
    this.ros.setMaxVel(this.maxSpeed);
    this.ros.setLOD(LOD[this.lod]);
  }

  onLODChange(lod: LOD) {
    this.lod = lod;
    if (this.status !== Status.OFFLINE) {
      this.ros.setLOD(LOD[this.lod]);
    }
  }
  onModeChange(mode: Mode) {
    this.mode = mode;
    if (this.status !== Status.OFFLINE) {
    }
  }
  onMaxSpeedChange(maxSpeed: any) {
    this.maxSpeed = maxSpeed;
    if (this.status !== Status.OFFLINE) {
      this.ros.setMaxVel(maxSpeed);
    }
  }

}
