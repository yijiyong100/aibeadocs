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
          '/java/basic/03.1-generics',
          '/java/basic/04-reflection',
          '/java/basic/04.1-relectionsummay',
          '/java/basic/05-annotation',
          '/java/basic/05.1-annotationandreflection',
          '/java/basic/06-exception',
          '/java/basic/07-corebasiclib',
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
          '/java/collection/08.3-lambdabascigrammar',
          '/java/collection/08.3-lambdagrammarstream',
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
          '/java/jvm/04.1-classloadprocedure',
          '/java/jvm/04.2-classloaderdiff',
          '/java/jvm/05-gc',
          '/java/jvm/05.1-youngandtenured',
          '/java/jvm/05.2-commgctype',
          '/java/jvm/05.3-gclog',
          '/java/jvm/05.4-jvmopt',
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
        '/db/intro/02.1-dbcatintro',
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
        '/db/mysqlbasic/01.3-mysqllistop',
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
        '/db/mysqlpro/06.1-triggercase',
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
      ]
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
        '/algorithm/thought/06-greedyalgorithm',
        '/algorithm/thought/07-backtracking',
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
        '/algorithm/sort/10.1-dyphotosummary',
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
  "/ai/": [
    {
      title: '人工智能基础概念介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/intro/01-intro',
        '/ai/intro/02-subjectanddevelopment',
        '/ai/intro/03-summary',
      ]
    },
    {
      title: '大数据和AI的联系区别',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/diff/01-intro',
        '/ai/diff/02-diff2',
        '/ai/diff/03-summary',
      ]
    },
    {
      title: '机器学习-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/mlintro/01-intro',
        '/ai/mlintro/01.1-mlcoreprocedure',
        '/ai/mlintro/02-mlanddldiff',
        '/ai/mlintro/02.1-mlcase',
        '/ai/mlintro/03-summary',
      ]
    },
    {
      title: '深度学习-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/dlintro/01-intro',
        '/ai/dlintro/02-neuralnetworkintro',
        '/ai/dlintro/03-developmentintro',
        '/ai/dlintro/04-applicationsceneandprocedure',
        '/ai/dlintro/05-summary',
        '/ai/dlintro/06-blogrecommend',
      ]
    },
    {
      title: '神经网络-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/nnintro/01-intro',
        '/ai/nnintro/02-diff',
        '/ai/nnintro/03-summary',
      ]
    },
    {
      title: '神经网络-原理介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/nnprin/01-intro',
        '/ai/nnprin/02-algorithmprin',
        '/ai/nnprin/03-bpnnprin',
      ]
    },
    {
      title: '机器学习-算法介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/mlalgorithm/01-intro',
        '/ai/mlalgorithm/02-photointrotop10-1',
        '/ai/mlalgorithm/03-photointrotop10-2',
        '/ai/mlalgorithm/04-top10case',
        '/ai/mlalgorithm/05-summary',
      ]
    },
    {
      title: '机器学习-数学总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ai/mlmath/01-intro',
        '/ai/mlmath/02-mathknowledge',
        '/ai/mlmath/03-mathbasic',
        '/ai/mlmath/04-linearalgebrasum',
        '/ai/mlmath/05-probabilitystatisticssum',
        '/ai/mlmath/06-blogserialsrecommend',
        '/ai/mlmath/07-videorecommend',
      ]
    }
  ],
  "/ad/": [
    {
      title: 'AI开发框架-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/intro/01-intro',
        '/ad/intro/02-javamllibintro',
        '/ad/intro/03-6javamllibintro',
        '/ad/intro/04-pythonmllibintro',
        '/ad/intro/04.1-corepythonmldiff',
        '/ad/intro/05-top10diff',
      ]
    },
    {
      title: 'AI开发框架-DL4J介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/dl4jintro/01-intro',
        '/ad/dl4jintro/02-featuressummary',
        '/ad/dl4jintro/03-learnsourcerecommend',
      ]
    },
    {
      title: 'AI开发框架-DL4J案例',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/dl4jcase/01-intro',
        '/ad/dl4jcase/02-devcasseintro',
        '/ad/dl4jcase/03-trainingmodelandsave',
        '/ad/dl4jcase/04-bpnetclassifier',
        '/ad/dl4jcase/05-facerecognitioncase',
        '/ad/dl4jcase/06-casesummary',
      ]
    },
    {
      title: 'Python机器学习-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/pymlbasic/01-intro',
        '/ad/pymlbasic/02-mathsymbols',
        '/ad/pymlbasic/03-jupyternotebook',
        '/ad/pymlbasic/04-numpyintro',
        '/ad/pymlbasic/05-pandasintro',
        '/ad/pymlbasic/06-matplotlibintro',
      ]
    },
    {
      title: 'Python机器学习-入门案例',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/pymlcase/01-intro',
        '/ad/pymlcase/02-linearregressioncase',
        '/ad/pymlcase/03-logisticregressionclassification',
        '/ad/pymlcase/04-svmcase',
        '/ad/pymlcase/05-decisiontreeandrandomforest',
        '/ad/pymlcase/06-kmenascase',
      ]
    },
    {
      title: 'AI开发框架-SKLearn介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/sklearn/01-intro',
        '/ad/sklearn/02-simplecase',
        '/ad/sklearn/03-summary',
      ]
    },
    {
      title: 'AI开发框架-Pytorch介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/pytorch/01-intro',
        '/ad/pytorch/02-install',
        '/ad/pytorch/03-basicsprocedureandcase',
        '/ad/pytorch/04-imagerecognitioncase1',
        '/ad/pytorch/05-imagerecognitioncase2',
        '/ad/pytorch/06-blogrecommend',
        '/ad/pytorch/07-basicsummay',
      ]
    },
    {
      title: 'AI开发框架-Tensorflow介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ad/tensorflow/01-intro',
        '/ad/tensorflow/02-intsall',
        '/ad/tensorflow/03-datastructureandconcept',
        '/ad/tensorflow/04-core3function',
        '/ad/tensorflow/05-simplecase',
        '/ad/tensorflow/06-blogrecommend',
        '/ad/tensorflow/07-summary',
      ]
    }
  ],
  "/ac/": [
    {
      title: 'AI应用案例介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ac/intro/01-intro',
        '/ac/intro/02-2019top100case',
        '/ac/intro/03-2020top100case',
      ]
    },
    {
      title: '推荐系统-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ac/rsintro/01-intro',
        '/ac/rsintro/02-rspdintro',
        '/ac/rsintro/03-rstechintro',
        '/ac/rsintro/04-basicalgorithm',
        '/ac/rsintro/05-rsalgorithmdetail',
        '/ac/rsintro/06-jdrshis',
        '/ac/rsintro/07-rssummary',
      ]
    },
    {
      title: '推荐系统-案例介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ac/rscase/01-intro',
        '/ac/rscase/02-casearchiprin',
        '/ac/rscase/03-casealgorithmintro',
        '/ac/rscase/04-collaborativefilteringalgorithm',
        '/ac/rscase/05-casesummary1',
        '/ac/rscase/06-casesummary2',
        '/ac/rscase/07-caserecommendblog',
        '/ac/rscase/08-caserecommendvideo',
      ]
    },
    {
      title: '智慧城市-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ac/aicity/01-intro',
        '/ac/aicity/02-aicitysmartmethod',
        '/ac/aicity/03-citybrainintro',
        '/ac/aicity/04-aicityandcitybraindiff',
        '/ac/aicity/05-aicitysummary',
      ]
    },
    {
      title: '智慧大屏-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ac/aibigscreen/01-intro',
        '/ac/aibigscreen/02-5classiccase',
        '/ac/aibigscreen/03-20caseview',
        '/ac/aibigscreen/04-specialthemecaseview',
        '/ac/aibigscreen/05-githubcaseview',
        '/ac/aibigscreen/06-vuebigscreen',
        '/ac/aibigscreen/07-ajreporttool',
        '/ac/aibigscreen/08-summarycase',
      ]
    }
  ],
  "/bigdata/": [
    {
      title: '大数据基础概念介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/bigdata/intro/01-intro',
        '/bigdata/intro/02-comconcepts',
        '/bigdata/intro/03-classiccase',
      ]
    },
    {
      title: 'OLTP和OLAP介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/bigdata/oltpandolap/01-intro',
        '/bigdata/oltpandolap/02-diff',
        '/bigdata/oltpandolap/03-summary',
      ]
    },
    {
      title: '大数据技术体系介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/bigdata/techintro/01-intro',
        '/bigdata/techintro/02-commtechcomponent',
        '/bigdata/techintro/03-techarchitecture',
        '/bigdata/techintro/04-techsystem',
        '/bigdata/techintro/05-corearchitecture',
        '/bigdata/techintro/06-techsystemsummary',
      ]
    }
  ],
  "/dc/": [
    {
      title: '大数据采集-工具介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dc/intro/01-intro',
        '/dc/intro/02-diff',
        '/dc/intro/03-summary',
      ]
    },
    {
      title: '大数据采集-Sqoop',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dc/sqoop/01-intro',
        '/dc/sqoop/02-prin',
        '/dc/sqoop/03-summary',
      ]
    },
    {
      title: '大数据采集-Flume',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dc/flume/01-intro',
        '/dc/flume/02-installuse',
        '/dc/flume/03-prin',
        '/dc/flume/04-flumesqoopdiff',
        '/dc/flume/05-sumcase',
        '/dc/flume/06-districonf',
      ]
    },
    {
      title: '大数据采集-Kafka',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dc/kafka/01-basiccase',
        '/dc/kafka/02-caseprin',
        '/dc/kafka/03-summarycase',
      ]
    },
    {
      title: '大数据采集-DataX',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dc/datax/01-intro',
        '/dc/datax/02-prin',
        '/dc/datax/03-case',
      ]
    }
  ],
  "/ds/": [
    {
      title: '大数据存储-Hadoop介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ds/intro/01-basicintro',
        '/ds/intro/02-detailintro',
        '/ds/intro/03-hdfsintro',
        '/ds/intro/04-corecomponent',
        '/ds/intro/05-mrrunprin',
        '/ds/intro/06-designprin',
        '/ds/intro/07-workprin',
        '/ds/intro/08-runprin',
      ]
    },
    {
      title: '大数据存储-Hadoop生态',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ds/ecology/01-intro',
        '/ds/ecology/02-compnent',
        '/ds/ecology/03-basicarchi',
        '/ds/ecology/04-2.xverarchi',
        '/ds/ecology/05-summary',
      ]
    },
    {
      title: '大数据存储-HDFS总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ds/hdfs/01-intro',
        '/ds/hdfs/02-writeprocedure',
        '/ds/hdfs/03-cmdinterface',
        '/ds/hdfs/04-javainterface',
        '/ds/hdfs/05-knowledgesum',
        '/ds/hdfs/06-detailsum',
      ]
    },
    {
      title: '大数据存储-HBASE总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/ds/hbase/01-intro',
        '/ds/hbase/02-prin',
        '/ds/hbase/03-opt1',
        '/ds/hbase/04-opt2',
        '/ds/hbase/05-archiprin',
        '/ds/hbase/06-summary',
      ]
    }
  ],
  "/dw/": [
    {
      title: '大数据仓库-概念介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/intro/01-intro',
        '/dw/intro/02-basicarchi',
        '/dw/intro/03-summary',
      ]
    },
    {
      title: '大数据仓库-Hive总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/hive/01-intro',
        '/dw/hive/02-basicarchi',
        '/dw/hive/03-basiclianzai',
        '/dw/hive/04-storageandcompression',
        '/dw/hive/05-hivesql',
        '/dw/hive/06-hiveexplainplan',
        '/dw/hive/07-hivesqlexecprin',
        '/dw/hive/08-hivedataskew',
        '/dw/hive/09-hiveenterpriselevelopt',
        '/dw/hive/10-hivesqlexecsourcecode',
      ]
    },
    {
      title: '大数据仓库-Hive优化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/hiveopt/01-optbasic',
        '/dw/hiveopt/02-optstrategy',
        '/dw/hiveopt/03-commonoptmethods',
        '/dw/hiveopt/04-optsummary1',
        '/dw/hiveopt/05-optsummary2',
      ]
    },
    {
      title: '大数据仓库-Pig介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/pig/01-intro',
        '/dw/pig/02-basicprin',
        '/dw/pig/03-summary',
      ]
    },
    {
      title: '大数据仓库-ClickHouse介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/clickhouse/01-intro',
        '/dw/clickhouse/02-summaryintro',
        '/dw/clickhouse/03-caseintro',
      ]
    },
    {
      title: '大数据仓库-CDH介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/cdh/01-cdhintro',
        '/dw/cdh/02-cmintroandinstall',
        '/dw/cdh/03-summarycase',
      ]
    },
    {
      title: '大数据仓库-Ambari介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dw/ambari/01-introandinstall',
        '/dw/ambari/02-installcase',
        '/dw/ambari/03-diff',
      ]
    }
  ],
  "/dp/": [
    {
      title: '大数据处理-MapReduce介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/mr/01-intro',
        '/dp/mr/02-basicprin',
        '/dp/mr/03-prinandcase',
        '/dp/mr/04-mreliminatecause',
        '/dp/mr/05-summary',
      ]
    },
    {
      title: '大数据【资源管理】-Yarn介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/yarn/01-intro',
        '/dp/yarn/02-archiprin',
        '/dp/yarn/03-runprin',
        '/dp/yarn/04-clusterbuild',
        '/dp/yarn/05-configintro',
        '/dp/yarn/06-summarycase',
      ]
    },
    {
      title: '大数据【资源管理】-Yarn优化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/yarnopt/01-basicparamopt',
        '/dp/yarnopt/02-memparamopt',
        '/dp/yarnopt/03-summaryopt',
      ]
    },
    {
      title: '大数据【批处理】-Tez介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/tez/01-intro',
        '/dp/tez/02-installcase',
        '/dp/tez/03-summary',
      ]
    },
    {
      title: '大数据【流处理】-Storm介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/storm/01-intro',
        '/dp/storm/02-artchiandprin',
        '/dp/storm/03-streamdealframe',
        '/dp/storm/04-clusterinstallcase',
        '/dp/storm/05-clusterandwordcase',
        '/dp/storm/06-summary',
      ]
    },
    {
      title: '大数据【流处理】-Spark介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/spark/01-intro',
        '/dp/spark/02-caseintro',
        '/dp/spark/03-rddintro',
        '/dp/spark/04-basicarchi',
        '/dp/spark/05-fourfeatures',
        '/dp/spark/06-clusterinstall',
        '/dp/spark/07-sparkshellintro',
        '/dp/spark/08-sparksqlsum',
        '/dp/spark/09-sparkmllibintro',
        '/dp/spark/10-summary1',
        '/dp/spark/11-summary2',
      ]
    },
    {
      title: '大数据【流处理】-Spark优化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/sparkopt/01-basicopt',
        '/dp/sparkopt/02-commonopt',
        '/dp/sparkopt/03-summaryopt',
      ]
    },
    {
      title: '大数据【流处理】-Flink介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/flink/01-intro',
        '/dp/flink/02-install',
        '/dp/flink/03-clusterinstall',
        '/dp/flink/04-runprin',
        '/dp/flink/05-checkpoints',
        '/dp/flink/06-savepoints',
        '/dp/flink/07-checkandsavepointdiff',
        '/dp/flink/08-caseanalysis',
        '/dp/flink/09-summary',
      ]
    },
    {
      title: '大数据【流处理】-Flink优化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/flinkopt/01-basicopt',
        '/dp/flinkopt/02-taskopt',
        '/dp/flinkopt/03-summaryopt',
      ]
    },
    {
      title: '大数据【流处理框架比较】',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dp/streamdiff/01-stormandflinkdiff',
        '/dp/streamdiff/02-sparkandflinkdiff',
        '/dp/streamdiff/03-stormsaprkflinkbasicdiff',
        '/dp/streamdiff/04-stormsaprkflinkdetaildiff',
        '/dp/streamdiff/05-stormsaprkflinksummarydiff',
      ]
    }
  ],
  "/da/": [
    {
      title: '数据应用-案例和原理',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/intro/01-intro',
        '/da/intro/02-techandsecene',
        '/da/intro/03-secnetecharchi',
        '/da/intro/04-summarycase1',
        '/da/intro/05-summarycase2',
      ]
    },
    {
      title: '数据应用-BI系统介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/introbi/01-intro',
        '/da/introbi/02-bicommonmethod',
        '/da/introbi/03-techsceneintro',
        '/da/introbi/04-bitoolintro',
        '/da/introbi/05-bireportsintro',
        '/da/introbi/06-traditionalandselfbidiff',
        '/da/introbi/07-bidataarchi',
      ]
    },
    {
      title: '数据应用-BI工具介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/introbitool/01-commintro',
        '/da/introbitool/02-aliquickbiintro',
        '/da/introbitool/03-summarydiff',
      ]
    },
    {
      title: '数据应用-数据可视化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/dataview/01-intro',
        '/da/dataview/02-30recommendtools',
        '/da/dataview/03-dataviewbasicproedure',
        '/da/dataview/04-dataviewlargescreentools',
        '/da/dataview/05-datavintro',
        '/da/dataview/06-datavsimplecase',
        '/da/dataview/07-datavsummaryfunctions',
        '/da/dataview/08-datavandsugardiff',
        '/da/dataview/09-dataviewsummary',
      ]
    },
    {
      title: '实时分析-Spark应用',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/rtaspark/01-intro',
        '/da/rtaspark/02-sparkuseranalysiscase',
        '/da/rtaspark/03-sparkandspringboot',
        '/da/rtaspark/04-realtimebuycase',
        '/da/rtaspark/05-logfileanalysiscase',
        '/da/rtaspark/06-realtimenewscase',
        '/da/rtaspark/07-sparkappdeploy',
        '/da/rtaspark/08-summarycaseandbolg',
        '/da/rtaspark/09-summary',
      ]
    },
    {
      title: '实时分析-Flink应用',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/da/rtaflink/01-streamwindowintro',
        '/da/rtaflink/02-flinkspringboot',
        '/da/rtaflink/03-finkandclickhouse',
        '/da/rtaflink/04-flinkbootintro',
        '/da/rtaflink/05-flinkuserbehaviorcasepro',
        '/da/rtaflink/06-flinkrealtimegoodsstat',
        '/da/rtaflink/07-flinkrealtimepagevist',
        '/da/rtaflink/08-flinkecommercecoreindicators',
        '/da/rtaflink/09-blogrecommend',
        '/da/rtaflink/10-summary',
      ]
    }
  ],
  "/dm/": [
    {
      title: '数据挖掘-基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dm/intro/01-intro',
        '/dm/intro/02-toptenalgorithm',
        '/dm/intro/03-devproceduresummary',
      ]
    },
    {
      title: '数据挖掘-Mahout基础介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dm/mahoutintro/01-intro',
        '/dm/mahoutintro/02-algorithmlibintro',
        '/dm/mahoutintro/03-projectbuilddemo',
      ]
    },
    {
      title: '数据挖掘-Mahout推荐系统',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dm/mahoutrecommend/01-intro',
        '/dm/mahoutrecommend/02-algorithmapitinro',
        '/dm/mahoutrecommend/03-simplecase',
        '/dm/mahoutrecommend/04-recommendsystemcase1',
        '/dm/mahoutrecommend/05-recommendsystemcase2',
        '/dm/mahoutrecommend/06-sourcecodeanalysis',
      ]
    },
    {
      title: '数据挖掘-SparkMLlib库介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dm/sparkmllibintro/01-intro',
        '/dm/sparkmllibintro/02-archiprin',
        '/dm/sparkmllibintro/03-blogrecommd',
      ]
    },
    {
      title: '数据挖掘-Python库介绍',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dm/pythonintro/01-intro',
        '/dm/pythonintro/02-descriptivestatistics',
        '/dm/pythonintro/03-summary',
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
        '/dev/tool/03.1-gitcmdcancel',
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
    },
    {
      title: '开发效率总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dev/deveffciency/01-intro',
        '/dev/deveffciency/02-commpromethods',
        '/dev/deveffciency/03-devframe',
        '/dev/deveffciency/04-devtools',
        '/dev/deveffciency/05-4keypoints',
        '/dev/deveffciency/06-30methods',
        '/dev/deveffciency/07-5percentmythology',
        '/dev/deveffciency/08-siliconvalley5skills',
        '/dev/deveffciency/09-summary',
      ]
    },
    {
      title: '技术能力评估总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/dev/abilityevaluation/01-abilityevbasic',
        '/dev/abilityevaluation/02-6devabilitystage',
        '/dev/abilityevaluation/03-abilityevmethod',
        '/dev/abilityevaluation/04-gradeevaluationgossip',
        '/dev/abilityevaluation/05-abilitysummary',
      ]
    }
  ],
  "/middleware/": [
    {
      title: '消息队列基础总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/middleware/mq/01-intro',
        '/middleware/mq/02-commscene',
        '/middleware/mq/03-commmqintro',
        '/middleware/mq/04-commmqdiff',
        '/middleware/mq/05-kafkaintro',
        '/middleware/mq/06-springbootactivemq',
        '/middleware/mq/07-springbootkafka',
        '/middleware/mq/08-summary',
      ]
    },
    {
      title: '消息队列JMS',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/middleware/jms/01-intro',
        '/middleware/jms/02-springjms',
        '/middleware/jms/03-activemqjms',
        '/middleware/jms/04-jmskafka',
        '/middleware/jms/05-jmssum',
      ]
    },
    {
      title: 'zookeeper基础总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/middleware/zookeeper/01-intro',
        '/middleware/zookeeper/02-installandconfig',
        '/middleware/zookeeper/03-workprindetail',
        '/middleware/zookeeper/04-devconfig',
        '/middleware/zookeeper/05-appscene',
      ]
    }
  ],
  "/es/": [
    {
      title: 'ES基础知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/es/basic/01-intro',
        '/es/basic/02-invertedindexprin',
        '/es/basic/03-es-elk',
        '/es/basic/04-installconfig',
        '/es/basic/05-colonyprin',
        '/es/basic/06-summary',
      ]
    },
    {
      title: 'Springboot集成ES案例',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/es/case/01-case1',
        '/es/case/02-case2',
        '/es/case/03-case3',
      ]
    },
    {
      title: 'Logstash知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/es/logstash/01-intro',
        '/es/logstash/02-installuse',
        '/es/logstash/03-configdetai1',
        '/es/logstash/04-configdetai2',
        '/es/logstash/05-recommend',
      ]
    },
    {
      title: 'Kibana知识总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/es/kibana/01-intro',
        '/es/kibana/02-installconfig',
        '/es/kibana/03-summary',
      ]
    },
    {
      title: 'ES性能优化',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/es/optimize/01-intro',
        '/es/optimize/02-basicopt',
        '/es/optimize/03-paramopt',
        '/es/optimize/04-selectopt',
        '/es/optimize/05-writeopt',
        '/es/optimize/06-sumopt',
      ]
    }
  ],
  "/operation/": [
    {
      title: 'Linux操作系统命令',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/operation/linux/01-intro',
        '/operation/linux/02-cmdtop50',
        '/operation/linux/03-cmdsum',
        '/operation/linux/04-cmdcurl',
        '/operation/linux/05-shell',
      ]
    },
    {
      title: 'Linux系统运维总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/operation/linuxop/01-filesystem',
        '/operation/linuxop/02-filesysdetail',
      ]
    },
    {
      title: 'Nginx安装配置总结',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/operation/ng/01-intro',
        '/operation/ng/02-commwebserver',
        '/operation/ng/03-installconfig',
        '/operation/ng/03.1-ngloadbalancingcase',
        '/operation/ng/04-nggzip',
        '/operation/ng/05-ngsum',
      ]
    }
  ],
  "/mysqlop/": [
    {
      title: 'MySQL运维基础知识',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/basic/01-intro',
        '/mysqlop/basic/02-essenceoperatio',
        '/mysqlop/basic/03-classicop',
        '/mysqlop/basic/04-commknowledge',
        '/mysqlop/basic/05-summary',
      ]
    },
    {
      title: 'MySQL监控分析-慢SQL',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/monitorsql/01-intro',
        '/mysqlop/monitorsql/02-slowsqlcase',
        '/mysqlop/monitorsql/03-slowsqltool',
      ]
    },
    {
      title: 'MySQL监控分析-锁',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/monitorlock/01-intro',
        '/mysqlop/monitorlock/02-lockdealcase',
        '/mysqlop/monitorlock/03-locktabletool',
        '/mysqlop/monitorlock/04-lockprindetail',
        '/mysqlop/monitorlock/05-lockcasesummary',
      ]
    },
    {
      title: 'MySQL主从复制',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/replication/01-intro',
        '/mysqlop/replication/02-binlogintro',
        '/mysqlop/replication/03-binlogreplication',
        '/mysqlop/replication/04-replicationcase',
        '/mysqlop/replication/05-replicationdelaybasic',
        '/mysqlop/replication/06-replicationdelaydetail',
      ]
    },
    {
      title: 'MySQL读写分离-中间代理',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/rwseperateprin/01-intro',
        '/mysqlop/rwseperateprin/02-mycatintro',
        '/mysqlop/rwseperateprin/03-mycatcase',
        '/mysqlop/rwseperateprin/04-mycatsplitdbandtable',
        '/mysqlop/rwseperateprin/05-amoebacase',
      ]
    },
    {
      title: 'MySQL读写分离-SpringBoot',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/rwseperatecase/01-intro',
        '/mysqlop/rwseperatecase/02-druidcase',
        '/mysqlop/rwseperatecase/03-baomihuacase',
        '/mysqlop/rwseperatecase/04-annotationcase',
        '/mysqlop/rwseperatecase/05-serialmybatis',
        '/mysqlop/rwseperatecase/06-serialmybatisplus',
      ]
    },
    {
      title: 'MySQL备份与恢复',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/mysqlop/bak/01-intro',
        '/mysqlop/bak/02-bakrecoverycase',
        '/mysqlop/bak/03-bakrecoverysum',
      ]
    }
  ],
  "/post/": [
    {
      title: '面试求职-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/basic/01-prepareresume',
        '/post/basic/02-selfintroduction',
        '/post/basic/03-classicqa',
        '/post/basic/04-needingattention',
        '/post/basic/05-resourcesharing',
      ]
    },
    {
      title: 'Java面试-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/javabasic/01-javabasic',
        '/post/javabasic/02-network',
        '/post/javabasic/03-collectiion',
        '/post/javabasic/04-javaexception',
        '/post/javabasic/05-concurrentprogramming',
        '/post/javabasic/06-jvmbasic',
        '/post/javabasic/07-nettybasic',
      ]
    },
    {
      title: '算法面试-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/algorithm/01-50basic',
        '/post/algorithm/02-commonalgorithmoverview',
        '/post/algorithm/03-commonalgorithmquestions',
        '/post/algorithm/04-30classicinterviewquestions',
        '/post/algorithm/05-80classicinterviewquestions',
        '/post/algorithm/06-recommendvideo',
      ]
    },
    {
      title: 'Spring面试-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/springbasic/01-springbasic',
        '/post/springbasic/02-springmvc',
        '/post/springbasic/03-springboot',
        '/post/springbasic/04-springcloud',
        '/post/springbasic/05-springcloudalibaba',
        '/post/springbasic/06-springcloudsummary',
      ]
    },
    {
      title: '数据库面试-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/dbbasic/01-mybatis',
        '/post/dbbasic/02-redis',
        '/post/dbbasic/02.1-redissum',
        '/post/dbbasic/04-mysqlbasic',
      ]
    },
    {
      title: '系统架构和中间件基础',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/sysarchibasic/01-linuxbasic',
        '/post/sysarchibasic/02-sysarchibasic',
        '/post/sysarchibasic/03-structureandalgorithm',
        '/post/sysarchibasic/04-zkbasic',
        '/post/sysarchibasic/05-mqbasic',
      ]
    },
    {
      title: '源码解析-基础篇',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/post/sourcecode/01-intro',
        '/post/sourcecode/02-javaio',
        '/post/sourcecode/03-arraylist',
        '/post/sourcecode/04-arrayblockingqueue',
        '/post/sourcecode/05-vector',
        '/post/sourcecode/06-linkedlist',
        '/post/sourcecode/07-hashmap1',
        '/post/sourcecode/08-hashmap2',
        '/post/sourcecode/09-concurrenthashmpap',
        '/post/sourcecode/10-arraylistandlinkedlist',
        '/post/sourcecode/11-copyonwritearraylist',
        '/post/sourcecode/12-startprincodeanalysis',
        '/post/sourcecode/13-recommendvideo',
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