<template>
  <div id="app" v-loading.fullscreen.lock="LOADING">
    <el-container class="app-container">
      <!-- <el-aside class="app-nav-bar" v-if="TOKEN">
        <Nav />
      </el-aside> -->
      <el-container class="main-container">
        <el-header class="app-header" v-if="TOKEN" :key="TOKEN">
          <Header />
        </el-header>
        <el-main id="app-view">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LOGOUT } from "@/stores/types/actions";
import { TOKEN, LOADING } from "@/stores/types/getters";
import { VALID_RULES } from "@/common/valid-rules";
import Nav from "@/components/Nav";
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Nav, Header },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ TOKEN, LOADING })
  },
  mounted() {
    this.initVeeValidateRules();
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (from.name !== "login") {
        if (to.path === "/") {
          this.LOGOUT();
          next();
        } else {
          next();
        }
      } else {
        if (to.path === "/") {
          this.LOGOUT();
          next();
        } else {
          next();
        }
      }
    });
    if (this.$router.currentRoute.path === "/") {
      this.LOGOUT();
    }
  },
  methods: {
    ...mapActions({ LOGOUT }),
    initVeeValidateRules() {
      VALID_RULES.forEach(item => {
        this.$validator.extend(item.id, {
          getMessage: () => item.msg,
          validate: item.validate
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/styles.scss";
@import "@/assets/styles/styles.scss";
body {
  font-family: $font-full;
}
#app {
  font-family: $font-full;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-text-color;
  height: 100% !important;
  .app-container {
    height: 100%;
    background: $app-background-color;
    .app-nav-bar {
    }
    .main-container {
      transition: margin-left 0.28s;
      margin-left: 0px;
      position: relative;
      .app-header {
        padding: 0px;
        &.none-display {
          height: 0px !important;
        }
        &.mobile-wrap {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
      }
      .el-main {
        padding-right: 120px;
        padding-left: 80px;
        padding-top: 10px;
      }
      .el-main-mobile {
        padding: 10px 0px 50px 0px;
        // z-index: $z-index-background !important;
      }
    }
  }
}
</style>
