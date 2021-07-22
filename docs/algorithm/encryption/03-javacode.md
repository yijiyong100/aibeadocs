---
title: Java常用的加解密算法
---

::: tip
本文主要是介绍 Java常用的加解密算法 。
:::

[[toc]]

## Java加密算法实现类

JDK中带有部分加密算法的实现类：

* 1、主要的是java.security和javax.crypto包下的类
* 2、还可以使用Bouncy Castle（丰富JDK中加密算法的不足）
* 3、jar包是：bcprov-jdk15on-1.57.jar和Commons Codec（简化JDK中加密的操作）jar包是：commons-codec-1.10.jar

## Base64

Base64用于网络中传输的数据进行编码，严格意义上属于编码的格式，有64个字符的对应的编码，Base64就是将内容按照该格式进行编码。可以对数据编码和解码，是可逆的，安全度较低，不过，也可以作为最基础最简单的加密算法用于加密要求较弱的情况

Base64可以使用JDk中自带的类实现，还可以使用Bouncy Castle（简称bc）或Commons Codec（简称cc）实现

加密数据：

``` java
private static String src="Hello Base64";
```

导入的类：

``` java
import java.io.IOException;

import org.apache.commons.codec.binary.Base64;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
```

JDk实现主要使用用BASE64Encoder和BASE64Decoder类的方法（**注意**：在Eclipse中使用JDK的Base64可能会出现找不到的问题，是因为Base64Encoder并不属于JDK标准库范畴，但是又包含在了JDK中，需要我们手动导入\jre\lib目录下的rt.jar包即可）：



``` java
    public static void jdkBase64(){
        try {
            BASE64Encoder encoder=new BASE64Encoder();
            String encode = encoder.encode(src.getBytes());
            System.out.println("encode: "+encode);
            
            BASE64Decoder decoder=new BASE64Decoder();
            String decode=new String(decoder.decodeBuffer(encode));
            System.out.println("decode: "+decode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```



bc实现主要是用Base64类的方法：



``` java
    public static void bouncybastleBase64(){
        byte[] encode = org.bouncycastle.util.encoders.Base64.encode(src.getBytes());
        System.out.println("encode: "+new String(encode));
        
        byte[] decode = org.bouncycastle.util.encoders.Base64.decode(encode);
        System.out.println("decode: "+new String(decode));
    }
```



cc实现也是用Base64类，不过与bc的是不一样的，不同包中的类，只是名字一样：



``` java
    public static void commonscodecBase64(){
        byte[] encode=Base64.encodeBase64(src.getBytes());
        System.out.println("encode: "+new String(encode));  //需要转化为String
        
        byte[] decode = Base64.decodeBase64(encode);
        System.out.println("decode: "+new String(decode));
    }
```



## 摘要算法

摘要算法主要分为MD，SHA和Hmac算法，摘要算法其实是用于效验数据完整性的，我们在下载某些文件时，会有MD5和SHA1值提供我们效验下载的文件是否完整，可以用于根据数据生成其唯一的摘要值，无法根据摘要值知道原数据，属于不可逆的

### MD：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-1.jpg')" alt="wxmp">

加密数据：

``` java
private static String src="Hello MD";
```

导入的类：



``` java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.Security;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import org.bouncycastle.crypto.Digest;
import org.bouncycastle.crypto.digests.MD2Digest;
import org.bouncycastle.crypto.digests.MD4Digest;
import org.bouncycastle.crypto.digests.MD5Digest;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
```



JDK有MD2和MD5的实现，使用的是MessageDigest类，而没有MD4的实现：



``` java
    public static void jdkMD5(){
        try {
            MessageDigest md=MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(src.getBytes());
            System.out.println("JDK MD5: "+Hex.encodeHexString(digest));           //使用的是cc中带的Hex需要转换为十六进制
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        
    }
    
    public static void jdkMD2(){
        try {
            MessageDigest md=MessageDigest.getInstance("MD2");
            byte[] digest = md.digest(src.getBytes());
            System.out.println("JDK MD2: "+Hex.encodeHexString(digest));   
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        
    }
```



而bc这三种都有，使用的是Digest 类：



