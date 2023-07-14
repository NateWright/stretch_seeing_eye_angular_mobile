import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StateControlService } from 'src/app/state-control.service';

@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.css']
})
export class SpeedControlComponent {

  constructor(public stateControl: StateControlService) {
  }
  onMaxSpeedChange(event: number) {
    this.stateControl.walking_speed = event / 100;
  }

}
