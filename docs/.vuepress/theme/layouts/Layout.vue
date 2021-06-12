<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar" :class="[!isLeftSiderOpen?'left_bar_hidden':'']">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" class="page-content-spec" :class="[!isLeftSiderOpen?'page_left_bar_hidden':'']">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
        <Vssue class="theme-default-content content__default" style="max-width:1080px" :options="{ locale: 'zh' }" />
      </template>
    </Page>
    <div class="page-right-index-sidebar" v-if="!$page.frontmatter.home">
      <div class="content_index_title">
        {{$page.title}}
      </div>

      <!-- <el-button type="primary">搜索</el-button> -->

      <ul>
        <li v-for="(item,index) in this.idxList" v-bind:key="item.slug">
          <a :href="curUrlPath+'#'+item.slug" @click="curElmClick(item.slug)" :class="[item.slug===curIndexSlug?'active_index_li':'unactive_index_li']" aria-current="page">{{item.title}}
          </a>
          <ul v-for=" itemChild in item.childList" v-bind:key="itemChild.slug">
            <li>
              <a :href="curUrlPath+'#'+itemChild.slug" @click="curElmClick(itemChild.slug)" :class="[itemChild.slug===curIndexSlug?'active_index_li':'unactive_index_li']" aria-current="page">{{itemChild.title}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="page-right-tool-sidebar" v-if="!$page.frontmatter.home">
      <div @click="" class="tool_bar_div" @mouseenter="mouseEnterHandle('qrCodeDiv')" @mouseleave="mouseLeaveHandle()">
        <img src="/assets/img/toolbar/phone.png" class="tool_bar_img_icon" />
        <div>手机看</div>
      </div>
      <div @click="" @mouseenter="mouseEnterHandle('wxmpDiv')" @mouseleave="mouseLeaveHandle()" class="tool_bar_div">
        <img src="/assets/img/toolbar/wechat.png" class="tool_bar_img_icon" />
        <div>公众号</div>
      </div>
      <div @click="" @mouseenter="mouseEnterHandle('coummpDiv')" @mouseleave="mouseLeaveHandle()" class="tool_bar_div">
        <img src="/assets/img/toolbar/communication.png" class="tool_bar_img_icon" />
        <div>讨论</div>
      </div>
      <div @click="toggleDiyLeftSiderBar()" class="tool_bar_div">
        <img src="/assets/img/toolbar/leftclose.png" class="tool_bar_img_icon" />
        <div>左栏</div>
      </div>
      <div @click="handleFullScreen()" class="tool_bar_div">
        <img src="/assets/img/toolbar/fullscreen.png" class="tool_bar_img_icon" />
        <div>全屏</div>
      </div>
      <div v-show="this.pagePrevUrl.length > 0">
        <router-link :to="this.pagePrevUrl">
          <div class="tool_bar_div">
            <img src="/assets/img/toolbar/prev.png" class="tool_bar_img_icon" />
            <div>上一篇</div>
          </div>
        </router-link>
      </div>
      <div v-show="this.pageNextUrl.length > 0">
        <router-link :to="this.pageNextUrl">
          <div class="tool_bar_div">
            <img src="/assets/img/toolbar/next.png" class="tool_bar_img_icon" />
            <div>下一篇</div>
          </div>
        </router-link>
      </div>

    </div>

    <div id="qrCodeDiv" :class="[this.mouseEnterFocusDiv === 'qrCodeDiv'?'toolbar_qrcode_active':'toolbar_qrcode_unactive']">
      <div class=" toolbar_head_tile">扫一扫 手机阅读</div>
      <img :src="this.qrCodeApiUrl" class="img-qrcode" />
      <h5>可分享给好友和朋友圈</h5>
    </div>

    <div id="wxmpDiv" v-show="this.mouseEnterFocusDiv === 'wxmpDiv'" class="toolbar_wxmp_active">
      <div class="toolbar_head_tile">扫描关注公众号，回复"资料"，下载相关图书和资料</div>
      <img src="/assets/img/wx/wxmp.jpg" class="img-wx-mp" />
      <h5>公众号:智能后端和架构</h5>
    </div>

    <div id="coummpDiv" v-show="this.mouseEnterFocusDiv === 'coummpDiv'" class="toolbar_communication_active">
      <div class="toolbar_head_tile">QQ群:569556849 <br />问题咨询和技术交流</div>
      <img src="/assets/img/qq/qqgroup.png" class="img-wx-mp" />
      <h5>PS 备注:智能后端和架构</h5>
    </div>

    <div class="topDivImg" v-show="topButtonShowFlag" @click="onClickReturnTop">
      <img src="/assets/img/toolbar/top.png" class="tool_top_img_icon" />
    </div>


    <!-- 友盟统计 -->
    <div style="display:none">
     <script type="text/javascript" src="https://s9.cnzz.com/z_stat.php?id=1279777129&web_id=1279777129"></script>
    </div>

  </div>

</template>

<style scoped>
@import '../../public/assets/css/common.css';
</style>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  data () {
    return {
      isSidebarOpen: false,
      curIndexSlug: "",
      // 相对路径
      curUrlPath: "",
      // 上次相对路径
      lastCurUrlPath: "",
      // 全路径 
      curAllUrlPath: "",
      isLeftSiderOpen: true,
      isFullscreen: false,
      pageNextUrl: "",
      pagePrevUrl: "",
      qrCodeApiPre: "https://api.qrserver.com/v1/create-qr-code/?data=",
      qrCodeApiUrl: "",
      topButtonShowFlag: false,
      // 标识是否在滚动上滑动中
      returnTopScrollingFlag: false,
      mouseEnterFocusDiv: "",
      idxList: []
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  updated () {
    this.initPath()
    this.initIndexList()
    this.lastCurUrlPath = this.curUrlPath
    this.initGetPageNextLast()
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  mounted () {
    this.initPath()
    this.initGetPageNextLast()
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    // 索引的结构 树形结构的 数据构造
    initIndexList () {
      if (this.lastCurUrlPath === this.curUrlPath) {
        return;
      }
      // 清空数据
      this.idxList = [];
      var indexNodeNum = this.$page.headers.length;
      var curNo = 0;
      var i = 0;
      while (i < indexNodeNum) {
        curNo = i;
        // console.log("node:" + this.$page.headers[i].slug);
        if (this.$page.headers[i].level === 2) {
          var idxNodeCur = { level: 2, slug: "", title: "", childList: [] };
          idxNodeCur.level = this.$page.headers[i].level;
          idxNodeCur.slug = this.$page.headers[i].slug;
          idxNodeCur.title = this.$page.headers[i].title;
          idxNodeCur.childList = [];
          curNo++;
          while (curNo < indexNodeNum) {
            // console.log("curNo:" + curNo)
            if (this.$page.headers[curNo].level === 3) {
              var idxNodeChild = { level: 2, slug: "", title: "", childList: [] };
              idxNodeChild.level = this.$page.headers[curNo].level;
              idxNodeChild.slug = this.$page.headers[curNo].slug;
              idxNodeChild.title = this.$page.headers[curNo].title;
              idxNodeChild.childList = [];
              idxNodeCur.childList.push(idxNodeChild)
            } else {
              break
            }
            curNo++;
          }
          this.idxList.push(idxNodeCur)
          // console.log(idxNodeCur)
          i = curNo - 1;
        }
        i++;
      }

      // console.log("this.idxList.len:" + this.idxList.length)
      // for (var j = 0; j < this.idxList.len; j++) {
      //   console.log(this.idxList[j].slug)
      // }

    },
    // 鼠标进入事件处理
    mouseEnterHandle (divId) {
      this.mouseEnterFocusDiv = divId;
    },
    // 鼠标离开事件处理
    mouseLeaveHandle () {
      this.mouseEnterFocusDiv = "";
    },
    // 鼠标滑动导航响应效果
    handleScroll () {
      if (!this.returnTopScrollingFlag) {
        // 获取鼠标滚动距离
        var scrolled =
          document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        if (scrolled > 200) {
          this.topButtonShowFlag = true;
        } else {
          this.topButtonShowFlag = false;
        }
      }
      // console.log(scrolled)
    }
    ,
    // 全屏事件
    handleFullScreen () {
      var element = document.documentElement;
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    toggleDiyLeftSiderBar () {
      if (this.isLeftSiderOpen) {
        this.isLeftSiderOpen = false;
      } else {
        this.isLeftSiderOpen = true;
      }
    },
    onClickReturnTop () {
      this.returnTopScrollFlag = true;
      // 返回顶部
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
      this.returnTopScrollFlag = false;
      // 滚动到顶部后，将按钮置为不可见
      this.topButtonShowFlag = false;
    },
    initPath () {
      this.curUrlPath = window.location.pathname
      this.curAllUrlPath = window.location.href
      this.qrCodeApiUrl = this.qrCodeApiPre + this.curAllUrlPath
    },
    initGetPageNextLast () {
      var prevUpdated = 0;
      var nextUpdated = 0;
      var pageNavInfo = document.getElementsByClassName('page-nav');
      //console.log(pageNavInfo.length)
      if (pageNavInfo.length > 0) {
        var pageNavNode = pageNavInfo[0];
        // console.log(pageNavNode)
        // console.log(pageNavNode.children[0])
        // console.log(pageNavNode.children[0].children.length)
        if (pageNavNode.children.length > 0 && pageNavNode.children[0].children.length > 0) {
          var linkNum = pageNavNode.children[0].children.length;
          for (var i = 0; i < linkNum; i++) {
            let eleClassName = pageNavNode.children[0].children[i].className + "";
            //console.log(eleClassName)
            if (eleClassName === 'prev') {
              this.pagePrevUrl = pageNavNode.children[0].children[i].children[0].getAttribute("href") + "";
              prevUpdated = 1;
            }
            if (eleClassName === 'next') {
              this.pageNextUrl = pageNavNode.children[0].children[i].children[0].getAttribute("href") + "";
              nextUpdated = 1;
            }
          }
          // console.log(linkNum)
          // console.log(this.pagePrevUrl)
          // console.log(this.pageNextUrl)
        }
        //console.log(pageNavNode)
        //console.log(pageNavNode.children[0].children[0].children[0].getAttribute("href"))
      }
      if (nextUpdated === 0) {
        this.pageNextUrl = "";
      }
      if (prevUpdated === 0) {
        this.pagePrevUrl = "";
      }
    },

    curElmClick (indexNavElmId) {
      this.curIndexSlug = indexNavElmId;
    },

    scrollToPosition (elmId) {
      var tar = document.querySelector('#' + elmId);
      window.scrollTo(0, tar.offsetTop)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>
