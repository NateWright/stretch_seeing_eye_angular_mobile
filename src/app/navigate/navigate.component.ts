import { Component } from '@angular/core';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  dropDown: boolean = false;
  locations: string[] = ['Base', 'L1', 'L2'];
}
