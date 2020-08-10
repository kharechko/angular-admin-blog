import { IPost } from './../interfaces/post.interface';


export class Post implements IPost{
       constructor(
        public id: number,
        public title: string,
        public text: string,
        public date: Date,
        public author: string,
        public image?: string
       ){}
}