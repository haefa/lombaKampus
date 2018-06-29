import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ListjoinedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listjoined',
  templateUrl: 'listjoined.html',
})
export class ListJoinedPage {
  id_lomba: number;
  id_adm: number;
  id_user: any;
  title: string;
  email: string;
  team: string;

  payment = true;
  conf = false;
  members: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public camera: Camera,
    public transfer: FileTransfer,
    public file: File,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
      this.getStatusBayar();
    }
    
    ))

    console.log("pertana : ", this.id_user);

    let temp = this.navParams.data;
    this.id_lomba = temp.id_lomba;
    this.id_adm = temp.id_adm;
    this.title = temp.nama_lomba;
    this.team = temp.nama_tim;

    if(temp.id_lomba == undefined){
      this.id_lomba = temp[0];
    this.id_adm = temp[1];
    this.title = temp[2];
    }

    this.confirm();
    this.getStatusBayar();
    this.getAnggota();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListjoinedPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    let loading = this.loadCtrl.create({
        content: 'loading..'
    });
    loading.present();
    
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
      this.getStatusBayar();
    }
    
    ))

    console.log("pertana : ", this.id_user);

    let temp = this.navParams.data;
    this.id_lomba = temp.id_lomba;
    this.id_adm = temp.id_adm;
    this.title = temp.nama_lomba;
    this.team = temp.nama_tim;

    if(temp.id_lomba == undefined){
      this.id_lomba = temp[0];
    this.id_adm = temp[1];
    this.title = temp[2];
    }

//    this.getStatusBayar();
    this.getAnggota();
    loading.dismiss();

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
        }
        ,{
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

    fileTransfer.upload(data, this.data.BASE_URL+"/upload/lomba/"+this.id_lomba+"_"+this.id_adm+".jpg",file)
      .then((data) => {

      //this.navCtrl.setRoot(LoginPage);
      
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Update Foto Berhasil',
        message: '',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.payment = true;
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

  getAnggota(){
    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_adm: this.id_adm
    };
    this.http.post(this.data.BASE_URL+"/getAnggota", input).subscribe(data => {
      let response = data.json();
      this.members = response.list;
      console.log("member",response);
    });
  }

  getStatusBayar(){

    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_ketua: this.id_user,
      id_lomba: this.id_lomba,
    };

    this.http.post(this.data.BASE_URL+"/getStatusBayar", input).subscribe(data => {
      let response = data.json();
      if(response.message == 0){
        this.conf = false;
      }
      else{
        this.conf = true;
      }
      console.log("output:",response);
    });

  }

  confirm(){
    this.http.get(this.data.BASE_URL+"/getPhoto/lomba/"+this.id_lomba+"_"+this.id_adm+".jpg").subscribe(data => {
      let response = data.json();
      if (response.status == 0){
        this.payment = false;
      }
      else {
        this.payment = true;
      }
      console.log("payment:",this.payment);
    });
  }

  addMembers() {
    let alert = this.alertCtrl.create({
      title: 'Add Members',
      message: 'Enter an email to add a member.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log(data.email);
            let input = {
              id_adm: this.id_adm, 
              email : data.email,
            };
            console.log(input);
            this.http.post(this.data.BASE_URL+"/tambahAnggota", input).subscribe(data => {
              let response = data.json();
                console.log("keluaran: ",input);

                this.navCtrl.push(ListJoinedPage, [this.id_lomba, this.id_adm, this.title]);
            });
          //this.data.addMembers();
          //this.app.getRootNav(ListJoinedPage);
          }
        }
      ]
    });
    alert.present();
  }


}
