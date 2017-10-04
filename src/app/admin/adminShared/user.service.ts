//Injectable let us use dependency injection to add our service to other components and modules

import { Injectable } from '@angular/core';
import {
    CanActivate, // is how we will check if users log before we will navigate to the guarded route
    Router,
    ActivatedRouteSnapshot,// these 2 will be used when we process to route guard
    RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()

export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {

        // Initialize Firebase
        firebase.initializeApp({
            apiKey: "AIzaSyCtaIBxRY6PfmUQdl6SZmxz-H4pfnfLg6c",
            authDomain: "gigabytegames-b9292.firebaseapp.com",
            databaseURL: "https://gigabytegames-b9292.firebaseio.com",
            storageBucket: "gigabytegames-b9292.appspot.com",
            messagingSenderId: "1049134414293"
        })
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['admin/login']);
        return false;
    }


    //new method to register new user

    register( email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
         .catch(function(error) {
            alert(`${error.message} Please Try Again!`);
         });
    }


    // verify user

    verifyUser() {
        this.authUser = firebase.auth().currentUser; // grab the current user
        // when it detects that someone is logged in 
        if(this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }


    // new  login method 
    
    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch(function(error) {
            alert(`${error.message} Unable to login. Try Again!`);
        });
    }


    // logout method 

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function() {
            alert(`Logged Out!`);
        }, function(error) {
            alert(`${error.message} Unable to logout .Try Again!`);
        });
    }

}