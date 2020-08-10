import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { IPost } from 'src/app/shared/interfaces/post.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

 postsArray: Array<IPost> = [];
 dateFormat: string = 'hh:mm dd.MM.y';

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
}
