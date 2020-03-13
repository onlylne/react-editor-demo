# react-editor-demo
A simple Rich-Text-Editor demo 基于braft-editor的二次封装

### 第三方库：braft-editor
### 版本：2.3.8

对braft-editor一个简单的二次封装，写了下上传图片到服务器的方法；
目前版本的isEmpty()方法判断控制没有验证空格，如果输入全是空格也会返回false,在某些情况下可能会造成误解，有需要的朋友可以先用toText()方法获取字符串，然后replace替换空格后判断（demo中也有写）.

![Image](https://github.com/onlylne/react-editor-demo/blob/master/src/assets/img.png)
