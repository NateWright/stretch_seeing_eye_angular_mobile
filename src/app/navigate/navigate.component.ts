import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  dropDown: boolean = false;
  locations: string[] = ['Base', 'L1', 'L2'];
  rosSub!: Subscription;

  constructor(private ros: RosService) { }

  ngOnInit(): void {
    this.rosSub = this.ros.connected.subscribe((connected) => {
      if (connected) {
        console.log('Connected to ROS');
        this.ros.getWaypoints((result: any) => {
          this.locations = result['waypoints'];
        });
      } else {
        console.log('Disconnected from ROS');
      }
    }
    );
  }
  ngOnDestroy(): void {
    this.rosSub.unsubscribe();
  }
}
