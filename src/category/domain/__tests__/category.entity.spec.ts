import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe ('Category Unit Tests', () => {
  const validateSpy = jest.spyOn(Category, 'validate')

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie'
    })

    category.changeName('other name')

    expect(category.name).toBe('other name')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('should change description', () => {
    const category = Category.create({
      name: 'Movie'
    })

    category.changeDescription('other description')

    expect(category.description).toBe('other description')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('should active a category', () => {
    const category = Category.create({
      name: 'Movie',
      is_active: false
    })

    category.activate()

    expect(category.is_active).toBe(true)
  })

  test('should disable a category', () => {
    const category = Category.create({
      name: 'Movie',
      is_active: true
    })

    category.deactivate()

    expect(category.is_active).toBe(false)
  })

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ]

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  describe('constructor', () => {
    test('should create a category with default values', () => {
      // triple A (AAA) = Arrange Act Assert
      const category = new Category({
        name: 'Movie'
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a category with all values', () => {
      const created_at = new Date()

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })
  })

  describe ('Create command', () => {
    test('should create a category', () => {
        const category = Category.create({
          name: 'Movie'
        })

        expect(category.category_id).toBeInstanceOf(Uuid)
        expect(category.name).toBe('Movie')
        expect(category.description).toBeNull()
        expect(category.is_active).toBeTruthy()
        expect(category.created_at).toBeInstanceOf(Date)
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a category with all values', () => {
      const created_at = new Date()

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })
  })
})
