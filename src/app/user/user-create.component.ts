import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookCollection } from '../book-collection/book-collection';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  userForm_error = '';
  userForm_submitted = false;
  userForm_loading = false;
  user: User;
  rootBookCollections: BookCollection[];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
      this.load();
  }

  load(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      roleAdministrator: '',
      roleUser: '',
      rootBookCollection: ''
    });

    forkJoin(
      this.userService.getRootBookCollectionList()
    )
    .subscribe(([rootBookCollectionList]) => {
      this.rootBookCollections = rootBookCollectionList;

      this.user = new User();
    });
  }

  userForm_onCancel() {
    this.router.navigate(["/user"]);
  }

  userForm_onCreate() {
    this.userForm_submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    this.userForm_loading = true;

    this.user.name = this.userForm.controls.name.value;
    this.user.password = this.userForm.controls.password.value;

    this.user.roles = [];

    if(this.userForm.controls.roleAdministrator.value == true) {
      this.user.roles.push("ADMINISTRATOR");
    }

    if(this.userForm.controls.roleUser.value == true) {
      this.user.roles.push("USER");
    }

    if(this.userForm.controls.rootBookCollection.value != "") {
      this.user.rootBookCollection = new BookCollection();
      this.user.rootBookCollection.id = this.userForm.controls.rootBookCollection.value;
    }

    this.userService.createUser(this.user)
      .pipe(first())
      .subscribe(
          data => {
            this.userForm_error = "";
            this.userForm_loading = false;

            this.router.navigate(["/user"]);
          },
          error => {
              // response body
              this.userForm_error = error.error.code + ": " + error.error.description;
              this.userForm_loading = false;
          });
  }
}
