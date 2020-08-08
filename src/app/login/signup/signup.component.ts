import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public registerForm = new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    scope: new FormControl('user')
  })

  constructor(private userservice: UserService,
              private toastservice: ToastController) { }

  ngOnInit() {}

  async register() {
    if (this.registerForm.valid) {
      this.userservice.register(this.registerForm.value).subscribe(data => console.log(data))
    } else {
      const toast = await this.toastservice.create({
        message: 'some fields are missing..!!',
        duration: 2000
      })
      await toast.present()
    }
  }

}
