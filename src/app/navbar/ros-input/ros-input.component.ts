import { Component } from '@angular/core';
import { RosService } from 'src/app/ros.service';

@Component({
  selector: 'app-ros-input',
  templateUrl: './ros-input.component.html',
  styleUrls: ['./ros-input.component.css']
})
export class RosInputComponent {
  ip = '';
  constructor(private rosService: RosService) {
    let ip = localStorage.getItem('ros-ip');
    if (ip) {
      this.ip = ip;
      this.rosService.setup(ip);
    }
  }
  onChange(event: any) {
    console.log(event.target.value);
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(event.target.value)) {
      this.ip = event.target.value;
      localStorage.setItem('ros-ip', this.ip);
      this.rosService.setup(this.ip);
      console.log('IP changed to: ' + this.ip);
    }
  }
}
