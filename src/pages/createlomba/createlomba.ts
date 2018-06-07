import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { LombakuPage } from '../lombaku/lombaku';


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
  id_user: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    })
  }

  createLomba(){
    if(this.title && this.description  && this.category && this.campus && this.startdate && this.enddate && this.members && this.fee
    ) {

      let loading = this.loadCtrl.create({
        content: 'memuat..'
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
