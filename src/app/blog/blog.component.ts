import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Blog } from '../classes/blog.model';
import { User } from '../classes/user.model';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Array<IBlog> = [];
  users: Array<IUser> = [];
  email: string = '';
  editDel = false;
  modalRef: BsModalRef;
  username: string;
  blogTopic: string;
  blogText: string;
  pass: string = '';
  changeI = null;
  name: string = '';
  addr: string = '';
  number: string = '';
  hideBut = false;
  newUser: Array<IUser> = []
  constructor(private blogService: BlogServiceService, private modalService: BsModalService) { }
  hide = true;
  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }
  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }
  getUsers() {
    this.users = this.blogService.getUsers();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submitIn(): void {
    if (this.email != '' && this.pass != '') {

      if (this.users.filter(d => d.email == this.email).length != 0 && this.users.filter(d => d.password == this.pass).length != 0) {
        this.newUser = this.users.filter(d => d.email == this.email);
        if ('admin@gmail.com' == this.email && this.pass == 'admin') {
          this.editDel = true;
          this.hide = false;
          this.username = 'admin';
          this.resetForm()
        }
        else {
          this.editDel = false;
          this.hide = false;
          this.username = this.newUser[0].username;
          this.resetForm()

        }

      }
      else {
        this.resetForm()

      }
    }
    else {
      this.resetForm()


    }
  }


  submitUp(): void {
    if (this.addr.length > 0 && this.name.length > 0 && this.number.length > 0) {
      console.log(this.users.filter(d => d.email == this.addr).length);
      if (this.users.filter(d => d.email == this.addr).length == 0 && this.users.filter(d => d.username == this.name).length == 0) {
        const newU = new User(
          this.users.length,
          this.name,
          this.addr,
          this.number
        );

        this.hide = false;
        this.username = this.name;
        this.blogService.setUsers(newU);
        this.resetForm()
      }
      else {
        this.resetForm()
      }
    }
    else {
      this.resetForm()
    }
  }

  signOut(): void {
    this.hide = true;
    this.editDel = false;
    this.username = '';
  }
  deleteAdminBlog(index: number): void {
    this.blogService.deleteBlogs(index);
  }

  addBlog(): void {
    if (this.blogTopic.length != 0 && this.blogText.length != 0) {
      if (this.changeI === null) {

        const newB = { id: 1, topic: this.blogTopic, postedBy: this.username, date: new Date, message: this.blogText, status: true };
        if (this.blogs.length > 1) {
          newB.id = +this.blogs.length;
        }
        this.blogService.setBlogs(newB);
        this.resetForm();
      }
      else {

        this.blogs[this.changeI].topic = this.blogTopic;
        this.blogs[this.changeI].message = this.blogText;
        this.changeI = null;
        this.resetForm()
      }

    }

  }
  edit(index: number): void {
    this.blogTopic = this.blogs[index].topic;
    this.blogText = this.blogs[index].message;
    this.changeI = index;
  }

  resetForm(): void {
    this.blogText = '';
    this.blogTopic = '';
    this.name = '';
    this.addr = '';
    this.number = '';
    this.email = '';
    this.pass = '';
  }
  close() {
    this.resetForm();
  }
}
