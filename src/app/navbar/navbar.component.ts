import { Component, OnDestroy, OnInit } from '@angular/core';
import { Status } from './status/status.component';
import { Subscription } from 'rxjs';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  expanded: boolean = false;
  status: Status = Status.OFFLINE;
  rosSub!: Subscription;
  constructor(private rosService: RosService) { }
  ngOnInit(): void {
    this.rosSub = this.rosService.status.subscribe(status => {
      this.status = status;
    }
    );
  }
  ngOnDestroy(): void {
    this.rosSub.unsubscribe();
  }
}
