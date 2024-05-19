import { InvalidUuidError, Uuid } from "../uuid.vo"

describe('Uuid Unit Tests', () => {
  let validateSpy: jest.SpyInstance<any, unknown[], any>

  beforeEach(() => {
    validateSpy = jest.spyOn(Uuid.prototype, 'validate' as any)
  })

  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid uuid', () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('1a74a29d-2d6d-49d3-b509-be7c4d499736')

    expect(uuid.id).toBe('1a74a29d-2d6d-49d3-b509-be7c4d499736')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
