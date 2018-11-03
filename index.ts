import 'reflect-metadata';

const DESIGN_PARAMTYPES = 'design:paramtypes'

const Injectable = () => (target: any) => {
  Reflect.getMetadata(DESIGN_PARAMTYPES, target);
}

const Inject = (Foo: any) => (target: any, property: string, index: number) => {
  const metadata = Reflect.getMetadata(DESIGN_PARAMTYPES, target, property) || [];
  metadata[index] = Foo;
  Reflect.metadata(DESIGN_PARAMTYPES, metadata)(target, property);
}

class Person {}
class Male extends Person {}

@Injectable()
class User {

  constructor(public readonly person: Person) {}

  public getInfo(@Inject(Male) man: Male) {
    console.log(man);
  }
}

const Factory = (target: any) => {
  const providers = Reflect.getMetadata(DESIGN_PARAMTYPES, target)
  const args = providers.map((Foo: any) => new Foo());
  return new target(...args);
}

// 一个实例化工厂，对构造函数进行诸如
const user = Factory(User);
console.log(user.person); // Person {}

// 执行 getInfo 方法，并根据依赖进行注入
const argFns = Reflect.getMetadata(DESIGN_PARAMTYPES, user, 'getInfo');
const params = argFns.map((Fn: any) => new Fn());
user.getInfo(...params); // Male {}
