import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
import { AppCommonModule } from './app-common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation.component';
import { Utils } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgHttpLoaderModule.forRoot(),
    AppCommonModule,
  ],
  providers: [Utils],
  bootstrap: [AppComponent],
})
export class AppModule {}
