import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RosService } from '../ros.service';

enum Status {
  IDLE,
  NAVIGATING
}

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  readonly Status = Status;

  dropDown: boolean = false;
  locations: string[] = ['Base', 'L1', 'L2'];
  location: string = 'Base';

  rosStatus: Status = Status.IDLE;

  rosSub!: Subscription;

  constructor(private ros: RosService) { }

  ngOnInit(): void {
    this.rosSub = this.ros.connected.subscribe((connected) => {
      if (connected) {
        console.log('Connected to ROS');
        this.ros.getWaypoints((result: any) => {
          this.locations = result['waypoints'];
          this.location = this.locations[0];
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
  onClick() {
    console.log(this.location);
    this.rosStatus = Status.NAVIGATING;
    this.ros.navigateToWaypoint(this.location,
      () => {
        this.rosStatus = Status.IDLE;
      }
    );
  }
}
