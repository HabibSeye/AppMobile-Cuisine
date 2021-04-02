import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AuthService } from '../../services/auth.service';

import { LoadingController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
    pass: string = '';

    isErrorMail: boolean = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private modal: ModalController,
    private storage: NativeStorage,
    private loading: LoadingController
  ) { }

  ngOnInit() {
  }


  async forgotPassword() {
    const modal = await this.modal.create({
        component: ForgotPasswordComponent,

    });
    return await modal.present();
}

  checkEmail(){
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);

    this.isErrorMail = (regex.test(this.email.trim())) ? false : true;

    }
  async loginForm(){
    const load = await this.loading.create({
      message: 'Please wait...',
  });
    // await load.present();


    this.auth.login(this.email, this.pass).then(async (user: any) => (
    console.log(user),
     await this.storage.setItem('token', user.token),
     await this.storage.setItem('user', user.user),
    this.router.navigate(['/home'])
)).catch(async () => {
   this.email = ''
   this.pass = ''
   this.isErrorMail = true;
   await this.loading.dismiss();
});

  }

}