``` java
public static void bcMD4(){
        //方式一
//        Digest digest=new MD4Digest();
//        digest.update(src.getBytes(), 0, src.getBytes().length);
//        byte[] md4Bytes=new byte[digest.getDigestSize()];
//        digest.doFinal(md4Bytes, 0);
//        System.out.println("BC MD4: "+org.bouncycastle.util.encoders.Hex.toHexString(md4Bytes));
        
        
      //方式二(通过添加provider的方式，将sun的改为bc的provider)
        try {
            Security.addProvider(new BouncyCastleProvider());  //通过添加provider的方式
            MessageDigest md=MessageDigest.getInstance("MD4");
            byte[] digest = md.digest(src.getBytes());
            System.out.println("BC MD4: "+Hex.encodeHexString(digest));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
    
    public static void bcMD5(){
        Digest digest=new MD5Digest();
        digest.update(src.getBytes(), 0, src.getBytes().length);
        byte[] md4Bytes=new byte[digest.getDigestSize()];
        digest.doFinal(md4Bytes, 0);
        System.out.println("BC MD5: "+org.bouncycastle.util.encoders.Hex.toHexString(md4Bytes));
    }
    
    public static void bcMD2(){
        Digest digest=new MD2Digest();
        digest.update(src.getBytes(), 0, src.getBytes().length);
        byte[] md4Bytes=new byte[digest.getDigestSize()];
        digest.doFinal(md4Bytes, 0);
        System.out.println("BC MD2: "+org.bouncycastle.util.encoders.Hex.toHexString(md4Bytes));
    }
```



cc和JDK是一样的，毕竟是对JDK加密的简化，直接使用DigestUtils中的方法，很简单，而且前两种方法还需要将MD值转换为十六进制，cc直接就帮我们转了：



``` java
    public static void ccMD2(){        //有方法直接就可以转换十六进制
        System.out.println("CC MD2: "+DigestUtils.md2Hex(src.getBytes()));
    }
    
    public static void ccMd5(){
        System.out.println("CC MD5: "+DigestUtils.md5Hex(src.getBytes()));
    }
```



### SHA：

这里只是使用SHA-1，其他类型类似

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-2.jpg')" alt="wxmp">

加密数据：

``` java
private static String src="Hello SHA";
```

要导入的类：



``` java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import org.bouncycastle.crypto.Digest;
import org.bouncycastle.crypto.digests.SHA1Digest;import sun.security.provider.SHA;
```



JDK实现方式（同样是使用MessageDigest）：



``` java
    public static void jdkSHA1(){
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA");
            digest.update(src.getBytes());
            System.out.println("JDK SHA1: "+Hex.encodeHexString(digest.digest()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
```



bc的实现方式（同样是Digest 类）：



``` java
    public static void mcSHA1(){
        Digest digest=new SHA1Digest();
        digest.update(src.getBytes(),0,src.getBytes().length);
        byte[] sha1Byte1=new byte[digest.getDigestSize()];
        digest.doFinal(sha1Byte1, 0);
        System.out.println("MC SHA1:"+org.bouncycastle.util.encoders.Hex.toHexString(sha1Byte1));
    }
```



cc的实现方式：

``` java
    public static void ccsha(){
        System.out.println("CC sha1:"+DigestUtils.sha1Hex(src));
    }
```

### Hmac（含有密钥的摘要算法，也有简称mac，密钥不同摘要也不同）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-3.jpg')" alt="wxmp">

要加密的数据：

``` java
private static String src="Hello HMAC";
```

要导入的类：



``` java
import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.crypto.digests.MD5Digest;
import org.bouncycastle.crypto.macs.HMac;
import org.bouncycastle.crypto.params.KeyParameter;
```



JDK的实现方式：



