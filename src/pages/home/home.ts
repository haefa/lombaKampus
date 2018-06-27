import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LombaDetailPage } from '../lomba-detail/lomba-detail';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id_user: number;
  photo: any;

  lombaData: any;

  constructor(
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    private data: Data
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
      } ))
    this.getLomba("daming");
  }

  gotoLombaDetail(){
    this.navCtrl.push(LombaDetailPage);
  }
  

  getLomba(kategori){
    var input = {
      kategori: kategori
    };
    this.http.post(this.data.BASE_URL+"/getLombaKategori", input).subscribe(data => {
      let response = data.json();
        this.lombaData = response;
        console.log("lomba",this.lombaData[0]);
    });
  }

}
