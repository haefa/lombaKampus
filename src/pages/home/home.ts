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

  damin1: any;
  damin2: any;
  bisnis1: any;
  bisnis2: any;
  app1: any;
  app2: any;
  uiux1: any;
  uiux2: any;
  ctf1: any;
  ctf2: any;

  lomba: any;

  list_search: any;
  search = false;


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
    this.getLomba("hack");
    this.getLomba("daming");
    this.getLomba("apps");
    this.getLomba("ui");
    this.getLomba("business");
    this.getLombah();
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    let loading = this.loadCtrl.create({
        content: 'loading..'
    });
    loading.present();
    
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
      } ))
    this.getLomba("hack");
    this.getLomba("daming");
    this.getLomba("apps");
    this.getLomba("ui");
    this.getLomba("business");
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

  lombaDetail(data){
    this.navCtrl.push(LombaDetailPage, data);
  }
  

  getLomba(kategori){
    var input = {
      kategori: kategori
    };
    this.http.post(this.data.BASE_URL+"/getLombaKategori", input).subscribe(data => {
      let response = data.json();
        if(kategori == "daming") {
          this.damin1 = response;
          if(response.length == 0) {
            this.damin1 = undefined
          }
          console.log("daming",response);
        }
        else if(kategori == "business") {
          this.bisnis1 = response;
          if(response.length == 0) {
            this.bisnis1 = undefined
          }
        }
        else if(kategori == "apps") {
          this.app1 = response;
          if(response.length == 0) {
            this.app1 = undefined
          }
        }
        else if(kategori == "ui") {
          this.uiux1 = response;
          if(response.length == 0) {
            this.uiux1 = undefined
          }
        }
        else if(kategori == "hack") {
          this.ctf1 = response
          if(response.length == 0) {
            this.ctf1 = undefined
          }
        }
    });
  }

  getLombah(){
    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
    };
    this.http.post(this.data.BASE_URL+"/getLomba", input).subscribe(data => {
      let response = data.json();
      this.lomba = response;
      console.log("lombahhhhh",response);
    });
  }

  getPhoto(creator,lomba){
    var input = {
      id_user: this.id_user
    };
    this.http.get(this.data.BASE_URL+"/getPhoto/lomba/"+creator+"_"+lomba+".jpg").subscribe(data => {
      let response = data.json();
      if(response.status == 0){
        this.photo = false;
      }
      else {
        this.photo = true;
      }
      console.log("foto",response);
    });
  }

  getItems(ev) {
    this.search=true;

    // Reset items back to all of the items
    this.list_search = this.lomba;

    console.log('list:'+this.list_search);

    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.list_search = this.list_search.filter((item) => {
      //   return (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      this.list_search = this.list_search.filter((data) => {
        return ((data.nama_lomba.toLowerCase().indexOf(val.toLowerCase()) > -1));
      })
    }
    else {
      this.search=false;
      this.getLombah();
    }

    console.log(this.list_search);
    console.log("search="+this.search);
  }

}
