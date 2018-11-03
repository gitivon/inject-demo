import 'reflect-metadata';

const Injectable = () => (target: any) => {
  Reflect.getMetadata('design:paramtypes', target);
}

class Person {}

@Injectable()
class User {

  constructor(public readonly person: Person) {}
}

const Factory = (target: any) => {
  const providers = Reflect.getMetadata('design:paramtypes', target)
  const args = providers.map((Foo: any) => new Foo());
  return new target(...args);
}

// 注入器添加 Provider，相当于 module 配置里的 providers
const providers = [Person];

// 一个实例化工厂
const user = Factory(User);

console.log(user.person);