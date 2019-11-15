import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor/issue-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'create',
    component: ProjectEditorComponent,
  },
  {
    path: ':slug',
    children: [
      {
        path: '',
        component: ProjectComponent,
        children: [
          {
            path: '',
            component: IssueListComponent,
          },
          {
            path: 'new/issue',
            component: IssueEditorComponent,
            pathMatch: 'full',
          },
          {
            path: 'edit/issue/:issueId',
            component: IssueEditorComponent,
          },
          {
            path: 'issue/:issueId',
            component: IssueComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'edit/:id',
    component: ProjectEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
