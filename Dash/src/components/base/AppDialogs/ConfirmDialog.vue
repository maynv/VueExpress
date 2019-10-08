<template>
  <div class="confirm--dialog--template">
    <DialogBase
      :config="configDialog"
      :showButton="isShowButton"
      :isShowCancel="ownConfig.isShowCancel"
      :confirmCallBack="onConfirm"
      :cancelCallBack="onCancel"
      :class="ownConfig.type"
    >
      <div class="confirm--dialog--inner">
        <div class="confirm--type--warning">
          <el-row>
            <el-col class="confirm-warning-title">
              <div class="icon-wrap">
                <i class="el-icon-warning"></i>
              </div>
              <div class="msg-wrap">
                <span class="msg" v-html="$t(ownConfig.msg)"></span>
              </div>
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
 * on-cancel
 */
import DialogBase from "@/components/shared/dialogs/DialogBase";
import { CONFIRM_DIALOG_TYPE } from "@/common/constants";

import Utils from "@/common/utils";
export default {
  name: "ConfirmDialog",
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
        showClose: false
      },
      isShowButton: false,
      ownConfig: {},
      confirmType: CONFIRM_DIALOG_TYPE
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.ownConfig = Utils.copyObject(this.$props.config);
      if (!this.ownConfig.hasOwnProperty("type")) {
        this.ownConfig.type = CONFIRM_DIALOG_TYPE.WARNING;
        if (!this.ownConfig.hasOwnProperty("msg")) {
          this.ownConfig.msg = "common_text_confirm_before_delete";
        }
      }

      if (this.ownConfig.type === CONFIRM_DIALOG_TYPE.WARNING) {
        this.isShowButton = true;
        // this.configDialog.title = this.$t("common_text_warning");
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
    },
    onCancel() {
      this.$emit("on-cancel");
    }
  }
};
</script>
<style lang="scss">
.dialog--template {
  &.warning {
    .el-dialog__header {
      padding-top: 20px;
    }
    .el-dialog__header {
      .el-dialog__title {
        color: #606266;
      }
    }
  }
}
.confirm--dialog--template .confirm--dialog--inner {
  .confirm--type--warning {
    text-align: left;
    padding-left: 10px;
    .icon-wrap {
      display: table-cell;
      padding-top: 14px;
      i {
        font-size: 22px;
        color: #ce9e66;
        margin-top: 2px;
        display: initial;
      }
    }
    .msg-wrap {
      display: table-cell;
      vertical-align: middle;
      .msg {
        display: table-cell;
        vertical-align: middle;
        padding-left: 10px;
        font-family: $font-full;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 3.13;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
    }
  }
}
</style>
