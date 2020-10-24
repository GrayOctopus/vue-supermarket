<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="home-scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp = 'loadMore'>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        :title='["流行","新款","精选"]'
        class="home-tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";

import {getHomeMultidaata, getHomeGoods} from 'network/home';


export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
    }
  },
  components: {
    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    HomeFeatureView
  },
  created() {
    this.getHomeMultidaata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }

  },
  methods: {
    /**
     * 事件监听相关方法
     */
    debounce(func,delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(func,args)
        },delay)
      }
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.backTop(0,0)
    },
    contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
    },
    //上拉加载更多
    loadMore () {
      this.getHomeGoods(this.currentType)
      // console.log('上拉加载更多')
      this.$refs.scroll.refresh()
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidaata() {
      getHomeMultidaata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })

    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-navbar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.home-tab-control {
  position: sticky;
  top: 44px;
}

.home-scroll {
  /*height: 300px;*/
  /*overflow: hidden;*/
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
</style>
