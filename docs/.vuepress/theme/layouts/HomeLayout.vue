<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <div style="display:none">自定义主页</div>
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
  name: 'HomeLayout',

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
    // console.log("this.lastCurUrlPath:" + this.lastCurUrlPath)
    // 首次加载的时候，updated时候不更新 list
    // 从首页跳转时，此页面 this.lastCurUrlPath 为 / 
    if (this.lastCurUrlPath.length > 0 && this.lastCurUrlPath !== this.curUrlPath) {
      this.initIndexList()
    }
    this.lastCurUrlPath = this.curUrlPath
    this.initGetPageNextLast()
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  mounted () {
    this.initPath()
    this.initIndexList()
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
      var i = 1;  // 初始值为 1 ，第 0 个为标题， 忽略
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

      // console.log("create new index...");
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
