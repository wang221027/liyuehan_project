<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { ArticleCover, pubComment, reqAllComments } from "@/api/ArticleCover"
const $route = useRoute()
const $router = useRouter()
// 引入 element-plus message信息提示
import { ElMessage } from "element-plus";
// 存储用户发表评论的内容
let userComments: any = ref([])
// 用户评论是否显示
let isComment = ref(false)
const articleCoverId: any = ref('')
// 点击发布博文去发布文章路由
let goIssue = () => {
    $router.push({ name: 'PublishArticle' })
}
// 评论
let formLabelAlign: { alias: string } = reactive({
    alias: "",
})
let articleData: any = ref({})
const getArticleData = async () => {
    const result = await ArticleCover(articleCoverId.value)
    if (result.status === 200) {
        articleData.value = result.data[0]
    }
}

let publish = async () => {
    if (formLabelAlign.alias === "") {
        return ElMessage({
            message: "内容不允许为空！",
            type: "error"
        })
    }
    const data = {
        comment: formLabelAlign.alias,
        id: articleCoverId.value
    }
    const result = await pubComment(data)
    console.log(result);
    if (result.status === 200) {
        ElMessage.success("评论成功！！")
        formLabelAlign.alias = ""
        getAllComments()
    }
}
const getAllComments = async () => {
    const result = await reqAllComments(articleCoverId.value)
    if (result.status === 200) {
        userComments.value = result.data;
    }
}
onMounted(() => {
    if ($route.query.articleId) {
        articleCoverId.value = $route.query.articleId
        getArticleData()
        getAllComments()
    }
})
</script>
<template>
    <div class="bg"></div>
    <div class="container">
        <GoBack content="文章详情" width="86%"></GoBack>
        <!-- 主体内容 -->
        <div class="main">
            <!-- 左边内容 -->
            <div class="main_left">
                <div
                    style="background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);width: 100%;padding: 20px;display:flex;box-sizing: border-box;">
                    <!-- 用户头像 -->
                    <div style="width: 80px;height: 80px;">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                    <!-- 用户姓名 -->
                    <div class="top_content">
                        <h1 class="top_h1" v-if="articleData">用户昵称：游客</h1>
                    </div>
                </div>
                <!-- 左边发布博文背景 -->
                <div class="main_bg" @click="goIssue"></div>
            </div>
            <!-- 右边文章列表 -->
            <div class="main_right" v-if="articleData">
                <!-- 文章标题 -->
                <h1>{{ articleData.title }}</h1>
                <div></div>
                <!-- 文章内容 -->
                <p v-html="articleData.content" id="printData"></p>
                <!-- 文章类型 -->
                <span>文章类型：{{ articleData.type }}</span><br>
                <!-- 发布日期 -->
                <span>发布日期：{{ articleData.time }}</span>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 评论 -->
                <div class="comment">
                    <el-form label-width="80px" :model="formLabelAlign">
                        <!-- 评论内容 -->
                        <el-form-item label="评论内容">
                            <el-input type="textarea" v-model.trim="formLabelAlign.alias"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- 发表评论 -->
                            <el-button type="primary" @click="publish">发表</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 展示评论 -->
                <div class="show_comments">
                    <div v-for="(item, index) in userComments" :key="index">
                        <div>
                            <div class="demo-type" style="display: flex;">
                                <div>
                                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                </div>
                                <div style="margin-left: 10px;font-size: 14px;">
                                    游客
                                </div>
                                <div style="font-size: 12px;color: #111;margin-left: 10px;margin-top: 4px;">
                                    {{ item.time }}
                                </div>
                            </div>
                            <div style="margin-left: 50px;transform: translateY(-20px);">
                                {{ item.comment }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-image: url(https://img2.baidu.com/it/u=340131952,1993738831&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
    background-size: 100%;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    height: 100vh;
}

// 容器
.container {
    width: 100%;
    margin-top: 100px;


    // 主体
    .main {
        width: 86%;
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        opacity: .8;
        background-color: #f0ece6;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 10px;

        .main_left {
            flex: 0.34;

            // 个人头像
            .el-avatar {
                width: 100px;
                height: 100px;
                border: 2px solid #ccc;
            }

            // 个人头像
            .el-avatar {
                width: 80px;
                height: 80px;
                border: 2px solid #ccc;
            }

            // 用户姓名
            .top_h1 {
                margin-left: 20px;
                margin-top: 10px;
                font-size: 20px;
            }

            // 左边发布博文背景
            .main_bg {
                background-color: #fff;
                width: 100%;
                padding: 20px;
                display: flex;
                box-sizing: border-box;
                margin-top: 20px;
                background: url(./images/bg_post.png) no-repeat;
                background-size: cover;
                height: 200px;
                cursor: pointer;
                transition: all .3s;
            }

            .main_bg:hover {
                box-shadow: 4px 8px 8px rgba(0, 0, 0, .3);
            }
        }

        // 右边文章列表
        .main_right {
            padding: 20px;
            flex: 0.65;
            border: 1px solid #ccc;
            box-sizing: border-box;

            // 回复
            .reply {
                display: inline-block;
                transform: translateY(-20px);
                margin-left: 8px;
                font-size: 14px;
                cursor: pointer;
            }

            h1 {
                font-size: 30px;
                margin: 10px 0;
            }

            p {
                margin: 10px 0;
                font-size: 20px;
            }

            span {
                font-size: 14px;
            }

            // 分割线
            .hr {
                display: block;
                width: 100%;
                height: 1px;
                background-color: #ccc;
                margin: 10px auto;
            }

            // 展示评论
        }
    }
}

// 响应式 1500px
@media screen and (max-width: 1500px) {

    // 主体
    .main {
        width: 1200px !important;
    }
}

// 1300px
@media screen and (max-width: 1300px) {

    // 主体
    .main {
        width: 1050px !important;
    }
}

// 1100px
@media screen and (max-width: 1100px) {

    // 主体
    .main {
        display: block !important;
        width: 900px !important;
    }

    // 发布博文
    .main_bg {
        display: none !important;
    }

    // 文章详情
    .main_right {
        margin-top: 20px;
    }
}

// 996px
@media screen and (max-width: 996px) {

    // 主体
    .main {
        width: 700px !important;
    }

    // 返回上一级
    .go_back {
        display: none;
    }
}

// 768px
@media screen and (max-width: 768px) {

    // 主体
    .main {
        width: 100vw !important;
    }

    .main_left {
        width: 100vw;
    }

    .main_right {
        width: 100vw;
    }
}
</style>