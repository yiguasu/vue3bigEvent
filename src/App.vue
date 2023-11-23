<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div>
    我是APP
    <el-button>首页</el-button>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('aaaaaa')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
