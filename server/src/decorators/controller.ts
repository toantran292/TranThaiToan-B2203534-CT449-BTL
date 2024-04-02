export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);
  }
}
