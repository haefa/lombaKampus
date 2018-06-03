import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  nama: string;
  nomor_ktm: string;
  universitas: string;
  id_user: number;


  userData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController
  ){
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    this.email = data.email;
    this.nama = data.nama;
    this.universitas = data.universitas;
    this.nomor_ktm = data.no_ktm;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  editProfile(){
    if(this.nama && this.email  && this.universitas && this.nomor_ktm) {

      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        nama :this.nama,
        email: this.email, 
        universitas: this.universitas,
        no_ktm: this.nomor_ktm,
        id_user: this.id_user
      };
      console.log(input);

      this.http.post(this.data.BASE_URL+"/updateAkun",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){         
        this.navCtrl.setRoot(ProfilePage);  
        this.data.login(input,"user");    
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Editing Profile',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }
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
