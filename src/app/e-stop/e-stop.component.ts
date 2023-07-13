import { Component } from '@angular/core';
import { SpeechService } from '../speech.service';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-e-stop',
  templateUrl: './e-stop.component.html',
  styleUrls: ['./e-stop.component.css']
})
export class EStopComponent {


  constructor(private speech: SpeechService, private rosService: RosService) { }
  onStopClicked() {
    console.log('Stop button clicked');
    this.speech.updateSpeech({ name: 'text', value: 'Stopping' });

    this.rosService.stopNavigation(
      () => { }
    );
  }
}
