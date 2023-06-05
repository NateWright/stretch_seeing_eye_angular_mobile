import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export enum LOD {
  LOW,
  MEDIUM,
  HIGH
}

@Component({
  selector: 'app-lod-control',
  templateUrl: './lod-control.component.html',
  styleUrls: ['./lod-control.component.css']
})
export class LODControlComponent implements OnInit {
  @Output() lodChange = new EventEmitter<LOD>();
  lod: LOD = LOD.LOW;
  readonly LOD = LOD;
  activeClass = 'text-white bg-blue-700 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
  nonActiveClass = 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white';

  ngOnInit() {
    let lod = localStorage.getItem('lod-select/lod');
    if (lod) {
      this.lod = +lod;
    }
    this.lodChange.emit(this.lod);
  }

  onLowClick() {
    this.lod = LOD.LOW;
    localStorage.setItem('lod-select/lod', this.lod.toString());
    this.lodChange.emit(this.lod);
  }
  onMediumClick() {
    this.lod = LOD.MEDIUM;
    localStorage.setItem('lod-select/lod', this.lod.toString());
    this.lodChange.emit(this.lod);
  }
  onHighClick() {
    this.lod = LOD.HIGH;
    localStorage.setItem('lod-select/lod', this.lod.toString());
    this.lodChange.emit(this.lod);
  }
}
