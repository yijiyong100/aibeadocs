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
          '/java/intro/06.1-java-typeconvert',
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
          '/java/collection/08.1-listconvertarray',
          '/java/collection/08.2-listlistdeal',
          '/java/collection/08.3-lambdaintro',
          '/java/collection/08.4-lambdacommon',
          '/java/collection/08.5-lambdaintroprosum',
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
        '/db/intro/01-intro',
        '/db/intro/02-relationdb',
        '/db/intro/03-sqlintro',
        '/db/intro/04-security',
        '/db/intro/05-commplete',
        '/db/intro/06-dbtheory',
        '/db/intro/07-dbdesign',
        '/db/intro/08-dbthreepara',
      ]
    },
    {
      title: '基础常用SQL',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/comsql/01-basicselect',
        '/db/comsql/02-joinselect',
        '/db/comsql/03-otherselect',
        '/db/comsql/04-editsql',
        '/db/comsql/05-procedure',
        '/db/comsql/06-trigger',
        '/db/comsql/07-sumcase',
      ]
    },
    {
      title: 'MySQL基础知识',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/mysqlbasic/01-intro',
        '/db/mysqlbasic/01.1-mysqlcmd',
        '/db/mysqlbasic/01.2-mysqlfunction',
        '/db/mysqlbasic/02-storageengine',
        '/db/mysqlbasic/03-mysqlindex',
        '/db/mysqlbasic/04-mysqltransaction',
        '/db/mysqlbasic/05-mysqllock',
        '/db/mysqlbasic/05.1-informationschema',
        '/db/mysqlbasic/05.2-mysqlbusidict',
        '/db/mysqlbasic/06-mysqlsummary',
      ]
    },
    {
      title: 'MySQL存储过程和函数',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/mysqlpro/01-procedure',
        '/db/mysqlpro/02-function',
        '/db/mysqlpro/03-call',
        '/db/mysqlpro/04-devrela',
        '/db/mysqlpro/05-cursor',
        '/db/mysqlpro/06-trigger',
      ]
    },
    {
      title: 'MySQL性能优化(一)',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/mysqlopt1/01-solutionsum',
        '/db/mysqlopt1/02-idxdesignopt',
        '/db/mysqlopt1/03-explainplan',
        '/db/mysqlopt1/04-selectopt',
        '/db/mysqlopt1/05-slowselect',
        '/db/mysqlopt1/06-selectsummary',
      ]
    },
    {
      title: 'MySQL性能优化(二)',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/mysqlopt2/01-districtandtable',
        '/db/mysqlopt2/02-masterslavecopyprin',
        '/db/mysqlopt2/03-masterslavecopycase',
        '/db/mysqlopt2/04-loadbalance',
        '/db/mysqlopt2/05-readwritesepration',
        '/db/mysqlopt2/06-paramopt',
      ]
    },
    {
      title: 'Redis介绍和总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/db/redis/01-intro',
        '/db/redis/02-install',
        '/db/redis/03-optcmd',
        '/db/redis/04-iomultiplexing',
        '/db/redis/05-coreknowledge',
        '/db/redis/06-summary',
        '/db/redis/07-interviewknowledge',]
    }
  ],
  "/algorithm/": [
    {
      title: '数据结构和算法',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/basic/01-basicconcept',
        '/algorithm/basic/02-intro',
        '/algorithm/basic/03-timespacecomplexity',
        '/algorithm/basic/03.1-summaryknowledge',
        '/algorithm/basic/04-linetable',
        '/algorithm/basic/05-stackandqueue'
      ]
    },
    {
      title: '数据结构-【树】',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/basic/06-treebasic',
        '/algorithm/basic/07-binarysearchtree',
        '/algorithm/basic/08-balancedbinarytree',
        '/algorithm/basic/09-redblacktree',
        '/algorithm/basic/09.1-btree',
        '/algorithm/basic/09.2-bsubtracttree',
        '/algorithm/basic/09.3-bplustree',
        '/algorithm/basic/09.4-bplusaddtree',
        '/algorithm/basic/10-huffmantree',
        '/algorithm/basic/10.1-heap',
        '/algorithm/basic/10.2-treediff',
      ]
    },
    {
      title: '数据结构-【图】',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/basic/11-mapintro',
        '/algorithm/basic/12-mapstorage',
        '/algorithm/basic/13-mapvisitbfs',
        '/algorithm/basic/13-mapvisitdfs',
        '/algorithm/basic/15-mapmstprim',
        '/algorithm/basic/16-mapmstkruskal',
        '/algorithm/basic/17-mapspdijkstra',
        '/algorithm/basic/18-mapfloyd',
        '/algorithm/basic/19-maptopologicalsort',
        '/algorithm/basic/20-mapcriticalpath',
        '/algorithm/basic/21-mapknowledgesum',
        '/algorithm/basic/22-mapcodesum',
        '/algorithm/basic/23-mapsummary',
      ]
    },
    {
      title: '算法动态展示',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/visual/01-commondy',
        '/algorithm/visual/02-algorithmvisualizer',
        '/algorithm/visual/03-usfcavisual',
        '/algorithm/visual/04-visualgo',
      ]
    },
    {
      title: '算法思想总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/thought/01-thoughts8intro',
        '/algorithm/thought/02-thoughts5intro',
        '/algorithm/thought/03-thoughts5detail',
        '/algorithm/thought/04-divideandconquer',
        '/algorithm/thought/05-dynamicprogramming',
        '/algorithm/thought/06-greedyalgorithm-',
        '/algorithm/thought/07-backtracking ',
        '/algorithm/thought/08-branchandbound',
      ]
    },
    {
      title: '查找算法',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/search/01-intro',
        '/algorithm/search/02-sequentialsearch',
        '/algorithm/search/03-binarysearch',
        '/algorithm/search/04-interpolationsearch',
        '/algorithm/search/05-fibonaccisearch',
        '/algorithm/search/06-treetablesearch',
        '/algorithm/search/07-blocksearch',
        '/algorithm/search/08-hashsearch',
        '/algorithm/search/09-astarsearch',]
    },
    {
      title: '排序算法',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/sort/01-intro',
        '/algorithm/sort/02-insertionsort',
        '/algorithm/sort/03-shellsort',
        '/algorithm/sort/04-simpleselectionsort',
        '/algorithm/sort/05-heapsort',
        '/algorithm/sort/06-bubblesort',
        '/algorithm/sort/07-quicksort',
        '/algorithm/sort/08-mergesort',
        '/algorithm/sort/09-radixsort',
        '/algorithm/sort/10-sumamry',
        '/algorithm/sort/11-summarypython',
      ]
    },
    {
      title: '字符串匹配算法',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/strmatch/01-intro',
        '/algorithm/strmatch/02-bf',
        '/algorithm/strmatch/03-mp',
        '/algorithm/strmatch/04-kmp',
        '/algorithm/strmatch/05-bm',
        '/algorithm/strmatch/06-bmh',
        '/algorithm/strmatch/07-needlemanwunsch',
        '/algorithm/strmatch/08-trie',
        '/algorithm/strmatch/09-acautomatch',
        '/algorithm/strmatch/10-rk',
      ]
    },
    {
      title: '加密解密算法',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/algorithm/encryption/01-intro',
        '/algorithm/encryption/02-prouse',
        '/algorithm/encryption/03-javacode',
        '/algorithm/encryption/04-summarypython',
        '/algorithm/encryption/05-summary',
      ]
    }
  ],
  "/spring/": [
    {
      title: 'Spring基础知识',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/spring/basic/01-intro',
        '/spring/basic/02-iocaopintro',
        '/spring/basic/03-iocaopsumary',
        '/spring/basic/04-iocaopcasesum',
        '/spring/basic/05-springsimplesum',
        '/spring/basic/06-springsummary',
      ]
    },
    {
      title: 'SpringMVC知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/spring/springmvc/01-intro',
        '/spring/springmvc/02-prinintro',
        '/spring/springmvc/03-prindetail',
        '/spring/springmvc/04-procedureprin',
        '/spring/springmvc/05-casesum',
        '/spring/springmvc/06-comminterview',
      ]
    },
    {
      title: 'SpringBoot知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/spring/springboot/01-intro',
        '/spring/springboot/02-caseintro',
        '/spring/springboot/02.1-caseymlpropertiesdiff',
        '/spring/springboot/03-workprin',
        '/spring/springboot/04-coreannotation3',
        '/spring/springboot/05-importantannotation27',
        '/spring/springboot/06-startprincodeanalysis',
        '/spring/springboot/07-comminterview',

      ]
    },
    {
      title: 'SpringBoot注解总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/spring/annotation/01-intro',
        '/spring/annotation/02-useandmethods',
        '/spring/annotation/03-springannprin',
        '/spring/annotation/04-anntotal1',
        '/spring/annotation/05-anntotal2',
        '/spring/annotation/06-commannotationmvc',
        '/spring/annotation/07-commannotationboot',
      ]
    },
    {
      title: 'SpringCloud知识介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/spring/springcloud/01-intro',
        '/spring/springcloud/02-commknowledge',
        '/spring/springcloud/03-prindetail',
      ]
    }
  ],
  "/framework/": [
    {
      title: '框架基础知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/basic/01-intro',
        '/framework/basic/02-commconceptdiff',
        '/framework/basic/03-commconceptrela',
        '/framework/basic/04-componentframe',
        '/framework/basic/05-microservintro',
        '/framework/basic/06-microserv15',
        '/framework/basic/07-springframethink',
      ]
    },
    {
      title: '日志框架知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/log/01-intro',
        '/framework/log/02-springbootlogintro',
        '/framework/log/03-springbootlogback',
      ]
    },
    {
      title: 'ORM框架知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/orm/01-intro',
        '/framework/orm/02-commormdiff',
        '/framework/orm/03-mybatiscase',
        '/framework/orm/04-hibernatecase',
        '/framework/orm/05-jpacase',
        '/framework/orm/06-mybatissum',
      ]
    },
    {
      title: 'NIO框架知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/nio/01-intro',
        '/framework/nio/02-commiointro',
        '/framework/nio/03-niobioaiodiff',
        '/framework/nio/04-nioframediff',
        '/framework/nio/05-nioprin',
        '/framework/nio/06-niounderprin',
      ]
    },
    {
      title: 'Netty框架知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/netty/01-intro',
        '/framework/netty/02-nettyio',
        '/framework/netty/03-nettythreadmodel',
        '/framework/netty/04-nettyreactor',
        '/framework/netty/05-nettyworkprin',
        '/framework/netty/06-nettysum',
      ]
    },
    {
      title: 'Netty案例实战总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/framework/nettycase/01-intro',
        '/framework/nettycase/02-designmodel',
        '/framework/nettycase/03-chatcaseio',
        '/framework/nettycase/04-chatcasebio',
        '/framework/nettycase/05-chatcasenio',
        '/framework/nettycase/06-chatcaseaio',
        '/framework/nettycase/07-springbootcase1',
        '/framework/nettycase/08-springbootcase2',
        '/framework/nettycase/09-springbootcase3',
        '/framework/nettycase/10-rpccase',
      ]
    }
  ],
  "/architecture/": [
    {
      title: '架构基础知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/architecture/basic/01-intro',
        '/architecture/basic/02-essence',
        '/architecture/basic/03-arcthink',
        '/architecture/basic/04-arcthinkcase',
        '/architecture/basic/05-arcdesingcorevalue',
        '/architecture/basic/06-arcdesingprin3',
        '/architecture/basic/07-arcdesignprindeatail',
      ]
    },
    {
      title: '微服务架构和分布式',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/architecture/microservanddistribute/01-intro',
        '/architecture/microservanddistribute/02-microservanddistributediff',
        '/architecture/microservanddistribute/03-microservandclusterdiff',
        '/architecture/microservanddistribute/04-micorservandsoadiff',
        '/architecture/microservanddistribute/05-microservsum',
      ]
    }
  ],
  "/dev/": [
    {
      title: '开发工具知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dev/tool/01-intro',
        '/dev/tool/02-mysql',
        '/dev/tool/03-gitcmd',
        '/dev/tool/04-gitvisualtool',
        '/dev/tool/05-idea20recommendedplug',
        '/dev/tool/06-jvmtool',
      ]
    },
    {
      title: '开发规范知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dev/standard/01-intro',
        '/dev/standard/02-mysqlstandard',
        '/dev/standard/03-mybatisstandard',
      ]
    },
    {
      title: '开发设计模式总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dev/designpattern/01-intro',
        '/dev/designpattern/02-6prinsintro',
        '/dev/designpattern/03-6prinsdetail',
        '/dev/designpattern/04-6prinscase',
        '/dev/designpattern/05-createpattern',
        '/dev/designpattern/06-structpattern',
        '/dev/designpattern/07-actionpattern',
        '/dev/designpattern/08-designpatternsum',

      ]
    }
  ],
  "/projprod/": [
    {
      title: '研发效能介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/projprod/rdefficiencyintro/01-intro',
        '/projprod/rdefficiencyintro/02-5indicators',
        '/projprod/rdefficiencyintro/03-6keypoints',
        '/projprod/rdefficiencyintro/04-measurementmethod',
        '/projprod/rdefficiencyintro/05-copingmethods',
        '/projprod/rdefficiencyintro/06-efficiencysystem',
      ]
    },
    {
      title: '研发效能提升',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/projprod/rdeffciencypromote/01-intro',
        '/projprod/rdeffciencypromote/02-efficiencymeasurement1',
        '/projprod/rdeffciencypromote/03-efficiencymeasurement2',
        '/projprod/rdeffciencypromote/04-kanban1',
        '/projprod/rdeffciencypromote/05-kanban2',
        '/projprod/rdeffciencypromote/06-shipping',
        '/projprod/rdeffciencypromote/07-qualitymanage',
        '/projprod/rdeffciencypromote/08-dailyscrummeeting',
        '/projprod/rdeffciencypromote/09-summary',
      ]
    },
    {
      title: '项目管理工具',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/projprod/rdeffciencytool/01-intro',
        '/projprod/rdeffciencytool/02-scrumtool',
        '/projprod/rdeffciencytool/03-openprojtool',
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