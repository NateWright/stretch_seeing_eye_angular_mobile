import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DetailLevel } from 'src/app/ros.service';
import { StateControlService } from 'src/app/state-control.service';

@Component({
  selector: 'app-lod-control',
  templateUrl: './lod-control.component.html',
  styleUrls: ['./lod-control.component.css']
})
export class LODControlComponent {
  readonly DetailLevel = DetailLevel;
  activeClass = 'text-white bg-blue-700 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
  nonActiveClass = 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white';

  constructor(public stateControl: StateControlService) { }

  click(event: DetailLevel) {
    this.stateControl.detail_level = event;
  }
}
