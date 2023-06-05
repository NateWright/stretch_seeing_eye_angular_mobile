import { Component } from '@angular/core';
import { SpeechService } from '../speech.service';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-e-stop',
  templateUrl: './e-stop.component.html',
  styleUrls: ['./e-stop.component.css']
})
export class EStopComponent {

  info = 'STOP';

  constructor(private speech: SpeechService, private rosService: RosService) { }
  onStopClicked() {
    console.log('Stop button clicked');
    if (this.info == 'STOP') {
      this.speech.updateSpeech({ name: 'text', value: 'Stopping' });
    } else {
      this.speech.updateSpeech({ name: 'text', value: 'Resuming' });

    }

    this.rosService.pauseNavigation(('STOP' === this.info),
      () => {
        this.info = ('STOP' === this.info) ? 'RESUME' : 'STOP';
      }
    );
  }
}
