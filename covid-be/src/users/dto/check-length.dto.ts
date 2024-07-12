import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class Length implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return text.length == 9 || text.length == 12;
    }
}

export function CheckLength(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'Length',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: Length,
        });
    };
}