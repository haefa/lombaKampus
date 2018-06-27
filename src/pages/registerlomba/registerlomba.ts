import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { LombakuPage } from '../lombaku/lombaku';


@Component({
  selector: 'page-registerlomba',
  templateUrl: 'registerlomba.html',
})
export class RegisterLombaPage {
  team_name: string;
  id_user: number;
  id_lomba = 10;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http,
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterLombaPage');
  }

  joinLomba() {
    let alert = this.alertCtrl.create({
      title: 'Register Lomba',
      message: 'Are you sure that you want to participate this Lomba?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: () => {
            console.log(this.id_lomba);

            let loading = this.loadCtrl.create({
              content: 'memuat..'
            });
      
            loading.present();
            
            setTimeout(() => {
              loading.dismiss();
            }, 5000);
            //apiPost
            let input = {
              id_ketua: this.id_user,
              id_lomba: this.id_lomba,
              nama_tim: this.team_name,
            };
            console.log(input);
            this.http.post(this.data.BASE_URL+"/daftarLomba",input).subscribe(data => {
            let response = data.json();
            console.log(response); 
            if(response.status==1){         
              this.navCtrl.setRoot(LombakuPage);      
              loading.dismiss();
            }
            else {
              loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Failed Register Lomba',      
                  buttons: ['OK']
                });      
            }    
            });
          }
        }
      ]
    });
    alert.present();
  }

}
