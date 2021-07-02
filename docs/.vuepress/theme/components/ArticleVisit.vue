<template>
  <div>

    <span>更新时间</span>
    <span>{{articleInfo.updateTime}}</span>
    &nbsp;&nbsp;
    <span>访问</span>
    <span>{{articleInfo.visitNum}}</span>
    &nbsp;&nbsp;
    <span>点赞</span>&nbsp;
    <span>{{articleInfo.likeNum}}</span>

  </div>
</template>

<script>
export default {
  name: 'ArticleVisit',
  props: {
    articleInfo: {
      type: Object,
      default: {
        updateTime: "",
        visitNum: 1,
        likeNum: 0
      }
    }
  }
}

</script>
<style>
</style>