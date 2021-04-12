import { Component, OnInit } from '@angular/core';




import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



import { UserRegister } from '../../interfaces/user-register';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss', './register.page.scss'],
})
export class RegisterPage implements OnInit {

  isErrorMail: boolean = true;
    isErrorPhone: boolean = true;
    user: UserRegister = { avatar: '', first_name: '', last_name: '', email: '', phone: '', password: '', confirm_password: '' };

  constructor(
    private camera: Camera
  ) { }

  ngOnInit() {}
  uploadPicture() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        alert(imageData)
    }, (err) => {
        // Handle error
        alert(err)
    });
}

}
