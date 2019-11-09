import { Transition } from '@uirouter/angular';
import { ProjectListComponent } from './project-list.component';
import { ProjectComponent } from './project.component';
import { ProjectsService } from './projects.service';
import { ProjectEditorComponent } from './project-editor.component';
import { IssueComponent } from './issues/issue.component';
import { IssueEditorComponent } from './issues/issue-editor.component';

const states = [
  {
    name: 'projects',
    url: '/projects',
    component: ProjectListComponent
  },
  {
    name: 'projects.project',
    url: '/:slug',
    component: ProjectComponent,
    resolve: [
      {
        token: 'projectSlug',
        deps: [Transition],
        resolveFn: (transition: Transition) => {
          const slug = transition.params().slug;
          console.debug('projects.project.slug:', slug);
          return slug;
        }
      }
    ],
    children: {}
  },
  {
    name: 'projects.create',
    url: '/create',
    component: ProjectEditorComponent
  },
  {
    name: 'projects.edit',
    url: '/edit/:id',
    component: ProjectEditorComponent,
    resolve: [
      {
        token: 'projectId',
        deps: [Transition],
        resolveFn: (transition: Transition) => {
          const id = transition.params().id;
          console.debug('Transition.params.id:', id);
          return id;
        }
      }
    ]
  },
  {
    name: 'projects.project.issueCreate',
    url: '/issue/create',
    component: IssueEditorComponent
  },
  {
    name: 'projects.project.issue',
    url: '/issue/:issueId',
    component: IssueComponent,
    resolve: [
      {
        token: 'issueId',
        deps: [Transition],
        resolveFn: (transition: Transition) => {
          const issueId = transition.params().issueId;
          return issueId;
        }
      }
    ]
  },
  {
    name: 'projects.project.issue.edit',
    url: '/edit',
    component: IssueEditorComponent
  }
];

export default states;
