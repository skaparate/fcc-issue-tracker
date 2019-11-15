import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackButtonDirective } from './back-button/back-button.directive';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [BackButtonDirective, BackButtonComponent],
  imports: [FontAwesomeModule, RouterModule, CommonModule],

  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BackButtonDirective,
    BackButtonComponent,
  ],
})
export class AppCommonModule {}
