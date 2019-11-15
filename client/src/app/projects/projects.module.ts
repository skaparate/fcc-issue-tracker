import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppCommonModule } from '../app-common.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectListItemComponent } from './project-list/project-list-item.component';
import { ProjectComponent } from './project.component';
import { ProjectsService } from './projects.service';
import { ProjectEditorComponent } from './project-editor/project-editor.component';

import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { IssueListItemComponent } from './issues/issue-list/issue-list-item.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor/issue-editor.component';

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
  imports: [ProjectsRoutingModule, AppCommonModule],
  providers: [
    ProjectsService
  ],
  bootstrap: [],
})
export class ProjectsModule {}
