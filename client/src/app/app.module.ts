import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation.component';
import { ProjectsModule } from './projects/projects.module';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';
import { ModalBodyComponent } from './modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalFooterComponent } from './modal/modal-footer/modal-footer.component';
import Utils from './utils';

const states = [
  {
    name: 'home',
    url: '/',
    component: HomeComponent
  },
  {
    name: 'about',
    url: '/about',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    Breadcrumbs,
    ModalBodyComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    AboutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsModule,
    FontAwesomeModule,
    UIRouterModule.forRoot({ states }),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [Utils],
  bootstrap: [AppComponent]
})
export class AppModule {}
