<template>
  <div id="app" v-loading.fullscreen.lock="LOADING">
    <el-container class="app-container">
      <!-- <el-aside class="app-nav-bar" v-if="TOKEN">
        <Nav />
      </el-aside>-->
      <el-container class="main-container">
        <el-header class="app-header" v-if="TOKEN" :key="TOKEN">
          <Header />
        </el-header>
        <el-main id="app-view">
          <router-view />
        </el-main>
      </el-container>
      <ConfirmDialog
        v-if="confirmConfig.show"
        :config="confirmConfig.config"
        @on-confirm="payload => onConfirm(true, payload)"
        @on-cancel="() => onConfirm(false)"
      />
      <CompleteDialog
        v-if="completeConfig.show"
        :config="completeConfig.config"
        @on-confirm="payload => onComplete(true, payload)"
      />
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
import ConfirmDialog from "@/components/base/AppDialogs/ConfirmDialog";
import CompleteDialog from "@/components/base/AppDialogs/CompleteDialog";
import Utils from "@/common/utils";

import {
  EVENT_BUS,
  CONFIRM_DIALOG_TYPE,
  COMPLETE_DIALOG_TYPE
} from "@/common/constants";

export default {
  name: "App",
  components: { Nav, Header, ConfirmDialog, CompleteDialog },
  data() {
    return {
      confirmConfig: {
        show: false,
        config: {
          type: CONFIRM_DIALOG_TYPE.WARNING
        }
      },
      completeConfig: {
        show: false,
        config: {
          type: COMPLETE_DIALOG_TYPE.COMPLETE
        }
      }
    };
  },
  computed: {
    ...mapGetters({ TOKEN, LOADING })
  },
  mounted() {
    this.initVeeValidateRules();
    this.initEventBus();
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
    },
    resetAppDialog() {
      this.completeConfig.show = false;
      this.confirmConfig.show = false;
    },
    initEventBus() {
      this.$eventBus.$on(EVENT_BUS.OPEN_CONFIRM, params => {
        if (params) {
          this.resetAppDialog();
          this.confirmConfig.show = true;
          this.confirmConfig.config = Utils.copyObject(params);
        } else {
          this.confirmConfig.show = false;
          this.confirmConfig.config = {
            type: CONFIRM_DIALOG_TYPE.WARNING
          };
        }
      });
      this.$eventBus.$on(EVENT_BUS.OPEN_COMPLETE, params => {
        if (params) {
          this.resetAppDialog();
          this.completeConfig.show = true;
          this.completeConfig.config = Utils.copyObject(params);
        } else {
          this.completeConfig.show = false;
          this.completeConfig.config = {
            type: COMPLETE_DIALOG_TYPE.COMPLETE
          };
        }
      });
      // this.$eventBus.$on(EVENT_BUS.OPEN_ERROR_CASE, params => {
      //   if (params) {
      //     this.resetAppDialog();
      //     this.errorConfig.show = true;
      //     this.errorConfig.config = Utils.copyObject(params);
      //   } else {
      //     this.errorConfig.show = false;
      //     this.errorConfig.config = {
      //       type: ERROR_DIALOG_TYPE.ERROR
      //     };
      //   }
      // });
    },
    onConfirm(confirm, payload) {
      this.confirmConfig.show = false;
      this.$eventBus.$emit(EVENT_BUS.CLOSE_CONFIRM, confirm, payload);
    },
    onComplete(confirm, payload) {
      this.completeConfig.show = false;
      this.$eventBus.$emit(EVENT_BUS.CLOSE_COMPLETE, confirm, payload);
    },
    onErrorCase(confirm, payload) {
      this.errorConfig.show = false;
      this.$eventBus.$emit(EVENT_BUS.CLOSE_ERROR_CASE, confirm, payload);
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
        width: 100%;
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
