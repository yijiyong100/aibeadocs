module.exports = [
  { text: '导读', link: '/readguide' },
  {
    text: 'Java',
    ariaLabel: 'Java基础',
    items: [
      {
        text: 'Java语言基础', items:
          [
            { text: 'Java入门介绍', link: '/java/intro/01-java-intro.html' },
            { text: 'Java基础语法', link: '/java/intro/03-java-grammer.html' }
          ]
      },
      {
        text: 'Java面向对象基础', items:
          [
            { text: '语言基础特性', link: '/java/basic/01-lan-feature.html' },
            { text: '面向对象特征', link: '/java/basic/02-oop-feature.html' }
          ]
      },
      {
        text: 'Java集合类编程', items:
          [
            { text: '集合类基础介绍', link: '/java/collection/01-intro.html' },
            { text: '集合框架Collction、Map', link: '/java/collection/02-collectionmap.html' }

          ]
      },
      {
        text: 'Java文件和网络编程', items:
          [
            { text: 'Java文件IO流入门', link: '/java/file/01-intro.html' },
            { text: 'Java网络编程入门', link: '/java/net/01-intro.html' }
          ]
      },
      {
        text: 'Java并发编程和JUC', items:
          [
            { text: 'Java并发 基础入门', link: '/java/thread/01-intro.html' },
            { text: 'Java并发 JUC入门', link: '/java/juc/01-intro.html' }
          ]
      },
      {
        text: 'Java虚拟机和语言特性', items:
          [
            { text: 'Java  虚拟机', link: '/java/jvm/01-intro.html' },
            { text: 'Java8 语言特性', link: '/java/characteristic/01-java8.html' },
          ]
      }
    ]
  },
  {
    text: '数据库',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '数据库基础和SQL', items:
          [
            { text: '数据库绪论', link: '/db/intro/01-intro.html' },
            { text: '关系数据库', link: '/db/intro/02-relationdb.html' },
            { text: '基本查询SQL', link: '/db/comsql/01-basicselect.html' },
            { text: '连表查询SQL', link: '/db/comsql/02-joinselect.html' }
          ]
      }
      ,
      {
        text: 'MySQL基础和优化', items:
          [
            { text: '入门介绍', link: '/db/mysqlbasic/01-intro' },
            { text: '性能优化方案', link: '/db/mysqlopt1/01-solutionsum' },
            { text: '分区和分表', link: '/db/mysqlopt2/01-districtandtable' },
            { text: '读写分离介绍', link: '/db/mysqlopt2/05-readwritesepration' }
          ]
      }
      ,
      {
        text: 'NoSQL数据库', items:
          [
            { text: 'Redis介绍和总结', link: '/db/redis/01-intro' },
          ]
      }
    ]
  },
  {
    text: '算法',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '基础概念总结', items:
          [
            { text: '数据结构基础概念', link: '/algorithm/basic/01-basicconcept' },
            { text: '算法和数据结构介绍', link: '/algorithm/basic/02-intro' },
            { text: '常用算法动态展示', link: '/algorithm/visual/01-commondy' },
            { text: 'visualgo-中文算法展示', link: '/algorithm/visual/04-visualgo' }
          ]
      },
      {
        text: '算法思想总结', items:
          [
            { text: '八种常用算法思想', link: '/algorithm/thought/01-thoughts8intro' },
            { text: '五种基本算法思想', link: '/algorithm/thought/02-thoughts5intro', },
          ]
      },
      {
        text: '常用算法总结', items:
          [
            { text: '常用查找算法-介绍', link: '/algorithm/search/01-intro' },
            { text: '常用排序算法-介绍', link: '/algorithm/sort/01-intro' },
            { text: '常用字符串匹配-介绍', link: '/algorithm/strmatch/01-intro' },
            { text: '常用加密解密算法-介绍', link: '/algorithm/encryption/01-intro' }
          ]
      }
    ]
  },
  {
    text: '大数据',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '基础知识总结', items:
          [
            { text: '入门知识介绍', link: '/bigdata/intro/01-intro' },
            { text: '技术体系介绍', link: '/bigdata/techintro/01-intro' }
          ]
      },
      {
        text: '数据采集总结', items:
          [
            { text: '入门知识介绍', link: '/dc/intro/01-intro' },
            { text: '常用工具比较', link: '/dc/intro/02-diff' }
          ]
      },
      {
        text: '数据存储总结', items:
          [
            { text: 'Hadoop入门介绍', link: '/ds/intro/01-basicintro' },
            { text: 'Hadoop生态介绍', link: '/ds/intro/02-detailintro' }
          ]
      },
      {
        text: '数据仓库总结', items:
          [
            { text: '数据仓库入门介绍', link: '/dw/intro/01-intro' },
            { text: '数据仓库精华总结', link: '/dw/intro/03-summary' }
          ]
      },
      {
        text: '数据处理总结', items:
          [
            { text: 'MapReduce-入门介绍', link: '/dp/mr/01-intro' },
            { text: 'MapReduce-工作原理', link: '/dp/mr/02-basicprin' }
          ]
      },
      {
        text: '数据应用总结', items:
          [
            { text: '大数据应用场景基础介绍', link: '/da/intro/01-intro' },
            { text: '大数据数据挖掘基础介绍', link: '/dm/intro/01-intro' }
          ]
      }
    ]
  },
  {
    text: '人工智能',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '基础知识总结', items:
          [
            { text: '人工智能基础介绍', link: '/ai/intro/01-intro' },
            { text: '机器学习基础介绍', link: '/ai/mlintro/01-intro' },
            { text: '深度学习基础介绍', link: '/ai/dlintro/01-intro' },
            { text: '神经网络原理介绍', link: '/ai/nnprin/01-intro' },
            { text: '机器学习算法介绍', link: '/ai/mlalgorithm/01-intro' },
            { text: '机器学习数学介绍', link: '/ai/mlmath/01-intro' }
          ]
      },
      {
        text: '开发框架总结', items:
          [
            { text: '主流-AI开源开发框架介绍', link: '/ad/intro/01-intro' },
            { text: 'JAVA-AI开发框架Dl4j介绍', link: '/ad/dl4jintro/01-intro' },
            { text: 'AI开发框架-Pytorch介绍', link: '/ad/pytorch/01-intro' },
            { text: 'AI开发框架-TensorFlow介绍', link: '/ad/tensorflow/01-intro' }
          ]
      },
      {
        text: '开发应用案例', items:
          [
            { text: 'AI常见案例和趋势介绍', link: '/ac/intro/01-intro' },
            { text: 'AI应用案例-推荐系统介绍', link: '/ac/rsintro/01-intro' },
            { text: 'AI应用案例-智慧城市介绍', link: '/ac/aicity/01-intro' },
            { text: 'AI应用案例-智慧大屏介绍', link: '/ac/aibigscreen/01-intro' }
          ]
      }
    ]
  },
  {
    text: 'Spring',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: 'Spring基础知识', items:
          [
            { text: 'Spring-入门介绍', link: '/spring/basic/01-intro' },
            { text: 'IOC和AOP-原理介绍', link: '/spring/basic/02-iocaopintro' }
          ]
      },
      {
        text: 'SpringMVC总结', items:
          [
            { text: 'SpringMVC-入门介绍', link: '/spring/springmvc/01-intro' },
            { text: 'SpringMVC-工作原理介绍', link: '/spring/springmvc/02-prinintro' }
          ]
      },
      {
        text: 'SpringBoot总结', items:
          [
            { text: 'SpringBoot-工作原理', link: '/spring/springboot/03-workprin' },
            { text: '启动原理分析和源码解读', link: '/spring/springboot/06-startprincodeanalysis' }

          ]
      },
      {
        text: 'Spring注解总结', items:
          [
            { text: 'Spring注解实现原理', link: '/spring/annotation/03-springannprin' },
            { text: 'Spring注解大全(一)', link: '/spring/annotation/04-anntotal1' }
          ]
      },
      {
        text: 'SpringCloud知识介绍', items:
          [
            { text: 'SpringCloud-基础介绍', link: '/spring/springcloud/01-intro' },
            { text: 'SpringCloud-原理详解', link: '/spring/springcloud/03-prindetail' }
          ]
      }
    ]
  },
  {
    text: '框架',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '框架基础总结', items:
          [
            { text: '框架基础知识介绍', link: '/framework/basic/01-intro' },
            { text: '框架架构组件区别', link: '/framework/basic/02-commconceptdiff' },
            { text: '框架架构组件关系', link: '/framework/basic/03-commconceptrela' },
            { text: '常见15种微服务框架', link: '/framework/basic/06-microserv15' },
            { text: 'Spring框架思想总结', link: '/framework/basic/07-springframethink' }
          ]
      },
      {
        text: '常用框架总结', items:
          [
            { text: '日志框架-介绍和总结', link: '/framework/log/01-intro' },
            { text: 'ORM框架-介绍和总结', link: '/framework/orm/01-intro' },
            { text: 'NIO框架-介绍和总结', link: '/framework/nio/01-intro' },
            { text: 'Netty框架-介绍和总结', link: '/framework/netty/01-intro' },
            { text: 'Netty案例-介绍和总结', link: '/framework/nettycase/01-intro' }
          ]
      }
    ]
  },
  {
    text: '架构',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '架构基础知识', items:
          [
            { text: '架构基础知识介绍', link: '/architecture/basic/01-intro' },
            { text: '架构基本概念和本质', link: '/architecture/basic/02-essence' },
            { text: '微服务架构知识介绍', link: '/architecture/microservanddistribute/01-intro' },

          ]
      }
    ]
  },
  {
    text: '开发',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '开发工具', items:
          [
            { text: 'Java开发工具介绍', link: '/dev/tool/01-intro' },
            { text: 'Idea开发插件推荐', link: '/dev/tool/05-idea20recommendedplug' }
          ]
      },
      {
        text: '开发规范', items:
          [
            { text: 'Java开发规范', link: '/dev/standard/01-intro' },
            { text: 'Java设计模式', link: '/dev/designpattern/01-intro' }
          ]
      },
      {
        text: '开发效率', items:
          [
            { text: '效率提升常用方法', link: '/dev/deveffciency/02-commpromethods' },
            { text: '效率提升精华总结', link: '/dev/deveffciency/09-summary' }
          ]
      }
    ]
  },
  {
    text: '综合',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '中间件', items:
          [
            { text: 'MQ消息队列介绍', link: '/middleware/mq/01-intro' },
            { text: 'ES搜索服务器介绍', link: '/es/basic/01-intro' },
            { text: 'Zookeeper介绍', link: '/middleware/zookeeper/01-intro' }
          ]
      },
      {
        text: '综合技能', items:
          [
            { text: 'MySQL运维总结', link: '/mysqlop/basic/01-intro' },
            { text: 'Linux常用命令', link: '/operation/linux/01-intro' },
            { text: 'Nginx使用总结', link: '/operation/ng/05-ngsum' },
            { text: '求职面试整理', link: '/post/javabasic/01-javabasic' }
          ]
      }
    ]
  },
  {
    text: '项目|产品',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '研发效能介绍', items:
          [
            { text: '研发效能入门介绍', link: '/projprod/rdefficiencyintro/01-intro' },
            { text: '研发效能体系构建', link: '/projprod/rdefficiencyintro/06-efficiencysystem' }
          ]
      },
      {
        text: '研发效能提升', items:
          [
            { text: '研发效能提升精华总结', link: '/projprod/rdeffciencypromote/09-summary' },
            { text: '研发效能系统管理工具', link: '/projprod/rdeffciencytool/01-intro' }
          ]
      }
    ]
  },
  { text: '关于', link: '/about/aboutme' }
]