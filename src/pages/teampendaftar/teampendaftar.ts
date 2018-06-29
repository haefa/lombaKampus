import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { Camera } from '@ionic-native/camera';
import { InstanceProperty } from '@ionic-native/core';

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
  id_ketua: number;
  id_lomba: number;
  title: string;
  name: string;
  leader: string;
  payment = true;
  conf = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public camera: Camera,

  ) {
    let temp = this.navParams.data;
    this.id_adm = temp[0].id_adm;
    this.id_ketua = temp[0].id_ketua;
    this.name = temp[0].nama_tim;
    this.id_lomba = temp[1];
    this.title = temp[2];
    console.log("kiriman", temp);
    this.getAnggota();
    this.getStatusBayar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeampendaftarPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    let loading = this.loadCtrl.create({
        content: 'loading..'
    });
    loading.present();
    
    
    this.getAnggota();
    this.getStatusBayar();
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
      this.leader = response.nama_ketua;
      console.log("getanggota",response);
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
      id_ketua: this.id_ketua,
      id_lomba: this.id_lomba,
    };

    this.http.post(this.data.BASE_URL+"/getStatusBayar", input).subscribe(data => {
      let response = data.json();
      if (response.message == 0){
        this.conf = false;
      }
      else if (response.message == 1){
        this.conf = true;
      }
      console.log("bayar:",response.message);

      this.http.post(this.data.BASE_URL+"/getPhoto/lomba/"+this.id_lomba+"_"+this.id_adm+".jpg", input).subscribe(data => {
        let response = data.json();
        if (response.status == 0){
          this.payment = false;
        }
        else {
          this.payment = true;
        }
        console.log("bayar:",response.message);
      });
    });
  }

  confirm(){

    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_ketua: this.id_ketua,
      id_lomba: this.id_lomba,
      status_pembayaran: 1,
    };
    console.log(input);
    this.http.post(this.data.BASE_URL+"/updateStatusBayar", input).subscribe(data => {
      let response = data.json();
      if (response == 1){
        this.conf = true;
      }
      this.getStatusBayar();
      console.log("output:",response);
    });
  }

}
