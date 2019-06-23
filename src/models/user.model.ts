import { UserTag } from './user-tag.model';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: Date;
  lineOfServiceId: string;
  branchId: string;
  registrationDate: Date;
  slackId: string;
  userTags?: UserTag[];
}
