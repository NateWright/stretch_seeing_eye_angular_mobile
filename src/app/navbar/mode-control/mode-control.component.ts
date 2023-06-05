import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export enum Mode {
  GUIDE,
  ESCORT
}
@Component({
  selector: 'app-mode-control',
  templateUrl: './mode-control.component.html',
  styleUrls: ['./mode-control.component.css']
})
export class ModeControlComponent implements OnInit {
  @Output() modeChange = new EventEmitter<Mode>();
  readonly Mode = Mode;
  mode: Mode = Mode.GUIDE;
  activeClass = 'text-white bg-blue-700 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
  nonActiveClass = 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-11 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white';

  ngOnInit() {
    let mode = localStorage.getItem('mode-select/mode');
    if (mode) {
      this.mode = +mode;
    }
    this.modeChange.emit(this.mode);
  }

  onGuideClick() {
    this.mode = Mode.GUIDE;
    localStorage.setItem('mode-select/mode', this.mode.toString());
    this.modeChange.emit(this.mode);
  }
  onEscortClick() {
    this.mode = Mode.ESCORT;
    localStorage.setItem('mode-select/mode', this.mode.toString());
    this.modeChange.emit(this.mode);
  }
}
