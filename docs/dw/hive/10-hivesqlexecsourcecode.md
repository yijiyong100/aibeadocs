---
title: Hive-HiveSQL流程源码分析
---

::: tip
本文主要是介绍 Hive-HiveSQL流程源码分析 。
:::

[[toc]]

## HiveSQL执行流程源码分析

## hive简介

**什么是Hive？**

- 数据仓库：存储、查询、分析大规模数据
- SQL语言：简单易用的类SQL查询语言
- 编程模型：允许开发者自定义UDF、Transform、Mapper、Reducer，来更简单地完成复杂MapReduce无法完成的工作
- 数据格式：处理Hadoop上任意数据格式的数据，或者使用优化的格式存储Hadoop上的数据，RCFile，ORCFile，Parquest
- 数据服务：HiveServer2，多种API访问Hadoop上的数据，JDBC，ODBC
- 元数据服务：数据什么样，数据在哪里，Hadoop上的唯一标准

#### hive架构图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/sourceprin-1.png')" alt="wxmp">

#### hive cli架构图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/sourceprin-2.png')" alt="wxmp">

#### hive源码结构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/sourceprin-3.png')" alt="wxmp">

#### hive三大核心模块

- `Query Processor`：查询处理工具，源码ql包
- `SerDe`：序列化与反序列化器，源码serde包
- `MetaStore`：元数据存储及服务，源码metastore包

# hive执行命令入口

入口为：`/bin/cli.sh`

一个查询（假设通过CLI入口）直到获取最终结果，Hive内部的执行流程主要包括：

- 1. CLI 获取用户查询，解析用户输入的命令，提交给Driver；
- 2. Driver 结合编译器（COMPILER）和元数据库（METASTORE），对用户查询进行编译解析；
- 3. 根据解析结果（查询计划）生成MR任务提交给Hadoop执行；
- 4. 获取最终结果；

#### 接收命令的入口函数

CliDriver类的执行入口，`cli.CliDriver.main()`函数，创建CliDriver实例，接受用户输入参数，开始运行。

```java
  public static void main(String[] args) throws Exception {
    int ret = new CliDriver().run(args);
    System.exit(ret);
  }

```

#### 调用`cli.CliDriver.run()`方法

方法返回`return executeDriver(ss, conf, oproc);`调用executeDriver，在executeDriver中对应上边提到的三种情况：

- 一种是hive -e执行sql，此时ss.execString非空，执行完进程退出；
- 一种是hive -f执行sql文件，此时ss.fileName非空，执行完进程退出；
- 一种是hive交互式执行sql，此时会不断读取reader.readLine，然后执行失去了并输出结果；

#### `executeDriver`调用 `cli.processLine()`或者`cli.processFile()`

```java
 if (ss.execString != null) {
      int cmdProcessStatus = cli.processLine(ss.execString);
      return cmdProcessStatus;
    }
    try {
      if (ss.fileName != null) {
        return cli.processFile(ss.fileName);
    } catch (FileNotFoundException e) {
      System.err.println("Could not open input file for reading. (" + e.getMessage() + ")");
      return 3;
    }

cli.processLine()后面会调用cli.processFile()方法
1
```

#### 调用`CliDriver.processCmd()`方法

`CliDriver.processCmd()`方法根据指令不同进行对应的操作，指令分为四种：

> - quit or exit系统正常退出
> - !开头的命令行执行操作系统命令
> - source开头的,读取外部文件并执行文件中的命令list列出jar file archive
> - 其他命令提交给Commandprocess，进行命令的预处理

#### 调用processLocalCmd()方法

```java
        //CommandProcessorFactory 根据用户指令生成的tokens和配置文件，返回CommandProcessor的一个具体实现
        CommandProcessor proc = CommandProcessorFactory.get(tokens, (HiveConf) conf);
        //提交用户的cmd到指定的CommandProcessor，并获取结果。
        ret = processLocalCmd(cmd, proc, ss);

```

很核心的一个方法，提交用户的cmd到指定的`CommandProcessor`，并获取结果.

#### 调用Driver.run()方法

在processLocalCmd()中调用Driver.run()方法去执行sql

