<template>
  <!-- el过渡动画 -->
  <transition name="el-fade-in-linear">
    <!-- 导航栏 -->
    <div v-show="toolbar.visible" @mouseenter="hoverEnter = true" @mouseleave="hoverEnter = false"
         :class="[{ enter: toolbar.enter }, { hoverEnter: (hoverEnter || this.$route.path === '/favorite' || this.$route.path === '/travel') && !toolbar.enter }]"
         class="toolbar-content myBetween">
      <!-- 网站名称 -->
      <div class="toolbar-title">
        <h2 @click="$router.push({path: '/'})">{{$store.state.webInfo.webName}}</h2>
      </div>

      <!-- 手机导航按钮 -->
      <div v-if="$common.mobile() || mobile"
           class="toolbar-mobile-menu"
           @click="$parent.toolbarDrawer = !$parent.toolbarDrawer"
           :class="{ enter: toolbar.enter }">
        <i class="el-icon-s-operation"></i>
      </div>

      <!-- 导航列表 -->
      <div v-else>
        <ul class="scroll-menu">
          <li @click="$router.push({path: '/'})"><div class="my-menu">🏡 <span>寻梦归处</span></div></li>

          <el-dropdown :hide-timeout="500" placement="bottom">
            <li><div class="my-menu">📒 <span>记忆空间</span></div></li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push({path: '/sort?id=1'})">闲言语</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({path: '/diary'})">日记本</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 眼中的世界 -->
          <li @click="$router.push({path: '/travel'})"><div class="my-menu">🌏 <span>大千世界</span></div></li>

          <!-- 写给未来的一封信 -->
          <li @click="$router.push({path: '/message'})"><div class="my-menu">📪 <span>拾光邮局</span></div></li>

          <!-- 每日心情 -->
          <li @click="$router.push({path: '/about'})"><div class="my-menu">😃 <span>心情驿站</span></div></li>

          <!-- 后台 -->
          <li @click="goAdmin()"><div class="my-menu">💻️ <span>后台</span></div></li>
          <!-- 个人中心 -->
          <li>
            <el-dropdown placement="bottom">
              <el-avatar class="user-avatar" :size="36" style="margin-top: 12px"
                         :src="!$common.isEmpty($store.state.currentUser)?$store.state.currentUser.avatar:$store.state.webInfo.avatar">
              </el-avatar>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push({path: '/user'})" v-if="!$common.isEmpty($store.state.currentUser)">
                  <i class="fa fa-user-circle" aria-hidden="true"></i> <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout()" v-if="!$common.isEmpty($store.state.currentUser)">
                  <i class="fa fa-sign-out" aria-hidden="true"></i> <span>退出</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="$router.push({path: '/user'})" v-if="$common.isEmpty($store.state.currentUser)">
                  <i class="fa fa-sign-in" aria-hidden="true"></i> <span>登陆</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown></li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>

import mousedown from '@/utils/mousedown';
import constant from "@/utils/constant";

