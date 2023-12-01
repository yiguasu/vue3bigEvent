<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
// import { ElMessage } from 'element-plus'
// import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
const form = ref()
const ruleForm = ref({
  username: '',
  password: '',
  repassword: ''
})
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.value.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      validator: validatePass2,
      trigger: 'blur'
    }
  ]
}

//表单验证
const register = async () => {
  //通过ref的方式，可以拿到表单form
  if (!form.value) return
  //验证
  await form.value.validate(async (valid) => {
    if (valid) {
      //注册
      const res = await userRegisterService(ruleForm.value)
      console.log(res.data.code)
      console.log(res.data.message)
      if (res.data.code === 0) {
        // ElMessage.success('登录成功！')
        isRegister.value = false
        console.log('登录!')
      }
    } else {
      console.log('error submit!')
    }
  })
}
// const UserStore = useUserStore()
const router = useRouter()
//登录验证 login
// const login = async () => {
//   if (!form.value) return
//   //验证
//   await form.value.validate(async (valid) => {
//     if (valid) {
//       console.log(1)
//       //登录成功，要保存token
//       const res = userLoginService(ruleForm.value)
//       console.log(res.data)
//       UserStore.setToken(res.data.token)
//       //跳转到主界面
//       router.push('/')
//       console.log(2)
//     } else {
//       console.log('error submit!')
//     }
//   })
// }

const login = async () => {
  await form.value.validate()
  userLoginService(ruleForm.value)
  // console.log(res)
  // console.log(res.data)
  // console.log(res.data.code)
  // console.log(res.message)
  // UserStore.setToken(res.data.token)
  // ElMessage.success('登录成功')
  router.push('/')
}
//切换下面的按钮，表单重置
watch(isRegister, () => {
  ;(ruleForm.value.username = ''), (ruleForm.value.password = ''), (ruleForm.value.repassword = '')
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="register" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="login" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
