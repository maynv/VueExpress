<template>
  <div class="--d-user-template">
    <el-row v-if="cdata" :gutter="30" type="flex" justify="space-around">
      <el-row class="setting-wrap">
        <i class="el-icon-setting"></i>
      </el-row>
      <el-col class="badge-wrap">
        <el-dropdown :trigger="'click'" @visible-change="onVisibleNoticeChange">
          <el-badge
            :hidden="cdata.notice.count === 0"
            :value="cdata.notice.count"
            class="badge-item badge-icon"
          >
            <i class="el-icon-bell badge-icon"></i>
          </el-badge>
          <el-dropdown-menu
            slot="dropdown"
            class="--dd--user--dropdown--notice"
            :placement="'bottom'"
          >
            <el-dropdown-item v-for="(item, index) in cdata.notice.list" :key="index">
              <el-row>
                <!-- <el-col :span="4">
                  <i class="el-icon-user-solid"></i>
                </el-col>-->
                <el-col :span="18">
                  <span>{{item.text}}</span>
                </el-col>
              </el-row>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
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
            <el-dropdown-item :command="command.changePassword">
              <el-col :span="4">
                <i class="el-icon-set-up"></i>
              </el-col>
              <el-col :span="18">
                <span>{{$t("common_profile_change_password")}}</span>
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
    <ChangePassword
      v-if="changePassword"
      @on-confirm="(payLoad) => onConfirm(payLoad)"
      @on-cancel="() => onCancel()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  FETCH_USER_DETAIL,
  USER_CHANGE_PASSWORD
} from "@/stores/types/actions";
import { USER_DETAIL } from "@/stores/types/getters";

import ChangePassword from "@/components/base/AppDialogs/ChangePassword";

import Utils from "@/common/utils";

import { EVENT_BUS, COOKIE_USER, APP_URL } from "@/common/constants";
import ExService from "@/api/ExService";
const DEFAULT_URL_IMG =
  "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE2XFxcLzA4XFxcLzE2MTAzMzQ1XFxcL0hlbnJ5LUNhdmlsbC1TdXBlcm1hbi5qcGdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lXFxcL25vLWltYWdlLnBuZz9pZD0yNjRhMmRiZTM3MGYyYzY3NWZjZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiJjMDFjM2Y1Mzc4YmE5ZGIyODQ3NThkOWUyMDY0ZjljMjBmZGFkMDBmIn0=/henry-cavill-superman.jpg";
export default {
  name: "User",
  components: { ChangePassword },
  data() {
    return {
      cdata: null,
      url: DEFAULT_URL_IMG,
      hideTooltipe: false,
      menuAppend: false,
      command: {
        profile: "profile",
        logout: "logout",
        changePassword: "changePassword"
      },
      changePassword: false
    };
  },
  computed: {
    ...mapGetters({ USER_DETAIL })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({ FETCH_USER_DETAIL, USER_CHANGE_PASSWORD }),
    initData() {
      if (this.USER_DETAIL) {
        this.cdata = Utils.copyObject(this.USER_DETAIL);
        if (!this.cdata.hasOwnProperty("notice")) {
          this.$set(this.cdata, "notice", {});

          const list = [
            {
              text: "Event 1"
            },
            {
              text: "Event 2"
            },
            {
              text: "Event 3"
            },
            {
              text: "Event 1"
            },
            {
              text: "Event 2"
            },
            {
              text: "Event 3"
            },
            {
              text: "Event 1"
            },
            {
              text: "Event 2"
            },
            {
              text: "Event 3"
            },
            {
              text: "Event 1"
            },
            {
              text: "Event 2"
            },
            {
              text: "Event 3"
            }
          ];
          this.$set(this.cdata.notice, "list", list);
          this.$set(this.cdata.notice, "count", list.length);
        }
      }
    },
    fetchData() {
      let $q = [];
      const email = Utils.getCookie(COOKIE_USER);
      const postData = ExService.auth_ex.auth_user({
        email: email
      });
      if (!this.USER_DETAIL) {
        $q.push(
          this.FETCH_USER_DETAIL({
            postData: postData
          })
        );
      }
      if ($q.length) {
        Promise.all($q).then(() => {
          this.initData();
        });
      } else {
        this.initData();
      }
    },
    onProfile() {
      this.$router.push(APP_URL.PROFILE.url);
    },
    onLogout() {
      this.$router.push(APP_URL.LOGIN.url);
    },
    onChangePassword() {
      this.changePassword = true;
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
        case command.changePassword:
          this.onChangePassword();
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
    },
    onConfirm(data) {
      if (data) {
        const a = this;
        const postData = ExService.auth_ex.auth_user_change_password(data);
        this.USER_CHANGE_PASSWORD({
          postData: postData,
          options: {
            showLoading: true
          }
        }).then(() => {
          const confirmCfg = {
            msg: "common_text_login_after_change_password"
          };
          a.$eventBus.$emit(EVENT_BUS.OPEN_CONFIRM, confirmCfg);
          a.$eventBus.$once(EVENT_BUS.CLOSE_CONFIRM, status => {
            a.$eventBus.$off(EVENT_BUS.CLOSE_CONFIRM);
            if (status) {
              a.$router.push(APP_URL.LOGIN.url);
            }
          });
        });
      }
      this.changePassword = false;
    },
    onCancel() {
      this.changePassword = false;
    },

    onVisibleNoticeChange(append) {
      if (append && this.cdata.notice.count) {
        this.$set(this.cdata.notice, "count", 0);
      }
    }
  }
};
</script>

<style lang="scss">
.--d-user-template {
  float: right;
  padding: 1px 20px;
  .setting-wrap {
    padding-top: 10px;
    i {
      font-size: 24px;
    }
  }
  .badge-wrap {
    padding-top: 10px;
    cursor: pointer;
    i {
      font-size: 24px;
    }
  }
}
.el-dropdown-menu.el-popper.--dd--user--dropdown--menu {
  width: 240px;
  margin-top: 2px;
  right: 0px;
  .el-dropdown-menu__item {
    height: 36px;
    i {
      font-size: 18px;
    }
    span {
      font-size: 14px;
    }
    &.first {
      border-bottom: 1px solid #dde3e8;
    }
    &.last {
      border-top: 1px solid #dde3e8;
    }
  }
}
.el-dropdown-menu.el-popper.--dd--user--dropdown--notice {
  width: 300px;
  margin-top: 10px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
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