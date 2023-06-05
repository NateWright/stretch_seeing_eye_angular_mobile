import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.css']
})
export class SpeedControlComponent implements OnInit {
  @Output() maxSpeedChange = new EventEmitter<number>();
  maxSpeed = 0.1;

  ngOnInit() {
    let maxSpeed = localStorage.getItem('speed-select/maxSpeed');
    if (maxSpeed) {
      this.maxSpeed = +maxSpeed;
    }
    this.maxSpeedChange.emit(this.maxSpeed);
  }
  onMaxSpeedChange(event: number) {
    this.maxSpeed = event / 100;
    localStorage.setItem('speed-select/maxSpeed', this.maxSpeed.toString());
    this.maxSpeedChange.emit(this.maxSpeed);
  }

}
