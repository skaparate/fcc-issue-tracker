import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Project } from './project.model';
import { IssuesService } from './issues/issues.service';
import { Issue } from './issues/issue.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  @Input() projectSlug: string;
  project: Project;
  issues: Issue[];

  constructor(
    private service: ProjectsService,
    private issueService: IssuesService,
    private route: ActivatedRoute
  ) {
    this.projectSlug = this.route.snapshot.params.slug;
    if (!this.projectSlug) {
      throw new Error('No project slug provided');
    }
  }

  ngOnInit() {
    console.debug('Project slug:', this.projectSlug);
    this.service.bySlug(this.projectSlug).subscribe(response => {
      this.project = response;
      console.debug('Read project:', this.project);
      this.issueService.list(this.project.slug).subscribe(issueResponse => {
        this.issues = issueResponse;
      });
    });
  }
}
