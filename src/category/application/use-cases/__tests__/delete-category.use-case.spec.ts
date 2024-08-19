import { Category } from '../../../domain/category.entity';
import { CategoryInMemoryRepository } from '../../../infra/db/in-memory/category-in-memory.repository';
import { DeleteCategoryUseCase } from '../../use-cases/delete-category.use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  // TODO: identificar causa de erro
  // it('should throws error when entity not found', async () => {
  //   await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
  //     new InvalidUuidError(),
  //   );

  //   const categoryId = new Uuid();

  //   await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
  //     new NotFoundError(categoryId.id, Category),
  //   );
  // });

  it('should delete a category', async () => {
    const items = [new Category({ name: 'test 1' })];
    repository.items = items;
    await useCase.execute({
      id: items[0].category_id.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
