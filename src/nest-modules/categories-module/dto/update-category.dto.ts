import { UpdateCategoryInput } from '@core/category/application/use-cases/update-category/update.category.input';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateCategoryDto extends OmitType(UpdateCategoryInput, ['id']) {}
