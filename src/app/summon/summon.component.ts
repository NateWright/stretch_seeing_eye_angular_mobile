import { Component } from '@angular/core';

@Component({
  selector: 'app-summon',
  templateUrl: './summon.component.html',
  styleUrls: ['./summon.component.css']
})
export class SummonComponent {
  dropDown: boolean = false;
  locations: string[] = ['Base', 'L1', 'L2'];
}
