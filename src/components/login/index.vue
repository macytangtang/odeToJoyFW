<template>
    <div id="login">
        <!-- <div class="login-header">
            <div class="header-logo">
                <h1>
                    <a href="">
                        logo
                        <img src="../../static/img/logo.png" alt="方圆智汇">
                    </a>
                </h1>
                <div class="header-title">方圆智汇</div>
            </div>
        </div> -->
        <div class="login-content">
            <div class="content-wrap">
                <div class="form-wrap">
                    <h2>USER LOGIN</h2>
                    <h1>用户登录</h1>
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item prop="email">
                            <el-input placeholder="请输入登录邮箱" v-model="form.email" class="mar-top20" size="large">
                                <template slot="prepend">
                                    <i class="iconfont icon-account fs-1s2em"></i>
                                </template>
    						</el-input>
    					</el-form-item>
    					<el-form-item prop="password">
    						<el-input type="password" placeholder="请输入密码" v-model="form.password" class="mar-top20" size="large" @keyup.enter.native="onLogin('form')">
    						    <template slot="prepend">
                                    <i class="iconfont icon-Password fs-1s2em"></i>
                                </template>
    						</el-input>
    					</el-form-item>
    					<el-button type="primary" @click="onLogin('form')" class="content-login">登录</el-button>
    				</el-form>
                </div>
                <div class="login-footer">
                    <p>方圆智汇</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 后台登录页面
import '@/static/style/login/index.scss'

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入登录邮箱账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 执行登录
                    this.$store.dispatch('onLogin', this.form)
                } else {
                    this.$notify({ title: '系统通知', message: '必填的项目不能为空！', type: 'warning' })
                }
            })
        }
    }
}
</script>
