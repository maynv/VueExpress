<template>
  <div class="input--template">
    <div :class="className">
      <ValidationProvider
        :name="$props.validatorName"
        :rules="$props.validatorRules"
        :immediate="true"
        :ref="$props.validatorName"
        class="input--wrap"
        tag="div"
        v-slot="{flags , valid, errors }"
      >
        <el-row :gutter="12" type="flex" class="grid-layout-wrap" justify="space-between">
          <el-col class="grid-layout-input">
            <div class="input--inner">
              <el-input
                v-model="value"
                v-bind="$props.attrs"
                :maxlength="maxlength ? maxlength : $props.maxLength"
                :minlength="minLength ? minLength : null"
                :type="$props.type"
                :name="`input-field-`+ $props.validatorName"
                :readonly="$props.readonly"
                :disabled="$props.disabled"
                :class="{'error-input' : (!valid && flags.touched)&& showErrorMsg , 'readonly': readonly, 'input-template':$props.showTemplate}"
                :placeholder="isTranslate ? $t(placeholder) : placeholder"
                :ref="`input-value-ref`"
                @keydown.native="onKeyDown"
                @blur.prevent="onBlur"
              >
                <template
                  v-if="showTemplate"
                  class="string-template"
                  slot="append"
                >{{$t(stringTemplate)}}</template>
              </el-input>
              <div class="input--error" v-if="showErrorMsg && flags.touched">
                <div class="error-message">
                  <span>{{$t(errors[0])}}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="grid-layout-append" v-if="$props.hasAppend">
            <slot name="append"></slot>
          </el-col>
        </el-row>
      </ValidationProvider>
    </div>
  </div>
</template>

<script>
/** Attrs
 * Options place on directive:
 * - vdata (required)
 * - validatorRules (required)
 * - type (optional)
 * - id (optional)
 * - placeholder (optional)
 * - showErrormsg (optional)
 * - minValue (optional)
 * - maxValue (optional)
 * - disabled (optional)
 * - defaultValue (optional)
 * - numberOnly (optional)
 * - readonly (optional)
 * - className (optional)
 * - minLength (optional)
 * - maxLength (optional)
 * - validatorName (optional)
 * - hasAppend (optional)
 */
/** Events
 * on-change
 * on-blur
 * on-keyDown
 */
import Utils from "@/common/utils";
import { ValidationProvider } from "vee-validate";
export default {
  name: "InputValue",
  components: {
    ValidationProvider
  },
  props: {
    attrs: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    vdata: {
      type: [String, Number],
      required: true,
      default() {
        return "";
      }
    },
    validatorRules: {
      type: Object,
      required: false,
      default() {
        return {
          required: true
        };
      }
    },
    type: {
      type: String,
      required: false,
      default() {
        return "text";
      }
    },
    id: {
      type: String,
      required: false,
      default() {
        return "input-" + Utils.randomString(5) + "-id";
      }
    },
    isTranslate: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    placeholder: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    showErrorMsg: {
      type: [Boolean, String],
      required: false,
      default() {
        return true;
      }
    },
    minValue: {
      type: [Number, Boolean],
      required: false,
      default() {
        return false;
      }
    },
    maxValue: {
      type: [Number, Boolean],
      required: false,
      default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    defaultValue: {
      type: [String, Number],
      required: false,
      default() {
        return undefined;
      }
    },
    numberOnly: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    readonly: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    className: {
      type: String,
      required: false,
      default() {
        return "input-class-optional";
      }
    },
    minLength: {
      type: Number,
      required: false,
      default() {
        return 1;
      }
    },
    maxLength: {
      type: Number,
      required: false,
      default() {
        return 32;
      }
    },
    validatorName: {
      type: String,
      required: false,
      default() {
        return "input-validator";
      }
    },
    showTemplate: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    stringTemplate: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    hasAppend: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      value: "",
      maxlength: null
    };
  },
  mounted() {},
  computed: {},
  watch: {
    value: {
      handler() {
        this.onChange();
      },
      deep: true,
      immediate: true
    },
    $props: {
      handler() {
        this.changeData();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initData() {
      if (this.$props.vdata !== null) {
        if (this.defaultValue !== undefined && this.$props.vdata === "") {
          this.value = this.defaultValue;
        } else if (this.$props.vdata !== "") {
          this.value = this.$props.vdata;
        } else {
          this.value = "";
        }
      } else {
        this.value = "";
      }
      this.maxlength =
        this.$props.type === "number"
          ? this.$props.maxValue && typeof this.$props.maxValue === "number"
            ? Utils.convertString(this.$props.maxValue).length
            : null
          : this.$props.maxLength;
    },
    changeData() {
      if (this.$props.vdata !== null) {
        if (this.$props.vdata !== "") {
          this.value = this.$props.vdata;
        } else {
          this.value = "";
        }
      } else {
        this.value = "";
      }
      this.maxlength =
        this.$props.type === "number"
          ? this.$props.maxValue && typeof this.$props.maxValue === "number"
            ? Utils.convertString(this.$props.maxValue).length
            : null
          : this.$props.maxLength;
    },
    onBlur() {
      let inputValue = this.value;
      let valueLength = this.value.length;
      if (this.type === "number") {
        if (this.defaultValue !== undefined && valueLength === 0) {
          this.value = this.defaultValue;
        } else if (!this.defaultValue && valueLength === 0) {
          this.value = this.minValue;
        } else if (parseInt(inputValue) > this.maxValue) {
          this.value = this.maxValue;
        } else if (parseInt(inputValue) < this.minValue) {
          this.value = this.minValue;
        } else {
          this.value = Utils.convertNumber(inputValue);
        }
      } else {
        // type default is text
        if (this.defaultValue !== undefined && valueLength === 0) {
          this.value = Utils.convertString(this.defaultValue);
        }
      }
      this.$validator.validate();
      this.$emit("on-blur");
    },
    onChange() {
      if (!Utils.compareObjects(this.$props.vdata, this.value)) {
        this.$emit("on-change", this.value);
      }
    },
    onKeyDown(e) {
      if (!e) {
        return;
      }
      this.$emit("on-keyDown", e);
      if ((this.type === "number" || this.numberOnly) && e) {
        Utils.preventNonNumeric(e);
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="scss">
.input--template {
  outline: 0;
  width: 100%;
  margin-bottom: 0;
  .input--wrap {
    position: relative;
    //  layout
    .el-row.grid-layout-wrap {
      // .el-col.grid-layout-input {
      // }
      .el-col.grid-layout-append {
        max-width: 132px;
      }
    }
  }
  .input--inner {
    width: 100%;
    .el-input {
      &.error-input {
        input {
          border: solid 1px $color-border-input-error;
        }
      }
      .el-input-group__append {
        background: none;
        color: $app-text-color;
        font-weight: bold;
      }
    }
  }
  .input--error {
    line-height: 2;
    .error-message {
      color: $color-text-error;
      font-size: $font-size-error-text !important;
      font-weight: 400;
      text-align: left;
    }
  }
  .input-template {
    .el-input__inner {
      padding-right: 40px;
    }
    .el-input-group__append {
      position: absolute;
      right: 15px;
      border: none;
      top: 12px;
    }
  }
}
</style>
