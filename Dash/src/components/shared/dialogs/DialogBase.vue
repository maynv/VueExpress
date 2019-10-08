<template>
  <div class="dialog--template custom--dialog--template" v-if="!LOADING">
    <el-dialog
      :visible.sync="config.visible"
      v-bind="ownConfig"
      :width="setWidth()"
      :top="setTop()"
      :title="$t(this.$props.config.title)"
      :class="$props.className"
      :id="$props.id"
      :ref="$props.id"
    >
      <div class="dialog-container-inner">
        <slot></slot>
      </div>
      <div class="dialog--footer-button-wrap" v-if="$props.showButton">
        <el-row>
          <el-col>
            <el-button
              :disabled="$props.disabledApply"
              :loading="$props.localLoading"
              @click.prevent="onClickConfirm"
              :class="ownConfig.applyClass"
            >{{$t(ownConfig.confirmText ? ownConfig.confirmText : "" )}}</el-button>
            <el-button
              v-if="$props.isShowCancel"
              :class="ownConfig.cancelClass"
              @click.prevent="onClickCancel"
            >{{$t(ownConfig.cancelText ? ownConfig.cancelText : "" )}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/** props
 * Options place on directive:
 * - config (required)
 * - showButton (optional)
 * - confirmCallBack (optional)
 * - cancelCallBack (optional)
 * - disabledApply (optional)
 * - isShowCancel (optional)
 * - className (optional)
 * - localLoading (optional)
 */
/** Events
 */
import BaseComponent from "@/components/base/BaseComponent";
import Utils from "@/common/utils";
const DEFAULT_WIDTH = "55%";
export default {
  name: "DialogBase",
  extends: BaseComponent,
  props: {
    config: {
      type: Object,
      required: true
    },
    showButton: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    confirmCallBack: {
      type: Function,
      required: false,
      default() {
        return () => {
          return;
        };
      }
    },
    cancelCallBack: {
      type: Function,
      required: false,
      default() {
        return () => {
          return;
        };
      }
    },
    disabledApply: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isShowCancel: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    className: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    id: {
      type: String,
      required: false,
      default() {
        return "dialog-" + Utils.randomString(5) + "-id";
      }
    },
    localLoading: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      ownConfig: {}
    };
  },
  mounted() {
    if (!this.PC_MODE) {
      this.ownConfig.width = "100%";
    } else {
      this.ownConfig.width = this.ownConfig.width
        ? this.ownConfig.width
        : DEFAULT_WIDTH;
    }
  },
  methods: {
    initData() {
      this.ownConfig = Utils.copyObject(this.$props.config);
      this.ownConfig.width = undefined;
      if (!this.ownConfig.hasOwnProperty("cancelText")) {
        this.ownConfig.cancelText = "common_ui_dialog_btn_cancel";
      }
      if (!this.ownConfig.hasOwnProperty("confirmText")) {
        this.ownConfig.confirmText = "text_button_apply";
      }
      if (!this.ownConfig.hasOwnProperty("cancelClass")) {
        this.ownConfig.cancelClass = "";
      }
      if (!this.ownConfig.hasOwnProperty("applyClass")) {
        this.ownConfig.applyClass = "confirm-family";
      }
    },
    setWidth() {
      if (!this.PC_MODE) {
        return "100%";
      } else if (this.$props.config.width) {
        return this.$props.config.width;
      } else {
        return DEFAULT_WIDTH;
      }
    },
    setTop() {
      if (!this.PC_MODE) {
        if (this.$refs[this.$props.id]) {
          const eleHeight = this.$refs[this.$props.id].$el.firstChild
            .offsetHeight;
          if (window.innerHeight - eleHeight < 0) {
            this.ownConfig.top = "0";
          } else {
            this.ownConfig.top = (window.innerHeight - eleHeight) / 2 + "px";
          }
        } else {
          this.ownConfig.top = this.$props.config.top;
        }
      } else {
        this.ownConfig.top = this.$props.config.top;
      }
      return this.ownConfig.top;
    },
    onClickConfirm() {
      if (this.$props.confirmCallBack) {
        this.$props.confirmCallBack();
      }
    },
    onClickCancel() {
      if (this.$props.cancelCallBack) {
        this.$props.cancelCallBack();
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style lang="scss">
.custom--dialog--template {
  .el-dialog__wrapper {
    z-index: $z-index-dialog !important;
    &.on-notification {
      z-index: $z-index-background !important;
    }
    .el-dialog__header {
      padding-top: 30px;
      padding-left: 25px;
      text-align: left;
      .el-dialog__title {
        font-family: $font-full;
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
    }
  }
  .el-dialog__body {
    padding: 0px 20px 20px 20px;
    .dialog-container-inner {
      padding-bottom: 20px;
    }
    .dialog--footer-button-wrap {
      .el-col {
        button.el-button {
          float: right;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
