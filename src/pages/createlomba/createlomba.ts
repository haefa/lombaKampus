import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { LombakuPage } from '../lombaku/lombaku';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';


@Component({
  selector: 'page-createlomba',
  templateUrl: 'createlomba.html',
})
export class CreateLombaPage {
  title: string;
  description: string;
  category: string;
  campus: string;
  startdate: any;
  enddate:any;
  members: number;
  fee: number;
  id_user: any;
  tnc: string;
  prize: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public file: File,
    public transfer: FileTransfer
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    })
  }

  upload(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
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

    fileTransfer.upload(data, this.data.BASE_URL+"/upload/lomba/"+this.id_user+"_"+this.title+".jpg",file)
      .then((data) => {

      //this.navCtrl.setRoot(LoginPage);
      
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Poster uploaded successfuly',
        message: '',
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

  createLomba(){
    if(this.title && this.description  && this.category && this.campus && this.startdate && this.enddate && this.members 
      && this.fee && this.tnc && this.prize
    ) {

      let loading = this.loadCtrl.create({
        content: 'loading..'
      });

      loading.present();

      //apiPost
      let input = {
        nama_lomba :this.title,
        deskripsi: this.description, 
        tanggal_mulai: this.startdate,
        tanggal_ditutup: this.enddate,
        tempat: this.campus,
        biaya: this.fee,
        max_anggota: this.members,
        kategori: this.category,
        id_user: this.id_user,
        aturan: this.tnc,
        hadiah: this.prize
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/buatLomba",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){         
        this.navCtrl.setRoot(LombakuPage);      
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Creating Lomba',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateLombaPage');
  }

  goTo(){
    this.navCtrl.setRoot(LombakuPage);    
  }

}
