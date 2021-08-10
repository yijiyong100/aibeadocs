---
title: 项目中常用加解密算法
---

::: tip
本文主要是介绍 项目中常用加解密算法 。
:::

[[toc]]

## java之--加密、解密算法

## 0、概述

在项目开发中，我们常需要用到加解密算法，加解密算法主要分为三大类：

1、对称加密算法，如：**AES**、**DES**、**3DES**

2、非对称加密算法，如：**RSA**、**DSA**、**ECC**

3、散列算法，如：**MD5**、**SHA1**、**HMAC**

 

## 1、各算法对比

不废话，直接开表格对比：

对称加密算法(加解密密钥相同)

| 名称 | 密钥长度        | 运算速度 | 安全性 | 资源消耗 |
| ---- | --------------- | -------- | ------ | -------- |
| DES  | 56位            | 较快     | 低     | 中       |
| 3DES | 112位或168位    | 慢       | 中     | 高       |
| AES  | 128、192、256位 | 快       | 高     | 低       |

 

非对称算法(加密密钥和解密密钥不同)

| 名称 | 成熟度 | 安全性(取决于密钥长度) | 运算速度 | 资源消耗                               |
| ---- | ------ | ---------------------- | -------- | -------------------------------------- |
| RSA  | 高     | 高                     | 慢       | 高                                     |
| DSA  | 高     | 高                     | 慢       | 只能用于数字签名                       |
| ECC  | 低     | 高                     | 快       | 低(计算量小,存储空间占用小,带宽要求低) |

 

散列算法比较

| 名称  | 安全性 | 速度 |
| ----- | ------ | ---- |
| SHA-1 | 高     | 慢   |
| MD5   | 中     | 快   |

 

对称与非对称算法比较

| 名称       | 密钥管理                             | 安全性 | 速度                                                                                         |
| ---------- | ------------------------------------ | ------ | -------------------------------------------------------------------------------------------- |
| 对称算法   | 比较难,不适合互联网,一般用于内部系统 | 中     | 快好几个数量级(软件加解密速度至少快100倍,每秒可以加解密数M比特数据),适合大数据量的加解密处理 |
| 非对称算法 | 密钥容易管理                         | 高     | 慢,适合小数据量加解密或数据签名                                                              |

## 3、项目中常用总结

对称加密: AES(128位),

非对称加密: ECC(160位)或RSA(1024),

消息摘要: MD5

数字签名:DSA

其中，AES和MD5最为常用，

 

## 4、代码示例

下面直接实现一个包含AES和MD5的加解密类，不废话，直接上步骤：

1、添加第三方包的依赖：项目用到两个第三方包，在pom中添加这两个包的依赖：


### 4.1、第三方依赖

``` xml
<!-- 添加加解密算法的依赖 --> 
<dependency> 
    <groupId>org.apache.commons</groupId> 
    <artifactId>commons-lang3</artifactId> 
    <version>3.4</version> 
</dependency> 
<dependency> 
    <groupId>org.apache.directory.studio</groupId>             
    <artifactId>org.apache.commons.codec</artifactId> 
    <version>1.8</version> 
</dependency>    
```




### 4.2、import相关包；
比如：
package com.anson.utility;

//引入相关包

import javax.crypto.Cipher;

import javax.crypto.spec.IvParameterSpec;

import javax.crypto.spec.SecretKeySpec;

//引入第三方包

import org.apache.commons.codec.binary.Base64;

import org.apache.commons.codec.digest.DigestUtils;


### 4.3、AES有五种模式（ECB、CBC、CFB、OFB、CTR），
我们采用的是CBC，各工作模式的远离自行百度，好了，直接上代码：

### 4.4、代码样例：
``` java
package com.anson.utility;

//引入相关包
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

//引入第三方包
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;


public class Encrypt {

    //--------------AES---------------
    private static final String KEY = "f4k9f5w7f8g4er26";  // 密匙，必须16位
    private static final String OFFSET = "5e8y6w45ju8w9jq8"; // 偏移量
    private static final String ENCODING = "UTF-8"; // 编码
    private static final String ALGORITHM = "AES"; //算法
    private static final String CIPHER_ALGORITHM = "AES/CBC/PKCS5Padding"; // 默认的加密算法，CBC模式

    //---------------MD5-------------------
    private static final String MD5KEY = "f4k9f5w7f8g4er26";  // 密匙

    /**
     *  AES加密
     * @param data
     * @return String
     * @author anson
     * @date   2019-8-24 18:43:07
     */
    public static String AESencrypt(String data) throws Exception
    {
        Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
        SecretKeySpec skeySpec = new SecretKeySpec(KEY.getBytes("ASCII"), ALGORITHM);
        IvParameterSpec iv = new IvParameterSpec(OFFSET.getBytes());//CBC模式偏移量IV
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
        byte[] encrypted = cipher.doFinal(data.getBytes(ENCODING));
        return new Base64().encodeToString(encrypted);//加密后再使用BASE64做转码
    }

    /**
     * AES解密
     * @param data
     * @return String
     * @author anson
     * @date   2019-8-24 18:46:07
     */
    public static String AESdecrypt(String data) throws Exception
    {
        Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
        SecretKeySpec skeySpec = new SecretKeySpec(KEY.getBytes("ASCII"), ALGORITHM);
        IvParameterSpec iv = new IvParameterSpec(OFFSET.getBytes()); //CBC模式偏移量IV
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
        byte[] buffer = new Base64().decode(data);//先用base64解码
        byte[] encrypted = cipher.doFinal(buffer);
        return new String(encrypted, ENCODING);
    }

    //---------------------MD5--------------------
    /**
     * MD5方法
     * @param text 明文
     * @return 密文
     * @author anson
     * @date 2019-8-24 18:54:42
     */
    public static String MD5encrypt(String text) throws Exception {
        //加密后的字符串
        String encodeStr=DigestUtils.md5Hex(text + MD5KEY);
        return encodeStr;
    }

    /**
     * MD5验证方法
     * @param text 明文
     * @param md5 密文
     * @return true/false
     * @author anson
     * @date 2019-8-24 18:58:56
     */
    public static boolean verify(String text, String md5) throws Exception
    {
        //根据传入的密钥进行验证
        String md5Text = MD5encrypt(text);
        if(md5Text.equalsIgnoreCase(md5))
        {
            return true;
        }
        return false;
    }

}
```



## 参考文章
* https://www.cnblogs.com/yanghj/p/11405776.html