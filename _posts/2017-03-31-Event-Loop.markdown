---
title: "EventLoop"
layout: post
date: 2017-03-31 10:20
image: /assets/images/markdown.jpg
headerImage: false
tag:
- JavaScript
star: true
category: blog
author: Listen
description: 
---
我们都知道<code class="mycode">JavaScript</code>是单线程语言，同一时间只能做同一件事。有过前端编程经验的人都知道对于像Ajax等异步操作JS并不是并不是一直处于等待结果的返回，而是会发出请求后继续处理后面的任务，等请求结果返回后才去执行回调函数。那么JS内部是怎样处理各项任务的那？

## 主线程与任务队列
在JS运行时，会有一个且只有一个主线程。所有的同步任务都会在主线程上依次执行。主线程的任务处理中可能会有<code class="mycode">ajax,setTimeout,setInterval</code>等异步执行操作。此时主线程会将这些操作挂起，让浏览器的线程去处理这些异步操作，主线程则会继续执行下面的同步任务。当这些异步操作处理完成后，会触发相应的事件，并会将对应的事件添加到任务队列中。“任务队列”是一个事件队列，并且遵循先进先出的原则。当主线的同步任务执行完毕后，就会读取任务队列中的事件，将事件添加到执行栈中，并执行事件对应的回调函数，也就是被主线程挂起的代码。当执行栈空后，主线程会继续读取任务队列中的事件，这个过程是循环不断的，因此这种机制称为事件循环（Event Loop）。

## 定时器
JS中可以通过<code class="mycode">setTimeout,setInterval</code>等操作对代码的运行时间进行控制，如：
{% highlight javascript %}
console.log(1);
setTimeout(function(){console.log(2)},1000);
console.log(3);
//1 3 2
{% endhighlight %}
如果将setTimeout的时间设为0，也就是立即执行的意思，结果又是多少那？
{% highlight javascript %}
console.log(1);
setTimeout(function(){console.log(2)},0);
console.log(3);
//1 3 2
{% endhighlight %}
结果依然是1,3,2。因为setTimeout属于异步操作，其触发的事件会被推到任务队列中，而主线程总是在同步任务都结束后采取任务队列中读取事件并执行对应的回调函数。

## 对“挂起”的理解
同步任务总是在异步任务之前执行，这点确定无误。由此阮一峰老师的博客中指出：
{% highlight javascript %}
    var req = new XMLHttpRequest();
    req.open('GET', url);    
    req.onload = function (){};    
    req.onerror = function (){};    
    req.send();
{% endhighlight %}
这是一个异步任务，onload与onerror总是在send之后执行，所以此代码等同于：
{% highlight javascript %}
    var req = new XMLHttpRequest();
    req.open('GET', url);    
    req.send();
    req.onload = function (){};    
    req.onerror = function (){};    
{% endhighlight %}
刚开始想的根据前面学习的知识也确实如此，不过又想起js动态载入图片的写法：
{% highlight javascript %}
 var img = new Image();
 img.onload = function () {};
 img.src = "logo.jpg";    
{% endhighlight %}
这是大家公认的写法，对onload的赋值必须要在对src赋值的前面。因为如果存在图片缓存的话，触发onload事件会很快，此时onload可能还未指定。但是根据事件循环的知识，他们谁前谁后并不影响结果。如果src在前，因为指定src后回去请求图片资源，然后继续运行onload的赋值操作。等图片请求完毕，会将onload事件推进任务队列中，然后主线程执行onload对应的回调函数，而此时onload的赋值是同步任务，其必定是被指定过的。

那么问题就来了，当主线程从任务队列中将事件推进执行栈执行其相应的回调函数到底执行的是什么时候的代码？是异步任务开始的代码还是主线程执行完后的代码？看下面的代码：
{% highlight javascript %}
var a = function(){
	console.log(1);
}    
setTimeout(a,1000);
// 1
{% endhighlight %}
在setTimeout之前指定回调函数，执行的是之前指定的代码。
{% highlight javascript %}  
setTimeout(a,1000);
var a = function(){
	console.log(1);
}
{% endhighlight %}
这段代码是没结果的，及并没有执行回调函数。因为在<code class="mycode">setTimeout</code>运行时a的值试undefined。<attention>但是</attention>，对于set Timeout的回调陷入了一个误区，<code class="mycode">setTimeout</code>的回调函数是作为参数传入的，当然就必须在传入之前指定。<code class="mycode">setTimeout</code>会触发timeout事件，在这个事件之前定义回调函数即可。

下面说回Ajax中的<code class="mycode">send</code>方法。根据朴灵评注所说，该调用其实有一个默认的回调函数，在这个默认的回调函数中会去检查状态，然后决定执行onload还是onerror，所以在这个回调函数执行前指定两个属性即可。所以说如果响应过快，快到执行回调函数时属性还没有指定，那么返回的数据将被忽略掉。这样也就解释了动态添加图片的问题。

所以并不存在什么“挂起”不“挂起”的。只要在产生事件之前指定了回调函数即可，在产生事件之后指定的回调函数将被忽略。
