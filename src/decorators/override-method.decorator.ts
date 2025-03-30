export const Override =
  (): MethodDecorator =>
  (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const methodName = propertyKey as string;
    const parentPrototype = Object.getPrototypeOf(target);

    if (!parentPrototype || !(methodName in parentPrototype)) {
      throw new Error(
        `Method "${methodName}" does not override any method in the base class.`
      );
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return originalMethod.apply(this, args);
    };
  };
