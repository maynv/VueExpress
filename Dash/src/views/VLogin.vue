<template>
  <div class="--d-login-template">
    <div class="--d-login-inner">
      <el-row class="--d-login-welcom-wrap">
        <el-col>
          <h3 class="text">Welcome</h3>
        </el-col>
      </el-row>
      <ValidationObserver class="--d-login-input-form-wrap" tag="div" v-slot="{invalid}">
        <el-row>
          <el-col class="input-wrap">
            <InputValue
              :vdata="userName"
              :showErrorMsg="true"
              :placeholder="`login_id_placeholder`"
              :validatorName="`input-validator`"
              :validatorRules="{
                required: true,
                validLength: 4
            }"
              ref="login-id-input"
              @on-change=" value => userName = value"
            />
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
          <el-col class="error-wrap">
            <span class="err-msg">{{$t(error)}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button
              :style="{float: 'left'}"
              :disabled="false"
              @click="onRegister"
            >{{$t("common_text_register")}}</el-button>
            <el-button :disabled="invalid" @click="onLogin">{{$t("common_text_login")}}</el-button>
          </el-col>
        </el-row>
      </ValidationObserver>
      <el-row class="--d-login-guide-wrap">
        <el-col :span="24" class="--d-login-guide-text"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { LOGIN } from "@/stores/types/actions";
import { ValidationObserver } from "vee-validate";
import InputValue from "@/components/shared/inputs/InputValue";
import InputPassword from "@/components/shared/inputs/InputPassword";
import ExService from "@/api/ExService";
export default {
  name: "Login",
  components: {
    ValidationObserver,
    InputValue,
    InputPassword
  },
  data() {
    return { userName: "", password: "", error: "" };
  },
  created() {},
  methods: {
    ...mapActions({ LOGIN }),
    onLogin() {
      const postData = ExService.auth_ex.auth_login({
        id: this.userName,
        password: this.password
      });
      this.LOGIN({
        postData: postData
      })
        .then(() => {
          this.$router.push("/home");
        })
        .catch(err => {
          this.error = err.data.err;
        });
    },
    onRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss">
.--d-login-template {
  background-color: #f1f2f5;
  .--d-login-inner {
    width: 500px;
    margin: auto;
  }
  .--d-login-welcom-wrap {
    text-align: left;
    margin-top: 130px;
  }
  .--d-login-input-form-wrap {
    border: 1px solid $color-border-normal;
    padding: 20px;
    border-radius: 5px;
    background-color: #ffffff;
    .input-wrap {
      height: 65px;
    }
    .el-button {
      float: right;
      width: 120px;
    }
    .error-wrap {
      padding: 10px 20px;
      .err-msg {
        color: $color-text-error;
        font-size: 13px;
      }
    }
  }
  .--d-login-guide-wrap {
    margin-top: 50px;
    color: #147eff;
    .--d-login-guide-register {
      text-align: left;
    }
    .--d-login-guide-fogot {
      text-align: right;
    }
  }
}
</style>