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
    this.getLomba();
    } ))
  }

  gotoLombaDetail(){
    this.navCtrl.push(LombaDetailPage);
  }

  
  getLomba(){
    var input = {
      id_user: this.id_user
    };
    this.http.post(this.data.BASE_URL+"/getLomba", input).subscribe(data => {
      let response = data.json();
        this.lombaData = response;
        console.log(this.lombaData);
    });
  }

}
