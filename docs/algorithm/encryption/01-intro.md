---
title: 常见加密解密算法介绍
---

::: tip
本文主要是介绍 常见加密解密算法。
:::

[[toc]]

## 1. ASCII 编码

- ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统，主要用于显示现代英语和其他西欧语言。它是现今最通用的单字节编码系统，并等同于国际标准ISO/IEC 646。
- 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-1.png')" alt="wxmp">


  ascii.jpg

- 示例代码

  

  ```java
  private static void asciiDemo() {
      char a = 'A';
      int code = a;
      System.out.println(code);
  
      String s = "ABCabc";
      char[] chars = s.toCharArray();
      for (char c : chars) {
          int co = c;
          System.out.println(co);
      }
  }
  ```

## 2. 恺撒加密

- 在密码学中，恺撒密码是一种最简单并且最广为人知的加密技术。
- 它是一种替换加密的技术，明文中的所欲字母都在字母表上向后（或向前）按照一个固定的数目进行偏移后被替换成密文。
- 例如：当偏移量是3的时候，所有的字母A将被替换成D，B变成E，以此类推。
- 这个加密方法是以恺撒的名字命名的，当年恺撒曾用此方法与其将军们进行联系。
- 恺撒密码通常被座位其他更复杂的加密方法中的一个步骤。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-2.png')" alt="wxmp">

i002.jpg

- 示例代码

  

  ```java
  /**
   * 使用凯撒加密方式加密数据
   *
   * @param orignal :原文
   * @param key     :密钥
   * @return :加密后的数据
   */
  private static String encryptKaiser(String orignal, int key) {
      // 将字符串转为字符数组
      char[] chars = orignal.toCharArray();
      StringBuilder sb = new StringBuilder();
      // 遍历数组
      for (char aChar : chars) {
          // 获取字符的ASCII编码
          int asciiCode = aChar;
          // 偏移数据
          asciiCode += key;
          // 将偏移后的数据转为字符
          char result = (char) asciiCode;
          // 拼接数据
          sb.append(result);
      }
  
      return sb.toString();
  }
  
  /**
   * 使用凯撒加密方式解密数据
   *
   * @param encryptedData :密文
   * @param key           :密钥
   * @return : 源数据
   */
  private static String decryptKaiser(String encryptedData, int key) {
      // 将字符串转为字符数组
      char[] chars = encryptedData.toCharArray();
      StringBuilder sb = new StringBuilder();
      // 遍历数组
      for (char aChar : chars) {
          // 获取字符的ASCII编码
          int asciiCode = aChar;
          // 偏移数据
          asciiCode -= key;
          // 将偏移后的数据转为字符
          char result = (char) asciiCode;
          // 拼接数据
          sb.append(result);
      }
  
      return sb.toString();
  }
  ```

### 2.1频度分析法破解恺撒加密

- 将明文字母的出现频率与密文字母的频率相比较的过程
- 通过分析每个符号出现的频率而轻易地破译代换式密码
- 在每种语言中，冗长的文章中的字母表现出一种可对之进行分辨的频率。
- e是英语中最常用的字母，其出现频率为八分之一

## 3. Byte 和bit

- Byte：字节。数据存储的基本单位。

- bit：比特，又叫位。一个位要么是0，要么是1.数据传输的单位。

- 关系：1Byte = 8bit

- 示例代码：

  

  ```java
  // 中文在GBK编码下, 占据2个字节
  // 中文在UTF-8编码下, 占据3个字节
  private static void getChinese() throws UnsupportedEncodingException {
      String a = "我";
      byte[] bytes = a.getBytes("UTF-8");
      for (byte b : bytes) {
          // 获取字节
          System.out.print(b + "   ");
          // 获取位
          String s = Integer.toBinaryString(b);
          System.out.println(s);
      }
  }
  
  // 英文在GBK和UTF-8编码下,始终占据一个字节
  private static void getEnglish() throws UnsupportedEncodingException {
      String a = "A";
      byte[] bytes = a.getBytes("GBK");
      for (byte b : bytes) {
          // 获取字节
          System.out.print(b + "   ");
          // 获取位
          String s = Integer.toBinaryString(b);
          System.out.println(s);
      }
  }
  ```

## 常见加密方式

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-3.png')" alt="wxmp">

i003.png

## 4. 对称加密

- 采用单钥密码系统的加密方法，同一个密钥可以同时用作信息的加密和解密，这种加密方法称为对称加密，也称为单密钥加密。
- 示例
  - 我们现在有一个原文3要发送给B
  - 设置密钥为108, 3 * 108 = 324, 将324作为密文发送给B
  - B拿到密文324后, 使用324/108 = 3 得到原文
