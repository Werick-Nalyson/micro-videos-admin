import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";
import { CategoryValidatorFactory } from "./category.validator";

interface CategoryConstructorProps {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
}

interface CategoryCreateCommand {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();

    this.category_id = props.category_id ?? new Uuid()
    this.name = props.name
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date()
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props)

    Category.validate(category)

    return category
  }

  changeName (name: string): void {
    this.name = name
    Category.validate(this)
  }

  changeDescription (description: string): void {
    this.description = description
    Category.validate(this)
  }

  activate (): void {
    this.is_active = true;
  }

  deactivate (): void {
    this.is_active = false;
  }

  static fake () {
    return CategoryFakeBuilder;
  }

  static validate (entity: Category) {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)

    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  get entity_id (): ValueObject {
    return this.category_id
  }

  toJSON () {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
