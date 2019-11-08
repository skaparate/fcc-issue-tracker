import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project.component';
import { ProjectsService } from './projects.service';
import { ProjectEditorComponent } from './project-editor.component';

import { IssuesComponent } from './issues/issues.component';
import states from './projects.states';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectEditorComponent,
    IssuesComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    UIRouterModule.forChild({ states })
  ],

  providers: [ProjectsService],
  bootstrap: []
})
export class ProjectsModule {}
