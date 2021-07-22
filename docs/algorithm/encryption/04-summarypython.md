---
title: 常见加解密算法(Python)
---

::: tip
本文主要是介绍 常见加解密算法(Python) 。
:::

[[toc]]

网络中传输敏感信息的时候通常会对字符串做加密解密处理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/encryption/encrypython-1.png')" alt="wxmp">

## 1.Base64位加密（可加密解密）

最简单的加密方式，没有密钥，这种方式只要让别人拿到你的密文，就可以直接解密，只能用来迷惑，一般情况下不单独使用，因为真的并没有什么卵用~可以和其他加密方式混合起来，作为一层外部包装。

``` py
import base64
data = "abc"
#加密
m = Base64.encodestring(data)
print m        #得到一个base64的值
#解密
date = Base64.decodestring(m)
```

　　

## 2.MD5加密（加密不可逆）
MD5的全称是Message-Digest Algorithm 5（信息-摘要算法）。128位长度。目前MD5是一种不可逆算法。具有很高的安全性。它对应任何字符串都可以加密成一段唯一的固定长度的代码。（小贴士：为啥MD5加密算法不可逆呢~ 按道理来说有加密方式，就会有解密方式呀？因为MD5加密是有种有损的加密方式，比如一段数据为'123'，我在加密的时候，遇到1和3都直接当做是a，加密后变成了'a2a'，所以解密的时候就出现了4种组合'323''121''123''321'，数据一多，自然找不到原始的数据了，当然这种方式加密的密文也不需要解密，需要的时候直接发送原始密文就好了~只是看不到密文原本的内容）

``` py
import hashlib
import base64
data1 = "abc"
data2 = 'def'
hash = hashlib.md5()
#多个文件多次加密
hash.update(data1)
hash.update(data2)
value = hash.digest()
print repr(value)        #得到一个二进制的字符串
print hash.hexdigest()     #得到一个十六进制的字符串
print base64.encodestring(value)    #得到base64的值
```

　　

## 3.sha1加密（加密不可逆）
SHA1的全称是Secure Hash Algorithm(安全哈希算法) 。SHA1基于MD5，加密后的数据长度更长。它对长度小于264的输入，产生长度为160bit的散列值。比MD5多32位。因此，比MD5更加安全，但SHA1的运算速度就比MD5要慢了。使用方法和MD5其实是一样的~ 

``` py
import hashlib
#单个文件一次加密
value = hashlib.sha1('This is a sha1 test!').hexdigest()
print value       #得到一个十六进制的字符串
```

　　

## 4.AES加密（需要密钥才能解密）
AES加密为对称密钥加密，加密和解密都是用同一个解密规则，AES加密过程是在一个4×4的字节矩阵上运作，这个矩阵又称为"状态(state)"，因为密钥和加密块要在矩阵上多次的迭代，置换，组合，所以对加密快和密钥的字节数都有一定的要求，AES密钥长度的最少支持为128、192、256，加密块分组长度128位。这种加密模式有一个最大弱点：甲方必须把加密规则告诉乙方，否则无法解密。保存和传递密钥，就成了最头疼的问题。 

``` py
from Crypto.Cipher import AES
#密钥必须是16,24,32位的
key  = '1234567890123456'    
data = 'abc'
BS = 16
#加密函数，如果text不足16位就补足为16位，
pad = lambda s: s + (BS-len(s) % BS) * chr(BS - len(s) % BS)
#加密
cipher = AES.new(key)
encrypted = cipher.encrypt(pad(m))
#解密
cipher = AES.new(key)
encrypted = cipher.decrypt(pad(m))
```

　　

## 5.RSA加密（公钥加密，私钥解密）
它是目前最重要的加密算法！计算机通信安全的基石，保证了加密数据不会被破解。你可以想象一下，信用卡交易被破解的后果。甲乙双方通讯，乙方生成公钥和私钥，甲方获取公钥，并对信息加密（公钥是公开的，任何人都可以获取），甲方用公钥对信息进行加密，此时加密后的信息只有私钥才可以破解，所以只要私钥不泄漏，就能保证信息的安全性。

``` py
import rsa
# 先生成一对密钥，然后保存.pem格式文件，当然也可以直接使用
(pubkey, privkey) = rsa.newkeys(1024)
pub = pubkey.save_pkcs1()
pubfile = open('public.pem','w+')
pubfile.write(pub)
pubfile.close()
pri = privkey.save_pkcs1()
prifile = open('private.pem','w+')
prifile.write(pri)
prifile.close()
 
# load公钥和密钥
message = 'hello'
with open('public.pem') as publickfile:
p = publickfile.read()
pubkey = rsa.PublicKey.load_pkcs1(p)
with open('private.pem') as privatefile:
p = privatefile.read()
privkey = rsa.PrivateKey.load_pkcs1(p)
  
# 用公钥加密、再用私钥解密
crypto = rsa.encrypt(message, pubkey)
message = rsa.decrypt(crypto, privkey)
print message
  
# sign 用私钥签名认真、再用公钥验证签名
signature = rsa.sign(message, privkey, 'SHA-1')
rsa.verify('hello', signature, pubkey)
```



## 参考文章
* https://www.cnblogs.com/qianjinyan/p/10418750.html