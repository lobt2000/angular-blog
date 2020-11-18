import { Injectable } from '@angular/core';
import { Blog } from '../classes/blog.model';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
private blogs : Array<IBlog> = [
  {
    id: 0,
    topic: 'First post',
    postedBy: 'admin', 
    date: new Date(2020, 5, 22, 10, 0,),
    message: 'Sign up to create your account and start to use Angular Blog',

  }

]
private users : Array<IUser> = [
  {
    id: 0,
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin'
  }
]
  constructor() { }
  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  setBlogs(newB: IBlog): void {
    this.blogs.push(newB);
  }
  setUsers(newU: IUser): void {
    this.users.push(newU);
  }

  deleteBlogs(id: number | string): void {
    const index = this.blogs.findIndex(d => d.id === id);
    this.blogs.splice(index, 1);
  }

  updateBlog(blog: IBlog): void {
    const index = this.blogs.findIndex(d => d.id === blog.id)
    this.blogs.splice(index, 1, blog);
  }
  getUsers(): Array<IUser>{
    return this.users;

  }
  
}
