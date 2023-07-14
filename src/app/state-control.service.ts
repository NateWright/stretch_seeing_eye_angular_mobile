import { Injectable, OnDestroy } from '@angular/core';
import { DetailLevel } from './ros.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateControlService {
  _detail_level: DetailLevel = DetailLevel.LOW;
  detail_level_change = new Subject<void>();
  _walking_speed: number = 0.1;
  walking_speed_change = new Subject<void>();
  constructor() {
    if (localStorage.getItem('detail_level') !== null) {
      this._detail_level = parseInt(localStorage.getItem('detail_level')!);
    }
    if (localStorage.getItem('walking_speed') !== null) {
      this._walking_speed = parseFloat(localStorage.getItem('walking_speed')!);
    }
  }
  get detail_level(): DetailLevel {
    return this._detail_level;
  }
  set detail_level(value: DetailLevel) {
    this._detail_level = value;
    localStorage.setItem('detail_level', value.toString());
    this.detail_level_change.next();
  }
  get walking_speed(): number {
    return this._walking_speed;
  }
  set walking_speed(value: number) {
    this._walking_speed = value;
    localStorage.setItem('walking_speed', value.toString());
    this.walking_speed_change.next();
  }
}
