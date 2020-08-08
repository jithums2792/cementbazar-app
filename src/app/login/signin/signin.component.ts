import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private userservice: UserService,
              private router: NavController,
              private toastservice: ToastController) { }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      this.userservice.login(this.loginForm.value).subscribe(async data => {
        localStorage.setItem('userid', data.data._id)
        const toast = await this.toastservice.create({
          message: 'login sussessfull',
          duration:2000,
          mode: 'ios'
        })
        await toast.present()
        this.router.navigateForward(['/dashboard'])
      })
    } else {
      const toast = await this.toastservice.create({
        message: 'some fields are missing',
        duration:2000
      })
      await toast.present()
    }
  }

}
