import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {

  constructor(private userservice: UserService,
              private toastservice: ToastController,
              private loadservice: LoadingController) { }

  ngOnInit() {}

  async reset(event) {
    const loader = await this.loadservice.create({
      message: 'please wait',
      mode: 'ios'
    })
    loader.present()
    this.userservice.forget({email: event.value}).subscribe(async data => {
      if(data.status === 'success') {
        loader.dismiss()
        const toast = await this.toastservice.create({
          message: `reset link sended to ${event.value}`,
          duration: 1000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
      }
    })
  }

}
