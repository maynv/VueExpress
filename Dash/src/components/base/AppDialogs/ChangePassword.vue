<template>
  <div class="change-password-template">
    <ValidationObserver
      class="change-password-observer"
      ref="profileEdit"
      v-slot="{invalid}"
      tag="div"
    >
      <DialogBase
        :config="configDialog"
        :showButton="true"
        :isShowCancel="true"
        :disabledApply="invalid"
        :localLoading="localLoading"
        :confirmCallBack="onConfirm"
        :cancelCallBack="onCancel"
      >
        <div class="change-password-inner">
          <el-row class="wrap-form-card">
            <el-col class="wrap-content">
              <span class="input-label">{{$t("common_profile_old_password")}}</span>
            </el-col>
            <el-col class="wrap-content">
              <div class="text-box">
                <InputPassword
                  :isShowEye="false"
                  :minLength="2"
                  :maxLength="32"
                  :validatorName="'change-password-old-password-validator'"
                  :ref="'oldPassword'"
                  :validatorRules="{
                    required: true,
                    validLength: 2
                  }"
                  :vdata="cdata.oldPassword"
                  @on-change="value => onOldPasswordChange(value)"
                />
              </div>
            </el-col>
            <el-col class="wrap-error" v-if="invalidPassword.show">
              <span class="input-label error">{{$t(invalidPassword.msg)}}</span>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card">
            <el-col class="wrap-content">
              <span class="input-label">{{$t("common_profile_new_password")}}</span>
            </el-col>
            <el-col class="wrap-content">
              <div class="text-box">
                <InputPassword
                  :isShowEye="false"
                  :minLength="2"
                  :maxLength="32"
                  :validatorName="'change-password-new-password-validator'"
                  :validatorRules="{
                    required: true,
                    validLength: 2
                  }"
                  :vdata="cdata.newPassword"
                  @on-change="value => cdata.newPassword = value"
                />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card">
            <el-col class="wrap-content">
              <span class="input-label">{{$t("common_profile_re_new_password")}}</span>
            </el-col>
            <el-col class="wrap-content">
              <div class="text-box">
                <InputPassword
                  :isShowEye="false"
                  :minLength="2"
                  :maxLength="32"
                  :validatorName="'change-password-re-new-password-validator'"
                  :validatorRules="{
                    required: true,
                    validLength: 2,
                    checkSameNewPassword: [cdata.newPassword, true]
                  }"
                  :vdata="cdata.reNewPassword"
                  @on-change="value => cdata.reNewPassword = value"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </DialogBase>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { USER_VALIDATE } from "@/stores/types/actions";
import { ValidationObserver } from "vee-validate";
import InputPassword from "@/components/shared/inputs/InputPassword";
import DialogBase from "@/components/shared/dialogs/DialogBase";
import Utils from "@/common/utils";
import ExService from "@/api/ExService";
import { COOKIE_USER } from "@/common/constants";
export default {
  name: "ChangePassword",
  components: { ValidationObserver, DialogBase, InputPassword },
  props: {},
  data() {
    return {
      configDialog: {
        visible: true,
        top: "100px",
        beforeClose: this.beforeCloseDialog,
        width: "50%",
        showClose: false,
        applyClass: "confirm-family",
        title: "common_profile_change_password"
      },
      cdata: {
        oldPassword: "",
        newPassword: "",
        reNewPassword: ""
      },
      invalidPassword: {
        show: false,
        msg: ""
      },
      localLoading: false
    };
  },
  watch: {},
  created() {
    this.initData();
  },
  methods: {
    ...mapActions({ USER_VALIDATE }),
    initData() {},
    beforeCloseDialog(done) {
      if (done) {
        return false;
        // this.$emit("on-cancel");
      }
    },
    onOldPasswordChange(value) {
      if (value === null || value === undefined) {
        return;
      }
      this.$set(this.cdata, "oldPassword", value);
      this.$set(this.invalidPassword, "show", false);
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    onConfirm() {
      const email = Utils.getCookie(COOKIE_USER);
      this.localLoading = true;
      const postData = ExService.auth_ex.auth_user_password_validate({
        email: email,
        password: this.cdata.oldPassword
      });
      const a = this;
      this.USER_VALIDATE({
        postData: postData,
        options: {
          acceptUnAuth: true,
          showLoading: false
        }
      })
        .then(() => {
          this.localLoading = false;
          const payLoad = { ...this.cdata, email: email };
          this.$emit("on-confirm", payLoad);
        })
        .catch(err => {
          this.$set(this.invalidPassword, "show", true);
          this.$set(
            this.invalidPassword,
            "msg",
            "custom_text_old_password_not_match"
          );
          this.localLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.change-password-template {
  .change-password-inner {
    padding: 0px 20px;
    .wrap-form-card {
      .wrap-error {
        padding-top: 10px;
        text-align: left;
        .input-label.error {
          color: $color-text-error;
        }
      }
    }
  }
}
</style>