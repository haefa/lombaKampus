import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-uploadphoto',
  templateUrl: 'uploadphoto.html',
})
export class UploadPhotoPage {
  id_user: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    private transfer: FileTransfer,
    private file: File,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    })
  }

  //const FileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPhotoPage');
  }

  upload(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI, //FILE URI itu buat image aseli
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      // this.img = 'data:image/jpeg;base64,' + result;
      this.postPhoto(result);

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      
      // this.img = 'data:image/jpeg;base64,' + imageData;
      this.postPhoto(imageData);
      
      }, (err) => {

    });
  }


  postPhoto(data){
    // alert(data);
    // alert("token" + this.token);
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    
    // api
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let file: FileUploadOptions = {
      fileKey: 'img',
      fileName: this.id_user,
      mimeType: "image/jpeg",
    }

    fileTransfer.upload(data, this.data.BASE_URL+"/upload/profil/{{this.id_user}}.jpg",file)
      .then((data) => {



      this.navCtrl.setRoot(LoginPage);
      
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Update Foto Berhasil',
        message: 'Harap login kembali.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
        alert.present();    
      console.log("tak error");
      // this.ionViewWillEnter();
    }, (err) => {
      console.log("er-0",err);
      loading.dismiss();
      //alert( JSON.stringify(err));
    });
     
  }

}
