import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { NotificationPage } from '../pages/notification/notification';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/editprofile/editprofile';
import { OptionsPage } from '../pages/options/options';
import { ChangePasswordPage } from '../pages/changepassword/changepassword';
import { LombakuPage } from '../pages/lombaku/lombaku';
import { LombaDetailPage } from '../pages/lomba-detail/lomba-detail';
import { CreateLombaPage } from '../pages/createlomba/createlomba';
import { RegisterLombaPage } from '../pages/registerlomba/registerlomba';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../provider/data';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    NotificationPage,
    HomePage,
    TabsPage,
    OnboardingPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    OptionsPage,
    ChangePasswordPage,
    LombakuPage,
    LombaDetailPage,
    CreateLombaPage,
    RegisterLombaPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    NotificationPage,
    HomePage,
    TabsPage,
    OnboardingPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    OptionsPage,
    ChangePasswordPage,
    LombakuPage,
    LombaDetailPage,
    CreateLombaPage,
    RegisterLombaPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data
  ]
})
export class AppModule {}
