
<template>
  <div class="wrap-custom-select">
    <ValidationProvider
      :name="$props.validatorName"
      :rules="{...$props.validatorRules}"
      :immediate="true"
      :ref="$props.validatorName"
      tag="div"
    >
      <el-select
        v-model="value"
        :popper-class="$props.popperClass"
        :placeholder="$t($props.placeholder)"
        :disabled="$props.disabled"
        :no-data-text="$t('common_text_no_data')"
        name="custom-select-name"
        ref="select"
      >
        <el-option
          v-for="item in optionsShow"
          :key="item.value"
          :label="$props.isTranslate ? $t(item.text) : item.text"
          :value="item.value"
          class="custom-option"
        ></el-option>
      </el-select>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import BaseComponent from "@/components/base/BaseComponent";
import Utils from "@/common/utils";
export default {
  name: "CustomSelect",
  components: {
    ValidationProvider
  },
  extends: BaseComponent,
  props: {
    vdata: {
      type: [String, Number],
      required: true,
      default() {
        return "";
      }
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    rules: {
      type: [Array, Object],
      required: false,
      default() {
        return {
          required: true
        };
      }
    },
    placeholder: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    defaultValue: {
      type: Object,
      required: false,
      default() {
        return null;
      }
    },
    id: {
      type: String,
      required: false,
      default() {
        return "custom-select-input" + Utils.randomString(5) + "-id";
      }
    },
    name: {
      type: String,
      required: false,
      default() {
        return "custom-select-button-" + Utils.randomString(5) + "-name";
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isTranslate: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    preventDefault: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    popperClass: {
      type: String,
      required: false,
      default() {
        return "custom-select-popper-class";
      }
    },
    validatorRules: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    validatorName: {
      type: String,
      required: false,
      default() {
        return "custom-select-validator";
      }
    }
  },
  data() {
    return {
      value: "",
      optionsShow: [],
      numberText: "0",
      isOpenCustomSelect: false
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (oldVal !== newVal) {
          this.$emit("on-change", newVal, oldVal);
        }
      }
    },
    $props: {
      handler() {
        this.initData();
      },
      immediate: true,
      deep: true
    },
    PC_MODE: {
      handler() {
        if (this.$refs["select"].blur) {
          this.$refs["select"].blur();
        }
      }
    }
  },
  methods: {
    convertToObject(list) {
      let newList = [];
      list.map(child => {
        newList.push({
          value: child,
          text: child
        });
      });
      return newList;
    },
    initData() {
      if (this.options.length > 0) {
        typeof this.options[0] !== "object"
          ? (this.optionsShow = this.convertToObject(this.options))
          : (this.optionsShow = this.options);

        if (
          this.$props.vdata !== null &&
          this.$props.vdata !== undefined &&
          this.$props.vdata !== ""
        ) {
          this.value = this.$props.vdata;
        } else {
          if (!this.$props.preventDefault) {
            this.value = this.optionsShow[0].value;
          } else {
            this.value = this.$props.vdata;
          }
        }
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrap-custom-select {
  width: 100%;
  .el-select {
    width: 100%;
    input {
      color: #000;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.el-select-dropdown.el-popper .el-select-dropdown__item {
  &.custom-option {
    padding: none;
    margin: 0px;
    border: none;
    span {
      line-height: 45px;
    }
  }
}
</style>
