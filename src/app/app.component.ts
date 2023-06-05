import { Component } from '@angular/core';
import { SpeechService } from './speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stretch_seeing_eye_angular_mobile';
  constructor() { }

  ngOnInit(): void {
  }
}
