<template>
  <div class="user-profile-edit-template">
    <ValidationObserver
      class="user-profile-edit-observer"
      ref="profileEdit"
      v-slot="{invalid}"
      tag="div"
    >
      <DialogBase
        :config="configDialog"
        :showButton="true"
        :isShowCancel="true"
        :disabledApply="invalid"
        :confirmCallBack="onConfirm"
        :cancelCallBack="onCancel"
      >
        <div class="user-profile-edit-inner">
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_profile_email")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <InputValue :vdata="cdata.email" :readonly="true" />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_profile_edit_profile_user_name")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <InputValue
                  :vdata="cdata.username"
                  :showErrorMsg="true"
                  :maxLength="16"
                  :validatorRules="{required: true}"
                  :validatorName="`profile-edit-user-name-validator`"
                  @on-change=" value => cdata.username = value"
                />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_text_phonenumber")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <InputValue
                  :vdata="cdata.phoneNumber"
                  :showErrorMsg="true"
                  :numberOnly="true"
                  :maxLength="11"
                  :validatorRules="{required: true}"
                  :validatorName="`profile-edit-user-name-validator`"
                  @on-change=" value => cdata.phoneNumber = value"
                />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_profile_gender")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <CustomSelect
                  :vdata="cdata.gender"
                  :options="listGender"
                  :showErrorMsg="false"
                  :isTranslate="true"
                  :rules="{required: true}"
                  :validatorName="`profile-edit-gender-validator`"
                  @on-change=" value => cdata.gender = value"
                />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_profile_address")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <InputValue
                  :vdata="cdata.address"
                  :showErrorMsg="true"
                  :rules="{required: true}"
                  :validatorName="`profile-edit-description-validator`"
                  @on-change=" value => cdata.address = value"
                />
              </div>
            </el-col>
          </el-row>
          <el-row class="wrap-form-card" :gutter="10">
            <el-col class="wrap-content" :span="8">
              <span class="input-label">{{$t("common_profile_edit_profile_description")}}</span>
            </el-col>
            <el-col class="wrap-content" :span="12">
              <div class="text-box">
                <InputValue
                  :vdata="cdata.description"
                  :showErrorMsg="true"
                  :maxLength="null"
                  :type="'textarea'"
                  :rules="{required: true}"
                  :validatorName="`profile-edit-description-validator`"
                  @on-change=" value => cdata.description = value"
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
import { ValidationObserver } from "vee-validate";
import InputValue from "@/components/shared/inputs/InputValue";
import DialogBase from "@/components/shared/dialogs/DialogBase";
import CustomSelect from "@/components/shared/selects/CustomSelect";
import Utils from "@/common/utils";
import { GENDERS } from "@/common/constants";
export default {
  name: "UserProfileEdit",
  components: { ValidationObserver, DialogBase, InputValue, CustomSelect },
  props: {
    vdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      configDialog: {
        visible: true,
        top: "100px",
        beforeClose: this.beforeCloseDialog,
        width: "50%",
        showClose: false,
        applyClass: "confirm-family",
        title: "common_profile_edit_profile_title"
      },
      listGender: GENDERS,
      cdata: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.cdata = Utils.copyObject(this.$props.vdata);
    },
    beforeCloseDialog(done) {
      if (done) {
        return false;
        // this.$emit("on-cancel");
      }
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    onConfirm() {
      const payload = this.cdata;
      this.$emit("on-confirm", payload);
    }
  }
};
</script>

<style lang="scss">
.user-profile-edit-template {
  .user-profile-edit-inner {
    padding: 0px 20px;
  }
}
</style>