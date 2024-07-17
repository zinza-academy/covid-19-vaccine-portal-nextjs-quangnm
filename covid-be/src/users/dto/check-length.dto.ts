import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function CheckLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CheckLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && (value.length === 9 || value.length === 12);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be either 9 or 12 characters long`;
        },
      },
    });
  };
}
