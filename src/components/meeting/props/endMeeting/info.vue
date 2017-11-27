<template>
    <el-form ref="form" :model="form" label-width="95px" class="content-form">
        <el-form-item label="会议名称">
            <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-checkbox v-model="checked">保密会议</el-checkbox>（会议结束后自动系统将删除会议相关材料）
        </el-form-item>
        <el-form-item label="会议室">
            <el-select v-model="form.b" placeholder="选择权限" filterable>
                <el-option label="管理员" :value="0"></el-option>
                <el-option label="督导员" :value="1"></el-option>
                <el-option label="秘书" :value="2"></el-option>
                <el-option label="其他" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-input v-model="form.c"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-input v-model="form.d"></el-input>
        </el-form-item>
        <el-form-item label="参会人数">
            <el-input v-model="form.e"></el-input>
        </el-form-item>
        <el-form-item label="会议秘书">
            <el-input v-model="form.f"></el-input>
        </el-form-item>
        <el-form-item label="申请部门">
            <el-input v-model="form.f"></el-input>
        </el-form-item>
        <el-form-item label="服务提供">
            <el-checkbox-group v-model="form.f">
                <el-checkbox label="茶水"></el-checkbox>
                <el-checkbox label="咖啡"></el-checkbox>
                <el-checkbox label="保洁"></el-checkbox>
                <el-checkbox label="纸笔"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="功能需求">
            <el-checkbox-group v-model="form.f">
                <el-checkbox label="议程查看"></el-checkbox>
                <el-checkbox label="文件浏览"></el-checkbox>
                <el-checkbox label="批注文件"></el-checkbox>
                <el-checkbox label="投票表决"></el-checkbox>
                <el-checkbox label="服务呼叫"></el-checkbox>
                <el-checkbox label="同屏请求"></el-checkbox>
                <el-checkbox label="电子白板"></el-checkbox>
                <el-checkbox label="投影请求"></el-checkbox>
                <el-checkbox label="聊天室"></el-checkbox>
                <el-checkbox label="视频录播"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.f"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" size="small">提交信息</el-button><br>
            <el-button type="success" size="small">刷新信息</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 已结束会议 => 基本信息
export default {
    data() {
        return {
            checked: true,
            form: {
                a: '',
                b: 0,
                c: '',
                d: '',
                e: '',
                f: ''
            }
        }
    }
}
</script>
