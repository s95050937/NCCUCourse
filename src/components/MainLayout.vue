<template>
  <div class="main-layout">
    <el-container>
      <el-header>
        <img src="../assets/img/logo.png" alt="">
        <h2>政大選課平台</h2>
      </el-header>
      <el-container>
        <el-aside width="64px">
          <el-menu
            active-text-color="#feca57"
            background-color="#40514e"
            text-color="#fff"
            default-active="/home"
            :router="true"
            :unique-opened="true"
            :collapse="true"
            >
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span>主頁</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-time"></i>
                <span>星期制</span>
              </template>
              <el-menu-item-group class="date-group">
                <el-menu-item index="/date/mon">
                  <i class="el-icon-folder"></i>
                  <span>星期一</span>
                </el-menu-item>
                <el-menu-item index="/date/tue">
                  <i class="el-icon-folder"></i>
                  <span>星期二</span>
                </el-menu-item>
                <el-menu-item index="/date/wed">
                  <i class="el-icon-folder"></i>
                  <span>星期三</span>
                </el-menu-item>
                <el-menu-item index="/date/thur">
                  <i class="el-icon-folder"></i>
                  <span>星期四</span>
                </el-menu-item>
                <el-menu-item index="/date/fri">
                  <i class="el-icon-folder"></i>
                  <span>星期五</span>
                </el-menu-item>
                <el-menu-item index="/date/sat">
                  <i class="el-icon-folder"></i>
                  <span>星期六</span>
                </el-menu-item>
                <el-menu-item index="/date/sun">
                  <i class="el-icon-folder"></i>
                  <span>星期日</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :key="key"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
}
</script>

<style lang="less" scoped>
.main-layout {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #11999e;
  
  display: flex;
  align-content: center;
  img {
    height: 100%;
  }
  h2 {
    margin: auto 0 auto 10px ;
  }
}
.el-aside {
  background-color: #30e3ca;
}
.el-menu {
  border-right-width: 0px;
}
.date-group {
  span {
    margin-left: 8px;
  }
}
.el-main {
  background-color: #e4f9f5;
}
.el-footer {
  background-color: #40514e;
}
</style>