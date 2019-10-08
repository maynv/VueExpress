<template>
  <div class="complete--dialog--template">
    <DialogBase
      :config="configDialog"
      :showButton="isShowButton"
      :confirmCallBack="onConfirm"
      :class="ownConfig.type"
      :isShowCancel="false"
    >
      <div class="complete--dialog--inner">
        <div class="complete--type--complete">
          <el-row type="flex" justify="space-around">
            <el-col class="icon-wrap">
              <div class="icon-inner">
                <i class="el-icon-check"></i>
              </div>
            </el-col>
            <el-col class="msg-wrap">
              <span class="msg" v-html="$t(ownConfig.msg)"></span>
            </el-col>
          </el-row>
        </div>
        <!-- other types -->
      </div>
    </DialogBase>
  </div>
</template>

<script>
/** props
 * Options place on directive:
 * - config (required)
 */
/** Events
 * on-confirm
 */
import DialogBase from "@/components/shared/dialogs/DialogBase";
import { COMPLETE_DIALOG_TYPE } from "@/common/constants";

import Utils from "@/common/utils";
export default {
  name: "CompleteDialog",
  components: {
    DialogBase
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      configDialog: {
        visible: true,
        top: "10px",
        beforeClose: this.beforeCloseDialog,
        width: "340px",
        showClose: false,
        applyClass: "confirm-family"
      },
      ownConfig: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.ownConfig = Utils.copyObject(this.$props.config);
      if (!this.ownConfig.hasOwnProperty("type")) {
        this.ownConfig.type = COMPLETE_DIALOG_TYPE.COMPLETE;
        if (!this.ownConfig.hasOwnProperty("msg")) {
          this.ownConfig.msg = "common_ui_dialog_complete_message";
        }
      }
      if (this.ownConfig.type === COMPLETE_DIALOG_TYPE.COMPLETE) {
        this.isShowButton = true;
        this.configDialog.confirmText = "common_ui_dialog_btn_ok";
      }
      if (!this.ownConfig.hasOwnProperty("closeClickOutSide")) {
        this.ownConfig.closeClickOutSide = true;
      }
    },
    beforeCloseDialog(done) {
      if (this.ownConfig.closeClickOutSide && done) {
        this.$emit("on-cancel");
      }
    },
    onConfirm() {
      const payload = {};
      this.$emit("on-confirm", payload);
    }
  }
};
</script>
<style lang="scss">
.dialog--template {
  &.complete {
    .el-dialog__header {
      padding-top: 20px;
    }
    .dialog--footer-button-wrap {
      button.el-button {
        float: right !important;
      }
    }
  }
}
.complete--dialog--template .complete--dialog--inner {
  .complete--type--complete {
    // display: inline-flex;
    .icon-wrap {
      width: 26px;
      .icon-inner {
        width: 26px;
        height: 26px;
        border-radius: 50px;
        background-color: #51cf66;
        i {
          width: 12.5px;
          height: 7.9px;
          color: #ffffff;
          padding-top: 6px;
          font-weight: 600;
        }
      }
    }
    .msg-wrap {
      text-align: left;
      line-height: 2;
      padding-left: 10px;
      .msg {
        font-family: $font-full;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
    }
  }
}
</style>