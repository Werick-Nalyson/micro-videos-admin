import { Category } from "../category.entity"

describe ('Category Unit Tests', () => {
  test('should change name', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.changeName('other name')

    expect(category.name).toBe('other name')
  })

  test('should change description', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.changeDescription('other description')

    expect(category.description).toBe('other description')
  })

  test('should active a category', () => {
    const category = new Category({
      name: 'Movie',
      is_active: false
    })

    category.activate()

    expect(category.is_active).toBe(true)
  })

  test('should disable a category', () => {
    const category = new Category({
      name: 'Movie',
      is_active: true
    })

    category.deactivate()

    expect(category.is_active).toBe(false)
  })

  describe('constructor', () => {
    test('should create a category with default values', () => {
      // triple A (AAA) = Arrange Act Assert
      const category = new Category({
        name: 'Movie'
      })

      expect(category.category_id).toBeUndefined()
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

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })
  })

  describe ('Create command', () => {
    test('should create a category', () => {
        const category = new Category({
          name: 'Movie'
        })

        expect(category.category_id).toBeUndefined()
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

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })
  })
})
