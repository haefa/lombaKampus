import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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

  photo: any;
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
    this.nama = data.nama;
    this.id_user =  data.id_user;
    this.email = data.email;
    this.nomor_ktm = data.no_ktm;
    this.universitas = data.universitas;
    this.jenis_kelamin = data.jenis_kelamin;
    //this.getPhoto();
    })

}

  getPhoto(){
    var input = {
      id_user: this.id_user
    };
    this.http.get(this.data.BASE_URL+"/getPhoto/profil/"+this.id_user+".jpg").subscribe(data => {
      let response = data.json();
      console.log("foto",response);
        this.data.photo(response);//ke lokal
    });
  }

  getProfile(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

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
      this.data.profile(response);//ke lokal
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
