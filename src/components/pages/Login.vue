<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
                @input = "checkUsername"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
                @input = "checkPassword"
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="loginAction" :loading="openloading">马上注册</van-button>
            </div>
       </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openloading: false,     //是否开启用户注册的Login状态
                usernameErrorMsg: '',   //用户名输入出现错误时提示信息
                passwordErrorMsg: '',   //密码输入出现错误时提示信息
                formLaunch: false,      //验证是否通过
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('你已经登录过了')
                this.$router.push('/')
            }
        },
        methods:{
            checkUsername(){
                (this.username.length < 5) ? this.usernameErrorMsg = "用户名不能少于5位" : this.usernameErrorMsg = ""
            },
            checkPassword(){
                (this.password.length < 5) ? this.passwordErrorMsg = "密码不能少于6位" : this.passwordErrorMsg = ""
            },
            goBack(){
                this.$router.go(-1)
            },
            loginAction(){
                // console.log('执行了loginAction')
                this.checkForm() && this.axiosLoginUser()
            },
            axiosLoginUser(){
                //先把按钮进行loading状态，防止重复提交
                this.openLoading = true
                axios({
                    url: url.login,
                    method: 'post',
                    data:{
                        userName: this.username,
                        password: this.password
                    }
                })
                .then(response => {
                    console.log(response)
                    if(response.data.code==200 && response.data.message){
                        new Promise((resolve,reject)=>{
                                localStorage.userInfo={userName:this.username}
                                setTimeout(()=>{
                                    resolve()
                                },500)
                        }).then(()=>{
                                Toast.success('登录成功')
                                this.$router.push('/')
                        }).catch(err=>{
                                Toast.fail('登录状态保存失败')
                                console.log(err)
                        })
                    }
                    else{
                        Toast.fail('登录失败')
                        this.openLoading = false
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.fail('登录失败')
                    this.openLoading = false
                })
            },
            //表单验证方法
            checkForm(){
                // console.log('执行了checkForm')
                let isOk = true
                if(this.username.length < 5){
                    this.usernameErrorMsg = "用户名不能少于5位"
                    isOk = false
                }else{
                    this.usernameErrorMsg = ""
                }
                if(this.password.length < 6){
                    this.passwordErrorMsg = "密码不能少于6位"
                    isOk = false
                }else{
                    this.passwordErrorMsg = ""
                }
                return isOk;
            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>