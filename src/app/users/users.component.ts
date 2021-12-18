import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.dataService.sendApiRequest("getUsers/", null).subscribe((res: any) => {
      this.users = res.data
      console.log(this.users);
    })
  }

}
