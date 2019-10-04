<template>
  <div class="--d-register-template">
    <div class="--d-register-inner">
      <el-row class="--d-register-welcom-wrap">
        <el-col>
          <h3 class="text">Create an Account</h3>
        </el-col>
      </el-row>
      <ValidationObserver class="--d-register-input-form-wrap" tag="div" v-slot="{invalid}">
        <el-row>
          <el-col class="title">
            <span>{{"User Name"}}</span>
          </el-col>
          <el-col class="input-wrap">
            <InputValue
              :vdata="userName"
              :showErrorMsg="true"
              :placeholder="`register_username_placeholder`"
              :validatorName="`input-validator`"
              :validatorRules="{
                required: true,
                validLength: 4
            }"
              ref="register-id-input"
              @on-change=" value => userName = value"
            />
          </el-col>
          <el-col class="title">
            <span>{{"Email"}}</span>
          </el-col>
          <el-col class="input-wrap">
            <InputValue
              :vdata="email"
              :showErrorMsg="true"
              :placeholder="`login_id_placeholder`"
              :validatorName="`input-validator`"
              :validatorRules="{
                required: true,
                validLength: 4
            }"
              ref="register-id-input"
              @on-change=" value => email = value"
            />
          </el-col>
          <el-col class="title">
            <span>{{"Password"}}</span>
          </el-col>
          <el-col class="input-wrap">
            <InputPassword
              :vdata="password"
              :showErrorMsg="true"
              :placeholder="`login_pw_placeholder`"
              :validatorRules="{
                required: true
            }"
              :validatorName="`input-password-validator`"
              :isShowEye="false"
              @on-change=" value => password = value"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button
              :style="{float: 'left'}"
              :disabled="false"
              @click="onBack"
            >{{$t("common_text_back_to_login")}}</el-button>
            <el-button :disabled="invalid" @click="onRegister">{{$t("common_text_register")}}</el-button>
          </el-col>
        </el-row>
      </ValidationObserver>
      <el-row class="--d-register-guide-wrap">
        <el-col :span="24" class="--d-register-guide-text"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { REGISTER } from "@/stores/types/actions";
import { ValidationObserver } from "vee-validate";
import InputValue from "@/components/shared/inputs/InputValue";
import InputPassword from "@/components/shared/inputs/InputPassword";
import ExService from "@/api/ExService";
export default {
  name: "Register",
  components: {
    ValidationObserver,
    InputValue,
    InputPassword
  },
  data() {
    return { userName: "", email: "", password: "" };
  },
  created() {},
  methods: {
    ...mapActions({ REGISTER }),
    onRegister() {
      const postData = ExService.auth_ex.auth_register({
        userName: this.userName,
        email: this.email,
        password: this.password
      });
      this.REGISTER({
        postData: postData
      });
    },
    onBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.--d-register-template {
  background-color: #f1f2f5;
  .--d-register-inner {
    width: 500px;
    margin: auto;
  }
  .--d-register-welcom-wrap {
    text-align: left;
    margin-top: 130px;
  }
  .--d-register-input-form-wrap {
    border: 1px solid $color-border-normal;
    padding: 20px;
    border-radius: 5px;
    background-color: #ffffff;
    .title {
      text-align: left;
      padding-bottom: 12px;
    }
    .input-wrap {
      height: 65px;
    }
    .el-button {
      float: right;
      width: 120px;
    }
  }
  .--d-register-guide-wrap {
    margin-top: 50px;
    color: #147eff;
    .--d-register-guide-register {
      text-align: left;
    }
    .--d-register-guide-fogot {
      text-align: right;
    }
  }
}
</style>