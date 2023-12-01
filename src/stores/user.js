import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../api/user'
//用户模块的token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4OTIwLCJ1c2VybmFtZSI6InlpZ3Vhc3UyIiwibmlja25hbWUiOiLkvIrnk5zoi48iLCJlbWFpbCI6IjEzNTIxMDU0ODc1QDE2My5jb20iLCJpYXQiOjE3MDE0MTM2MTUsImV4cCI6MTcwMTQ0OTYxNX0.d7hjdhOBkt0F_oMX1VHEzaThG2P4bV_7muUUt_sgDuM'
    )
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    //将个人的信息存到pinia
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      console.log(res)
      user.value = res.data
    }
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
