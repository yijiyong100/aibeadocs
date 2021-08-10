---
title: Kibana-安装和配置
---

::: tip
本文主要是介绍 Kibana-安装和配置 。
:::

[[toc]]

## Kibana安装

## Kibana简介

> Kibana 是一个免费且开放的用户界面，能够让您对 Elasticsearch 数据进行可视化，并让您在 Elastic Stack 中进行导航。您可以进行各种操作，从跟踪查询负载，到理解请求如何流经您的整个应用，都能轻松完成。

- Kibana是ElasticSearch的一个工具，用来分析ES中的数据并以各种图形界面显示出来
- 可以作为ElasticSearch的一个客户端，在Kibana中可以很轻松的调用ES的RESTful接口

## 下载&安装

### 下载

- 官网下载地址：https://www.elastic.co/cn/kibana
- 华为镜像市场：https://mirrors.huaweicloud.com/kibana/ （需先注册一个账号）

### 安装

- 下载压缩包并解压之后，需要关注两个文件夹，一个是config文件夹，里面的kibana.yml是配置文件；一个是bin文件夹，里面有kibana启动的bat脚本
  
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/installdetail/718864-20200707152330746-264461601.png')" alt="wxmp">

- 修改kibana.yml，添加上ElasticSearch的访问地址
  
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/installdetail/718864-20200707152625227-1259162038.png')" alt="wxmp">

- 打开MSDos，或者PowerShell，然后进入到bin文件夹，启动kibana
  
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/installdetail/718864-20200707152800327-1076412309.png')" alt="wxmp">

