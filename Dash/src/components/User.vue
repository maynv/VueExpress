<template>
  <div class="--d-user-template">
    <el-row v-if="cdata">
      <el-col>
        <el-dropdown :trigger="'click'" @command="handleCommand" @visible-change="onVisibleChange">
          <el-tooltip v-model="hideTooltipe" :disabled="menuAppend" :effect="'light'">
            <el-avatar :shape="'square'" :size="'large'" :src="url"></el-avatar>
            <div slot="content">
              <span>{{cdata.username ? cdata.username : ""}}</span>
            </div>
          </el-tooltip>
          <el-dropdown-menu
            slot="dropdown"
            class="--dd--user--dropdown--menu"
            :placement="'bottom-start'"
          >
            <el-dropdown-item :command="command.profile" class="first">
              <el-row>
                <el-col :span="4">
                  <i class="el-icon-user-solid"></i>
                </el-col>
                <el-col :span="18">
                  <span>{{$t("common_profile_profile")}}</span>
                </el-col>
              </el-row>
            </el-dropdown-item>
            <el-dropdown-item :disabled="true">
              <el-col :span="4">
                <i class="el-icon-help"></i>
              </el-col>
              <el-col :span="18">
                <span>{{"To do"}}</span>
              </el-col>
            </el-dropdown-item>
            <el-dropdown-item :disabled="true">
              <el-col :span="4">
                <i class="el-icon-help"></i>
              </el-col>
              <el-col :span="18">
                <span>{{"To do"}}</span>
              </el-col>
            </el-dropdown-item>
            <el-dropdown-item :disabled="true">
              <el-col :span="4">
                <i class="el-icon-help"></i>
              </el-col>
              <el-col :span="18">
                <span>{{"To do"}}</span>
              </el-col>
            </el-dropdown-item>
            <el-dropdown-item :command="command.logout" class="last">
              <el-col :span="4">
                <i class="el-icon-setting"></i>
              </el-col>
              <el-col :span="18">
                <span>{{$t("common_profile_logout")}}</span>
              </el-col>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { FETCH_USER } from "@/stores/types/actions";
import { USER } from "@/stores/types/getters";
import Utils from "@/common/utils";
import { COOKIE_USER } from "@/common/constants";
import ExService from "@/api/ExService";
const DEFAULT_URL_IMG =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
export default {
  name: "User",
  data() {
    return {
      cdata: null,
      url: DEFAULT_URL_IMG,
      hideTooltipe: false,
      menuAppend: false,
      command: {
        profile: "profile",
        logout: "logout"
      }
    };
  },
  computed: {
    ...mapGetters({ USER })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({ FETCH_USER }),
    initData() {
      if (this.USER) {
        this.cdata = Utils.copyObject(this.USER);
      }
    },
    fetchData() {
      let $q = [];
      const email = Utils.getCookie(COOKIE_USER);
      const postData = ExService.auth_ex.auth_user({
        email: email
      });

      $q.push(
        this.FETCH_USER({
          postData: postData
        })
      );
      Promise.all($q).then(() => {
        this.initData();
      });
    },
    onProfile() {},
    onLogout() {
      this.$router.push("/");
    },
    handleCommand(cmd) {
      if (cmd === null || cmd === undefined) {
        return;
      }
      const command = this.command;
      switch (cmd) {
        case command.logout:
          this.onLogout();
          break;
        case command.profile:
          this.onProfile();
          break;
        default:
      }
    },
    onVisibleChange(append) {
      this.hideTooltipe = !append;
      this.menuAppend = append;
    }
  }
};
</script>

<style lang="scss">
.--d-user-template {
  float: right;
  padding: 1px 20px;
}
.el-dropdown-menu.el-popper.--dd--user--dropdown--menu {
  width: 230px;
  margin-top: 2px;
  right: 0px;
  .el-dropdown-menu__item {
    height: 36px;
    i {
      font-size: 18px;
    }
    span {
      font-size: 16px;
    }
    &.first {
      border-bottom: 1px solid #dde3e8;
    }
    &.last {
      border-top: 1px solid #dde3e8;
    }
  }
}
</style>