---
title: "对Math.random()方法的解析"
layout: post
date: 2017-03-06 20:20
image: /assets/images/markdown.jpg
headerImage: false
tag:
- JavaScript
star: true
category: blog
author: Listen
description: 
---

Math.random()会产生一个0~1之间的伪随机数，其取值范围[0,1)，包括0不包括1。如果想获取一个在m~n范围内的随机整数，则在边界处的取值就会比麻烦。设 a = n - m

[m,n):
{% highlight javascript %}
//step1:
	Math.random()*a;	//[0,a)
//step2:
	Math.random()*a + m;	//[m,n)
//step3:
	parseInt(Math.random()*a + m)	//[m,n)之间的整数
//or:
	Math.floor(Math.random()*a + m)	//[m,n)之间的整数
{% endhighlight %}
(m,n]:
{% highlight javascript %}
//step1:
	Math.random()*a;	//[0,a)
//step2:
	Math.random()*a + m + 1;	//[m+1,n+1)
//step3:
	Math.floor(Math.random()*a + m + 1)  //[m+1,n+1) 即(m,n]之间的整数
{% endhighlight %}
(m,n):
{% highlight javascript %}
//step1:
	b = n - m - 2;
//step2:
	Math.random()*b;	//[0,b)
//step3:
	Math.random()*b + m + 1;	//[m + 1,n - 1)
//step3:
	Math.ceil(Math.random()*a + m + 1)  //[m + 1,n - 1] 即(m,n)之间的整数
//or:
	Math.round(Math.random()*a + m + 1)  //[m + 1,n - 1] 即(m,n)之间的整数
{% endhighlight %}
[m,n]:
{% highlight javascript %}
//step1:
	Math.random()*a;	//[0,a)
//step2:
	Math.random()*a + m;	//[m,n)
//step3:
	Math.floor(Math.random()*a + m)  //[m,n] 之间的整数
//or:
	Math.ceil(Math.random()*a + m)  //[m,n] 之间的整数
{% endhighlight %}