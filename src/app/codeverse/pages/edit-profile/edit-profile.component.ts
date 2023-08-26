import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  form: FormGroup;
  user: any;

  constructor(
    private fetchService: FetchService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.user = JSON.parse( localStorage.getItem('user')! )
    console.log(this.user);
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastname: ['', Validators.required],
      plan: ['']
    });
    
  }

  onSubmit(){
    let newUser = {
      name: [this.form.controls['name'].value, this.form.controls['lastname'].value].join(' '),
      email: this.form.controls['email'].value
    }
    this.updateUser(newUser)
    console.log(this.user);
  }

  async updateUser(newUserData: any){
    
    await this.fetchService
      .makeRequest(`users/${this.user.id}`, 'PUT', newUserData)  
      .then((response) => {
        this.user = { ...response };
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
