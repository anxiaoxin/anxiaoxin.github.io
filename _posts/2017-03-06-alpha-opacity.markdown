---
title: "CSS3透明度解析"
layout: post
date: 2017-03-06 19:06
image: /assets/images/markdown.jpg
headerImage: false
tag:
- CSS
star: true
category: blog
author: Listen
description: 
---

<p>在CSS3中设置透明度的方法有三种，rgba，opacity，transparent。虽然都是设定透明度，但是三者还是有不同之处。</p>

<p>rgba(r,g,b,a)是带有alpha通道的颜色设定方法,alpha是用来记录图像中的透明度信息，其表示的是不透明度，取值范围为
0~1。值越大表示的是越不透明。</p>

<p>opacity也是表示的不透明度，取值为0.0~1.0或者inherit（继承），越大表示越不透明。</p>

<p>从两者的取值就可以看到区别，opacity是可以继承的，即如果不设定改属性，则会继承自父亲该属性的值。因此，使用rgba设定的透明度只适用于目标属性，并不会影响到其子元素，而使用opacity设定的透明度则其后代元素变现出与其一样的效果。</p>

![ff]({{site.url}}/assets/postImg/2017-3-6/color.jpg)

<p>上图body的背景色为粉色。第一个元素是背景为黄色，前景色为红色，并没有设定透明度。</p>
<p>第二个元素设定rgba(255,255,0,0.2),背景色为红色，不透明度为0.2，前景色为红色。</p>
<p>第三个元素设定背景色为红色，opacity：0.2,前景色为红色。</p>
<p>第四个元素背景色为transparent，前景色为红色。可以看出，将背景色设定为transparent则背景完全透明，其实该值相当于设定了元素rgba(0,0,0,0),即黑色完全透明。在CSS1中该值被用来作为background-color的一个参数值，用于表示背景透明。在CSS2中，border-color也开始接受transparent作为参数值。在CSS3中，transparent被延伸到任何一个有color值的属性上。</p>
