<template>
  <div>
    <UserProfileWrap />
    <!-- <router-view /> -->
  </div>
</template>

<script>
import UserProfileWrap from "@/components/base/UserProfile/UserProfileWrap";
export default {
  name: "VUser",
  components: { UserProfileWrap }
};
</script>

<style>
</style>