```java
 qp.setTryCount(tryCount);
            //driver实例运行用户指令，获取运行结果响应码
            ret = qp.run(cmd).getResponseCode();
            if (ret != 0) {
              qp.close();
              return ret;
            }

            // 统计指令的运行时间
            long end = System.currentTimeMillis();
            double timeTaken = (end - start) / 1000.0;

            ArrayList<String> res = new ArrayList<String>();
             //打印查询结果的列名称
            printHeader(qp, out);

            // 打印查询结果
            int counter = 0;
            try {
              if (out instanceof FetchConverter) {
                ((FetchConverter)out).fetchStarted();
              }
              while (qp.getResults(res)) {
                for (String r : res) {
                  out.println(r);
                }
                
                counter += res.size();
                res.clear();
                if (out.checkError()) {
                  break;
                }
              }
            } catch (IOException e) {
              console.printError("Failed with exception " + e.getClass().getName() + ":"
                  + e.getMessage(), "\n"
                  + org.apache.hadoop.util.StringUtils.stringifyException(e));
              ret = 1;
            }
            //关闭结果
            int cret = qp.close();
            if (ret == 0) {
              ret = cret;
            }

            if (out instanceof FetchConverter) {
              ((FetchConverter)out).fetchFinished();
            }

            console.printInfo("Time taken: " + timeTaken + " seconds" +
                (counter == 0 ? "" : ", Fetched: " + counter + " row(s)"));
          } else {
            //如果proc不是Driver，也就是用户执行的是非SQL查询操作，直接执行语句，不自信FetchResult的操作
            String firstToken = tokenizeCmd(cmd.trim())[0];
            String cmd_1 = getFirstCmd(cmd.trim(), firstToken.length());

            if (ss.getIsVerbose()) {
              ss.out.println(firstToken + " " + cmd_1);
            }
            CommandProcessorResponse res = proc.run(cmd_1);
            if (res.getResponseCode() != 0) {
              ss.out.println("Query returned non-zero code: " + res.getResponseCode() +
                  ", cause: " + res.getErrorMessage());
            }
            ret = res.getResponseCode();
          }
        }
      } catch (CommandNeedRetryException e) {
        //如果执行过程中出现异常，修改needRetry标志，下次循环是retry。
        console.printInfo("Retry query with a different approach...");
        tryCount++;
        needRetry = true;
      }
    } while (needRetry);

```

之后进入Driver类对sql进行处理，包括编译、解析、优化、执行。





## Driver类

Driver类是hive最核心的类。Driver类是查询的起点，run()方法会先后调用compile()和execute()两个函数来完成查询，所以一个command的查询分为compile和execute两个阶段。

### 编译的过程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/sourceprin-4.png')" alt="wxmp">

**Compiler简介**

- 解析器(Parser)–将查询字符串转换为解析树表示形式。
- 语义分析器(Semantic Analyser)-将解析树转换为内部查询表示形式，该表示形式基于块。
- 逻辑计划生成器(Logical Plan Generator)将内部查询表示形式转换为逻辑计划，该逻辑计划由运算符树组成。但是reduceSink等运算符是Hive专用的，将该计划转换为一系列map-reduce作业。
- 查询计划生成器(Query Plan Generator)将逻辑计划转换为一系列的map-reduce任务。 查询计划计划被序列化并写入文件。

#### 代码入口以及过程

`Driver.run()`方法调用`Driver.runInternal()`方法，首先该方法中会判断SQL是否经过编译，若未进行编译，则会调用`compileInternal`之后调用`compile`方法进行编译。

##### 利用antlr将HiveQL转换成抽象语法树（AST）。

- 首先使用antlr工具将srcqlsrcjavaorgapachehadoophiveqlparsehive.g编译成以下几个文件：HiveParser.java, Hive.tokens, Hive__.g, HiveLexer.java。
- HiveLexer.java和HiveParser.java分别是词法和语法分析类文件，Hive__.g是HiveLexer.java对应的词法分析规范，Hive.tokens定义了词法分析后所有的token。
- 然后沿着“Driver.compile()->ParseDriver.parse(command, ctx)->HiveParserX.statement()->antlr中的API”这个调用关系把输入的HiveQL转化成ASTNode类型的语法树。HiveParserX是由antlr生成的HiveParser类的子类。

