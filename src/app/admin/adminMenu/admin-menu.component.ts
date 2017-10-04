import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component ({
    templateUrl: './admin-menu.component.html',
    styleUrls: [ './admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
// OnInit lets angular 2 know that we are going to implement one of its special methods inside of this class
// in this case OnInit is a method that we use to execute other methods when our component is created. Here we will use OnInit to get currently loggedIn user

    theUser: string;

    constructor(private userSVC: UserService, private router: Router){}

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate([ '' ]);
    }
 } 