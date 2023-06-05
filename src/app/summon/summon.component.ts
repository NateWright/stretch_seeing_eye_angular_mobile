import { Component, OnDestroy, OnInit } from '@angular/core';
import { RosService } from '../ros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summon',
  templateUrl: './summon.component.html',
  styleUrls: ['./summon.component.css']
})
export class SummonComponent implements OnInit, OnDestroy {
  dropDown: boolean = false;
  locations: string[] = ['Base', 'L1', 'L2'];
  location: string = 'Base';
  rosSub!: Subscription;
  disabled = false;

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

  onSummonClick() {
    console.log(this.location);
    this.disabled = true;
  }
}