- 当看到输出[listening] Server running at [http://localhost:5601](http://localhost:5601/) 那么启动成功了， 可以在浏览器中进行访问了
  
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/installdetail/718864-20200707152957384-1303678749.png')" alt="wxmp">

## 使用Kibana访问ElasticSearch

- 在kibana的左侧Menu中找到一个大钳子的图标【DevTools】，这个是开发者工具。在这个界面可以编写es的查询DSL语句，并发起对es的请求
  
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/installdetail/718864-20200707153227294-255824452.png')" alt="wxmp">



## 【----------------------------】


## 简介

Kibana 是一款开源的数据分析和可视化平台，它是 Elastic Stack 成员之一，设计用于和 Elasticsearch 协作。您可以使用 Kibana 对 Elasticsearch 索引中的数据进行搜索、查看、交互操作。您可以很方便的利用图表、表格及地图对数据进行多元化的分析和呈现。

Kibana 可以使大数据通俗易懂。它很简单，基于浏览器的界面便于您快速创建和分享动态数据仪表板来追踪 Elasticsearch 的实时数据变化。

搭建 Kibana 非常简单。您可以分分钟完成 Kibana 的安装并开始探索 Elasticsearch 的索引数据 — 没有代码、不需要额外的基础设施。

## 界面

为了给大家一个直观的感觉，先上个图让大家来围观一下它靓照：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/kibana/install-1.png')" alt="wxmp">

 

### 支持的平台

Kibana 有 Linux、Darwin 和 Windows 版本的安装包。由于 Kibana 基于 Node.js 运行，我们在这些平台上包含了一些必要的 Node.js 二进制文件。Kibana 不支持在独立维护的 Node.js 版本上运行。

### Elasticsearch 版本

Kibana 的版本需要和 Elasticsearch 的版本一致。这是官方支持的配置。

运行不同主版本号的 Kibana 和 Elasticsearch 是不支持的（例如 Kibana 5.x 和 Elasticsearch 2.x），若主版本号相同，运行 Kibana 子版本号比 Elasticsearch 子版本号新的版本也是不支持的（例如 Kibana 5.1 和 Elasticsearch 5.0）。

运行一个 Elasticsearch 子版本号大于 Kibana 的版本基本不会有问题，这种情况一般是便于先将 Elasticsearch 升级（例如 Kibana 5.0 和 Elasticsearch 5.1）。在这种配置下，Kibana 启动日志中会出现一个警告，所以一般只是使用于 Kibana 即将要升级到和 Elasticsearch 相同版本的场景。

运行不同的 Kibana 和 Elasticsearch 补丁版本一般是支持的（例如：Kibana 5.0.0 和 Elasticsearch 5.0.1），尽管我们鼓励用户去运行最新的补丁更新版本。

### 安装 Kibana

从6.0.0开始，Kibana 只支持64位操作系统。

Kibana 提供以下格式的安装包：

| tar.gz/zip | tar.gz 包用来在 Linux 和 Darwin 系统下安装，也是最方便的一种选择。zip 包是唯一支持 Windows 系统的安装包。使用 .tar.gz 安装 Kibana 或者 在 Windows 上安装 Kibana |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deb        | deb 包用来在 Debian、Ubuntu 和其他基于 Debian 的系统下安装，Debian 包可以从 Elastic 官网或者我们的 Debian 仓库中下载。使用 Debian 包安装 Kibana                 |
| rpm        | rpm 包用来在 Red Hat、Centos、SLES、OpenSuSe 以及其他基于 RPM 的系统下安装。RPM 包可以从 Elastic 官网或者我们的 RPM 仓库下载。使用 RPM 包安装 Kibana            |
| docker     | Elastic Docker 仓库中有现有的可以运行 Kibana 的 Docker 镜像，并预装了 X-Pack 。*Docker 容器中运行 Kibana*                                                       |

### 使用 .tar.gz 安装 KibanaKibana 为 Linux 和 Darwin 平台提供了 .tar.gz 安装包。这些类型的包非常容易使用。

Kibana 的最新稳定版本可以在 [Kibana 下载](https://www.elastic.co/downloads/kibana)页找到。其它版本可以在 [已发布版本](https://www.elastic.co/downloads/past-releases)中查看。

#### 下载安装 Linux 64 位包

Kibana v6.0.0 的 Linux 文件可以按照如下方式下载和安装：

wget https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-linux-x86_64.tar.gz

sha1sum kibana-6.0.0-linux-x86_64.tar.gz

 

tar -xzf kibana-6.0.0-linux-x86_64.tar.gz

cd kibana/

 

|     | 比较 sha1sum 或 shasum 产生的 SHA 跟 [发布 SHA](https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-linux-x86_64.tar.gz.sha1)是否一致。 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|     | 该目录是 $KIBANA_HOME 。                                                                                                                       |

#### 下载安装 Darwin 包

Kibana v6.0.0 的 Darwin 文件可以按照如下方式下载和安装：

wget https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-darwin-x86_64.tar.gz

shasum kibana-6.0.0-darwin-x86_64.tar.gz

 

tar -xzf kibana-6.0.0-darwin-x86_64.tar.gz

cd kibana/

 

|     | 比较 sha1sum 或 shasum 产生的SHA 跟 [发布的 SHA](https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-darwin-x86_64.tar.gz.sha1)是否一致。 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | 该目录是 $KIBANA_HOME 。                                                                                                                         |

#### 从命令行启动 Kibana

Kibana 可以从命令行启动，命令如下：

./bin/kibana

默认 Kibana 在前台启动，打印日志到标准输出 (stdout)，可以通过 Ctrl-C 命令终止运行。

#### 通过配置文件配置 Kibana

Kibana 默认情况下从 $KIBANA_HOME/config/kibana.yml 加载配置文件。该配置文件的格式在 [配置 Kibana ](https://www.cnblogs.com/BlogNetSpace/p/9633653.html)中做了说明。

### .tar.gz 文件目录

.tar.gz 整个包是独立的。默认情况下，所有的文件和目录都在 $KIBANA_HOME — 解压包时创建的目录下。这样非常方便，因为您不需要创建任何目录来使用 Kibana，卸载 Kibana 就是简单地删除 $KIBANA_HOME 目录。但还是建议修改一下配置文件和数据目录，这样就不会删除重要数据。

| 类型     | 描述                                                                | 默认位置              | 设置 |
| -------- | ------------------------------------------------------------------- | --------------------- | ---- |
| home     | Kibana home 目录或 $KIBANA_HOME 。                                  | 解压包时创建的目录    |      |
| bin      | 二进制脚本，包括 kibana 启动 Kibana 服务和 kibana-plugin 安装插件。 | $KIBANA_HOME\bin      |      |
| config   | 配置文件，包括 kibana.yml 。                                        | $KIBANA_HOME\config   |      |
| data     | Kibana 和其插件写入磁盘的数据文件位置。                             | $KIBANA_HOME\data     |      |
| optimize | 编译过的源码。某些管理操作(如，插件安装)导致运行时重新编译源码。    | $KIBANA_HOME\optimize |      |
| plugins  | 插件文件位置。每一个插件都有一个单独的二级目录。                    | $KIBANA_HOME\plugins  |      |

##  

### 在 Windows 上安装 Kibana

在 Windows 中安装 Kibana 使用 .zip 包。

最新稳定版 Kibana 可以从 [Kibana 下载](https://www.elastic.co/downloads/kibana)页获得。其他版本可以在 [已发布版本](https://www.elastic.co/downloads/past-releases)中查看。

#### 下载安装 .zip 包

下载 Kibana v6.0.0 的 .zip windows 文件： https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-windows-x86_64.zip

用您喜欢的解压工具解压下载的 zip 包。会创建一个文件夹叫 kibana-6.0.0-windows-x86_64，也就是我们指的 $KIBANA_HOME 。在一个终端窗口中， CD 到 $KIBANA_HOME 目录，例如：

CD c:\kibana-6.0.0-windows-x86_64

#### 从命令行启动 Kibana

Kibana 可以从命令行启动，如下：

.\bin\kibana

默认情况下，Kibana 在前台启动，输出 log 到 STDOUT ，可以通过 Ctrl-C 停止 Kibana。

#### 通过配置文件配置 Kibana

Kibana 默认情况下从 $KIBANA_HOME/config/kibana.yml 加载配置文件。该配置文件的格式在 [*配置 Kibana* ](https://www.cnblogs.com/BlogNetSpace/p/9633653.html)中做了说明。

### .zip 文件目录

.zip 整个包是独立的。默认情况下，所有的文件和目录都在 $KIBANA_HOME — 解压包时创建的目录下。这是非常方便的，因为您不需要创建任何目录来使用 Kibana，卸载 Kibana 只需要简单的删除 $KIBANA_HOME目录。但还是建议修改一下配置文件和数据目录，这样就不会删除重要数据。

| 类型     | 描述                                                                | 默认位置              | 设置 |
| -------- | ------------------------------------------------------------------- | --------------------- | ---- |
| home     | Kibana home 目录或 $KIBANA_HOME 。                                  | 解压包时创建的目录    |      |
| bin      | 二进制脚本，包括 kibana 启动 Kibana 服务和 kibana-plugin 安装插件。 | $KIBANA_HOME\bin      |      |
| config   | 配置文件包括 kibana.yml 。                                          | $KIBANA_HOME\config   |      |
| data     | Kibana 和其插件写入磁盘的数据文件位置。                             | $KIBANA_HOME\data     |      |
| optimize | 编译过的源码。某些管理操作(如，插件安装)导致运行时重新编译源码。    | $KIBANA_HOME\optimize |      |
| plugins  | 插件文件位置。每一个插件都一个单独的二级目录。                      | $KIBANA_HOME\plugins  |      |

 

### 使用 Debian 包安装 Kibana

Kibana Debian 安装包可以在官网下载或者从APT 仓库下载。它可以用来在任何基于 Debian 的系统，如 Debian 和 Ubuntu 上安装 Kibana。

Kibana 最新稳定版本可以在官方 [Kibana 下载](https://www.elastic.co/downloads/kibana)页找到。其他版本可以在 官方[已发布版本](https://www.elastic.co/downloads/past-releases)中查看。

#### 导入 Elastic PGP 密钥

我们所有部署包的签名使用的是 Elastic Signing Key (PGP key [D88E42B4](https://pgp.mit.edu/pks/lookup?op=vindex&search=0xD27D666CD88E42B4), 从 [https://pgp.mit.edu](https://pgp.mit.edu/) 可以获得)，指纹为：

4609 5ACC 8548 582C 1A26 99A9 D27D 666C D88E 42B4

下载并安装签名公钥：

wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

#### 从 APT 仓库安装

在开始之前，您需要在 Debian 系统上安装 apt-transport-https 包：

sudo apt-get install apt-transport-https

保存仓库的定义到 /etc/apt/sources.list.d/elastic-6.x.list:

echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list

 

请不要用 add-apt-repository 因为它需要添加 deb-src 入口，但是我们没有提供包源。如果您已经添加了 deb-src 入口，您将会遇到如下错误：

Unable to find expected entry 'main/source/Sources' in Release file

(Wrong sources.list entry or malformed file)

从 /etc/apt/sources.list 文件中删除 deb-src 入口，便可以正常安装。

使用以下命令安装 Kibana Debian 包：

sudo apt-get update && sudo apt-get install kibana

 

如果在仓库中有两条相同的 Kibana 入口，执行 apt-get update 命令时您将会遇到如下错误：

Duplicate sources.list entry https://artifacts.elastic.co/packages/6.x/apt/ ...`

检查这些文件中是否有重复记录： /etc/apt/sources.list.d/kibana-6.x.list 、 /etc/apt/sources.list.d/ 和 /etc/apt/sources.list 。

#### 手动下载安装 Debian 包

Kibana v6.0.0 的 Debian 包可以使用如下命令从网站下载安装：

wget https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-amd64.deb

sha1sum kibana-6.0.0-amd64.deb

sudo dpkg -i kibana-6.0.0-amd64.deb

|     | 比较 sha1sum 或 shasum 产生的 SHA跟 [发布的 SHA](https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-amd64.deb.sha1)。 |
| --- | ----------------------------------------------------------------------------------------------------------------------------- |
|     |                                                                                                                               |

#### SysV init 和 systemd 对比

Kibana 安装后不会自动启动。如何启动和停止 Kibana，依赖与您的操作系统。使用 SysV init 还是 systemd （新的发行版使用），可以通过以下命令来显示使用的是哪种：

ps -p 1

#### 使用 SysV init 运行 Kibana

使用 update-rc.d 命令配置 Kibana 开机自动启动：

sudo update-rc.d kibana defaults 95 10

Kibana 可以使用 service 命令来启动和停止：

sudo -i service kibana start

sudo -i service kibana stop

不管什么原因，如果 Kibana 启动失败，它会输出失败原因到 STDOUT。日志文件在 /var/log/kibana/ 目录下面。

#### 使用 systemd 运行 Kibana

配置 Kibana 开机自动启动，执行以下命令：

sudo /bin/systemctl daemon-reload

sudo /bin/systemctl enable kibana.service

Kibana 启动和停止命令如下：

sudo systemctl start kibana.service

sudo systemctl stop kibana.service

这些命令不会提供任何关于 Kibana 是否成功启动的反馈信息。而是将这些信息写入日志文件中，日志文件的位置在 /var/log/kibana/ 。

#### 通过配置文件配置 Kibana

Kibana 默认情况下从 $KIBANA_HOME/config/kibana.yml 加载配置文件。该配置文件的格式在 [*配置 Kibana*](https://www.cnblogs.com/BlogNetSpace/p/9633653.html) 中有相关说明。

#### Debian 包目录

在 Debian 包结构中，Debian 会把配置文件、日志和数据目录放在如下位置：

| 类型     | 描述                                                                   | 默认位置                   | 设置 |
| -------- | ---------------------------------------------------------------------- | -------------------------- | ---- |
| home     | Kibana home 目录或 $KIBANA_HOME 。                                     | /usr/share/kibana          |      |
| bin      | 二进制脚本，包括 kibana 启动 Kibana server 和 kibana-plugin 安装插件。 | /usr/share/kibana/bin      |      |
| config   | 配置文件，包括 kibana.yml 。                                           | /etc/kibana                |      |
| data     | Kibana 和其插件写入磁盘的数据文件位置。                                | /var/lib/kibana            |      |
| optimize | 编译过的源码。某些管理操作 (如，插件安装) 导致运行时重新编译源码。     | /usr/share/kibana/optimize |      |
| plugins  | 插件文件位置。每一个插件都有一个单独的二级目录。                       | /usr/share/kibana/plugins  |      |

 

### 使用 RPM 包安装 Kibana

Kibana RPM 包可以从官方网站下载或者从官方推荐的 RPM 仓库下载。RPM 包可以用来安装 Kibana 在任何基于 RPM 包管理的系统上，如 OpenSuSE 、SLES、Centos、Red Hat 和 Oracle 企业版等系统上。

 

RPM 安装不支持旧的系统版本，例如 SLES 11 和 CentOS 5。详情请参考 使用 .tar.gz 安装 Kibana 。

Kibana 的最新稳定版本可以在官方网站 [Kibana 下载](https://www.elastic.co/downloads/kibana)页找到。其它版本可以在 [已发布版本](https://www.elastic.co/downloads/past-releases)中查看。

#### 导入 Elastic PGP 密钥

我们所有部署包的签名使用的是 Elastic Signing Key (PGP key [D88E42B4](https://pgp.mit.edu/pks/lookup?op=vindex&search=0xD27D666CD88E42B4), 从 [https://pgp.mit.edu](https://pgp.mit.edu/) 可以获得)，指纹为：

4609 5ACC 8548 582C 1A26 99A9 D27D 666C D88E 42B4

下载并安装签名公钥：

rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch

#### 从 RPM 仓库安装

对于 RedHat 的发行版，在 /etc/yum.repos.d/ 目录下新建一个 kibana.repo 文件，对于 OpenSuSE 的发行版，在 /etc/zypp/repos.d/ 目录下新建一个 kibana.repo 文件，包含如下内容:

[kibana-6.x]

name=Kibana repository for 6.x packages

baseurl=https://artifacts.elastic.co/packages/6.x/yum

gpgcheck=1

gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch

enabled=1

autorefresh=1

type=rpm-md

您的仓库已经准备好了。现在您可以用下面的命令来安装 Kibana：

sudo yum install kibana

sudo dnf install kibana

sudo zypper install kibana

|     | 在 CentOS 和基于较低版本的 Red Hat 发行版上使用 yum 。 |
| --- | ------------------------------------------------------ |
|     | 在 Fedora 和较高版本的 Red Hat 发行版上使用 dnf 。     |
|     | 在基于 OpenSUSE 的发行版上使用 zypper 。               |

#### 手动下载安装 RPM

Kibana v6.0.0 的 RPM 包可以使用如下命令从网站下载安装 ：

wget https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-x86_64.rpm

sha1sum kibana-6.0.0-x86_64.rpm

sudo rpm --install kibana-6.0.0-x86_64.rpm

|     | 比较 sha1sum 或 shasum 产生的 SHA 跟 [发布的 SHA](https://artifacts.elastic.co/downloads/kibana/kibana-6.0.0-x86_64.rpm.sha1)。 |
| --- | ------------------------------------------------------------------------------------------------------------------------------- |
|     |                                                                                                                                 |

#### SysV init 和 systemd 对比

Kibana 安装后不会自动启动。如何启动和停止 Kibana，依赖与您的操作系统。使用 SysV init 还是 systemd （新的发行版使用），可以通过以下命令来显示使用的是哪种：

ps -p 1

#### SysV init 运行 Kibana

使用 chkconfig 命令配置 Kibana 开机自动启动：

sudo chkconfig --add kibana

Kibana 可以用 service 命令来启动和停止：

sudo -i service kibana start

sudo -i service kibana stop

任何原因导致的 Kibana 启动失败，都会输出失败原因到 STDOUT。日志文件在 /var/log/kibana/ 目录下面。

#### 使用 systemd 运行 Kibana

配置 Kibana 开机自动启动，执行以下命令：

sudo /bin/systemctl daemon-reload

sudo /bin/systemctl enable kibana.service

Kibana 启动和停止命令如下：

sudo systemctl start kibana.service

sudo systemctl stop kibana.service

这些命令不会提供任何关于 Kibana 是否成功启动的反馈信息。而是将这些信息写入日志文件中，日志文件的位置在 /var/log/kibana/ 。

#### 通过配置文件配置 Kibana

Kibana 默认情况下从 $KIBANA_HOME/config/kibana.yml 加载配置文件。该配置文件的格式在 [*配置 Kibana*](https://www.cnblogs.com/BlogNetSpace/p/9633653.html) 中有相关说明。

#### RPM 文件目录

在 RPM 包中，会把配置文件、日志和数据目录放在如下位置：

| 类型     | 描述                                                                   | 默认位置                   | 设置 |
| -------- | ---------------------------------------------------------------------- | -------------------------- | ---- |
| home     | Kibana home 目录或 $KIBANA_HOME 。                                     | /usr/share/kibana          |      |
| bin      | 二进制脚本，包括 kibana 启动 Kibana server 和 kibana-plugin 安装插件。 | /usr/share/kibana/bin      |      |
| config   | 配置文件，包括 kibana.yml 。                                           | /etc/kibana                |      |
| data     | Kibana 和其插件写入磁盘的数据文件位置。                                | /var/lib/kibana            |      |
| optimize | 编译过的源码。某些管理操作(如，插件安装)导致运行时重新编译源码。       | /usr/share/kibana/optimize |      |
| plugins  | 插件文件位置。每一个插件都有一个单独的二级目录。                       | /usr/share/kibana/plugins  |      |

 

### Docker 容器中运行 Kibana

Kibana 的 Docker 镜像可以从 Elastic 官网上的 Docker 镜像仓库获取。该镜像是随 X-Pack 一起打包的。

 

X-Pack 在这个 image 中是预装好的。安装了 X-Pack，Kibana 会去连接同样带有 X-Pack 的 Elasticsearch 集群。

#### 获取镜像

向 Elastic Docker 仓库发送一条 docker pull 命令就可以获取 Kibana Docker 镜像。

命令如下:

docker pull docker.elastic.co/kibana/kibana:6.0.0

#### 配置 Docker 中的 Kibana

Docker 镜像提供了几种方法来配置 Kibana。传统的方法是给出一个 [*配置 Kibana*](https://www.cnblogs.com/BlogNetSpace/p/9633653.html) 中描述的配置文件 kibana.yml ，也可以使用环境变量来定义设置项。

##### 绑定配置

一种配置 Docker 中 Kibana 的方法是通过绑定配置文件 kibana.yml 。使用 docker-compose 工具，向下面这样绑定：

services:

 kibana:

  image: docker.elastic.co/kibana/kibana:6.0.0

  volumes:

   \- ./kibana.yml:/usr/share/kibana/config/kibana.yml

##### 环境变量设置

在 Docker 中，Kibana 可以通过环境变量的方法设置。环境变量如下：

 

表 1. Docker 环境变量

| Environment Variable                                | Kibana Setting                                      |
| --------------------------------------------------- | --------------------------------------------------- |
| ELASTICSEARCH_CUSTOMHEADERS                         | elasticsearch.customHeaders                         |
| ELASTICSEARCH_PASSWORD                              | elasticsearch.password                              |
| ELASTICSEARCH_PINGTIMEOUT                           | elasticsearch.pingTimeout                           |
| ELASTICSEARCH_PRESERVEHOST                          | elasticsearch.preserveHost                          |
| ELASTICSEARCH_REQUESTHEADERSWHITELIST               | elasticsearch.requestHeadersWhitelist               |
| ELASTICSEARCH_REQUESTTIMEOUT                        | elasticsearch.requestTimeout                        |
| ELASTICSEARCH_SHARDTIMEOUT                          | elasticsearch.shardTimeout                          |
| ELASTICSEARCH_SSL_CA                                | elasticsearch.ssl.ca                                |
| ELASTICSEARCH_SSL_CERT                              | elasticsearch.ssl.cert                              |
| ELASTICSEARCH_SSL_KEY                               | elasticsearch.ssl.key                               |
| ELASTICSEARCH_SSL_VERIFY                            | elasticsearch.ssl.verify                            |
| ELASTICSEARCH_STARTUPTIMEOUT                        | elasticsearch.startupTimeout                        |
| ELASTICSEARCH_URL                                   | elasticsearch.url                                   |
| ELASTICSEARCH_USERNAME                              | elasticsearch.username                              |
| KIBANA_DEFAULTAPPID                                 | kibana.defaultAppId                                 |
| KIBANA_INDEX                                        | kibana.index                                        |
| LOGGING_DEST                                        | logging.dest                                        |
| LOGGING_QUIET                                       | logging.quiet                                       |
| LOGGING_SILENT                                      | logging.silent                                      |
| LOGGING_VERBOSE                                     | logging.verbose                                     |
| OPS_INTERVAL                                        | ops.interval                                        |
| PID_FILE                                            | pid.file                                            |
| SERVER_BASEPATH                                     | server.basePath                                     |
| SERVER_HOST                                         | server.host                                         |
| SERVER_MAXPAYLOADBYTES                              | server.maxPayloadBytes                              |
| SERVER_NAME                                         | server.name                                         |
| SERVER_PORT                                         | server.port                                         |
| SERVER_SSL_CERT                                     | server.ssl.cert                                     |
| SERVER_SSL_KEY                                      | server.ssl.key                                      |
| XPACK_MONITORING_ELASTICSEARCH_URL                  | xpack.monitoring.elasticsearch.url                  |
| XPACK_MONITORING_ELASTICSEARCH_USERNAME             | xpack.monitoring.elasticsearch.username             |
| XPACK_MONITORING_ELASTICSEARCH_PASSWORD             | xpack.monitoring.elasticsearch.password             |
| XPACK_MONITORING_ENABLED                            | xpack.monitoring.enabled                            |
| XPACK_MONITORING_MAX_BUCKET_SIZE                    | xpack.monitoring.max_bucket_size                    |
| XPACK_MONITORING_MIN_INTERVAL_SECONDS               | xpack.monitoring.min_interval_seconds               |
| XPACK_MONITORING_NODE_RESOLVER                      | xpack.monitoring.node_resolver                      |
| XPACK_MONITORING_REPORT_STATS                       | xpack.monitoring.report_stats                       |
| XPACK_MONITORING_KIBANA_COLLECTION_ENABLED          | xpack.monitoring.kibana.collection.enabled          |
| XPACK_MONITORING_KIBANA_COLLECTION_INTERVAL         | xpack.monitoring.kibana.collection.interval         |
| XPACK_MONITORING_UI_CONTAINER_ELASTICSEARCH_ENABLED | xpack.monitoring.ui.container.elasticsearch.enabled |
| XPACK_SECURITY_ENABLED                              | xpack.security.enabled                              |
| XPACK_SECURITY_COOKIENAME                           | xpack.security.cookieName                           |
| XPACK_SECURITY_ENCRYPTIONKEY                        | xpack.security.encryptionKey                        |
| XPACK_SECURITY_SECURECOOKIES                        | xpack.security.secureCookies                        |
| XPACK_SECURITY_SESSIONTIMEOUT                       | xpack.security.sessionTimeout                       |

 

这些变量可以像下面这样，用 docker-compose 设置：

services:

 kibana:

  image: docker.elastic.co/kibana/kibana:6.0.0

  environment:

   SERVER_NAME: kibana.example.org

   ELASTICSEARCH_URL: http://elasticsearch.example.org

优先使用环境变量，然后是配置文件 kibana.yml 中的配置项。

##### Docker 默认值

使用 Docker 时，下面的配置项有不同的默认值 ：

| server.host                                         | "0"                       |
| --------------------------------------------------- | ------------------------- |
| elasticsearch.url                                   | http://elasticsearch:9200 |
| elasticsearch.username                              | elastic                   |
| elasticsearch.password                              | changeme                  |
| xpack.monitoring.ui.container.elasticsearch.enabled | true                      |

这些配置项的默认值在 kibana.yml 中设置。可以通过 自定义 kibana.yml 或者 环境变量覆盖这些默认值。

 

## 访问 Kibana

 

Kibana 是一个 web 应用，可以通过5601端口访问。只需要在浏览器中指定 Kibana 运行的机器，然后指定端口号即可。例如， `localhost:5601` 或者 `http://YOURDOMAIN.com:5601` ,详见之前界面章节展现靓照。


## 参考文章
* https://www.cnblogs.com/Naylor/p/13261136.html
* https://www.cnblogs.com/BlogNetSpace/p/9633697.html