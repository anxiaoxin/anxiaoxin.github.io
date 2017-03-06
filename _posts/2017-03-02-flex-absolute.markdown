---
title: "不同浏览器下Flex对于absolute子元素表现不一致"
layout: post
date: 2017-03-02 21:34
image: /assets/images/markdown.jpg
headerImage: false
tag:
- CSS
star: true
category: blog
author: Listen
description: 
---


在使用Flex布局时遇到了一个问题：将父元素display设为flex，position设为relative，并且子元素设为居中，当子元素position为absolute时，FF和Chrome表现不一致，代码如下：
#### CSS:
{% highlight css %}
		.container{
			display: flex;
			justify-content: center;
			position: relative;
		}
		.item1{
			background-color: pink;
			width: 200px;
		}
		.item2{
			background-color: gray;
			position: absolute;
			width: 100px
		}
{% endhighlight %}
#### HTML:
{% highlight html %}
	<div class="container">
		<div class="item1">
			我是item1	
		</div>
		<div class="item2">
			我是item2
		</div>
	</div>
{% endhighlight %}
item2的是absolute定位，脱离了文档流。在不设定偏移属性值的情况下其所在的位置应该不变。
下图所示的是在FF下显示的结果：
![ff]({{site.url}}/assets/postImg/ff.jpg)

item1是水平居中的，item2紧跟其后，这样解析貌似是对的，因为item2本来就在item1的后面，只是不再与item1一起居中了而已。

#### Chrome下显示的结果：
![chrome]({{site.url}}/assets/postImg/chrome.jpg)

在Chrome下item1与item2同时居中，并且相互不影响！感觉貌似在计算居中左右间距时分别对item1与item2计算了两次。

至于为什么会有这样的差异，应该是两者底层解析的不同，两者对于flex布局实现的方式也不同吧。至于具体原因，查了很多资料也没有直接的描述，并没有找到答案~。经过测试，IE11与Chrome表现相同，Safari，微信内置浏览器与FF表现相同。<i class="fa fa-smile-o fa-lg"></i>