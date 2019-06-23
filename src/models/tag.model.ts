import { TagCategoryConfidence } from './tag-category-confidence.model';

export class Tag {
  id: string;
  categories: TagCategoryConfidence[];
  name: string;
}
