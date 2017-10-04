import { Component, OnInit } from '@angular/core';
import { UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';


@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    blogPosts: Blog[];
    formDisplay: boolean = true; // will be used to display the listing of blogs or post for editing
    singlePost: Blog; // this variable will hold the data that we will use when we edit the post

    constructor(
        private userSVC: UserService,
        private router: Router,
        private blogAdminSVC: BlogAdminService
    ){}


    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }


    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

   getPosts(){
       let dbRef = firebase.database().ref('blogPosts/');
       dbRef.once('value') // then we use the once method to grab the data. Once is a listener and it responses to the value, which in our case is blogPosts. Once is recommended way of returning  a list of data  even if its just one item.
       .then((snapshot)=> {
            let tmp: string[] = snapshot.val(); // then we capture a  snapshot in a temp array. We are doing this is that the data we return is json, which angular can't directly parse
            this.blogPosts = Object.keys(tmp).map(key => tmp[key]) // then we use the keys method to extract the keys of our data and then we use map method to extract the data as in array
       });
   }

   editPost(thePost: Blog){
       this.singlePost = thePost;
       this.formDisplay = false;
   }

   cancelEdit(){
       this.formDisplay = true;
   }
   updatePost(single: Blog){
    this.blogAdminSVC.editPost(single);
    this.formDisplay = true;
}

   deletePost(single: Blog){
       let verify = confirm(`Are you sure you want to delete this post?`)
       if(verify == true) {
           this.blogAdminSVC.removePost(single);
           this.router.navigate(['/admin/']);
       } else {
           alert('Nothing deleted!');
       }
   }
}