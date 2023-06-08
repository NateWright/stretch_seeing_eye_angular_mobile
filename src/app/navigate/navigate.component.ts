import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RosService } from '../ros.service';
import { SpeechService } from '../speech.service';
import { Status } from '../navbar/status/status.component';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  readonly Status = Status;

  dropDown: boolean = false;
  locations: string[] = [];
  location: string = 'Base';

  status: Status = Status.OFFLINE;
  seenFeatures: string[] = [];

  rosSub!: Subscription;
  featureSub!: Subscription;

  constructor(private ros: RosService, private speech: SpeechService) { }

  ngOnInit(): void {
    this.rosSub = this.ros.status.subscribe(status => {
      this.status = status;
      if (this.status !== Status.OFFLINE) {
        if (this.locations.length === 0) {
          this.ros.getWaypoints((result: any) => {
            this.locations = result['waypoints'];
            this.location = this.locations[0];
          });
        }
      }
    }
    );
  }
  ngOnDestroy(): void {
    this.rosSub.unsubscribe();
  }
  onClick() {
    console.log(this.location);
    this.ros.status.next(Status.NAVIGATING);
    this.seenFeatures = [];
    this.featureSub = this.ros.feature.subscribe((message) => {
      if (!this.seenFeatures.includes(message.description)) {
        if (message.description === this.location) {
          this.speech.speak('I have arrived at ' + message.description);
        } else if (message.degree > 0) {
          this.speech.speak(message.description + ' is on the left.');
        } else if (message.degree < 0) {
          this.speech.speak(message.description + ' is on the right.');
        } else {
          this.speech.speak(message.description + ' is straight ahead.');
        }
        this.seenFeatures.push(message.description);
      }
    });
    this.ros.navigateToWaypoint(this.location,
      () => {
        this.status = Status.READY;
        this.ros.status.next(Status.READY);
        this.featureSub.unsubscribe();
      }
    );
  }
}
