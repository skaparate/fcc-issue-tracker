export class Project {
  name: string;
  slug: string;
  owner: string;
  issueCount: number;
  createdOn: Date;
  updatedOn: Date;

  constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
  }
}