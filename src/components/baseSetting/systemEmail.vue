<template>
    <div>
        <h1 class="wrap-title mar-bottom15">系统邮箱管理</h1>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row class="mar-bottom10">
                    <el-col :span="24" class="el-item">
                        <el-card>
                            <div slot="header">
                                <span>邮箱配置</span>
                            </div>
                            <el-form ref="form" :model="form" label-width="65px" class="pdd-10">
                                <el-form-item label="用户名">
                                    <el-input v-model="form.b"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="form.b"></el-input>
                                </el-form-item>
                                <el-form-item label="服务器">
                                    <el-select v-model="form.a" placeholder="选择服务器" filterable>
                                        <el-option label="smtp.163.com" :value="1"></el-option>
                                        <el-option label="smtp.126.com" :value="2"></el-option>
                                        <el-option label="smtp.qq.com" :value="3"></el-option>
                                        <el-option label="smtp.sina.com" :value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="端口号">
                                    <el-input v-model="form.b"></el-input>
                                </el-form-item>
                                <el-form-item label=" ">
                                    <el-checkbox v-model="form.is_secrecy">SSL</el-checkbox>
                                </el-form-item>
                                <el-form-item label=" ">
                                    <el-button type="primary" size="small">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row class="mar-bottom10">
                    <el-col :span="24" class="el-item">
                        <el-card>
                            <div slot="header">
                                <span>测试邮箱设置</span>
                            </div>
                            <div class="">
                                <el-input v-model="a" placeholder="收件人：" class="mar-bottom20"></el-input>
                                <el-input v-model="a" placeholder="主题：" class="mar-bottom20"></el-input>
                                <el-input v-model="a" placeholder="内容：" type="textarea" :rows="8" class="mar-bottom20"></el-input>
                                <feng-file-upload text="点击上传" url="/Upload/filesUpload" @increment="handleAvatarScucess"></feng-file-upload><br>
                                <el-button type="primary" size="small" class="mar-top15">发送</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import fengFileUpload from '@/components/fengModule/fileUpload.vue'

export default {
    data () {
        return {
            a: '',
            form: {

            },
            formTest: {

            },
            fileList: []
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit()
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        }
    },
    components: {
        fengFileUpload
    }
}
</script>
