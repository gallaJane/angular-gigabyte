import { Injectable } from '@angular/core'; // Injectable provides the decorator we need for service
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog';


@Injectable()

export class BlogAdminService {

    //createPost method

    createPost(post: Blog) {
        
        let storageRef = firebase.storage().ref(); //we create the reference to our storage. storage where we will store our images or audio
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64') // then we use our reference with the child method. this allows us to reference a child location in our storage. we use putstring method against the actual image. base64->this is base64 formated image
            .then((snapshot) => { // since the putString is promised based, next we will chained then method to handle the returned snapshot. We need this since the image will exist outside our database, and we need the way to include it to our blogpost
                let url = snapshot.metadata.downloadURLs[0]; // then we use snapshot to grab the downloadUrl from the metadata
                let dbRef = firebase.database().ref('blogPosts/');
                let newPost = dbRef.push(); // then we use the reference with the push method. Push will append the data to a list as well as generating a unique key to every item added to a list.
                newPost.set ({ //the we use set method against the push method. 
                    title: post.title,
                    content: post.content,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })

            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }


  editPost(update: Blog){
        let dbRef = firebase.database().ref('blogPosts/').child(update.id)
            .update({
                title: update.title,
                content: update.content
            });
        alert('post updated');       
    }

    removePost(deletePost: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deletePost.imgTitle} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deletePost.img}`);
                });
    }
}