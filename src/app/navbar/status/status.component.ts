import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export enum Status {
  AVAILABLE = 'Available',
  READY = 'Ready',
  NAVIGATING = 'Navigating',
  STUCK = 'Stuck',
  BUSY = 'Busy',
  OFFLINE = 'Offline'
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnChanges {
  readonly Status = Status;
  @Input() status: Status = Status.AVAILABLE;
  statusClass = new Map([
    [Status.AVAILABLE, [
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'bg-blue-500'
    ]],
    [Status.READY, [
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'bg-green-500'
    ]],
    [Status.NAVIGATING, [
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'bg-green-500'
    ]],
    [Status.STUCK, [
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'bg-red-500'
    ]],
    [Status.BUSY, [
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'bg-yellow-500'
    ]],
    [Status.OFFLINE, [
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'bg-red-500'
    ]]
  ]);
  class1: string = '';
  class2: string = '';

  ngOnInit(): void {
    this.setStatus(Status.OFFLINE);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.setStatus(changes['status'].currentValue);
    }
  }

  setStatus(status: Status) {
    this.status = status;
    this.class1 = this.statusClass.get(status)![0];
    this.class2 = this.statusClass.get(status)![1];
  }

}