``` java
    public static void jdkHmacMD5(){
        try {
            KeyGenerator keyGenerator=KeyGenerator.getInstance("HmacMD5");  //初始化KeyGenerator
            SecretKey secretKey=keyGenerator.generateKey(); //产生密钥
            //byte[] key=secretKey.getEncoded();     //获得密钥(默认生成)
            
            byte[] key=Hex.decodeHex(new char[]{'a','a','a','a','a','a','a','a','a','a'});  //手动生成密钥(十位)
            
            SecretKey secretKey2=new SecretKeySpec(key, "HmacMD5"); //还原密钥
            Mac mac=Mac.getInstance(secretKey2.getAlgorithm());  //实例化mac
            //初始化mac
            mac.init(secretKey2);
            byte[] hmacMD5Bytes=mac.doFinal(src.getBytes());
            System.out.println("jdk hmacMD5: "+Hex.encodeHexString(hmacMD5Bytes));
        } catch (Exception e) {
            e.printStackTrace();
        } 
    }
```



bc的实现方式：



``` java
    public static void bcHmacMd5(){
        HMac hMac=new HMac(new MD5Digest());
        hMac.init(new KeyParameter(org.bouncycastle.util.encoders.Hex.decode("aaaaaaaaaa")));  //需要十位密钥
        hMac.update(src.getBytes(),0,src.getBytes().length);
        
        byte[] hmacMD5=new byte[hMac.getMacSize()];
        hMac.doFinal(hmacMD5, 0);
        System.out.println("bc hmacMD5: "+org.bouncycastle.util.encoders.Hex.toHexString(hmacMD5));

    }
```



## 对称加密算法

严格意义上的加密算法，分为对称和非对称加密算法，所谓对称是说发送方和接收方的密钥是一样的，而非对称我们后面再说。因为密钥一样所以安全性跟非对称比较来说就不太安全了

对称加密算法主要分为:DES , 3DES(3重DES) , AES(想要替代DES)  , PBE(基于口令的对称算法)

### DES:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-4.jpg')" alt="wxmp">

加密数据 :

```
private static String src="Hello DES";
```

导入的类：



``` java
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
```



JDK的实现方式：



