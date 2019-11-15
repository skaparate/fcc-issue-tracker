import { Project } from '../project.model';

export class ProjectList {
  data: Project[];
  total: number;

  constructor(data = [], total = 0) {
    this.data = data;
    this.total = total;
  }
}
