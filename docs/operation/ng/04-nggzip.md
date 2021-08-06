---
title: Nginx-gzip压缩开启
---

::: tip
本文主要是介绍 Nginx-gzip压缩开启 。
:::

[[toc]]

## nginx 开启gzip压缩

开发gzip压缩后，图片的访问效率会大大提升。但是也会消耗更多的ng服务器cpu资源。

所以在修改配置时，可以根据需要进行选择性开启。

nginx.conf中关于gzip压缩的主要配置如下：



``` shell
 　　　　#开启和关闭gzip模式
        gzip on;
        
        #gizp压缩起点，文件大于1k才进行压缩
        gzip_min_length 1k;
        
        # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
        gzip_comp_level 6;
        
        # 进行压缩的文件类型。
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/xml text/javascript application/json image/png image/gif image/jpeg;
        
        # 【此处需要配合 web工程来处理，如果web 工程没有编译成 .gz 文件 ，这里的内容 不能开启  】
        #nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
        # gzip_static on|off
        
        # 是否在http header中添加Vary: Accept-Encoding，建议开启
        gzip_vary on;

        # 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
        gzip_buffers 4 16k;

        # 设置gzip压缩针对的HTTP协议版本
        # gzip_http_version 1.1;
```



配置位置：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/operation/ng/nggzip-1.png')" alt="wxmp">

 

 vuecli3.0 开启页面gzip：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/operation/ng/nggzip-2.png')" alt="wxmp">

 
压缩后大小：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/operation/ng/nggzip-3.png')" alt="wxmp">

之后重启nginx服务即可。

## 参考文章
* https://www.cnblogs.com/mengfangui/p/12165096.html