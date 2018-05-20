import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EditProfilePage } from '../editprofile/editprofile';
import { OptionsPage } from '../options/options';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  email: string;
  jenis_kelamin: number;
  nama: string;
  nomor_ktm: string;
  universitas: string;
  id_user: number;

  userData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data;

    this.getProfile();
    })

}

  getProfile(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    let input = {
      id_user: this.id_user, 
    };
    this.http.post(this.data.BASE_URL+"/getProfile",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.userData = response;
        this.universitas = response.universitas;
        this.nomor_ktm = response.nomor_ktm;
        this.email = response.email;
        this.nama = response.nama;
      console.log(this.userData); 
        
      }
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.data.getData);
  }

  gotoEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  gotoOptionsPage() {
    this.navCtrl.push(OptionsPage);
  }

}
