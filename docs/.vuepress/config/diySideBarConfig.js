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