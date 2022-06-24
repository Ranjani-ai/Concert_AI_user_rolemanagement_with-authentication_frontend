import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateUser, User } from '../createUser';
import { CreateUserService } from '../createUser.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  
  public createUser?: CreateUser[];
  public editcreatedUser?: CreateUser;
  public deletecreatedUser?: CreateUser;
  content?: string;
  public user?: User[];

  constructor(private userService: UserService, private createUserService: CreateUserService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });    
    this.getUsers();
  }

  public getAllUsers(): void{
    this.userService.getAdminBoard().subscribe(
      (response: User[]) => {
        this.user = response;
        console.log(this.user);
      },
  )}



  public getUsers(): void {
    this.createUserService.getUsers().subscribe(
      (response: CreateUser[]) => {
        this.createUser = response;
        console.log(this.createUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')?.click();
    this.createUserService.addUser(addForm.value).subscribe(
      (response: CreateUser) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
