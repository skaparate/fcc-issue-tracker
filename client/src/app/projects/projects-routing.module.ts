import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectEditorComponent } from './project-editor.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor.component';

const routes: Routes = [
  {
    path: '', //'/projects?page&pageSize&pageRange',
    component: ProjectListComponent,
    children: [
      {
        path: 'create',
        component: ProjectEditorComponent,
      },
      {
        // The page and pageSize are the params for the issues pagination.
        path: ':slug?page&pageSize&pageRange',
        component: ProjectComponent,
        children: [
          {
            path: 'edit/:id',
            component: ProjectEditorComponent,
          },
          {
            path: 'issue/create',
            component: IssueEditorComponent,
          },
          {
            path: 'issue/:issueId',
            component: IssueComponent,
            children: [
              {
                path: 'edit',
                component: IssueEditorComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
