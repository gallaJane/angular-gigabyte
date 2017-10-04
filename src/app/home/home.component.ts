import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/adminShared/user.service';
import { Blog } from '../admin/adminShared/blog';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']    
})
export class HomeComponent implements OnInit{
    blogPosts: Blog[];

    constructor( private userSVC: UserService, private router: Router ){ }

    ngOnInit(){   //this will execute getPosts method
        this.getPosts();
    }


    getPosts(){ //this is the same getPosts method like in blog-admin.component.ts
        let dbRef = firebase.database().ref('blogPosts/')
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.blogPosts = Object.keys(tmp).map(key => tmp[key])
            });
    }

    choosePost(post: Blog) { //this takes the blog Object and extract the post id
        this.router.navigate(['/post', post.id]);
    }
}

