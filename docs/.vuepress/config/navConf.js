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
    text: '人工智能',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
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
        text: 'SpringMvc总结', items:
          [
            { text: 'SpringMvc-入门介绍', link: '/spring/springmvc/01-intro' },
            { text: 'SpringMvc-工作原理介绍', link: '/spring/springmvc/02-prinintro' }
          ]
      }
    ]
  },
  {
    text: '框架',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
          ]
      }
    ]
  },
  {
    text: '架构',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
          ]
      }
    ]
  },
  {
    text: '开发',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
          ]
      }
    ]
  },
  {
    text: '综合',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
          ]
      }
    ]
  },
  {
    text: '项目|产品',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '完善中', items:
          [
            { text: '敬请期待', link: '/building/' }
          ]
      }
    ]
  },
  { text: '关于', link: '/about/aboutme' }
]