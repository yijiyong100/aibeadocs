module.exports = {
  "/java/":
    [
      {
        title: 'Java语言基础',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/intro/01-java-intro',
          '/java/intro/02-java-install',
          '/java/intro/03-java-grammer',
          '/java/intro/04-java-classaobject',
          '/java/intro/05-java-process-op',
          '/java/intro/06-java-syscomclass',
          '/java/intro/07-java-regexp',
          '/java/intro/08-java-method',
        ]
      },
      {
        title: 'Java面向对象基础',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/basic/01-lan-feature',
          '/java/basic/02-oop-feature',
          '/java/basic/03-class',
          '/java/basic/04-reflection',
          '/java/basic/05-exception',
        ]
      },
      {
        title: 'Java集合类',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/collection/01-intro',
          '/java/collection/02-collectionmap',
          '/java/collection/03-set',
          '/java/collection/04-list',
          '/java/collection/05-queue',
          '/java/collection/06-map',
          '/java/collection/07-listmapprinciple',
          '/java/collection/08-hashcollectionprin',
          '/java/collection/09-collectionsummary'
        ]
      },
      {
        title: 'Java文件IO流',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/file/01-intro',
          '/java/file/02-file',
          '/java/file/03-iobasic',
          '/java/file/04-iodetail',
          '/java/file/05-summary',
        ]
      },
      {
        title: 'Java网络编程',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/net/01-intro',
          '/java/net/02-netmodel',
          '/java/net/03-basicconcept',
          '/java/net/04-basicintro',
          '/java/net/05-tcpdetail',
          '/java/net/06-udpdetail',
          '/java/net/07-urlanduri',
          '/java/net/08-netdetail',
          '/java/net/09-netsummary',
        ]
      },
      {
        title: 'Java并发编程基础',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/thread/01-intro',
          '/java/thread/02-multithread',
          '/java/thread/03-conintro',
          '/java/thread/04-threadcreatediff',
          '/java/thread/05-threadattrop',
          '/java/thread/06-threadmethod',
          '/java/thread/07-threadsyncsum',
          '/java/thread/08-threadlocal',
          '/java/thread/09-threadgroup',
          '/java/thread/10-threadsyncalgorithm',
          '/java/thread/11-threadhookexception',
        ]
      },
      {
        title: 'Java并发编程JUC',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/juc/01-intro',
          '/java/juc/02-juccatogray',
          '/java/juc/03-jucblogrecommend',
          '/java/juc/04-juclockintro',
          '/java/juc/05-juclockdiff',
          '/java/juc/06-juclockaqs',
          '/java/juc/07-juclockuse',
          '/java/juc/08-jucatounsafe',
          '/java/juc/09-jucatointro',
          '/java/juc/10-jucatocas',
          '/java/juc/11-jucatoaba',
          '/java/juc/12-jucsyncintro',
          '/java/juc/13-jucsyncaqs',
          '/java/juc/14-juccolintro',
          '/java/juc/15-juccolhashmapbasic',
          '/java/juc/16-juccolhashmapadd',
          '/java/juc/17-juccolhashmapdiff',
          '/java/juc/18-jucexeintro',
          '/java/juc/19-jucexecommonthreadpool',
          '/java/juc/20-jucexescheduldthreadpool',
          '/java/juc/21-jucexefuture',
          '/java/juc/22-jucexeforkjoinprin',
          '/java/juc/23-jucexeforkjoindetail',
        ]
      },
      {
        title: 'Jvm虚拟机相关',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/jvm/01-intro',
          '/java/jvm/02-workprinciple',
          '/java/jvm/03-memorymodel',
          '/java/jvm/04-classload',
          '/java/jvm/05-gc',
          '/java/jvm/06-optcmd',
          '/java/jvm/07-optcase',
          '/java/jvm/08-summary',
        ]
      },
      {
        title: 'Java语言特性',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/characteristic/01-java8',
          '/java/characteristic/02-java9',
          '/java/characteristic/03-java10',
          '/java/characteristic/04-java11',
          '/java/characteristic/05-java12',
          '/java/characteristic/06-java13',
          '/java/characteristic/07-java14',
          '/java/characteristic/08-java15',
        ]
      }
    ],
  "/db/": [
    {
      title: '数据库基础',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/intro/01-intro.md',
        '/db/intro/02-relationdb.md',
        '/db/intro/03-sqlintro.md',
        '/db/intro/04-security.md',
        '/db/intro/05-commplete.md',
        '/db/intro/06-dbtheory.md',
        '/db/intro/07-dbdesign.md',
      ]
    }
  ],
  "/building/": [
    {
      title: '完善中',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/building/',
      ]
    }
  ],
  "/about/": [
    {
      title: '关于',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/about/aboutme',
        '/about/aboutqa',
      ]
    }
  ]
}