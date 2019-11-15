import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationStart, Router } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectEditorComponent } from './project-editor.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor.component';

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
    component: ProjectComponent,
    children: [
      {
        path: 'issue/create',
        component: IssueEditorComponent,
      },
      {
        path: 'issue/edit/:issueId',
        component: IssueEditorComponent,
      },
      {
        path: 'issue/:issueId',
        component: IssueComponent,
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