- 常见加密算法
  - DES : Data Encryption Standard，即数据加密标准，是一种使用密钥加密的块算法，1977年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），并授权在非密级政府通信中使用，随后该算法在国际上广泛流传开来。
  - AES : Advanced Encryption Standard, 高级加密标准 .在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。
- 特点
  - 加密速度快, 可以加密大文件
  - 密文可逆, 一旦密钥文件泄漏, 就会导致数据暴露
  - 加密后编码表找不到对应字符, 出现乱码
  - 一般结合Base64使用

## 5. 非对称加密

- 示例

  - 首先生成密钥对, 公钥为(5,14), 私钥为(11,14)
  - 现在A希望将原文2发送给B
  - A使用公钥加密数据. 2的5次方mod 14 = 4 , 将密文4发送给B
  - B使用私钥解密数据. 4的11次方mod14 = 2, 得到原文2

- 特点

  - 加密和解密使用不同的密钥
  - 如果使用私钥加密, 只能使用公钥解密
  - 如果使用公钥加密, 只能使用私钥解密
  - 处理数据的速度较慢, 因为安全级别高

- 常见算法

  - RSA
  - ECC

- 示例代码

  

  ```java
  import com.sun.org.apache.xml.internal.security.utils.Base64;
  import org.apache.commons.io.FileUtils;
  import javax.crypto.Cipher;
  import java.io.ByteArrayOutputStream;
  import java.io.File;
  import java.nio.charset.Charset;
  import java.security.*;
  import java.security.spec.PKCS8EncodedKeySpec;
  import java.security.spec.X509EncodedKeySpec;
  
  public class RsaDemo {
  
      public static void main(String[] args) {
          String algorithm = "RSA";
          String input = "非对称加密与对称加密相比，其安全性更好：对称加密的通信双方使用相同的秘钥，如果一方的秘钥遭泄露，那么整个通信就会被破解。而非对称加密使用一对秘钥，一个用来加密，一个用来解密，而且公钥是公开的，秘钥是自己保存的，不需要像对称加密那样在通信之前要先同步秘钥";
          try {
              generateKeyToFile(algorithm, "a.pub", "a.pri");
  
              PublicKey publicKey = loadPublicKeyFromFile(algorithm, "a.pub");
              PrivateKey privateKey = loadPrivateKeyFromFile(algorithm, "a.pri");
  
              String encrypt = encrypt(algorithm, input, privateKey, 245);
              String decrypt = decrypt(algorithm, encrypt, publicKey, 256);
  
              System.out.println(decrypt);
  
          } catch (Exception e) {
              e.printStackTrace();
          }
      }
  
      /**
       * 生成密钥对并保存在本地文件中
       *
       * @param algorithm : 算法
       * @param pubPath   : 公钥保存路径
       * @param priPath   : 私钥保存路径
       * @throws Exception
       */
      private static void generateKeyToFile(String algorithm, String pubPath, String priPath) throws Exception {
          // 获取密钥对生成器
          KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(algorithm);
          // 获取密钥对
          KeyPair keyPair = keyPairGenerator.generateKeyPair();
          // 获取公钥
          PublicKey publicKey = keyPair.getPublic();
          // 获取私钥
          PrivateKey privateKey = keyPair.getPrivate();
          // 获取byte数组
          byte[] publicKeyEncoded = publicKey.getEncoded();
          byte[] privateKeyEncoded = privateKey.getEncoded();
          // 进行Base64编码
          String publicKeyString = Base64.encode(publicKeyEncoded);
          String privateKeyString = Base64.encode(privateKeyEncoded);
          // 保存文件
          FileUtils.writeStringToFile(new File(pubPath), publicKeyString, Charset.forName("UTF-8"));
          FileUtils.writeStringToFile(new File(priPath), privateKeyString, Charset.forName("UTF-8"));
  
      }
  
      /**
       * 从文件中加载公钥
       *
       * @param algorithm : 算法
       * @param filePath  : 文件路径
       * @return : 公钥
       * @throws Exception
       */
      private static PublicKey loadPublicKeyFromFile(String algorithm, String filePath) throws Exception {
          // 将文件内容转为字符串
          String keyString = FileUtils.readFileToString(new File(filePath), Charset.forName("UTF-8"));
  
          return loadPublicKeyFromString(algorithm, keyString);
  
      }
  
      /**
       * 从字符串中加载公钥
       *
       * @param algorithm : 算法
       * @param keyString : 公钥字符串
       * @return : 公钥
       * @throws Exception
       */
      private static PublicKey loadPublicKeyFromString(String algorithm, String keyString) throws Exception {
          // 进行Base64解码
          byte[] decode = Base64.decode(keyString);
          // 获取密钥工厂
          KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
          // 构建密钥规范
          X509EncodedKeySpec keyspec = new X509EncodedKeySpec(decode);
          // 获取公钥
          return keyFactory.generatePublic(keyspec);
  
      }
  
      /**
       * 从文件中加载私钥
       *
       * @param algorithm : 算法
       * @param filePath  : 文件路径
       * @return : 私钥
       * @throws Exception
       */
      private static PrivateKey loadPrivateKeyFromFile(String algorithm, String filePath) throws Exception {
          // 将文件内容转为字符串
          String keyString = FileUtils.readFileToString(new File(filePath), Charset.forName("UTF-8"));
          return loadPrivateKeyFromString(algorithm, keyString);
  
      }
  
      /**
       * 从字符串中加载私钥
       *
       * @param algorithm : 算法
       * @param keyString : 私钥字符串
       * @return : 私钥
       * @throws Exception
       */
      private static PrivateKey loadPrivateKeyFromString(String algorithm, String keyString) throws Exception {
          // 进行Base64解码
          byte[] decode = Base64.decode(keyString);
          // 获取密钥工厂
          KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
          // 构建密钥规范
          PKCS8EncodedKeySpec keyspec = new PKCS8EncodedKeySpec(decode);
          // 生成私钥
          return keyFactory.generatePrivate(keyspec);
  
      }
  
      /**
       * 使用密钥加密数据
       *
       * @param algorithm      : 算法
       * @param input          : 原文
       * @param key            : 密钥
       * @param maxEncryptSize : 最大加密长度(需要根据实际情况进行调整)
       * @return : 密文
       * @throws Exception
       */
      private static String encrypt(String algorithm, String input, Key key, int maxEncryptSize) throws Exception {
          // 获取Cipher对象
          Cipher cipher = Cipher.getInstance(algorithm);
          // 初始化模式(加密)和密钥
          cipher.init(Cipher.ENCRYPT_MODE, key);
          // 将原文转为byte数组
          byte[] data = input.getBytes();
          // 总数据长度
          int total = data.length;
          // 输出流
          ByteArrayOutputStream baos = new ByteArrayOutputStream();
          decodeByte(maxEncryptSize, cipher, data, total, baos);
          // 对密文进行Base64编码
          return Base64.encode(baos.toByteArray());
  
      }
  
      /**
       * 解密数据
       *
       * @param algorithm      : 算法
       * @param encrypted      : 密文
       * @param key            : 密钥
       * @param maxDecryptSize : 最大解密长度(需要根据实际情况进行调整)
       * @return : 原文
       * @throws Exception
       */
      private static String decrypt(String algorithm, String encrypted, Key key, int maxDecryptSize) throws Exception {
          // 获取Cipher对象
          Cipher cipher = Cipher.getInstance(algorithm);
          // 初始化模式(解密)和密钥
          cipher.init(Cipher.DECRYPT_MODE, key);
          // 由于密文进行了Base64编码, 在这里需要进行解码
          byte[] data = Base64.decode(encrypted);
          // 总数据长度
          int total = data.length;
          // 输出流
          ByteArrayOutputStream baos = new ByteArrayOutputStream();
  
          decodeByte(maxDecryptSize, cipher, data, total, baos);
          // 输出原文
          return baos.toString();
  
      }
  
      /**
       * 分段处理数据
       *
       * @param maxSize : 最大处理能力
       * @param cipher  : Cipher对象
       * @param data    : 要处理的byte数组
       * @param total   : 总数据长度
       * @param baos    : 输出流
       * @throws Exception
       */
      private static void decodeByte(int maxSize, Cipher cipher, byte[] data, int total, ByteArrayOutputStream baos) throws Exception {
          // 偏移量
          int offset = 0;
          // 缓冲区
          byte[] buffer;
          // 如果数据没有处理完, 就一直继续
          while (total - offset > 0) {
              // 如果剩余的数据 >= 最大处理能力, 就按照最大处理能力来加密数据
              if (total - offset >= maxSize) {
                  // 加密数据
                  buffer = cipher.doFinal(data, offset, maxSize);
                  // 偏移量向右侧偏移最大数据能力个
                  offset += maxSize;
              } else {
                  // 如果剩余的数据 < 最大处理能力, 就按照剩余的个数来加密数据
                  buffer = cipher.doFinal(data, offset, total - offset);
                  // 偏移量设置为总数据长度, 这样可以跳出循环
                  offset = total;
              }
              // 向输出流写入数据
              baos.write(buffer);
          }
      }
  
  }
  ```

