# Angular 依赖注入的最简单（简陋）实现demo

Angular 中依赖注入是它最核心的概念，我们可以通过对构造函数参数定义的类型来让服务自动被注入进来

```` ts
@Injectable()
class HeroService {

  constructor(private messageService: MessageService) { }
}
````

看到这里就不禁很好奇，Angular 是如何实现这样的依赖注入的呢？服务从何而来，又是如何根据构造函数参数的类型来进行适配的呢？