import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';


@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditProfilePage {
  //deklarasi variabel
  email: string;
  jenis_kelamin: number;
  nama: string;
  nomor_ktm: string;
  universitas: string;
  id_user: number;
  submitted = false;

  userData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http
  ){
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data;
    this.getProfile();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
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

  gotoProfilePage() {
    let loader = this.loadCtrl.create({
      content: "Please wait..",
      duration: 300
    });
    loader.present();
    this.navCtrl.setRoot(ProfilePage);
  }

}
