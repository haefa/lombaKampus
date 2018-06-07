import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';


@Component({
  selector: 'page-uploadphoto',
  templateUrl: 'uploadphoto.html',
})
export class UploadPhotoPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPhotoPage');
  }

  upload(){
    
  }

}
