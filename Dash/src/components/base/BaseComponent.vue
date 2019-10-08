<script>
import { mapGetters } from "vuex";
import { LOADING } from "@/stores/types/getters";
const __MIN_WIDTH = 360;
export default {
  name: "BaseComponent",
  computed: {
    ...mapGetters({ LOADING }),
    PC_MODE() {
      return true;
    }
  }
};
</script>