<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// 引入api
import { reqPublishArticle, ReqArticle, reqClearImage } from "@/api/PublishArticle"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const $router = useRouter()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
// 标题
const title = ref('')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const radio = ref(3)
// 封面url
const file = ref(null)
const mode = 'default'
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
// 获取封面url
const imageURL = ref('')
const handleFileUpload = async (event: any) => {
    file.value = event.target.files[0];
    // 如果输入框都不为空,发送请求添加文章
    if (file.value != null) {
        let formData: any = new FormData();
        formData.append("avatar", file.value);
        await ReqArticle(formData)
        // 上传图片后显示
        const target = event.target as HTMLInputElement
        const fileUrl = (target.files as FileList)[0]
        if (fileUrl) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target) {
                    imageURL.value = event.target.result as string
                }
            }
            reader.readAsDataURL(fileUrl)
        }
    }
}
// 当页面加载完毕后清楚上一次选中的封面
const clearImage = async () => {
    await reqClearImage()
}
// 发布文章
const publishArticle = async () => {
    if (title.value == '') {
        return ElMessage.error('请输入标题！')
    }
    if (valueHtml.value == '<p><br></p>') {
        return ElMessage.error('请输入内容！')
    }
    let radioData = radio.value == 3 ? '原创' : radio.value == 6 ? '转载' : '其他';
    const result = await reqPublishArticle(title.value, valueHtml.value, radioData)
    if (result.status === 200) {
        ElMessage.success('发布成功！')
        $router.push('/forum')
    }
}
onMounted(() => {
    clearImage()
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>    
<template>
    <div class="bg">
        <div style="text-align: center;margin-top: 20px;">
            <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <el-input v-model="title" style="width: 70%;margin: 10px 0;height: 40px;" placeholder="请输入标题" />
            <Editor style="height: 600px; overflow-y: hidden;width:70%;border: 1px solid #ccc;margin: 0 auto;opacity: .8;"
                v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
        </div>
        <!-- 添加封面 -->
        <section class="articleCover" style="opacity: .8;">
            <div>
                文章类型：
                <el-radio-group v-model="radio">
                    <el-radio :value="3">原创</el-radio>
                    <el-radio :value="6">转载</el-radio>
                    <el-radio :value="9">其他</el-radio>
                </el-radio-group>
            </div>
            <!-- 上传封面 -->
            <div class="file_container">
                文章封面：
                <label for="file" class="file" :style="{ backgroundImage: imageURL ? 'url(' + imageURL + ')' : '' }"
                    :class="{ 'articleCoverShow': imageURL != '' }">
                    <div class="file_top"></div>
                    <div class="file_bottom"></div>
                </label>
                <input type="file" id="file" style="display: none;" @change="handleFileUpload">
            </div>
        </section>
    </div>
    <!-- 发布文章 -->
    <section class="pubArticle">
        <div class="pubArticle_box">
            <div style="display: flex;align-items: center;height: 100%;">
                <el-button type="primary" round @click="publishArticle">发布文章</el-button>
            </div>
            <GoBack content="文章详情" width="86%"></GoBack>
            <el-backtop :right="100" :bottom="10" />
        </div>
    </section>
</template>
<style lang="scss" scoped>
::v-deep .w-e-bar-show {
    justify-content: center;
}

.articleCoverShow {
    background-color: transparent;
}

.bg {
    width: 100%;
    height: 100%;
    background-image: url(./images/bg.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: 100vw 100vh;
    padding-bottom: 100px;
    margin-top: 60px;

    .articleCover {
        width: 70%;
        margin: 0 auto;
        background-color: #fff;
        margin-top: 20px;
        padding: 30px;

        // 上传封面
        .file_container {
            display: flex;
            position: relative;
            margin-top: 10px;

            // 上传图片后显示
            .image-preview {
                width: 300px;
                height: 200px;
                margin-left: 50px;
                overflow: hidden;
            }

            .file {
                display: block;
                width: 200px;
                height: 100px;
                border-radius: 6px;
                background: #f7f7f7;
                position: relative;
                border: 2px solid #fff;
                cursor: pointer;
                margin-bottom: 20px;
                background-position: center;
                background-size: cover;

                .file_top,
                .file_bottom {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 3px;
                    background: #fff;
                    border-radius: 10px;
                }

                .file_bottom {
                    transform: translate(-50%, -50%) rotate(90deg);
                }

                .show {
                    position: absolute;
                    left: 220px;
                    bottom: 20px;
                    font-size: 24px;
                    color: #fff;
                }
            }

            .file:hover {
                border-color: #409eff;
            }
        }
    }
}

// 发布文章
.pubArticle {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    z-index: 2;
    box-shadow: 12px 12px 8px rgba(0, 0, 0, 0.32), 2px 2px 6px rgba(0, 0, 0, 0.08);

    &_box {
        width: 80%;
        margin: 0 auto;
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
}
</style>