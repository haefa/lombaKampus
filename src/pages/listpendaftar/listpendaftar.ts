import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,  LoadingController } from 'ionic-angular';
import { EditLombaPage } from '../editlomba/editlomba';
import { TeamPendaftarPage } from '../teampendaftar/teampendaftar';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';

/**
 * Generated class for the ListpendaftarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listpendaftar',
  templateUrl: 'listpendaftar.html',
})
export class ListPendaftarPage {
  id_user: number;
  id_lomba: number;
  id_adm: string;
  title: string;
  place: string;

  teams: any;
  team: any;
  lomba: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
  ) {
    let temp = this.navParams.data;
    this.id_lomba = temp.id_lomba;
    this.title = temp.nama_lomba;
    this.place = temp.tempat;

    this.lomba = this.navParams.data;
    console.log(this.lomba);

    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    }
    ))

    this.getPendaftar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListpendaftarPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    let loading = this.loadCtrl.create({
        content: 'loading..'
    });
    loading.present();
    
    this.getPendaftar();
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

  editLomba(temp) {
    this.navCtrl.push(EditLombaPage, temp);
  }

  getPendaftar(){
    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_lomba: this.id_lomba
    };
    this.http.post(this.data.BASE_URL+"/getPendaftar", input).subscribe(data => {
      let response = data.json();
      this.teams = response.list;
      console.log(response);
    });
  }

  getTeam(data) {
    this.navCtrl.push(TeamPendaftarPage, data);
  }

}
