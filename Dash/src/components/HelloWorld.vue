<template>
  <div class="hello">Dash</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ABOUT } from "./../../src/stores/types/getters";
import { FETCH_ABOUT } from "./../../src/stores/types/actions";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ ABOUT })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      FETCH_ABOUT
    }),
    fetchData() {
      // this.FETCH_ABOUT({ options: {} });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
