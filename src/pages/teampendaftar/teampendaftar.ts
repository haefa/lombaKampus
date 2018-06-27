import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the TeampendaftarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teampendaftar',
  templateUrl: 'teampendaftar.html',
})
export class TeamPendaftarPage {
  id_adm: number;
  members: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public camera: Camera,

  ) {
    this.id_adm = this.navParams.data;
    this.getAnggota();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeampendaftarPage');
  }

  getAnggota(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
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
      console.log(response);
    });
  }

}
