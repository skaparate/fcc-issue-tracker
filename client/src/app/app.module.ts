import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
import { AppCommonModule } from './app-common.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation.component';
import { Utils } from './utils';

const states = [
  {
    name: 'app',
    redirectTo: 'app.home',
    component: AppComponent,
  },
  {
    name: 'app.home',
    url: '/',
    component: HomeComponent,
  },
  {
    name: 'app.about',
    url: '/about',
    component: AboutComponent,
  },
  {
    name: 'projects.**',
    url: '/projects',
    loadChildren: () =>
      import('./projects/projects.module').then(m => m.ProjectsModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    UIRouterModule.forRoot({ states }),
    HttpClientModule,
    BrowserModule,
    NgHttpLoaderModule.forRoot(),
    AppCommonModule,
  ],
  providers: [Utils],
  bootstrap: [AppComponent],
})
export class AppModule {}
