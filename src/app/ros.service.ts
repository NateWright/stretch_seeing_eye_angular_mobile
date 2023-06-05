import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as ROSLIB from 'roslib';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RosService {
  private ros!: ROSLIB.Ros;
  connected = new BehaviorSubject<boolean>(false);


  // Clients

  waypointClient!: ROSLIB.Service;
  navigateToWaypointClient!: ROSLIB.Service;
  pauseNavigationClient!: ROSLIB.Service;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.ros = new ROSLIB.Ros({});
    this.ros.on('connection', () => {
      console.log('Connected to websocket server.');
      this.connect();
      this.connected.next(true);
    }
    );
    this.ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      this.connected.next(false);
    }
    );
    this.ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.connected.next(false);
    }
    );
    this.ros.connect('ws://' + this.document.location.hostname + ':9090');
  }

  private connect() {
    this.waypointClient = new ROSLIB.Service({
      ros: this.ros,
      name: '/stretch_seeing_eye/get_waypoints',
      serviceType: 'stretch_seeing_eye/GetWaypoints'
    }
    );
    this.navigateToWaypointClient = new ROSLIB.Service({
      ros: this.ros,
      name: '/stretch_seeing_eye/navigate_to_waypoint',
      serviceType: 'stretch_seeing_eye/Waypoint'
    }
    );
    this.pauseNavigationClient = new ROSLIB.Service({
      ros: this.ros,
      name: '/stretch_seeing_eye/pause_navigation',
      serviceType: 'std_srvs/SetBool'
    }
    );
  }
  getWaypoints(request: (result: any) => any) {
    this.waypointClient.callService(
      new ROSLIB.ServiceRequest({})
      , request
    )
  }
  navigateToWaypoint(waypoint: string, request: (result: any) => void) {
    this.navigateToWaypointClient.callService(
      new ROSLIB.ServiceRequest({ data: waypoint }),
      request
    )
  }
  pauseNavigation(value: boolean, request: (result: any) => void) {
    this.pauseNavigationClient.callService(
      new ROSLIB.ServiceRequest({ data: value }),
      request
    )
  }
}