## 6. DES加密解密

- 示例代码

  

  ```java
  import com.sun.org.apache.xml.internal.security.utils.Base64;
  import javax.crypto.Cipher;
  import javax.crypto.SecretKey;
  import javax.crypto.SecretKeyFactory;
  import javax.crypto.spec.DESKeySpec;
  import javax.crypto.spec.IvParameterSpec;
  import java.security.spec.KeySpec;
  
  public class DESDemo {
  
      public static final String algorithm = "DES";
  
      // 这是默认模式
      // public static final String transformation = "DES/ECB/PKCS5Padding";
      // 使用CBC模式, 在初始化Cipher对象时, 需要增加参数, 初始化向量IV : IvParameterSpec iv = new IvParameterSpec(key.getBytes());
      // public static final String transformation = "DES/CBC/PKCS5Padding";
      // NOPadding: 使用NOPadding模式时, 原文长度必须是8byte的整数倍
      public static final String transformation = "DES/ECB/NOPadding";
      public static final String key = "12345678";
      public static final String original = "你好11";
  
      // QO2klVpoYT8=
      // QO2klVpoYT8=
      public static void main(String[] args) throws Exception {
  
          String encryptByDES = encryptByDES();
  
          System.out.println(encryptByDES);
          String decryptByDES = decryptByDES(encryptByDES);
          System.out.println(decryptByDES);
      }
  
      public static String encryptByDES() throws Exception {
          // 获取Cipher
          Cipher cipher = Cipher.getInstance(transformation);
  
        // 指定密钥规则
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), algorithm);
  
          // 指定模式(加密)和密钥
          // 创建初始向量
          IvParameterSpec iv = new IvParameterSpec(key.getBytes());
          cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
          //  cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, iv);
          // 加密
          byte[] bytes = cipher.doFinal(original.getBytes());
          // 输出加密后的数据
          // com.sun.org.apache.xml.internal.security.utils.Base64
          return Base64.encode(bytes);
      }
  
      public static String decryptByDES(String encrypted) throws Exception {
          // 获取Cipher
          Cipher cipher = Cipher.getInstance(transformation);
  
        // 指定密钥规则
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), algorithm);
  
          // 指定模式(解密)和密钥
          // 创建初始向量
          IvParameterSpec iv = new IvParameterSpec(key.getBytes());
          cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
          //  cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, iv);
          // 解码密文
          // com.sun.org.apache.xml.internal.security.utils.Base64
          byte[] decode = Base64.decode(encrypted);
          // 解密
          byte[] bytes = cipher.doFinal(decode);
          // 输出解密后的数据
          return new String(bytes);
      }
  
  }
  ```

