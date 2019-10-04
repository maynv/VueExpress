<template>
  <div class="header-wrap">
    <el-row>
      <el-col :span="6">1</el-col>
      <el-col :span="6">2</el-col>
      <el-col :span="6">3</el-col>
      <el-col :span="6">
        <User />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import User from "@/components/User";
export default {
  name: "Header",
  components: { User },

  methods: {
    onLogOut() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.header-wrap {
  background-color: aqua;
  height: $header-height;
}
</style>