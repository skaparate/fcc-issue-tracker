import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { AppCommonModule } from '../app-common.module';

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

import { PaginationComponent } from '../pagination/pagination.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectListItemComponent,
    ProjectComponent,
    ProjectEditorComponent,
    IssueListComponent,
    IssueListItemComponent,
    IssueComponent,
    IssueEditorComponent,
    PaginationComponent,
  ],
  imports: [UIRouterModule.forChild({ states: states }), AppCommonModule],

  providers: [ProjectsService],
  bootstrap: [],
})
export class ProjectsModule {}
