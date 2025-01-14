<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter()
import { reqAllArticle } from "@/api/PublishArticle";
const dataList = ref([])
const isShow = ref(false)
const getAllArticle = async () => {
    try {
        const result = await reqAllArticle();
        if (result.status === 200) {
            dataList.value = result.data.sort((a, b) => Number(a.time) - Number(b.time));
            isShow.value = true;
        } else {
            console.error(`Error: Received status ${result.status}`);
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}
// 根据id跳转至对应的文章详情页
const goArticleCover = (id) => {
    $router.push({ name: 'ArticleCover', query: { articleId: id } })
}
const currentPage: Ref<number> = ref(1)
const pageSize = ref(10)
const totalSplice = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 文章列表一页显示几个
const showDataList = computed(() => {
    const filterData = dataList.value
        .filter((item: any) => item.is_delete === 0)
        .map((item: any) => {
            return {
                ...item,
                content: item.content.replace(/<[^>]*>/g, '')
            };
        });
    totalSplice.value = filterData.length;
    const startIndex = pageSize.value * (currentPage.value - 1);
    const endIndex = Math.min(startIndex + pageSize.value, totalSplice.value);
    return filterData.slice(startIndex, endIndex);
});
onMounted(() => {
    getAllArticle()
})

</script>
<template>
    <main>
        <section class="container" v-if="isShow">
            <div class="content">
                <div class="content_left">
                    <!-- 最新文章 -->
                    <div class="content_title">
                        <h2>最新文章</h2>
                    </div>
                    <ul>
                        <li v-for="item in showDataList" :key="item.id"
                            style="visibility: visible; animation-delay: 0.5s; animation-name: bounceInUp;">
                            <!-- 文章封面 -->
                            <div class="article_cover_box" :style="{ flex: item.cover ? '.28' : '0' }">
                                <div class="article_cover" :style="{
                                    backgroundImage: item.cover ? `url(${item.cover})` : 'none',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }" v-if="item.cover">
                                </div>
                            </div>
                            <!-- 文章内容 -->
                            <div class="article_content" :style="{ flex: item.cover ? '0.7' : '1' }">
                                <h3 @click="goArticleCover(item.id)">
                                    <el-link type="info" style="font-size: 24px;">{{ item.title }}</el-link>
                                </h3>
                                <p @click="goArticleCover(item.id)"
                                    style="font-size: 18px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: normal;text-overflow: ellipsis;-o-text-overflow: ellipsis;">
                                    {{ item.content }}</p>
                                <!-- 类型/日期 -->
                                <div class="article_type_date">
                                    <p class="article_type">类型：{{ item.type }}</p>
                                    <p class="article_date">日期：{{ item.time }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="content_right">
                    <div>
                        <h3>常用工具</h3>
                    </div>
                </div>
            </div>
            <!-- 分页器 -->
            <div class="demo-pagination-block" style="width: 100%;margin-top: 20px;margin-bottom: 40px;">
                <el-pagination style="justify-content: center;" v-model:current-page="currentPage"
                    v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled"
                    :background="background" layout="total, sizes, prev, pager, next, jumper" :total="totalSplice" />
            </div>
        </section>
    </main>
    <!-- 底部 -->
    <Footer></Footer>
</template>
<style scoped lang='scss'>
.container {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-image: url(https://img2.baidu.com/it/u=3089574439,1007339642&fm=253&fmt=auto&app=120&f=JPEG?w=918&h=500);
    background-size: 100%;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;

    .content {
        width: 86%;
        margin: 60px auto;
        display: flex;
        justify-content: space-between;

        .content_left {
            flex: .7;
            background-color: #fff;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 10px;
            opacity: .8;

            .content_title {
                border-bottom: 1px solid rgb(204, 204, 204);
                margin: 10px 0px;
                margin-bottom: 10px;

                h2 {
                    border-bottom: 2px solid rgb(13, 108, 191);
                    padding-bottom: 10px;
                    font-size: 24px;
                    background: -webkit-linear-gradient(135deg,
                            #0eaf6d,
                            #ff6ac6 25%,
                            #147b96 50%,
                            #e6d205 55%,
                            #2cc4e0 60%,
                            #8b2ce0 80%,
                            #ff6384 95%,
                            #08dfb4);
                    /* 文字颜色填充设置为透明 */
                    -webkit-text-fill-color: transparent;
                    /* 背景裁剪，即让文字使用背景色 */
                    background-clip: text;
                    /* 背景图放大一下，看着柔和一些 */
                    background-size: 200% 100%;
                    /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
                    animation: flowCss 12s infinite linear;
                }

                @keyframes flowCss {
                    0% {
                        /* 移动背景位置 */
                        background-position: 0 0;
                    }

                    100% {
                        background-position: -400% 0;
                    }
                }

                h2:hover {
                    animation: flowCss 4s infinite linear;
                }
            }

            ul {
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 140px;
                    border-bottom: 1px solid #f0f0f2;
                    padding: 10px;
                    overflow: hidden;

                    .article_cover_box {
                        width: 180px;
                        height: 100px;
                        overflow: hidden;
                    }

                    // 封面
                    .article_cover {
                        width: 100%;
                        height: 100%;
                        transition: all .3s;
                    }



                    // 内容
                    .article_content {
                        flex: .65;

                        h3,
                        p,
                        div {
                            margin: 2px 0;
                        }

                        .article_type_date {
                            display: flex;
                            justify-content: space-between;

                            p {
                                font-size: 14px;
                            }
                        }

                        .person {
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }

                li:hover {
                    background-color: #fafafa;
                }

                li:hover .article_cover {
                    transform: scale(1.2);
                }
            }
        }

        // 右边装饰
        .content_right {
            flex: 0.28;
        }
    }
}
</style>