``` java
    public static void jdkDES(){
        try {
            //生成key
            KeyGenerator keyGenerator=KeyGenerator.getInstance("DES");
            keyGenerator.init(56);      //指定key长度，同时也是密钥长度(56位)
            SecretKey secretKey = keyGenerator.generateKey(); //生成key的材料
            byte[] key = secretKey.getEncoded();  //生成key
            
            //key转换成密钥
            DESKeySpec desKeySpec=new DESKeySpec(key);
            SecretKeyFactory factory=SecretKeyFactory.getInstance("DES");
            SecretKey key2 = factory.generateSecret(desKeySpec);      //转换后的密钥
            
            //加密
            Cipher cipher=Cipher.getInstance("DES/ECB/PKCS5Padding");  //算法类型/工作方式/填充方式
            cipher.init(Cipher.ENCRYPT_MODE, key2);   //指定为加密模式
            byte[] result=cipher.doFinal(src.getBytes());
            System.out.println("jdkDES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE,key2);  //相同密钥，指定为解密模式
            result = cipher.doFinal(result);   //根据加密内容解密
            System.out.println("jdkDES解密: "+new String(result));  //转换字符串
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



bc的实现方式，为了和JDK的实现方式一致（不想记太多类）,采用了添加provider的方式 :



``` java
public static void bcDES(){
        try {
            //通过改变provider的方式
            Security.addProvider(new BouncyCastleProvider());
            
            //生成key,使用bc需要在后面指定"BC"
            KeyGenerator keyGenerator=KeyGenerator.getInstance("DES","BC");
            
            keyGenerator.getProvider();
            
            keyGenerator.init(56);      //指定key长度，同时也是密钥长度
            SecretKey secretKey = keyGenerator.generateKey(); //生成key的材料
            byte[] key = secretKey.getEncoded();  //生成key
            
            //key转换成密钥
            DESKeySpec desKeySpec=new DESKeySpec(key);
            SecretKeyFactory factory=SecretKeyFactory.getInstance("DES");
            SecretKey key2 = factory.generateSecret(desKeySpec);      //转换后的密钥
            
            //加密
            Cipher cipher=Cipher.getInstance("DES/ECB/PKCS5Padding");  //算法类型/工作方式/填充方式
            cipher.init(Cipher.ENCRYPT_MODE, key2);
            byte[] result=cipher.doFinal(src.getBytes());
            System.out.println("bcDES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE,key2);  //相同密钥
            result = cipher.doFinal(result);   //根据加密内容解密
            System.out.println("bcDES解密: "+new String(result));  //转换字符串
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



就是记得添加bc的provider，和KeyGenerator.getInstance的参数("DES","BC")

### 3DES（使用DESede作为标识）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-5.jpg')" alt="wxmp">

要加密的数据:

``` java
private static String src="Hello 3DES";
```

导入的类：



``` java
import java.security.SecureRandom;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
```



JDK的实现方法：



``` java
    public static void jdkDES(){
        try {
            //生成key
            KeyGenerator keyGenerator=KeyGenerator.getInstance("DESede");
            //keyGenerator.init(112);      //3DES需要112 or 168位
            keyGenerator.init(new SecureRandom());   //或者使用这种方式默认长度，无需指定长度
            SecretKey secretKey = keyGenerator.generateKey(); //生成key的材料
            byte[] key = secretKey.getEncoded();  //生成key
            
            //key转换成密钥
            DESedeKeySpec desKeySpec=new DESedeKeySpec(key);
            SecretKeyFactory factory=SecretKeyFactory.getInstance("DESede");
            SecretKey key2 = factory.generateSecret(desKeySpec);      //转换后的密钥
            
            //加密
            Cipher cipher=Cipher.getInstance("DESede/ECB/PKCS5Padding");  //算法类型/工作方式/填充方式
            cipher.init(Cipher.ENCRYPT_MODE, key2);   //指定为加密模式
            byte[] result=cipher.doFinal(src.getBytes());
            System.out.println("jdk3DES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE,key2);  //相同密钥，指定为解密模式
            result = cipher.doFinal(result);   //根据加密内容解密
            System.out.println("jdk3DES解密: "+new String(result));  //转换字符串
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



bc的实现方式：



``` java
public static void bcDES(){
        try {
            //通过改变provider的方式，其他操作一样
            Security.addProvider(new BouncyCastleProvider());
            
            //生成key
            KeyGenerator keyGenerator=KeyGenerator.getInstance("DESede");
            keyGenerator.init(new SecureRandom());
            SecretKey secretKey = keyGenerator.generateKey(); //生成key的材料
            byte[] key = secretKey.getEncoded();  //生成key
            
            //key转换成密钥
            DESedeKeySpec desKeySpec=new DESedeKeySpec(key);
            SecretKeyFactory factory=SecretKeyFactory.getInstance("DESede");
            SecretKey key2 = factory.generateSecret(desKeySpec);      //转换后的密钥
            
            //加密
            Cipher cipher=Cipher.getInstance("DESede/ECB/PKCS5Padding");  //算法类型/工作方式/填充方式
            cipher.init(Cipher.ENCRYPT_MODE, key2);   //指定为加密模式
            byte[] result=cipher.doFinal(src.getBytes());
            System.out.println("jdk3DES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE,key2);  //相同密钥，指定为解密模式
            result = cipher.doFinal(result);   //根据加密内容解密
            System.out.println("jdk3DES解密: "+new String(result));  //转换字符串
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



### AES:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-6.jpg')" alt="wxmp">

 

基本实现和DES类似，只不过在实现该算法的时候，设置密钥长度大于128会出现错误：Illegal key size or default parameters，这是因为美国的出口限制，Sun通过权限文件（local_policy.jar、US_export_policy.jar）做了相应限制，Oracle在其官方网站上提供了无政策限制权限文件（Unlimited Strength Jurisdiction Policy Files），我们只需要将其部署在JRE环境中，就可以解决限制问题

JDK8的无政策限制权限文件（http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html）

将下载的local_policy.jar和US_export_policy.jar替换JDK的JRE环境中，或者是JRE环境中上述两个jar文件即可

非对称的ELGamal加密算法算法也有该问题，解决方法相同

加密的数据：

``` java
private static String src="Hello AES";
```

导入的类：



``` java
import java.security.Key;
import java.security.SecureRandom;
import java.security.Security;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
```



JDK的实现：



``` java
public static void jdkAES(){
        try {
            //生成key
            KeyGenerator keyGenerator=KeyGenerator.getInstance("AES");
            keyGenerator.init(new SecureRandom());
            SecretKey secretKey = keyGenerator.generateKey();
            byte[] key1 = secretKey.getEncoded();
            
            //key转换为密钥
            Key key2 = new SecretKeySpec(key1, "AES");
            
            //加密
            Cipher cipher=Cipher.getInstance("AES/ECB/PKCS5padding");
            cipher.init(Cipher.ENCRYPT_MODE, key2);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdkAES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE, key2);
            result = cipher.doFinal(result);
            System.out.println("jdkAES解密: "+new String(result));  //转换字符串
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



bc的实现（同样使用了添加provider的做法）：



``` java
public static void bcAES(){
        try {
            Security.addProvider(new BouncyCastleProvider());
            
            //生成key
            KeyGenerator keyGenerator=KeyGenerator.getInstance("AES", "BC");
            keyGenerator.getProvider();
            keyGenerator.init(128);      //显示指定密钥长度
            SecretKey secretKey = keyGenerator.generateKey();
            byte[] key1 = secretKey.getEncoded();
            
            //key转换为密钥
            Key key2 = new SecretKeySpec(key1, "AES");
            
            //加密
            Cipher cipher=Cipher.getInstance("AES/ECB/PKCS5padding");
            cipher.init(Cipher.ENCRYPT_MODE, key2);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdkAES加密: "+Hex.encodeHexString(result));  //转换为十六进制
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE, key2);
            result = cipher.doFinal(result);
            System.out.println("jdkAES解密: "+new String(result));  //转换字符串
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



### PBE：

基于口令的对称加密算法（它其实是对之前的算法的包装，比如说MD5和DES，我这里就是的是对MD5和DES包装的PBE算法，还有其他类型的PBE），口令就是我们俗话说的密码，PBE中有一个salt（盐）的概念，盐就是干扰码

加密的数据：

``` java
private static String src="Hello PBE";
```

导入的类：



``` java
import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
import org.apache.commons.codec.binary.Base64;
```



JDk的实现：



``` java
public static void jdkPBE(){
        try {
            //初始化盐
            SecureRandom random=new SecureRandom();
            byte[] salt = random.generateSeed(8);   //指定为8位的盐 （盐就是干扰码，通过添加干扰码增加安全）
            
            //口令和密钥
            String password="lynu";              //口令
            PBEKeySpec pbeKeySpec=new PBEKeySpec(password.toCharArray());
            SecretKeyFactory factory=SecretKeyFactory.getInstance("PBEWITHMD5andDES");
            Key key=factory.generateSecret(pbeKeySpec);  //密钥
            
            //加密
            PBEParameterSpec pbeParameterSpec=new PBEParameterSpec(salt, 100);   //参数规范，第一个参数是盐，第二个是迭代次数（经过散列函数多次迭代）
            Cipher cipher=Cipher.getInstance("PBEWITHMD5andDES");
            cipher.init(Cipher.ENCRYPT_MODE, key,pbeParameterSpec);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdk PBE加密: "+Base64.encodeBase64String(result));
            
            
            //解密
            cipher.init(Cipher.DECRYPT_MODE, key,pbeParameterSpec);
            result = cipher.doFinal(result);
            System.out.println("jdk PBE解密: "+new String(result));
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
```



## 非对称的算法：

非对称算法就是发送方和接收方的密钥是不一样的，非对称相对于对称来说，有公钥和私钥的概念，基本上公钥是公开的，比如会在网络上传输，而私钥安全性要求就要高很多了，因为私钥是要保密的

基本的非对称算法有DH，RSA，ELGamal算法

DH：

基于交换交换的非对称算法，接收方需要得到接收方的key构建本地密钥，而接收方也需要得到发送方的key构建自己本地的密钥。只有JDK的实现

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/javaencrydev-7.jpg')" alt="wxmp">

需要加密的数据：

``` java
private static String src="Hello DH";
```

需要导入的类：



``` java
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Objects;
import javax.crypto.Cipher;
import javax.crypto.KeyAgreement;
import javax.crypto.SecretKey;
import javax.crypto.interfaces.DHPublicKey;
import javax.crypto.spec.DHParameterSpec;
```



JDK的实现：



``` java
    public static void jdkDH(){
        try {
            //初始化发送方密钥
            KeyPairGenerator senderKeyPairGenerator=KeyPairGenerator.getInstance("DH");
            senderKeyPairGenerator.initialize(512);   //密钥长度
            KeyPair senderKeyPair = senderKeyPairGenerator.generateKeyPair();
            byte[] senderPublicKeyEnc = senderKeyPair.getPublic().getEncoded();  //发送方key,需传递给接收方（网络，文件）
            
            //初始化接收方密钥
            KeyFactory factory=KeyFactory.getInstance("DH");
            X509EncodedKeySpec x509EncodedKeySpec=new X509EncodedKeySpec(senderPublicKeyEnc);  //根据从发送方得到的key解析
            PublicKey receiverPublicKey=factory.generatePublic(x509EncodedKeySpec);
            DHParameterSpec dhParameterSpec=((DHPublicKey)receiverPublicKey).getParams();
            KeyPairGenerator receiverKeyPairGenerator=KeyPairGenerator.getInstance("DH");
            receiverKeyPairGenerator.initialize(dhParameterSpec);
            KeyPair receiverKeyPair = receiverKeyPairGenerator.generateKeyPair();
            PrivateKey receiverPrivateKey = receiverKeyPair.getPrivate();
            byte[] receiverPublicKeyEnc = receiverKeyPair.getPublic().getEncoded();
            
            //密钥构建
            KeyAgreement receiverKeyAgreement=KeyAgreement.getInstance("DH");
            receiverKeyAgreement.init(receiverPrivateKey);
            receiverKeyAgreement.doPhase(receiverPublicKey, true);
            SecretKey receiverDESKey=receiverKeyAgreement.generateSecret("DES");  //发送发密钥(公钥)
            KeyFactory senderKeyFactory=KeyFactory.getInstance("DH");
            x509EncodedKeySpec=new X509EncodedKeySpec(receiverPublicKeyEnc);
            PublicKey senderPublicKey=senderKeyFactory.generatePublic(x509EncodedKeySpec);
            KeyAgreement senderKeyAgreement=KeyAgreement.getInstance("DH");
            senderKeyAgreement.init(senderKeyPair.getPrivate());
            senderKeyAgreement.doPhase(senderPublicKey, true);
            SecretKey senderDESKey=senderKeyAgreement.generateSecret("DES");        //接收方密钥(私钥)
            if(Objects.equals(receiverDESKey, senderDESKey)){
                System.out.println("双方密钥相同");
            }
            //加密
            Cipher cipher=Cipher.getInstance("DES");
            cipher.init(Cipher.ENCRYPT_MODE, senderDESKey);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdk DH加密: "+org.apache.commons.codec.binary.Base64.encodeBase64String(result));
            
            //解密            
            cipher.init(Cipher.DECRYPT_MODE, receiverDESKey);
            result=cipher.doFinal(result);
            System.out.println("jdk DH解密: "+new String(result));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
```



### RSA：

RSA相较于DH算法的实现简单，适用范围较广，公钥和私钥的创建较简单，而且支持公钥加密，私钥解密或者是私钥加密，公钥解密两种方式

要加密的数据：

``` java
private static String src="Hello RSA";
```

要导入的类：



``` java
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import org.apache.commons.codec.binary.Base64;
```



JDK的实现，公钥加密，私钥解密和私钥加密，公钥解密两种方式：



``` java
public static void jdkRSA(){
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(512);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            RSAPublicKey rsaPublicKey=(RSAPublicKey) keyPair.getPublic();           //公钥
            RSAPrivateKey rsaPrivateKey=(RSAPrivateKey) keyPair.getPrivate();       //私钥
            System.out.println("public key:"+Base64.encodeBase64String(rsaPublicKey.getEncoded()));
            System.out.println("private key:"+Base64.encodeBase64String(rsaPrivateKey.getEncoded()));
            
            //私钥加密，公钥解密--加密
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec=new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
            KeyFactory keyFactory=KeyFactory.getInstance("RSA");
            PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
            Cipher cipher=Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, privateKey);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("RSA私钥加密，公钥解密--加密:"+Base64.encodeBase64String(result));
            
            //私钥加密，公钥解密--解密
            X509EncodedKeySpec x509EncodedKeySpec=new X509EncodedKeySpec(rsaPublicKey.getEncoded());
            keyFactory=KeyFactory.getInstance("RSA");
            PublicKey publicKey=keyFactory.generatePublic(x509EncodedKeySpec);
            cipher=Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE,publicKey);
            result = cipher.doFinal(result);
            System.out.println("RSA私钥加密，公钥解密--解密:"+new String(result));
            
            //公钥加密，私钥解密--加密
            x509EncodedKeySpec=new X509EncodedKeySpec(rsaPublicKey.getEncoded());
            keyFactory=KeyFactory.getInstance("RSA");
            publicKey=keyFactory.generatePublic(x509EncodedKeySpec);
            cipher=Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE,publicKey);
            result = cipher.doFinal(src.getBytes());
            System.out.println("RSA公钥加密，私钥解密--加密:"+Base64.encodeBase64String(result));
            
            //公钥加密，私钥解密--解密
            pkcs8EncodedKeySpec=new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
            keyFactory=KeyFactory.getInstance("RSA");
            privateKey =keyFactory.generatePrivate(pkcs8EncodedKeySpec);
            cipher=Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE,privateKey);
            result=cipher.doFinal(result);
            System.out.println("RSA公钥加密，私钥解密--解密:"+new String(result));
            
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```



### ELGamal：

ELGamal算法的和AES一样存在密钥长度的限制，解决方法和AES一致。不过ELGamal只支持公钥加密，私钥解密这种方式。只有bc的实现方式

要加密的数据：

``` java
private static String src="Hello ELGamal";
```

导入的类：



``` java
import java.security.AlgorithmParameterGenerator;
import java.security.AlgorithmParameters;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import javax.crypto.spec.DHParameterSpec;
import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
```



bc的实现方式：



``` java
public static void bcELGamal(){
        try {
            //加载provider
            Security.addProvider(new BouncyCastleProvider());
            
            //初始化密钥
            AlgorithmParameterGenerator algorithmParameterGenerator=AlgorithmParameterGenerator.getInstance("ELGamal");
            algorithmParameterGenerator.init(256);
            AlgorithmParameters algorithmParameters=algorithmParameterGenerator.generateParameters();
            DHParameterSpec dhParameterSpec=(DHParameterSpec)algorithmParameters.getParameterSpec(DHParameterSpec.class);
            KeyPairGenerator keyPairGenerator=KeyPairGenerator.getInstance("ELGamal");
            keyPairGenerator.initialize(dhParameterSpec, new SecureRandom());
            KeyPair keyPair=keyPairGenerator.generateKeyPair();
            PublicKey elGamalPublicKey=keyPair.getPublic();        //公钥
            PrivateKey elGamalPrivateKey=keyPair.getPrivate();     //私钥
            System.out.println("public key:"+Base64.encodeBase64String(elGamalPublicKey.getEncoded()));
            System.out.println("private key:"+Base64.encodeBase64String(elGamalPrivateKey.getEncoded()));
            
            //公钥加密，私钥解密--加密
            X509EncodedKeySpec x509EncodedKeySpec=new X509EncodedKeySpec(elGamalPublicKey.getEncoded());
            KeyFactory keyFactory=KeyFactory.getInstance("ELGamal");
            PublicKey publicKey=keyFactory.generatePublic(x509EncodedKeySpec);
            Cipher cipher=Cipher.getInstance("ELGamal");
            cipher.init(Cipher.ENCRYPT_MODE,publicKey);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("ELGamal加密:"+Base64.encodeBase64String(result));
            
            //公钥加密，私钥解密--解密
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec=new PKCS8EncodedKeySpec(elGamalPrivateKey.getEncoded());
            keyFactory=KeyFactory.getInstance("ELGamal");
            PrivateKey privateKey =keyFactory.generatePrivate(pkcs8EncodedKeySpec);
            cipher=Cipher.getInstance("ELGamal");
            cipher.init(Cipher.DECRYPT_MODE,privateKey);
            result=cipher.doFinal(result);
            System.out.println("ElGamal解密:"+new String(result));
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
```



 



### 参考文章
* https://www.cnblogs.com/lz2017/p/6917049.html