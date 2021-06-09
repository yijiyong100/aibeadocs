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

      <div><button @click="toggleDiyLeftSiderBar()"> 关闭左侧 </button>
        <span>{{this.isLeftSiderOpen}}</span>
      </div>
      <div><button @click="handleFullScreen()"> 全屏 </button>
        <span>{{this.isLeftSiderOpen}}</span>
      </div>

      <span v-if="this.pagePrevUrl.length > 0"><a :href="this.pagePrevUrl">上一篇</a></span>
      <span v-if="this.pageNextUrl.length > 0"><a :href="this.pageNextUrl">下一篇</a></span>

      <ul>
        <li v-for="item in $page.headers" v-bind:key="item.slug">
          <a :href="curUrlPath+'#'+item.slug" @click="curElmClick(item.slug)" :class="[item.slug===curIndexSlug?'active_index_li':'unactive_index_li']" aria-current="page">{{item.title}}</a>
        </li>
      </ul>
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
      curUrlPath: "",
      isLeftSiderOpen: true,
      isFullscreen: false,
      pageNextUrl: "",
      pagePrevUrl: ""
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
    this.initGetPageNextLast()
  },

  mounted () {
    this.initPath()
    this.initGetPageNextLast()
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
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
    initPath () {
      this.curUrlPath = window.location.pathname
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