## 7. AES加密解密

- 示例代码

  

  ```java
  import com.sun.org.apache.xml.internal.security.utils.Base64;
  import javax.crypto.Cipher;
  import javax.crypto.spec.IvParameterSpec;
  import javax.crypto.spec.SecretKeySpec;
  
  public class AESDemo {
  
      public static final String algorithm = "AES";
  
      // 这是默认模式
      //  public static final String transformation = "AES/ECB/PKCS5Padding";
      // 使用CBC模式, 在初始化Cipher对象时, 需要增加参数, 初始化向量IV : IvParameterSpec iv = new IvParameterSpec(key.getBytes());
      //  public static final String transformation = "AES/CBC/PKCS5Padding";
      // NOPadding: 使用NOPadding模式时, 原文长度必须是8byte的整数倍
      public static final String transformation = "AES/CBC/NOPadding";
      public static final String key = "1234567812345678";
      public static final String original = "你好你好你1";
  
      public static void main(String[] args) throws Exception {
  
          String encryptByAES = encryptByAES();
          System.out.println(encryptByAES);
          String decryptByAES = decryptByAES(encryptByAES);
          System.out.println(decryptByAES);
  
      }
  
      public static String encryptByAES() throws Exception {
  
          // 获取Cipher
          Cipher cipher = Cipher.getInstance(transformation);
          // 生成密钥
          SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), algorithm);
          // 指定模式(加密)和密钥
          // 创建初始化向量
          IvParameterSpec iv = new IvParameterSpec(key.getBytes());
          cipher.init(Cipher.ENCRYPT_MODE, keySpec, iv);
          //cipher.init(Cipher.ENCRYPT_MODE, keySpec);
          // 加密
          byte[] bytes = cipher.doFinal(original.getBytes());
  
          return Base64.encode(bytes);
      }
  
      public static String decryptByAES(String encrypted) throws Exception {
  
          // 获取Cipher
          Cipher cipher = Cipher.getInstance(transformation);
          // 生成密钥
          SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), algorithm);
          // 指定模式(解密)和密钥
          // 创建初始化向量
          IvParameterSpec iv = new IvParameterSpec(key.getBytes());
          cipher.init(Cipher.DECRYPT_MODE, keySpec, iv);
          //  cipher.init(Cipher.DECRYPT_MODE, keySpec);
          // 解密
          byte[] bytes = cipher.doFinal(Base64.decode(encrypted));
  
          return new String(bytes);
      }
  }
  ```

