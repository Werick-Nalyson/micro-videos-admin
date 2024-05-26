import { CategoryFakeBuilder } from '../../domain/category-fake.builder';
import { Category } from '../../domain/category.entity';
import { CategoryInMemoryRepository } from './category-in-memory.repository';

describe('CategoryInMemoryRepository', () => {
  let repository: CategoryInMemoryRepository;
  let category: CategoryFakeBuilder<Category>

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    category = Category.fake().aCategory()
  });

  it('should no filter items when filter object is null', async () => {
    const items = [category.build()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);

    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it('should filter items using filter parameter', async () => {
    const items = [
      category.withName('test').build(),
      category.withName('TEST').build(),
      category.withName('fake').build(),
    ];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, 'TEST');
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('should sort by created_at when sort param is null', async () => {
    const created_at = new Date();

    const items = [
      category.withName('test').withCreatedAt(created_at).build(),
      category.withName('TEST').withCreatedAt(new Date(created_at.getTime() + 100)).build(),
      category.withName('fake').withCreatedAt(new Date(created_at.getTime() + 200)).build(),
    ];

    const itemsSorted = await repository['applySort'](items, null, null);

    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort by name', async () => {
    const items = [
      category.withName('c').build(),
      category.withName('b').build(),
      category.withName('a').build(),
    ];

    let itemsSorted = await repository['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository['applySort'](items, 'name', 'desc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
