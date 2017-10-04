import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component ({
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css']
})

export class LoginComponent { 
    email: string;
    password1: string;


    constructor (private userSVC: UserService, private router: Router ) { }


    //login method 

    login(){
        this.userSVC.login(this.email, this.password1); // here we are passing the email and password variables to the login service
        this.userSVC.verifyUser(); // this will navigate us to the admin menu
    }


    signup(){
        this.router.navigate(['/admin/signup']);
    }

    cancel(){
        this.router.navigate(['']);
    }
}