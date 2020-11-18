import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog {
    constructor(
       public id: number,
       public topic: string,
       public postedBy: string, 
       public date: Date,
       public message: string,
    ){}
}