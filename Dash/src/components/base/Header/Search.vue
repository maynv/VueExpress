<template>
  <div class="search-template">
    <el-input :placeholder="$t($props.placeholder)" v-model="searchInput">
      <el-button @click.prevent="onSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      required: false,
      default() {
        return "common_text_search_placeholder";
      }
    }
  },
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="scss">
.search-template {
  //
}
</style>