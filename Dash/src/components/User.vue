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
import { FETCH_USER_DETAIL } from "@/stores/types/actions";
import { USER_DETAIL } from "@/stores/types/getters";
import Utils from "@/common/utils";
import { COOKIE_USER, APP_URL } from "@/common/constants";
import ExService from "@/api/ExService";
const DEFAULT_URL_IMG =
  "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE2XFxcLzA4XFxcLzE2MTAzMzQ1XFxcL0hlbnJ5LUNhdmlsbC1TdXBlcm1hbi5qcGdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lXFxcL25vLWltYWdlLnBuZz9pZD0yNjRhMmRiZTM3MGYyYzY3NWZjZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiJjMDFjM2Y1Mzc4YmE5ZGIyODQ3NThkOWUyMDY0ZjljMjBmZGFkMDBmIn0=/henry-cavill-superman.jpg";
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
    ...mapGetters({ USER_DETAIL })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({ FETCH_USER_DETAIL }),
    initData() {
      if (this.USER_DETAIL) {
        this.cdata = Utils.copyObject(this.USER_DETAIL);
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