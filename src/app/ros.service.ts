import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as ROSLIB from 'roslib';
import { DOCUMENT } from '@angular/common';
import { Status } from './navbar/status/status.component';

@Injectable({
  providedIn: 'root'
})
export class RosService {
  private ros!: ROSLIB.Ros;
  connected = new BehaviorSubject<boolean>(false);
  status = new BehaviorSubject<Status>(Status.OFFLINE);

  // Subscribers
  featureSubscriber!: ROSLIB.Topic;
  feature = new Subject<{ description: string, degree: number }>();
  messageSubscriber!: ROSLIB.Topic;
  message = new Subject<string>();

  // Publishers
  setMaxVelPublisher!: ROSLIB.Topic;
  setLODPublisher!: ROSLIB.Topic;

  // Clients

  waypointClient!: ROSLIB.Service;
  navigateToWaypointClient!: ROSLIB.Service;
  stopNavigationClient!: ROSLIB.Service;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.ros = new ROSLIB.Ros({});
    this.ros.on('connection', () => {
      console.log('Connected to websocket server.');
      this.connect();
      this.connected.next(true);
      this.status.next(Status.AVAILABLE);
    }
    );
    this.ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      this.connected.next(false);
      this.status.next(Status.OFFLINE);
    }
    );
    this.ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.connected.next(false);
      this.status.next(Status.OFFLINE);
    }
    );
    // this.ros.connect('ws://' + this.document.location.hostname + ':9090');
  }
  setup(ip: string) {
    this.ros.close();
    this.ros.connect('ws://' + ip + ':9090')
  }

  private connect() {
    // Subscribers
    this.featureSubscriber = new ROSLIB.Topic({
      ros: this.ros,
      name: '/stretch_seeing_eye/feature',
      messageType: 'stretch_seeing_eye/Door'
    }
    );
    this.featureSubscriber.subscribe((message) => {
      // @ts-ignore
      this.feature.next({ description: message.description, degree: message.degree });
    });
    this.messageSubscriber = new ROSLIB.Topic({
      ros: this.ros,
      name: '/stretch_seeing_eye/message',
      messageType: 'std_msgs/String'
    }
    );
    this.messageSubscriber.subscribe((message) => {
      // @ts-ignore
      this.message.next(message.data);
    });

    // Publishers
    this.setMaxVelPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/stretch_seeing_eye/set_max_vel',
      messageType: 'std_msgs/Float32'
    }
    );
    this.setMaxVelPublisher.advertise();

    this.setLODPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/stretch_seeing_eye/set_detail_level',
      messageType: 'std_msgs/String'
    }
    );
    this.setLODPublisher.advertise();

    // Clients
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
    this.stopNavigationClient = new ROSLIB.Service({
      ros: this.ros,
      name: '/stretch_seeing_eye/pause_navigation',
      serviceType: 'std_srvs/Trigger'
    }
    );
  }

  setMaxVel(value: number) {
    // this.setMaxVelPublisher.publish()
    let msg = new ROSLIB.Message({
      data: value
    });
    this.setMaxVelPublisher.publish(msg);
  }
  setLOD(value: string) {
    let msg = new ROSLIB.Message({
      data: value
    });
    this.setLODPublisher.publish(msg);
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
  stopNavigation(request: (result: any) => void) {
    this.stopNavigationClient.callService(
      new ROSLIB.ServiceRequest({}),
      request
    )
  }
}
