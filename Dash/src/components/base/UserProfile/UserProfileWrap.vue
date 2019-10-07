<template>
  <div class="user-profile-template">
    <el-row>
      <el-col :span="10" class="user-profile-detail-wrap">
        <UserProfileDetail />
      </el-col>
      <el-col :span="14" class="user-profile-action-wrap">Action</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { FETCH_USER_DETAIL } from "@/stores/types/actions";
import { USER_DETAIL } from "@/stores/types/getters";

import UserProfileDetail from "@/components/base/UserProfile/UserProfileDetail";

import Utils from "@/common/utils";
import { COOKIE_USER, APP_URL } from "@/common/constants";
import ExService from "@/api/ExService";
export default {
  name: "UserProfile",
  components: { UserProfileDetail },
  data() {
    return {};
  },
  computed: {},
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({ FETCH_USER_DETAIL }),
    initData() {},
    fetchData() {
      // let $q = [];
      // if (!this.USER_DETAIL) {
      //   const email = Utils.getCookie(COOKIE_USER);
      //   const postData = ExService.auth_ex.auth_user({
      //     email: email
      //   });
      //   $q.push(this.FETCH_USER_DETAIL({ postData: postData }));
      // }
      // if ($q.length) {
      //   Promise.all($q).then(() => {
      //     this.initData();
      //   });
      // } else {
      //   this.initData();
      // }
    }
  }
};
</script>

<style lang="scss">
.user-profile-template {
  .user-profile-detail-wrap {
    height: 600px;
  }
  .user-profile-action-wrap {
  }
}
</style>