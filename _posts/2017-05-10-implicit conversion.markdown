---
title: "Implicit Conversion"
layout: post
date: 2017-05-10 10:20
image: /assets/images/markdown.jpg
headerImage: false
tag:
- JavaScript
star: true
category: blog
author: Listen
description: 
---
在学习函数柯里化的过程中再一次接触到了js中的隐式转化，意识到需要重新学习并总结下这方面的知识点。
隐式转化主要包括以下几种情况：
1. 不同类型值之间的运算
2. 语句中隐藏的类型转换

首先介绍一个特别重要的函数，Number().

## Number()
Number会将其参数转换为数值类型，参数的不同转换的结果也不同。具体的如下：

如果参数本身是数值类型的则直接返回。
{% highlight javascript %}
	Number(1);//1
{% endhighlight %}
如果参数本身是Boolean类型，则会返回1或0
{% highlight javascript %}
	Number(true)//1
	Number(false)//0
{% endhighlight %}
如果参数是null返回0
{% highlight javascript %}
	Number(null)//0
{% endhighlight %}	
如果参数是undefined返回NaN
{% highlight javascript %}
	Number(undefined)//NaN
{% endhighlight %}		
如果参数是字符串。如果只包含数字则转换成正常的数值类型，如果是空字符串转换为0，其它的转换为NaN
{% highlight javascript %}
	Number("123")//123
	Number("")//0
	Number("abc")//NaN
	Number("123a")//NaN
	Number("a123")//NaN
{% endhighlight %}
如果参数对象类型，在高程第三版中指出会首先调用对象的valueOf方法，进行上述判断，如果结果NaN，则调用toString方法，并继续进行上述判断并返回最终结果。在最新版的Chrome和FF中结果确符合Toprimitive(下文讲解)的规则。
{% highlight javascript %}
	var a = {
		valueOf:function(){
		return "abc";
		},
		toString:function(){
			return 1;
		}
	};

	var b = {
		valueOf:function(){
			return {};
		},
		toString:function(){
			return 1;	
		}
	};
	var c = {
		valueOf:function(){
			return {};
		},
		toString:function(){
			return {};
		}
	}
	Number(a)//NaN
	Number(b)//1
	Number(c)//typeError
{% endhighlight %}
## 运算
#### 算数运算符（-、*、/、%）
这些运算符在运算之前将参与运算的双方转换成数字，即使用Number方法转换。
#### + 运算
它比较特殊，以为其既承担这数字相加，还肩负着字符串链接。加法运算符会触发三种类型转换：转换成原始值（undefined，null，number，booleans，string），转换为数字，转换为字符串。对应JS引擎内部的三种抽象操作：toPrimitive(),toNumber(),toString

##### ToPrimitive(input PreferredType?):
1. 如果参数是一个原始值，则直接返回。
2. 如果参数是一个对象则调用对象的valueOf()方法，如果valueOf()方法返回的是原始值则直接返回。
3. 否则调用toString()方法，如果toString()方法返回的是原始值则直接返回
4. 否则抛出typeError异常。
如果PreferredType被标志位String，则上述步骤中的2和3会调换，如果没有该参数，则该值按下列规则设置：
	Date类型的对象会被设置为String，所以在加法中Date类型的运算结果与其它运算符的结果不同。
	其它类型的值会被设置为Number.

##### ToNumber：
同Number()运算结果相同。

##### ToString:
1. undefined -> "undefined"
2. null -> "null"
3. booleans -> "true" "false"
4. number -> 直接转换为字符串
5. string -> 无需转换
6. Object ->先调用ToPrimitive转换为原始值，在调用原始值的toString()方法转换为字符串。
所以加法运算value + value的运算步骤可以总结为：
1. 将两个操作数转换为原始值
2. 如果任意一个操作数的原始值为字符串，则将另一个转换为字符串并返回连接的结果
3. 否则转换为数值类型，返回他们的和。

这里给出几个比较有意思的例子：
{% highlight javascript %}
	[] + []//""
	//将两个数组转换为原始值是数组项的","连接形成的字符串
	//由于两者都是空数组所以结果为空字符串
{% endhighlight %}		
{% highlight javascript %}
	[] + {}//"[object Object]"
{% endhighlight %}		
{% highlight javascript %}
	{} + {}//NaN
	//js引擎会默认将第一个{}解释为空代码块而忽略它，直接运算+{}
	//此时+为一元运算符,将会面的转换为数字
{% endhighlight %}	

#### 一元运算 + ，-
一元加对数值没有任何影响，对于非数值型结果同Number函数转换结果相同。
一元减将数值行转换为赋值，对于非数值型结果同Number函数，并将结果转换为负数。

#### == 运算
规则如下：
1. 如果比较的两者中以后布尔值，则会把布尔值转换为Number然后在进行比较。
2. 如果一方是Number一方是string，则会将string转换为number然后进行比较。
3. 如果一方是Boolean一方是string，则将string转换为boolean然后进行比较。string转换为boolean的规则是除了空字符串外都是true，空字符串为false。
4. 如果一方是对象，则将对象转换为原始值然后进行比较。

## 语句中的隐式转换
#### if，while
语句中会将其参数转换为布尔值。在js中只有空字符串，数字0，null，undefined，false，NaN为假值，除此之外都是真值。
#### alert
如果alert的参数是对象，则会调用alert的toString方法，如果返回值不是原始值，则会调用valueOf方法，如果该方法返回的不是原始值则会宝typeError。
{% highlight javascript %}
	var a = {
		valueOf:function(){
		return 0;
		},
		toString:function(){
			return 1;
		}
	};

	var b = {
		valueOf:function(){
			return 0;
		},
		toString:function(){
			return {};	
		}
	};
	var c = {
		valueOf:function(){
			return {};
		},
		toString:function(){
			return {};
		}
	}
	alert(a) //1
	alert(b) //0
	alert(c) //typeError
{% endhighlight %}	
#### console.log()
console.log()对于方程有特殊的隐式转化。
{% highlight javascript %}
	function zhou(){}
	function xing(){}
	function chi(){}
	function zhi(){}
	function zun(){}
	console.log(zhou)//function(){}

	zhou.valueOf = function(){
		return 1;
	}
	console.log(zhou)//1
	//只设置valueOf方法，则调用该方法的返回值

	xing.toString = function(){
		return 2;
	}
	console.log(xing)//2
	//只设置toString方法，则调用该方法的返回值

	chi.valueOf = function(){
		return 1;
	}
	chi.toString = function(){
		return 2;
	}
	console.log(chi)//1
	//两个方法都设置则调用valueOf

	zhi.valueOf = function(){
		return {};
	}
	zhi.toString = function(){
		return 2;
	}	
	console.log(zhi)//2
	//如果valueOf返回的不是原始值则调用toString方法

	zun.valueOf = function(){
		return {};
	}
	zun.toString = function(){
		return {};
	}	
	console.log(zun)//#<Function>
{% endhighlight %}	
另外，直接写函数名的结果同console.log()结果一致。