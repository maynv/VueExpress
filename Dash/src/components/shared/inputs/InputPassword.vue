<template>
  <div class="input--password--template">
    <div :class="className">
      <ValidationProvider
        :name="$props.validatorName"
        :rules="$props.validatorRules"
        :immediate="true"
        :ref="$props.validatorName"
        class="input--password--wrap"
        tag="div"
        v-slot="{flags , valid, errors }"
      >
        <div class="input--password--inner">
          <el-input
            v-model="value"
            v-bind="$props.attrs"
            :type="passwordType"
            :maxlength="maxlength"
            :minlength="minlength"
            :name="`input-password-field`"
            :readonly="$props.readonly"
            :disabled="$props.disabled"
            :class="{'error-input' : (!valid && flags.touched)&& showErrorMsg ,  'readonly': readonly}"
            :placeholder="$t(placeholder)"
            @keyup.native=" (e) => onKeyUp(e)"
            @keydown.native=" (e) => onKeyDown(e)"
            @blur.prevent="onBlur"
          >
            <i
              slot="suffix"
              class="el-input__icon el-eye"
              :class="{ 'el-eye-show': passwordType === 'password', 'el-eye-hide': passwordType === 'text' }"
              v-if="isShowEye"
              @click="showPassword()"
            ></i>
          </el-input>
          <div class="input--error" v-if="showErrorMsg && flags.touched">
            <div class="error-message">
              <span>{{$t(errors[0])}}</span>
            </div>
          </div>
        </div>
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
 * - readonly (optional)
 * - className (optional)
 * - minlength (optional)
 * - maxlength (optional)
 * - validatorName (optional)
 * - isShowEye (optional)
 *
 */
/** Events
 * on-change
 * on-blur
 * on-keyDown
 */
import Utils from "@/common/utils";
import { ValidationProvider } from "vee-validate";
export default {
  name: "InputPassword",
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
    minlength: {
      type: Number,
      required: false,
      default() {
        return 1;
      }
    },
    maxlength: {
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
        return "input-password-validator";
      }
    },
    isShowEye: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    hexadecimalType: {
      type: [Boolean],
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      value: "",
      passwordType: "password"
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
        this.initData();
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
    },
    onBlur() {
      this.$emit("on-blur");
    },
    onChange() {
      if (this.$props.vdata !== this.value) {
        this.$emit("on-change", this.value);
      }
    },
    onKeyUp(e) {
      let currentNumberCharacters = this.value.length;
      if (currentNumberCharacters >= this.maxlength && this.maxlength) {
        Utils.preventInputKeydown(e);
      }
      if (this.$props.hexadecimalType === true && e) {
        this.value = this.value.replace(/[^a-fA-F0-9]/g, "");
      }
    },
    onKeyDown(e) {
      if (!e) {
        return;
      }
      this.$emit("on-keyDown", e);
      if (this.type === "number" && e) {
        Utils.preventNonNumeric(e);
      }
    },
    showPassword() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="scss">
.input--password--template {
  outline: 0;
  width: 100%;
  margin-bottom: 0;
  .input--password--inner {
    width: 100%;
    .el-input {
      .el-input__icon {
        &.el-eye {
          margin-top: 8px;
        }
        &.el-eye-hide {
          display: inline-block;
          overflow: hidden;
          background-repeat: no-repeat;
          background-image: url("./../../../assets/images/ic_hide.png");
        }
        &.el-eye-show {
          display: inline-block;
          overflow: hidden;
          background-repeat: no-repeat;
          background-image: url("./../../../assets/images/ic_show.png");
        }
      }
      &.error-input {
        input {
          border: solid 1px $color-border-input-error;
        }
      }
    }
  }
  .input--error {
    line-height: 2;
    .error-message {
      color: $color-text-error;
      font-size: $font-size-error-text;
      font-weight: 400;
      text-align: left;
    }
  }
}
</style>
