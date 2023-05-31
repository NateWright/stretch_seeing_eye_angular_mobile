import { Component } from '@angular/core';

@Component({
  selector: 'app-e-stop',
  templateUrl: './e-stop.component.html',
  styleUrls: ['./e-stop.component.css']
})
export class EStopComponent {
  onStopClicked() {
    console.log('Stop button clicked');
  }
}
