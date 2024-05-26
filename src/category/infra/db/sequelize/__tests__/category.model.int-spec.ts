import { DataType, Sequelize } from "sequelize-typescript"
import { CategoryModel } from "../category.model"
import { Category } from "../../../../domain/category.entity"

describe ('CategoryModel Integration Tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [CategoryModel],
      logging: false
    })

    await sequelize.sync({ force: true })
  })

  test ('mapping props', async () => {
    const attributesMap = CategoryModel.getAttributes()
    const attributes = Object.keys(attributesMap)
    expect(attributes).toStrictEqual([
      'category_id',
      'name',
      'description',
      'is_active',
      'created_at',
    ])

    const categoryIdAttr = attributesMap.category_id
    expect(categoryIdAttr).toMatchObject({
      field: "category_id",
      fieldName: "category_id",
      primaryKey: true,
      type: DataType.UUID(),
    })

    const nameAttr = attributesMap.name
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    })

    const descriptionAttr = attributesMap.description
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    })

    const isActiveAttr = attributesMap.is_active
    expect(isActiveAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    })

    const createdAtAttr = attributesMap.created_at
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    })
  })

  test ('create', async () => {
    const arrange = Category.fake().aCategory().build()

    const category = await CategoryModel.create({
      category_id: arrange.category_id.id,
      name: arrange.name,
      description: arrange.description,
      is_active: arrange.is_active,
      created_at: arrange.created_at,
    })

    expect(category.toJSON()).toStrictEqual(arrange.toJSON())
  })
})
