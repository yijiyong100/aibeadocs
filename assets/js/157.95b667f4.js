(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{672:function(t,s,a){"use strict";a.r(s);var n=a(53),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 常见加解密算法(Python) 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_1-base64位加密-可加密解密"}},[t._v("1.Base64位加密（可加密解密）")])]),a("li",[a("a",{attrs:{href:"#_2-md5加密-加密不可逆"}},[t._v("2.MD5加密（加密不可逆）")])]),a("li",[a("a",{attrs:{href:"#_3-sha1加密-加密不可逆"}},[t._v("3.sha1加密（加密不可逆）")])]),a("li",[a("a",{attrs:{href:"#_4-aes加密-需要密钥才能解密"}},[t._v("4.AES加密（需要密钥才能解密）")])]),a("li",[a("a",{attrs:{href:"#_5-rsa加密-公钥加密-私钥解密"}},[t._v("5.RSA加密（公钥加密，私钥解密）")])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("p",[t._v("网络中传输敏感信息的时候通常会对字符串做加密解密处理")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/encryption/encrypython-1.png"),alt:"wxmp"}}),t._v(" "),a("h2",{attrs:{id:"_1-base64位加密-可加密解密"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-base64位加密-可加密解密"}},[t._v("#")]),t._v(" 1.Base64位加密（可加密解密）")]),t._v(" "),a("p",[t._v("最简单的加密方式，没有密钥，这种方式只要让别人拿到你的密文，就可以直接解密，只能用来迷惑，一般情况下不单独使用，因为真的并没有什么卵用~可以和其他加密方式混合起来，作为一层外部包装。")]),t._v(" "),a("div",{staticClass:"language-py extra-class"},[a("pre",{pre:!0,attrs:{class:"language-py"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" base64\ndata "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"abc"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#加密")]),t._v("\nm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Base64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("encodestring"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" m        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#得到一个base64的值")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#解密")]),t._v("\ndate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Base64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("decodestring"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"_2-md5加密-加密不可逆"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-md5加密-加密不可逆"}},[t._v("#")]),t._v(" 2.MD5加密（加密不可逆）")]),t._v(" "),a("p",[t._v("MD5的全称是Message-Digest Algorithm 5（信息-摘要算法）。128位长度。目前MD5是一种不可逆算法。具有很高的安全性。它对应任何字符串都可以加密成一段唯一的固定长度的代码。（小贴士：为啥MD5加密算法不可逆呢~ 按道理来说有加密方式，就会有解密方式呀？因为MD5加密是有种有损的加密方式，比如一段数据为'123'，我在加密的时候，遇到1和3都直接当做是a，加密后变成了'a2a'，所以解密的时候就出现了4种组合'323''121''123''321'，数据一多，自然找不到原始的数据了，当然这种方式加密的密文也不需要解密，需要的时候直接发送原始密文就好了~只是看不到密文原本的内容）")]),t._v(" "),a("div",{staticClass:"language-py extra-class"},[a("pre",{pre:!0,attrs:{class:"language-py"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" hashlib\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" base64\ndata1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"abc"')]),t._v("\ndata2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'def'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hash")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" hashlib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("md5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#多个文件多次加密")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("update"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("update"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nvalue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("digest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("repr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#得到一个二进制的字符串")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hexdigest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#得到一个十六进制的字符串")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" base64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("encodestring"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#得到base64的值")]),t._v("\n")])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"_3-sha1加密-加密不可逆"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-sha1加密-加密不可逆"}},[t._v("#")]),t._v(" 3.sha1加密（加密不可逆）")]),t._v(" "),a("p",[t._v("SHA1的全称是Secure Hash Algorithm(安全哈希算法) 。SHA1基于MD5，加密后的数据长度更长。它对长度小于264的输入，产生长度为160bit的散列值。比MD5多32位。因此，比MD5更加安全，但SHA1的运算速度就比MD5要慢了。使用方法和MD5其实是一样的~")]),t._v(" "),a("div",{staticClass:"language-py extra-class"},[a("pre",{pre:!0,attrs:{class:"language-py"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" hashlib\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#单个文件一次加密")]),t._v("\nvalue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" hashlib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sha1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'This is a sha1 test!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hexdigest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" value       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#得到一个十六进制的字符串")]),t._v("\n")])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"_4-aes加密-需要密钥才能解密"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-aes加密-需要密钥才能解密"}},[t._v("#")]),t._v(" 4.AES加密（需要密钥才能解密）")]),t._v(" "),a("p",[t._v('AES加密为对称密钥加密，加密和解密都是用同一个解密规则，AES加密过程是在一个4×4的字节矩阵上运作，这个矩阵又称为"状态(state)"，因为密钥和加密块要在矩阵上多次的迭代，置换，组合，所以对加密快和密钥的字节数都有一定的要求，AES密钥长度的最少支持为128、192、256，加密块分组长度128位。这种加密模式有一个最大弱点：甲方必须把加密规则告诉乙方，否则无法解密。保存和传递密钥，就成了最头疼的问题。')]),t._v(" "),a("div",{staticClass:"language-py extra-class"},[a("pre",{pre:!0,attrs:{class:"language-py"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" Crypto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cipher "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" AES\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#密钥必须是16,24,32位的")]),t._v("\nkey  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1234567890123456'")]),t._v("    \ndata "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc'")]),t._v("\nBS "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#加密函数，如果text不足16位就补足为16位，")]),t._v("\npad "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("lambda")]),t._v(" s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" s "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BS"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" BS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("chr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BS "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" BS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#加密")]),t._v("\ncipher "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" AES"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("new"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nencrypted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cipher"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("encrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pad"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#解密")]),t._v("\ncipher "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" AES"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("new"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nencrypted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cipher"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("decrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pad"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"_5-rsa加密-公钥加密-私钥解密"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-rsa加密-公钥加密-私钥解密"}},[t._v("#")]),t._v(" 5.RSA加密（公钥加密，私钥解密）")]),t._v(" "),a("p",[t._v("它是目前最重要的加密算法！计算机通信安全的基石，保证了加密数据不会被破解。你可以想象一下，信用卡交易被破解的后果。甲乙双方通讯，乙方生成公钥和私钥，甲方获取公钥，并对信息加密（公钥是公开的，任何人都可以获取），甲方用公钥对信息进行加密，此时加密后的信息只有私钥才可以破解，所以只要私钥不泄漏，就能保证信息的安全性。")]),t._v(" "),a("div",{staticClass:"language-py extra-class"},[a("pre",{pre:!0,attrs:{class:"language-py"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" rsa\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 先生成一对密钥，然后保存.pem格式文件，当然也可以直接使用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pubkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" privkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("newkeys"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npub "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pubkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save_pkcs1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npubfile "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'public.pem'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'w+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npubfile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("write"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pub"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npubfile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("close"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npri "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" privkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save_pkcs1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprifile "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'private.pem'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'w+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprifile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("write"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pri"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprifile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("close"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# load公钥和密钥")]),t._v("\nmessage "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("with")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'public.pem'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" publickfile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\np "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" publickfile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npubkey "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PublicKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load_pkcs1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("with")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'private.pem'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" privatefile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\np "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" privatefile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprivkey "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PrivateKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load_pkcs1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("p"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 用公钥加密、再用私钥解密")]),t._v("\ncrypto "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("encrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pubkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmessage "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("decrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("crypto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" privkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" message\n  \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sign 用私钥签名认真、再用公钥验证签名")]),t._v("\nsignature "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sign"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" privkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SHA-1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrsa"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("verify"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" signature"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pubkey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://www.cnblogs.com/qianjinyan/p/10418750.html")])])])}),[],!1,null,null,null);s.default=p.exports}}]);