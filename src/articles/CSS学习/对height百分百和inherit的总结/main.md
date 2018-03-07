# 对height 100%和inherit的总结

之前看到一篇相关的文章：http://www.zhangxinxu.com/wordpress/2015/02/different-height-100-height-inherit/

在看这个文章的demo时发现一些问题，下面来总结归纳一下:

代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
    <style>
        .outer{
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;;
        }
        .in{
            background: #6aa;
        }
        .full{
            height: 100%;
        }
        .inherit{
            height: inherit;
        }
    </style>
</head>
<body>
<div class = 'outer'>
    <div class = 'in full'>

    </div>
</div>
<div class = 'outer'>
        <div class = 'in inherit'>

        </div>
</div>
</body>
</html>
```

效果大致是这个样子：

![1](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\1.png)

其中，左边的是height 100%，右边的是height inherit。

下面我们进行一下改动：

```html
    <style>
        .outer{
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;;
        }
        .in{
            position: absolute;
            background: #6aa;
            width:100px;
        }
        .full{
            height: 100%;
        }
        .inherit{
            height: inherit;
        }
    </style>
```

其实就是给两个子元素加上绝对定位。效果如图：

![2](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\2.png)

我们发现，100%的元素的高度计算是相对于父元素的了。这也比较容易理解，因为绝对定位的元素，他的计算规则是相对于他最近的position不为static的元素。就算父元素未定位inherit也是相对于直接父元素进行高度计算的。

我们在outer上加上position relative 试一试：

```css
        .outer{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;;
        }
```

![3](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\3.png)

看来确实是这样的，现在100%和inherit效果是一样的.

再对css进行改动：

```css
        .outer{
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;
            box-sizing: border-box;
        }
        .in{
            background: #6aa;
        }
        .full{
            height: 100%;
        }
        .inherit{
            height: inherit;
        }
```

我们给父元素加上了boxsizing border box，让父元素的高度计算规则改变，下面看看效果：

![4](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\4.png)

我们看到 inherit元素的高度变成了父元素的高度，而100%的元素。

我们再给父元素加上padding：

```css
        .outer{
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;
            box-sizing: border-box;
            padding: 10px;
        }
```

效果图：

![5](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\5.png)

可以看到inherit的高度会与父元素的高度相等，而100%的高度会与父元素content相等。

下面我们给子元素加上绝对定位看看：

```css
        .outer{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;
            box-sizing: border-box;
            padding: 10px;
        }
        .in{
            left: 0;
            top: 0;
            position: absolute;
            width: 50px;
            background: #6aa;
        }
        .full{
            height: 100%;
        }
        .inherit{
            height: inherit;
        }
```

效果图：

![6](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\6.png)

我们看到，当加上绝对定位时，100%的子元素的高度为：父元素的（content + padding），而inherit的高度就是等于父元素的border-box高度。

下面我们将父元素outer的borde -box 改回去：

```css
        .outer{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;
            /* box-sizing: border-box; */
            padding: 10px;
        }
```

效果图：

![7](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\7.png)

可以看到，inherit的高度变为父元素content-box的高度。

下面看一看固定定位：

```css
        .outer{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            background: #400;
            border: 10px solid #444;
            /* box-sizing: border-box; */
            padding: 10px;
        }
        .in{

            position: fixed;
            width: 50px;
            background: #6aa;
        }
        .full{
            left:300px;
            top: 0;
            height: 100%;
        }
        .inherit{
            left: 0;
            top: 0;
            height: inherit;
        }
```

![8](E:\sxq_projs\myBlogReact\src\articles\CSS学习\对height百分百和inherit的理解\imgs\8.png)

可以看到，inherit的高度还是等于父元素盒子模型的高度，而100%的高度变为了视口的高度。

## 总结

height:inherit的高度，总是等于父元素的盒子模型（content-box、border-box）的高度。

heighe:100%的高度，在文档流中，就等于父元素的content的高度。如果在绝对定位（脱离文档流）中，等于最近已定位父元素的content + padding的高度。在固定定位中，等于视口的高度。



## 下一步

目前只是阐述和总结了现象，还未解释原理，希望大神能在留言区指点一下。

一开始觉得自己很熟悉CSS的定位、盒子模型，但是现在发现很多东西都是不明白的，这方面的只是还需要深入理解。接下来需要继续学习CSS知识，弄明白这些现象背后的原因。