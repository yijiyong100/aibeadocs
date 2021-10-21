(window.webpackJsonp=window.webpackJsonp||[]).push([[300],{815:function(t,s,a){"use strict";a.r(s);var r=a(53),n=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 MySQL查询性能优化 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#避免向数据库请求不需要的数据"}},[t._v("避免向数据库请求不需要的数据")])]),a("li",[a("a",{attrs:{href:"#查询数据的方式"}},[t._v("查询数据的方式")])]),a("li",[a("a",{attrs:{href:"#分解大的查询"}},[t._v("分解大的查询")])]),a("li",[a("a",{attrs:{href:"#优化min-和max"}},[t._v("优化MIN()和MAX()")])]),a("li",[a("a",{attrs:{href:"#用in-取代or"}},[t._v("用IN()取代OR")])]),a("li",[a("a",{attrs:{href:"#优化关联查询"}},[t._v("优化关联查询")])]),a("li",[a("a",{attrs:{href:"#临时表的概念"}},[t._v("临时表的概念")])]),a("li",[a("a",{attrs:{href:"#排序优化"}},[t._v("排序优化")])]),a("li",[a("a",{attrs:{href:"#子查询优化"}},[t._v("子查询优化")])]),a("li",[a("a",{attrs:{href:"#优化count-查询"}},[t._v("优化COUNT()查询")])]),a("li",[a("a",{attrs:{href:"#优化limit分页"}},[t._v("优化LIMIT分页")])]),a("li",[a("a",{attrs:{href:"#优化union查询"}},[t._v("优化UNION查询")])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("p",[t._v("MySql查询性能优化")]),t._v(" "),a("blockquote",[a("p",[t._v("本文转载自"),a("a",{attrs:{href:"https://segmentfault.com/a/1190000011330649",target:"_blank",rel:"noopener noreferrer"}},[t._v("MySql查询性能优化"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"避免向数据库请求不需要的数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#避免向数据库请求不需要的数据"}},[t._v("#")]),t._v(" 避免向数据库请求不需要的数据")]),t._v(" "),a("p",[t._v("在访问数据库时，应该只请求需要的行和列。请求多余的行和列会消耗MySql服务器的CPU和内存资源，并增加网络开销。\n例如在处理分页时，应该使用LIMIT限制MySql只返回一页的数据，而不是向应用程序返回全部数据后，再由应用程序过滤不需要的行。\n当一行数据被多次使用时可以考虑将数据行缓存起来，避免每次使用都要到MySql查询。\n避免使用SELECT *这种方式进行查询，应该只返回需要的列。")]),t._v(" "),a("h2",{attrs:{id:"查询数据的方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询数据的方式"}},[t._v("#")]),t._v(" 查询数据的方式")]),t._v(" "),a("p",[t._v("查询数据的方式有全表扫描、索引扫描、范围扫描、唯一索引查询、常数引用等。这些查询方式，速度从慢到快，扫描的行数也是从多到少。可以通过EXPLAIN语句中的type列反应查询采用的是哪种方式。\n通常可以通过添加合适的索引改善查询数据的方式，使其尽可能减少扫描的数据行，加快查询速度。\n例如，当发现查询需要扫描大量的数据行但只返回少数的行，那么可以考虑使用覆盖索引，即把所有需要用到的列都放到索引中。这样存储引擎无须回表获取对应行就可以返回结果了。")]),t._v(" "),a("h2",{attrs:{id:"分解大的查询"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分解大的查询"}},[t._v("#")]),t._v(" 分解大的查询")]),t._v(" "),a("p",[t._v("可以将一个大查询切分成多个小查询执行，每个小查询只完成整个查询任务的一小部分，每次只返回一小部分结果\n删除旧的数据是一个很好的例子。如果只用一条语句一次性执行一个大的删除操作，则可能需要一次锁住很多数据，占满整个事务日志，耗尽系统资源、阻塞很多小的但重要的查询。将一个大的删除操作分解成多个较小的删除操作可以将服务器上原本一次性的压力分散到多次操作上，尽可能小地影响MySql性能，减少删除时锁的等待时间。同时也减少了MySql主从复制的延迟。\n另一个例子是分解关联查询，即对每个要关联的表进行单表查询，然后将结果在应用程序中进行关联。下面的这个查询：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" tag\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" tag_post "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ON")]),t._v(" tag_post"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tag_id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("tag"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" post "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ON")]),t._v(" tag_post"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("post_id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("post"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" tag"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mysql'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("可以分解成下面这些查询来代替：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" tag "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" tag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mysql'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" tag_post "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" tag_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" post "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" post"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("in")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("456")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("567")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9098")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8904")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("将一个关联查询拆解成多个单表查询有如下有点：")]),t._v(" "),a("ol",[a("li",[t._v("让缓存的效率更高。如果缓存的是关联查询的结果，那么其中的一个表发生变化，整个缓存就失效了。而拆分后，如果只是某个表很少的改动，并不会破坏所有的缓存。")]),t._v(" "),a("li",[t._v("可以减少锁的竞争")]),t._v(" "),a("li",[t._v("更容易对数据库进行拆分，更容易做到高性能和可扩展。")]),t._v(" "),a("li",[t._v("查询本身的效率也有可能会有所提升。例如上面用IN()代替关联查询比随机的关联更加高效。")])]),t._v(" "),a("h2",{attrs:{id:"优化min-和max"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化min-和max"}},[t._v("#")]),t._v(" 优化MIN()和MAX()")]),t._v(" "),a("p",[t._v('添加索引可以优化MIN()和MAX()表达式。例如，要找到某一列的最小值，只需要查询对应B-Tree索引的最左端的记录即可。类似的，如果要查询列中的最大值，也只需要读取B-Tree索引的最后一条记录。对于这种查询，EXPLAIN中可以看到"Select tables optimized away",表示优化器已经从执行计划中移除了该表，并以一个常数取而代之。')]),t._v(" "),a("h2",{attrs:{id:"用in-取代or"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用in-取代or"}},[t._v("#")]),t._v(" 用IN()取代OR")]),t._v(" "),a("p",[t._v("在MySql中，IN()先将自己列表中的数据进行排序，然后通过二分查找的方式确定列的值是否在IN()的列表中，这个时间复杂度是O(logn)。如果换成OR操作，则时间复杂度是O(n)。所以，对于IN()的列表中有大量取值的时候，用IN()替换OR操作将会更快。")]),t._v(" "),a("h2",{attrs:{id:"优化关联查询"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化关联查询"}},[t._v("#")]),t._v(" 优化关联查询")]),t._v(" "),a("p",[t._v("在MySql中，任何一个查询都可以看成是一个关联查询，即使只有一个表的查询也是如此。\nMySql对任何关联都执行嵌套循环的关联操作，例如对于下面的SQL语句：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" tbl1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("tbl2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col2\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" tbl1 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INNER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" tbl2 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("USING")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("col3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" tbl1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("IN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("下面的伪代码表示MySql将如何执行这个查询：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//先从第一个表中取出符合条件的所有行")]),t._v("\nout_iter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" iterator "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("over")]),t._v(" tbl1 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("where")]),t._v(" col1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("IN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nouter_row "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" out_iter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("next")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在while循环中遍历第一个表结果集的每一行")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" outer_row\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//对于第一个表结果集中的每一行，在第二个表中找出符合条件的所有行")]),t._v("\n    inner_iter "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" iterator "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("over")]),t._v(" tbl2 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("where")]),t._v(" col3 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" outer_row"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col3\n    inner_row "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" inner_iter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("next")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" inner_row\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//将第一个表的结果列和第二个表的结果列拼装在一起作为结果输出")]),t._v("\n        output"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("outer_row"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" inner_row"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("col2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        inner_row "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" inner_iter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("next")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("end")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//回溯，再根据第一个表结果集的下一行，继续上面的过程")]),t._v("\n    outer_row "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" outer_iter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("next")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("end")]),t._v("\n")])])]),a("p",[t._v("对于单表查询，那么只需要完成上面外层的基本操作。\n优化关联查询，要确保ON或者USING子句中的列上有索引，并且在建立索引时需要考虑到关联的顺序。通常来说，只需要在关联顺序中的第二个表的相应列上创建索引。例如，当表A和表B用列c关联的时候，假设关联的顺序是B、A，那么就不需要在B表的c列上建立索引。没有用到的索引只会带来额外的负担。\n此外，确保任何的GROUP BY和ORDER BY中的表达式只涉及到一个表中的列，这样才能使用索引来优化这个过程。")]),t._v(" "),a("h2",{attrs:{id:"临时表的概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#临时表的概念"}},[t._v("#")]),t._v(" 临时表的概念")]),t._v(" "),a("p",[t._v("上面提到在MySql中，任何一个查询实质上都是一个关联查询。那么对于子查询或UNION查询是如何实现关联操作的呢。\n对于UNION查询，MySql先将每一个单表查询结果放到一个临时表中，然后再重新读出临时表数据来完成UNION查询。MySql读取结果临时表和普通表一样，也是采用的关联方式。\n当遇到子查询时，先执行子查询并将结果放到一个临时表中，然后再将这个临时表当做一个普通表对待。\nMySql的临时表是没有任何索引的，在编写复杂的子查询和关联查询的时候需要注意这一点。\n临时表也叫派生表。")]),t._v(" "),a("h2",{attrs:{id:"排序优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#排序优化"}},[t._v("#")]),t._v(" 排序优化")]),t._v(" "),a("p",[t._v("应该尽量让MySql使用索引进行排序。当不能使用索引生成排序结果的时候，MySql需要自己进行排序。如果数据量小于“排序缓冲区”的大小，则MySql使用内存进行“快速排序”操作。如果数据量太大超过“排序缓冲区”的大小，那么MySql只能采用文件排序，而文件排序的算法非常复杂，会消耗很多资源。\n无论如何排序都是一个成本很高的操作，所以从性能角度考虑，应尽可能避免排序。所以让MySql根据索引构造排序结果非常的重要。")]),t._v(" "),a("h2",{attrs:{id:"子查询优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#子查询优化"}},[t._v("#")]),t._v(" 子查询优化")]),t._v(" "),a("p",[t._v("MySql的子查询实现的非常糟糕。最糟糕的一类查询是WHERE条件中包含IN()的子查询语句。\n应该尽可能用关联替换子查询，可以提高查询效率。")]),t._v(" "),a("h2",{attrs:{id:"优化count-查询"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化count-查询"}},[t._v("#")]),t._v(" 优化COUNT()查询")]),t._v(" "),a("p",[t._v("COUNT()有两个不同的作用：")]),t._v(" "),a("ol",[a("li",[t._v("统计某个列值的数量，即统计某列值不为NULL的个数。")]),t._v(" "),a("li",[t._v("统计行数。")])]),t._v(" "),a("p",[t._v("当使用COUNT(*)时，统计的是行数，它会忽略所有的列而直接统计所有的行数。而在括号中指定了一个列的话，则统计的是这个列上值不为NULL的个数。\n可以考虑使用索引覆盖扫描或增加汇总表对COUNT()进行优化。")]),t._v(" "),a("h2",{attrs:{id:"优化limit分页"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化limit分页"}},[t._v("#")]),t._v(" 优化LIMIT分页")]),t._v(" "),a("p",[t._v("处理分页会使用到LIMIT，当翻页到非常靠后的页面的时候，偏移量会非常大，这时LIMIT的效率会非常差。例如对于***LIMIT 10000，20***这样的查询，MySql需要查询10020条记录，将前面10000条记录抛弃，只返回最后的20条。这样的代价非常高，如果所有的页面被访问的频率都相同，那么这样的查询平均需要访问半个表的数据。\n优化此类分页查询的一个最简单的办法就是尽可能地使用索引覆盖扫描，而不是查询所有的列。然后根据需要与原表做一次关联操作返回所需的列。对于偏移量很大的时候，这样的效率会提升非常大。考虑下面的查询：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" film_id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" description "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" sakila"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("film "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ORDER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BY")]),t._v(" title "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("LIMIT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("如果这个表非常大，那么这个查询最好改写成下面的这样子：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" film"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("film_id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" film"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("description "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" sakila"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("film\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INNER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" film_id "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" sakila"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("film "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ORDER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BY")]),t._v(" title "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("LIMIT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("AS")]),t._v(" lim\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("USING")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("film_id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("注意优化中关联的子查询，因为只查询film_id一个列，数据量小，使得一个内存页可以容纳更多的数据，这让MySQL扫描尽可能少的页面。在获取到所需要的所有行之后再与原表进行关联以获得需要的全部列。\nLIMIT的优化问题，其实是OFFSET的问题，它会导致MySql扫描大量不需要的行然后再抛弃掉。可以借助书签的思想记录上次取数据的位置，那么下次就可以直接从该书签记录的位置开始扫描，这样就避免了使用OFFSET。可以把主键当做书签使用，例如下面的查询：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" sakila"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rental "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ORDER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BY")]),t._v(" rental_id "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DESC")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("LIMIT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("假设上面的查询返回的是主键为16049到16030的租借记录，那么下一页查询就可以直接从16030这个点开始：")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" sakila"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rental "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" rental_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("16030")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ORDER")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BY")]),t._v(" rental_id "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DESC")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("LIMIT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("该技术的好处是无论翻页到多么后面，其性能都会很好。\n此外，也可以用关联到一个冗余表的方式提高LIMIT的性能，冗余表只包含主键列和需要做排序的数据列。")]),t._v(" "),a("h2",{attrs:{id:"优化union查询"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化union查询"}},[t._v("#")]),t._v(" 优化UNION查询")]),t._v(" "),a("p",[t._v("除非确实需要服务器消除重复的行，否则一定要使用UNION ALL。如果没有ALL关键字，MySql会给临时表加上DISTINCT选项，这会导致对整个临时表的数据做唯一性检查。这样做的代价非常高。")]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://www.cnblogs.com/yungyu16/p/12959310.html")])])])}),[],!1,null,null,null);s.default=n.exports}}]);