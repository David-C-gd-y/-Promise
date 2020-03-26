      //父类型
       function Person(name, age) {
           this.name = name,
           this.age = age,
           this.play = [1, 2, 3]
           this.setName = function () { }
       }
       Person.prototype.setAge = function () { }
       //子类型
       function Student(price) {
           this.price = price
           this.setScore = function () { }
       }
       Student.prototype = new Person() // 子类型的原型为父类型的一个实例对象， 继承父类
       Student.prototype.sayHello = function () { // 只能继承了 父类才能添加原型方法，否则会被覆盖掉
           console.log('hello')
       }
       var s1 = new Student(15000)
       var s2 = new Student(14000)
       console.log(s1.play)
       console.log(s2.play)

       /**
        优点： 父类上面新增的原型方法，或者原型属性 都能访问到;
                简单，容易实现；
        副作用： 没办法 继承多个父类
              继承的父类 实例属性有引用类型，会被所有子类的实例引用
              没办法 向父类构造函数传参
              原型方法和原型属性，需要在继承之后添加
        */