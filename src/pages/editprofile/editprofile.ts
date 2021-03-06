import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController, App } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { UploadPhotoPage } from '../uploadphoto/uploadphoto';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditProfilePage {
  //deklarasi variabel
  email: string;
  nama: string;
  nomor_ktm: string;
  universitas: string;
  id_user: any;
  handphone: string;


  userData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public app: App
  ){
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    this.email = data.email;
    this.nama = data.nama;
    this.universitas = data.universitas;
    this.nomor_ktm = data.no_ktm;
    this.handphone = data.no_hp;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  editProfile(){
    if(this.nama && this.email  && this.universitas && this.nomor_ktm) {

      let loading = this.loadCtrl.create({
        content: 'loading..'
      });

      loading.present();

      //apiPost
      let input = {
        id_user: this.id_user,
        nama :this.nama,
        email: this.email, 
        universitas: this.universitas,
        no_ktm: this.nomor_ktm,
        no_hp: this.handphone
      };
      console.log("profil : ",input);

      this.http.post(this.data.BASE_URL+"/updateAkun",input).subscribe(data => {
      let response = data.json();
      console.log("response: ",response); 
      if(response.status==1){         
        this.navCtrl.setRoot(ProfilePage);  
        this.data.login(input,"user");    
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Editing Profile',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }
  }

  gotoProfilePage() {
    let loader = this.loadCtrl.create({
      content: "Please wait..",
      duration: 300
    });
    loader.present();
    this.navCtrl.setRoot(ProfilePage);
  }

  uploadphoto() {
    this.navCtrl.push(UploadPhotoPage);
  }

  upload(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Take New Photo',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose from Gallery',
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
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    
    // api
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let file :FileUploadOptions = {
      fileKey: 'img',
      fileName: this.id_user,
      mimeType: "image/jpeg",
    }

    fileTransfer.upload(data, this.data.BASE_URL+"/upload/profil/"+this.id_user+".jpg",file)
      .then((data) => {



      //this.navCtrl.setRoot(LoginPage);
      
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Update Foto Berhasil',
        message: 'Harap login kembali.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Agree clicked');
              this.data.logout();  //hapus storage cache local  
              this.app.getRootNav().setRoot(LoginPage);
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
