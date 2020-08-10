import { Component, OnInit } from '@angular/core';
import { Post } from './../../shared/models/post.model';
import { IPost } from './../../shared/interfaces/post.interface';
import { BlogService } from './../../shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  postTitle: string;
  postText: string;
  postAuthor: string;
  displayedColumns: string[] = ['number', 'title', 'text', 'date', 'author', 'edit', 'delete'];
  postsArray: Array<IPost> = [];
  dateFormat: string = 'hh:mm dd.MM.y';
  postImage: string = '';
  isEdited:  boolean = false;
  editedId: number;

  constructor(
    private blogsService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

getPosts(): void{
  this.blogsService.getPosts().subscribe( posts => {
   this.postsArray = posts;

  }, error => {
    console.log(error)
  })
}


addPost(): void{
  const post: IPost = new Post(1, this.postTitle, this.postText, new Date(), this.postAuthor, this.postImage);
  if(!this.isEdited) {
    if(this.postTitle && this.postText && this.postText &&  this.postImage) {
      if(this.postsArray.length >= 1){
        post.id = this.postsArray.slice(-1)[0].id + 1;
      }
      this.blogsService.addPost(post).subscribe( () => {
        this.getPosts();
        this.resetForm();
      })
    }
  } else{
    post.id = this.editedId;
    this.blogsService.updatePost(post).subscribe( () => {
      this.getPosts();
      this.resetForm();
    })
  }
  }



resetForm(): void{
  this.postAuthor = '';
  this.postText = '';
  this.postTitle = '';
  this.postImage = '';
}

editPost(post: IPost): void{
  this.postTitle = post.title;
  this.postText = post.text;
  this.postAuthor = post.author;
  this.postImage = post.image;
  this.editedId = post.id;
  this.isEdited = true;
}


deletePost(post: IPost): void{
  this.blogsService.deletePost(post).subscribe( () => {
    this.getPosts();
  })
}

}
