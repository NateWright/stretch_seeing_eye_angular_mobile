import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeechService } from './speech.service';
import { DetailLevel, RosService } from './ros.service';
import { Status } from './navbar/status/status.component';
import { Subscription } from 'rxjs';
import { StateControlService } from './state-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly Status = Status;
  title = 'stretch_seeing_eye';
  status: Status = Status.OFFLINE;
  rosSub!: Subscription;
  speedSub!: Subscription;
  doorSub!: Subscription;
  seenFeatures: string[] = [];
  constructor(private ros: RosService, private speech: SpeechService, private stateControl: StateControlService) { }

  ngOnInit(): void {
    this.rosSub = this.ros.status.subscribe(status => {
      this.status = status;
      if (status === Status.READY) {
        this.ros.setMaxVel(this.stateControl.walking_speed);
      }
    }
    );
    this.speedSub = this.stateControl.walking_speed_change.subscribe(() => {
      this.ros.setMaxVel(this.stateControl.walking_speed);
    });
    this.doorSub = this.ros.door.subscribe((message: { description: string, detail_level: DetailLevel }) => {
      console.log(message);
      console.log(this.stateControl.detail_level);
      if (message.detail_level - 1 <= this.stateControl.detail_level && !this.seenFeatures.includes(message.description)) {
        this.speech.speak(message.description);
        this.seenFeatures.push(message.description);
      }
    });
  }
  ngOnDestroy(): void {
    this.rosSub.unsubscribe();
    this.speedSub.unsubscribe();
    this.doorSub.unsubscribe();
  }
}
