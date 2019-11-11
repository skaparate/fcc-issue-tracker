import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectListComponent } from './project-list.component';
import { ProjectListItemComponent } from './project-list-item.component';
import { ProjectComponent } from './project.component';
import { ProjectsService } from './projects.service';
import { ProjectEditorComponent } from './project-editor.component';

import { IssueListComponent } from './issues/issue-list.component';
import { IssueListItemComponent } from './issues/issue-list-item.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor.component';
import states from './projects.states';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectListItemComponent,
    ProjectComponent,
    ProjectEditorComponent,
    IssueListComponent,
    IssueListItemComponent,
    IssueComponent,
    IssueEditorComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forChild({ states })
  ],

  providers: [ProjectsService],
  bootstrap: []
})
export class ProjectsModule {}