```java
      //将SQL语句转化为AST树
      ParseDriver pd = new ParseDriver();
      ASTNode tree = pd.parse(command, ctx);
      tree = ParseUtils.findRootNonNullToken(tree);
      perfLogger.PerfLogEnd(CLASS_NAME, PerfLogger.PARSE);

```

##### 利用对应的SemanticAnalyzer类，将AST树转换成Map-reduce task。

这部分会用到`BaseSemanticAnalyzer.analyze`，大致流程是先通过`anticAnalyzerFactory.get(queryState, tree)`，初始化`BaseSemanticAnalyze`r对象，并且确定了该SQL的类型。SQL的类型以及使用了哪些算子都在`org/apache/hadoop/hive/ql/parse/HiveParser.g`语法文件中枚举出来了。
然后会通过`sem.analyze(tree, ctx)`调用analyzeInternal

```java
  public void analyze(ASTNode ast, Context ctx) throws SemanticException {
    initCtx(ctx);
    init(true);
    analyzeInternal(ast);
  }

```

以查询语句为例。进入进入的子类是`SemanticAnalyzer. analyzeInternal()`
**整体逻辑为：**

1. doPhase1()：将sql语句中涉及到的各种信息存储起来，存到QB中去，留着后面用。

```java
if (!doPhase1(child, qb, ctx_1, plannerCtx)) {
      // if phase1Result false return
      return false;
    }

```

1. getMetaData()：获取元数据信息，主要是sql中涉及到的 表 和 元数据 的关联

```java
 public void getMetaData(QB qb, boolean enableMaterialization) throws SemanticException {
    try {
      if (enableMaterialization) {
        getMaterializationMetadata(qb);
      }
      getMetaData(qb, null);
    } catch (HiveException e) {
      // Has to use full name to make sure it does not conflict with
      // org.apache.commons.lang.StringUtils
      LOG.error(org.apache.hadoop.util.StringUtils.stringifyException(e));
      if (e instanceof SemanticException) {
        throw (SemanticException)e;
      }
      throw new SemanticException(e.getMessage(), e);
    }
  }

```

1. genPlan()：生成operator tree/DAG

```java
Operator sinkOp = genOPTree(ast, plannerCtx);


Operator genOPTree(ASTNode ast, PlannerContext plannerCtx) throws SemanticException {
    return genPlan(qb);
  }


  private Operator genPlan(QB parent, QBExpr qbexpr) throws SemanticException {
    if (qbexpr.getOpcode() == QBExpr.Opcode.NULLOP) {
      boolean skipAmbiguityCheck = viewSelect == null && parent.isTopLevelSelectStarQuery();
      return genPlan(qbexpr.getQB(), skipAmbiguityCheck);
    }
    if (qbexpr.getOpcode() == QBExpr.Opcode.UNION) {
      Operator qbexpr1Ops = genPlan(parent, qbexpr.getQBExpr1());
      Operator qbexpr2Ops = genPlan(parent, qbexpr.getQBExpr2());

      return genUnionPlan(qbexpr.getAlias(), qbexpr.getQBExpr1().getAlias(),
          qbexpr1Ops, qbexpr.getQBExpr2().getAlias(), qbexpr2Ops);
    }
    return null;
  }

```

1. optimize()：优化，对operator tree/DAG 进行一些优化操作，例如列剪枝等（目前只能做rule-based optimize，不能做cost-based optimize）

```java
  //逻辑优化
    pCtx = optm.optimize();//fetchTask在逻辑执行计划最后一步生成
12
```

1. getFetchTask()开始生成物理执行计划

```java
    //fetchTask是物理执行计划的开始
    FetchTask origFetchTask = pCtx.getFetchTask();

    //不同引擎生成不同物理计划
    compiler.compile(pCtx, rootTasks, inputs, outputs);


    //生成物理执行计划
    generateTaskTree(rootTasks, pCtx, mvTask, inputs, outputs);


    //物理优化
    optimizeTaskPlan(rootTasks, pCtx, ctx);

```

整体的编译流程大概如此，下篇谈一下执行的过程。
本文采用hive2.1.1源码为参考。



## 参考文章
* https://blog.csdn.net/weixin_45518155/article/details/107448770
* https://blog.csdn.net/weixin_45518155/article/details/107449410