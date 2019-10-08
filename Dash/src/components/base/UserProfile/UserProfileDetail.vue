<template>
  <div class="user-detail-template">
    <el-row v-if="cdata" :gutter="30">
      <el-col
        :xs="PC_MODE ? 8 : 8"
        :sm="PC_MODE ? 8 : 8"
        :md="PC_MODE ? 8 : 8"
        :lg="PC_MODE ? 8 : 8"
        :xl="PC_MODE ? 8 : 8"
        class="user-detail-avatar-wrap"
      >
        <el-avatar :shape="'square'" :size="'large'" :src="cdata.avatarUrl"></el-avatar>
        <el-row>
          <el-col class="text-center">
            <span class="name">{{cdata.username}}</span>
            <i @click.prevent="onEditProfile" class="el-icon-edit profile-edit"></i>
          </el-col>
        </el-row>
      </el-col>
      <el-col
        :xs="PC_MODE ? 16 : 16"
        :sm="PC_MODE ? 16 : 16"
        :md="PC_MODE ? 16 : 16"
        :lg="PC_MODE ? 16 : 16"
        :xl="PC_MODE ? 16 : 16"
        class="info-wrap"
      >
        <div>
          <el-row class="info-item">
            <el-col :span="8" class="title">{{$t("common_profile_email") + ':'}}</el-col>
            <el-col :span="16" class="description">{{cdata.email}}</el-col>
          </el-row>
          <el-row class="info-item">
            <el-col :span="8" class="title">{{$t("common_profile_address") + ':'}}</el-col>
            <el-col :span="16" class="description">{{cdata.phoneNumber}}</el-col>
          </el-row>
          <el-row class="info-item">
            <el-col :span="8" class="title">{{$t("common_profile_gender") + ':'}}</el-col>
            <el-col :span="16" class="text-tran-capitalize description">{{cdata.gender}}</el-col>
          </el-row>
          <el-row class="info-item">
            <el-col :span="8" class="title">{{$t("common_profile_created_date") + ':'}}</el-col>
            <el-col :span="16" class="description">{{fomatDate(cdata.createdAt)}}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="user-detail-description-wrap">
      <el-col class="description-title">
        <span>Description</span>
      </el-col>
      <el-col class="description">
        <span>{{cdata.description}}</span>
      </el-col>
    </el-row>
    <UserProfileEdit
      v-if="editProfile"
      :vdata="cdata"
      @on-confirm="(payLoad) => onConfirm(payLoad)"
      @on-cancel="() => onCancel()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { FETCH_USER_DETAIL, UPDATE_USER_DETAIL } from "@/stores/types/actions";
import { USER_DETAIL } from "@/stores/types/getters";

import BaseComponent from "@/components/base/BaseComponent";
import UserProfileEdit from "@/components/base/UserProfile/UserProfileEdit";

import moment from "moment";
import Utils from "@/common/utils";
import { COOKIE_USER, APP_URL, EVENT_BUS } from "@/common/constants";
import ExService from "@/api/ExService";
export default {
  name: "UserProfileDetail",
  extends: BaseComponent,
  components: { UserProfileEdit },
  data() {
    return {
      cdata: {},
      editProfile: false
    };
  },
  computed: {
    ...mapGetters({ USER_DETAIL })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({ FETCH_USER_DETAIL, UPDATE_USER_DETAIL }),
    initData() {
      this.cdata = Utils.copyObject(this.USER_DETAIL);
      if (this.cdata.avatarUrl === null) {
        this.cdata.avatarUrl =
          "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE2XFxcLzA4XFxcLzE2MTAzMzQ1XFxcL0hlbnJ5LUNhdmlsbC1TdXBlcm1hbi5qcGdcIixcIndpZHRoXCI6NzY3LFwiaGVpZ2h0XCI6NDMxLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lXFxcL25vLWltYWdlLnBuZz9pZD0yNjRhMmRiZTM3MGYyYzY3NWZjZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiJjMDFjM2Y1Mzc4YmE5ZGIyODQ3NThkOWUyMDY0ZjljMjBmZGFkMDBmIn0=/henry-cavill-superman.jpg";
      }
    },
    fetchData(isUpdate) {
      let $q = [];
      if (!this.USER_DETAIL || isUpdate) {
        const email = Utils.getCookie(COOKIE_USER);
        const postData = ExService.auth_ex.auth_user({
          email: email
        });
        $q.push(this.FETCH_USER_DETAIL({ postData: postData }));
      }
      if ($q.length) {
        Promise.all($q).then(() => {
          this.initData();
        });
      } else {
        this.initData();
      }
    },
    fomatDate(date) {
      const data = new Date(date);
      return data.toDateString();
    },
    onEditProfile() {
      this.editProfile = true;
    },
    onConfirm(data) {
      if (data && !Utils.compareObjects(data, this.cdata)) {
        const a = this;
        const postData = ExService.auth_ex.auth_user_update(data);
        this.UPDATE_USER_DETAIL({
          postData: postData,
          options: {
            showLoading: true
          }
        }).then(() => {
          const confirmCfg = {
            msg: "common_text_updated_complete"
          };
          a.$eventBus.$emit(EVENT_BUS.OPEN_COMPLETE, confirmCfg);
          a.$eventBus.$once(EVENT_BUS.CLOSE_COMPLETE, status => {
            a.$eventBus.$off(EVENT_BUS.CLOSE_COMPLETE);
            if (status) {
              this.fetchData(true);
            }
          });
        });
      }
      this.editProfile = false;
    },
    onCancel() {
      this.editProfile = false;
    }
  }
};
</script>

<style lang="scss">
.user-detail-template {
  padding-top: 20px;
  .user-detail-avatar-wrap {
    height: 300px;
    text-align: center;
    .el-avatar.el-avatar--large {
      max-height: 200px;
      max-width: 180px;
      min-height: 150px;
      min-width: 160px;
    }
    .name {
      font-size: 26px;
    }
    i.profile-edit {
      font-size: 26px;
      margin-left: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        background-color: #dfd0d0;
        color: #ffffff;
      }
    }
  }
  .info-wrap {
    .info-item {
      height: 60px;
      text-align: left;
      .title {
        padding: 10px 0px;
        font-size: 16px;
        font-weight: 700;
      }
      .description {
        padding: 10px 0px;
        padding-left: 10px;
      }
    }
  }
  .user-detail-description-wrap {
    .description-title {
      text-align: left;
      font-size: 18px;
      font-weight: 700;
    }
    .description {
      margin-top: 10px;
      padding: 10px;
      text-align: left;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 120px;
    }
  }
}
</style>