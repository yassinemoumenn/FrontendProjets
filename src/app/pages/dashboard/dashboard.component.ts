import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { PwdChangeComponent } from 'src/app/modules/auth/pwd-changed/pwd-change.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: Array<Array<number>> = [];
  title: Array<string> = [];
  icon: Array<string> = [];
  statistics = [
    {
      title: 'Recipients',
      icon: './assets/media/svg/icons/General/User.svg',
      data: [12, 34, 54, 56, 20, 23, 23, 57, 30, 53, 11, 40]
    },
    {
      title: 'Signers',
      icon: './assets/media/svg/icons/Communication/Group.svg',
      data: [50, 70, 54, 56, 100, 40, 23, 57, 70, 60, 11, 50]
    },
    {
      title: 'Categories',
      icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
      data: [20, 34, 67, 56, 46, 89, 23, 0, 66, 10, 11, 90]
    },
    {
      title: 'Certificates',
      icon: './assets/media/svg/icons/Design/Layers.svg',
      data: [70, 34, 54, 56, 16, 47, 23, 57, 54, 70, 11, 30]
    }
  ];
  constructor(private authService : AuthenticationService, private dialog : MatDialog ) {}

  ngOnInit(): void {
    // alert('okk'+JSON.stringify(this.authService.currentUserValue))
    // if(this.authService.currentUserValue?.accountSettings === null){
    //   this.dialog.open(PwdChangeComponent)
    // }
    this.statistics.forEach((result) => {
      this.data.push(result.data);
      this.title.push(result.title);
      this.icon.push(result.icon);
    });
  }
}
