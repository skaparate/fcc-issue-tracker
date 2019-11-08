import { Transition } from '@uirouter/angular';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project.component';
import { ProjectsService } from './projects.service';
import { ProjectEditorComponent } from './project-editor.component';

const states = [
  {
    name: 'projects',
    url: '/projects',
    component: ProjectsComponent
  },
  {
    name: 'project',
    url: '/projects/:id',
    component: ProjectComponent,
    resolve: [
      {
        token: 'projectObservable',
        deps: [Transition, ProjectsService],
        resolveFn: (transition: Transition, service: ProjectsService) => {
          const id = transition.params().id;
          console.debug('Transition.params.id:', id);
          return service.byId(id);
        }
      }
    ]
  },
  {
    name: 'newProject',
    url: '/projects/editor',
    component: ProjectEditorComponent
  },
  {
    name: 'editProject',
    url: '/projects/editor/:id',
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
  }
];

export default states;
