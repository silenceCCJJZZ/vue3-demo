<script setup lang="ts">
import {reactive} from "vue";

//form 表单数据
const loginFrom = reactive({
  username: '',
  password: '',
  uuid: '',
  verifyCode: ''
})

//rules表单校验
const loginRules = reactive({
  username:[
    {
      required: true,
      message:'账号不能为空，请输入',
      trigger:'blur' //失焦触发

    },
    {
      pattern:/^[a-zA-Z0-9]{2,10}$/,
      message:'请输入2-10位数字或者字母',
      trigger:'blur' //失焦触发
    },{
      min:3,
      max:15,
      message:'请输入3-15位数字或者字母',
      trigger:'blur' //失焦触发
    }
  ],
  password:[
    {
      required: true,
      message:'密码不能为空，请输入',
      trigger:'blur'

    },
    {
      min:3,
      max:15,
      message:'请输入3-15位数字或者字母',
      trigger:'blur' //失焦触发
    }
  ],
  verifyCode:[
    {
      required: true,
      message:'验证码不能为空，请输入',
      trigger:'blur'
    },
    {
      whitespace:true,
      message:'不能输入空格',
    }
  ]

})


</script>

<template>
  <div class="login-container">
    <!-- 背景vedio -->
    <video poster="@/assets/login/1.jpg" loop autoplay muted>
      <source src="@/assets/login/Particles.mp4" />
    </video>

    <div class="login-form">
        <!-- 标题-->
      <header>
        <img src="@/assets/logo.png">
        <h3>vue-amdin</h3>
      </header>
      <el-form  :model="loginFrom" :rules="loginRules">
        <el-form-item prop="username">
           <el-input placeholder="username" v-model="loginFrom.username" type="text">
           </el-input>

        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="password" v-model="loginFrom.password" type="password">
          </el-input>

        </el-form-item>

        <el-form-item prop="verifyCode">
          <el-input placeholder="verifyCode" v-model="loginFrom.verifyCode" type="text">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button>登陆</el-button>

        </el-form-item>



      </el-form>



    </div>
  </div>
</template>

<style lang="scss">
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: -1;
  }
  .login-form {
    width: 400px;
    height: 380px;
    padding: 4vh;
    margin: 20px;
    background: url("@/assets/login/login_form.png");
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    opacity: "0.2";

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        display: inline-block;
        width: 40px;
      }

      h1 {
        margin-bottom: 0;
        font-size: 24px;
        color: #fff;
        text-align: center;
      }
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $lightGray;
        caret-color: $loginCursorColor;
        -webkit-appearance: none;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $loginBg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
