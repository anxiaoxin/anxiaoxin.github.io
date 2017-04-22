---
title: "JS内存泄漏"
layout: post
date: 2017-03-17 10:20
image: /assets/images/markdown.jpg
headerImage: false
tag:
- JavaScript
star: true
category: blog
author: Listen
description: 
---
## 什么是内存泄漏
内存泄漏就是当变量不在使用时，由于某些原因其占用的内存并没有被系统回收，从而一直占用着内存，造成内存泄漏。

## JS中常见的垃圾回收机制：标记清除（个人理解阐述）
当垃圾回收机制运行时会对内存中的所有变量加上标记（可以是任何标记方法），然后把环境中的变量以及被环境中变量引用的变量上的标记去掉，
此时被标记的是不在使用的变量的，没有被标记的是使用中的变量。如果变量被再次进行了标记，则意味着其不在被环境所使用，因此可以删除，之后垃圾收集器会完成内存清除工作。

## JS常见的内存泄漏
#### 全局变量
如下面这样在函数中不对变量进行声明的情况，会默认为是全局变量。
{% highlight javascript %}
	function haha(){
		lala = 1;
	}
	haha();
	window.lala == 1;//true
{% endhighlight %}
同样在函数中使用this意外创建全局变量。
{% highlight javascript %}
	function haha(){
		this.lala = 1;
	}
	haha();
	window.lala == 1;//true
{% endhighlight %}
对于此类问题可以使用JS中的严格模式进行避免，对于严格模式可以移步。

#### 指定的DOM事件
{% highlight javascript %}
document.getElementById("test").onclick = function(){
		console.log("haha");
}
{% endhighlight %}
代码中为id为text的元素指定了点击事件，当该元素被移除或替换时，该事件依然存在。所以在移除节点时最好手动的将指定在其上
的方法赋值为null或者使用事件委托。

#### 子元素存在引用
{% highlight HTML %}
<div>
	<ul>
		<li></li>
	</ul>
</div>
{% endhighlight %}
{% highlight javascript %}
var a = document.querySelector("ul");
var b = document.querySelector("li");
{% endhighlight %}
a是b的父元素，b是a的子元素，他们之间通过children,parentNode等相互连接，不管是将两者
中的哪一个的值设为null，其在内存中都存在引用，都会一直存在。所以需要将两者的值都设为null。
#### 闭包
闭包就是在函数的外部存在着对函数内部变量的引用，这就使闭包中的变量会一直存在于内存中。而我们之所以使用闭包就是
因为闭包的这一特性。

#### 对象间的引用
{% highlight javascript %}
var a = {b:{c:1}};
var d = a.b;
delete a.b;
d;//{c:1}
{% endhighlight %}
对于这种情况需要的是循环遍历a对象删除其内部属性。