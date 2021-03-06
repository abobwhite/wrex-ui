import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public users;
  public displayedColumns = ['name', 'link']

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = new MatTableDataSource(users);
      this.users.sort = this.sort;
    })
  }

  public applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