### 7.1 加密模式 - ECB

- ECB : Electronic codebook, 电子密码本. 需要加密的消息按照块密码的块大小被分为数个块，并对每个块进行独立加密

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-4.png')" alt="wxmp">

  i004.png

- 优点 : 可以并行处理数据
- 缺点 : 同样的原文生成同样的密文, 不能很好的保护数据

### 7.2 加密模式 - CBC

- CBC : Cipher-block chaining, 密码块链接. 每个明文块先与前一个密文块进行异或后，再进行加密。在这种方法中，每个密文块都依赖于它前面的所有明文块

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-5.png')" alt="wxmp">

  i005.png

- 优点 : 同样的原文生成的密文不一样
- 缺点 : 串行处理数据

### 7.3 填充模式 - NoPadding

- 不填充.
- 在DES加密算法下, 要求原文长度必须是8byte的整数倍
- 在AES加密算法下, 要求原文长度必须是16byte的整数倍

### 7.4 填充模式 - PKCS5Padding

- 数据块的大小为8位, 不够就补足。

- AES有的同学没问题(https://stackoverflow.com/questions/20770072/aes-cbc-pkcs5padding-vs-aes-cbc-pkcs7padding-with-256-key-size-performance-java)

  ([https://zhiwei.li/text/2009/05/17/%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E7%AE%97%E6%B3%95%E7%9A%84pkcs5%E5%92%8Cpkcs7%E5%A1%AB%E5%85%85/](https://zhiwei.li/text/2009/05/17/对称加密算法的pkcs5和pkcs7填充/))

- 

- 默认情况下, 加密模式和填充模式为 : ECB/PKCS5Padding

- 如果使用CBC模式, 在初始化Cipher对象时, 需要增加参数, 初始化向量IV : IvParameterSpec iv = new IvParameterSpec(key.getBytes());

## 8. 消息摘要

- 消息摘要（Message Digest）又称为数字摘要(Digital Digest)
- 它是一个唯一对应一个消息或文本的固定长度的值，它由一个单向Hash加密函数对消息进行作用而产生

### 8.1 特点：

- 无论输入的消息有多长，计算出来的消息摘要的长度总是固定的。例如应用MD5算法摘要的消息有128个比特位，用SHA-1算法摘要的消息最终有160比特位的输出

- 只要输入的消息不同，对其进行摘要以后产生的摘要消息也必不相同；但相同的输入必会产生相同的输出

- 消息摘要是单向、不可逆的

- 常见算法 :

  - MD5
  - SHA1
  - SHA256
  - SHA512

- [在线获取消息摘要](http://tool.oschina.net/encrypt?type=2)

- 示例代码

  

  ```java
  import java.io.ByteArrayOutputStream;
  import java.io.FileInputStream;
  import java.security.MessageDigest;
  import java.security.NoSuchAlgorithmException;
  
  public class Md5Demo {
  
      public static void main(String[] args) throws Exception {
          String input = "aa";
  
          String md5 = getDigestFile("MD5", "apache-tomcat-9.0.8-windows-x64.zip");
          System.out.println(md5);
  
          String sha1 = getDigestFile("SHA-1", "apache-tomcat-9.0.8-windows-x64.zip");
          System.out.println(sha1);
  
          String sha256 = getDigestFile("SHA-256", "apache-tomcat-9.0.8-windows-x64.zip");
          System.out.println(sha256);
  
          String sha512 = getDigestFile("SHA-512", "apache-tomcat-9.0.8-windows-x64.zip");
          System.out.println(sha512);
  
      }
  
      /**
       * 获取字符串的消息摘要
       *
       * @param algorithm : 算法
       * @param input     : 原文
       * @return : 消息摘要
       * @throws NoSuchAlgorithmException
       */
      private static String getDigest(String algorithm, String input) throws NoSuchAlgorithmException {
          // 获取消息摘要对象
          MessageDigest md = MessageDigest.getInstance(algorithm);
          // 获取消息摘要
          byte[] digest = md.digest(input.getBytes());
  
          return toHex(digest);
      }
  
      /**
       * 获取文件的消息摘要
       *
       * @param algorithm : 算法
       * @param filePath  : 文件路径
       * @return : 消息摘要
       * @throws Exception
       */
      private static String getDigestFile(String algorithm, String filePath) throws Exception {
          FileInputStream fis = new FileInputStream(filePath);
          int len;
          byte[] buffer = new byte[1024];
          ByteArrayOutputStream baos = new ByteArrayOutputStream();
          while ((len = fis.read(buffer)) != -1) {
              baos.write(buffer, 0, len);
          }
  
          // 获取消息摘要对象
          MessageDigest md = MessageDigest.getInstance(algorithm);
          // 获取消息摘要
          byte[] digest = md.digest(baos.toByteArray());
  
          return toHex(digest);
  
      }
  
      private static String toHex(byte[] digest) {
          StringBuilder sb = new StringBuilder();
  
          for (byte b : digest) {
              // 转为16jinzhi进制数据
              int i = b & 0xff;
              // 转为字符串
              String hex = Integer.toHexString(i);
              // 如果长度为1,前面补0
              if (hex.length() == 1) {
                  hex = 0 + hex;
              }
              sb.append(hex);
          }
          return sb.toString();
      }
  }
  ```

### 8.2 总结

- MD5算法 : 摘要结果16个字节, 转16进制后32个字节
- SHA1算法 : 摘要结果20个字节, 转16进制后40个字节
- SHA256算法 : 摘要结果32个字节, 转16进制后64个字节
- SHA512算法 : 摘要结果64个字节, 转16进制后128个字节

## 9.数字签名

- 数字签名又称公钥数字签名、电子签章

- 就是只有信息的发送者才能产生的别人无法伪造的一段数字串，这段数字串同时也是对信息的发送者发送信息真实性的一个有效证明

- 数字签名是非对称密钥加密技术与数字摘要技术的应用

- 示例代码

  

  ```java
  import com.sun.org.apache.xml.internal.security.utils.Base64;
  import java.security.*;
  
  public class SignatureDemo {
      public static void main(String[] args) throws Exception {
          String a = "123";
  
          PublicKey publicKey = RsaDemo.loadPublicKeyFromFile("RSA", "a.pub");
          PrivateKey privateKey = RsaDemo.loadPrivateKeyFromFile("RSA", "a.pri");
  
          String signaturedData = getSignature(a, "sha256withrsa", privateKey);
  
          boolean b = verifySignature(a, "sha256withrsa", publicKey, signaturedData);
  
      }
  
      /**
       * 生成签名
       *
       * @param input      : 原文
       * @param algorithm  : 算法
       * @param privateKey : 私钥
       * @return : 签名
       * @throws Exception
       */
      private static String getSignature(String input, String algorithm, PrivateKey privateKey) throws Exception {
          // 获取签名对象
          Signature signature = Signature.getInstance(algorithm);
          // 初始化签名
          signature.initSign(privateKey);
          // 传入原文
          signature.update(input.getBytes());
          // 开始签名
          byte[] sign = signature.sign();
          // 对签名数据进行Base64编码
          return Base64.encode(sign);
      }
  
      /**
       * 校验签名
       *
       * @param input          : 原文
       * @param algorithm      : 算法
       * @param publicKey      : 公钥
       * @param signaturedData : 签名
       * @return : 数据是否被篡改
       * @throws Exception
       */
      private static boolean verifySignature(String input, String algorithm, PublicKey publicKey, String signaturedData) throws Exception {
          // 获取签名对象
          Signature signature = Signature.getInstance(algorithm);
          // 初始化签名
          signature.initVerify(publicKey);
          // 传入原文
          signature.update(input.getBytes());
          // 校验数据
          return signature.verify(Base64.decode(signaturedData));
  
      }
  
  }
  ```

### 9.1签名流程图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/intro-6.png')" alt="wxmp">


i006.png



## 参考文章
* https://www.jianshu.com/p/213d69ac27b3