export default {
  data() {
    return {
      toolButton: this.$parent.toolButton,
      hoverEnter: this.$parent.hoverEnter,
      mouseAnimation: this.$parent.mouseAnimation,
      isDark: this.$parent.isDark,
      scrollTop: this.$parent.scrollTop,
      toolbarDrawer: this.$parent.toolbarDrawer,
      mobile: this.$parent.mobile
    }
  },
  mounted() {
    if (this.mouseAnimation) {
      mousedown();
    }
    window.addEventListener("scroll", this.onScrollPage);
    if (this.isDaylight()) {
      this.isDark = true;
      let root = document.querySelector(":root");
      root.style.setProperty("--background", "#272727");
      root.style.setProperty("--fontColor", "white");
      root.style.setProperty("--borderColor", "#4F4F4F");
      root.style.setProperty("--borderHoverColor", "black");
      root.style.setProperty("--articleFontColor", "#E4E4E4");
      root.style.setProperty("--articleGreyFontColor", "#D4D4D4");
      root.style.setProperty("--commentContent", "#D4D4D4");
      root.style.setProperty("--favoriteBg", "#1e1e1e");
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScrollPage);
  },
  watch: {
  },
  created() {
    let toolbarStatus = {
      enter: false,
      visible: true,
    };
    this.$store.commit("changeToolbarStatus", toolbarStatus);
    this.$parent.getWebInfo();
    this.getSortInfo();

    this.mobile = document.body.clientWidth < 1100;

    window.addEventListener('resize', () => {
      let docWidth = document.body.clientWidth;
      if (docWidth < 1100) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  },
  computed: {
    toolbar() {
      return this.$store.state.toolbar;
    }
  },
  methods: {
    smallMenu(data) {
      this.$router.push(data)
      this.$parent.toolbarDrawer = false;
    },

    smallMenuLogout() {
      this.logout();
      this.$parent.toolbarDrawer = false;
    },

    goAdmin() {
      window.open(this.$constant.webURL + "/admin");
    },
    logout() {
      this.$http.get(this.$constant.baseURL + "/user/logout").then((res) => {
        }).catch((error) => {
          this.$message({
            message: error.message,
            type: "error"
          });
        });
      this.$store.commit("loadCurrentUser", {});
      localStorage.removeItem("userToken");
      this.$router.push({path: '/'});
    },
    getSortInfo() {
      this.$http.get(this.$constant.baseURL + "/webInfo/getSortInfo").then((res) => {
          if (!this.$common.isEmpty(res.data)) {this.$store.commit("loadSortInfo", res.data);}
        }).catch((error) => {
          this.$message({
            message: error.message,
            type: "error"
          });
        });
    },
    onScrollPage() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    },
    isDaylight() {
      let currDate = new Date();
      return currDate.getHours() > 22 || currDate.getHours() < 7;
    }
  }
}
</script>

<style scoped>

.toolbar-content {
  width: 100%;
  height: 60px;
  color: var(--white);
  /* 固定位置，不随滚动条滚动 */
  position: fixed;
  z-index: 100;
  /* 禁止选中文字 */
  user-select: none;
  transition: all 0.3s ease-in-out;
}

.toolbar-content.enter {
  background: var(--toolbarBackground);
  color: var(--toolbarFont);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
}

.toolbar-content.hoverEnter {
  background: var(--translucent);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
}

.toolbar-title {
  margin-left: 30px;
  cursor: pointer;
}

.toolbar-mobile-menu {
  font-size: 30px;
  margin-right: 15px;
  cursor: pointer;
}

.scroll-menu {
  margin: 0 25px 0 0;
  display: flex;
  justify-content: flex-end;
  padding: 0;
}

.scroll-menu li {
  list-style: none;
  margin: 0 12px;
  font-size: 17px;
  height: 60px;
  line-height: 60px;
  position: relative;
  cursor: pointer;
}

.scroll-menu li:hover .my-menu span {
  color: var(--themeBackground);
}

.scroll-menu li:hover .my-menu i {
  color: var(--themeBackground);
  animation: scale 1.5s ease-in-out infinite;
}

.scroll-menu li .my-menu:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  height: 6px;
  background-color: var(--themeBackground);
  width: 100%;
  max-width: 0;
  transition: max-width 0.25s ease-in-out;
}

.scroll-menu li:hover .my-menu:after {
  max-width: 100%;
}

.sortMenu {
  margin-left: 44px;
  font-size: 17px;
  position: relative;
}

.sortMenu:after {
  top: 32px;
  width: 35px;
  left: 0;
  height: 2px;
  background: var(--themeBackground);
  content: "";
  border-radius: 1px;
  position: absolute;
}

.el-dropdown {
  font-size: unset;
  color: unset;
}

.el-popper[x-placement^=bottom] {
  margin-top: -8px;
}

.el-dropdown-menu {
  padding: 5px 0;
}

.el-dropdown-menu__item {
  font-size: unset;
}

.el-dropdown-menu__item:hover {
  background-color: var(--white);
  color: var(--themeBackground);
}

.cd-top {
  background: var(--toTop) no-repeat center;
  position: fixed;
  right: 5vh;
  top: -900px;
  z-index: 99;
  width: 70px;
  height: 900px;
  background-size: contain;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}

</style>
