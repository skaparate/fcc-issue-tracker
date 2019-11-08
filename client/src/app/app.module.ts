import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation.component';
import { ProjectsModule } from './projects/projects.module';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';

const states = [
  {
    name: 'home',
    url: '/',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [AppComponent, NavigationComponent, HomeComponent, Breadcrumbs],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ProjectsModule,
    FontAwesomeModule,
    UIRouterModule.forRoot({ states }),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
