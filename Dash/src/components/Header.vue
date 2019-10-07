<template>
  <div class="header-wrap">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="4">
            <div @click.prevent="() => onClickToDashBoard()">
              <el-row class="header-logo-wrap" type="flex" justify="start">
                <el-col class="header-main-menu-wrap">
                  <div class="header-main-menu">
                    <img src="@/assets/images/ic_home.png" alt />
                    <span class="name">DASH</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="20">
            <!-- unser constructor -->
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" class="header-search-wrap">Search</el-col>
      <el-col :span="4">
        <User />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import User from "@/components/User";
import { APP_URL } from "@/common/constants";
export default {
  name: "Header",
  components: { User },
  methods: {
    onClickToDashBoard() {
      this.$router.push(APP_URL.DASHBOARD.url);
    }
  }
};
</script>

<style lang="scss">
.header-wrap {
  // background-color: rgba(67, 196, 132, 0.63);
  height: $header-height;
  max-height: $header-height;
  border-bottom: 1px solid rgba(47, 50, 207, 0.63);
  .header-logo-wrap {
    height: $header-height;
    .header-main-menu-wrap {
      text-align: left;
      background-color: rgba(236, 237, 243, 0.63);
      border-right: 1px solid rgba(47, 50, 207, 0.63);
      border-radius: 1px;
      padding-left: 20px;
      &:hover {
        cursor: pointer;
        background-color: rgba(217, 218, 238, 0.63);
      }
      .header-main-menu {
        height: $header-height;
        display: inline-flex;
        img {
          padding: 10px 0px;
        }
      }
    }

    .name {
      text-align: left;
      line-height: 45px;
      padding-left: 15px;
      font-weight: bold;
    }
  }
  .header-search-wrap {
    height: $header-height;
    background-color: chartreuse;
  }
}
</style>