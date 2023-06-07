import { Component, OnInit } from '@angular/core';
import { SpeechService } from './speech.service';
import { RosService } from './ros.service';
import { Status } from './navbar/status/status.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly Status = Status;
  title = 'stretch_seeing_eye';
  status: Status = Status.OFFLINE;
  constructor(private ros: RosService) { }

  ngOnInit(): void {
    this.ros.status.subscribe(status => {
      this.status = status;
    }
    );
  }
}
