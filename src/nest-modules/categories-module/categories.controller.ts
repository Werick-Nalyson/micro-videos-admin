import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from '@core/category/application/use-cases/update-category/update-category.use-case';
import { ListCategoriesUseCase } from '@core/category/application/use-cases/list-categories/list-categories.use-case';
import { DeleteCategoryUseCase } from '@core/category/application/use-cases/delete-category/delete-category.use-case';
import { GetCategoryUseCase } from '@core/category/application/use-cases/get-category/get-category.use-case';

@Controller('categories')
export class CategoriesController {
  @Inject(GetCategoryUseCase)
  private getCategory: GetCategoryUseCase;

  @Inject(ListCategoriesUseCase)
  private listCategories: ListCategoriesUseCase;

  @Inject(CreateCategoryUseCase)
  private createCategory: CreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private updateCategory: UpdateCategoryUseCase;

  @Inject(DeleteCategoryUseCase)
  private deleteCategory: DeleteCategoryUseCase;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategory.execute(createCategoryDto);
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
