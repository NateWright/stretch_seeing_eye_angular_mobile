import { Component } from '@angular/core';
import { SpeechService } from 'src/app/speech.service';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent {
  voices: SpeechSynthesisVoice[] = [];
  currVoice: string = '';
  constructor(private speech: SpeechService) { }
  ngOnInit() {
    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices().filter((v) => v.lang.includes('en'));
      this.speech.setVoices(this.voices);

      let voice = localStorage.getItem('voice');

      if (voice) {
        this.speech.updateVoice(voice);
        this.currVoice = voice;
      } else {
        this.speech.updateVoice(this.voices[0].name);
        this.currVoice = this.voices[0].name;
      }
    }
  }

  setVoice(event: any) {
    this.speech.updateVoice(event.target.value);
    this.speech.updateSpeech({ name: 'text', value: 'Testing' });
  }
}
