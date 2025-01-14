<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute();
let path = ref('')
watch(() => $route.path, () => {
    path.value = $route.path
}, { immediate: true })
// 记录滚动条与网页顶部的距离
const scrollPosition = ref(0);
// 监听网页滚动条函数
const handleScroll = () => {
    // 读取 window 的 scrollY 属性  
    scrollPosition.value = window.scrollY;
};
onMounted(() => {
    // 在组件挂载时添加滚动事件监听  
    window.addEventListener('scroll', handleScroll);
})
onUnmounted(() => {
    // 在组件卸载时移除滚动事件监听  
    window.removeEventListener('scroll', handleScroll);
});

</script>
<template>
    <header class="header" @scroll="handleScroll" :class="{
        headerBg: scrollPosition > 60
    }">
        <nav>
            <div class="logo">
                <img src="https://wangyuanlin.site:8001/head/xinyang.png" alt="">
            </div>
            <ul>
                <li :class="{ activeLi: path === '/home' }"><router-link to="/home">首页</router-link></li>
                <li :class="{ activeLi: path === '/forum' }"><router-link to="/forum">论坛</router-link></li>
                <li :class="{ activeLi: path === '/news' }"><router-link to="/news">新闻说明</router-link></li>
                <li><router-link to="">待定</router-link></li>
            </ul>
            <!-- 发布文章 -->
            <section class="put-section">
                <router-link to="/PublishArticle">
                    <div id="container">
                        <button class="learn-more">
                            <span class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">发布文章</span>
                        </button>
                    </div>
                </router-link>
            </section>
        </nav>

    </header>
</template>
<style scoped lang='scss'>
// 滚动条超过指定区间给header添加背景颜色
.headerBg {
    background-color: hsla(0, 0%, 100%, .8) !important;
    box-shadow: 4px 10px 12px rgba(0, 0, 0, .1);
    height: 50px !important;
}

// 导航栏高亮样式
.activeLi::before {
    width: 100% !important;
}

.activeLi a {
    color: #1994fa;
}

.header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: transparent;
    z-index: 999;
    transition: all .5s;

    nav {
        width: 95%;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        ul {
            display: flex;
            justify-content: space-around;
            height: 100%;
            align-items: center;
            flex: .5;

            li {
                position: relative;
                cursor: pointer;
                margin: 0 6px;
                height: 100%;

                a {
                    padding: 0 2px;
                    width: 100%;
                    color: #3575a7;
                    transition: all .2s;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-bottom: 10px;
                    font-size: 18px;

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

                a:hover {
                    animation: flowCss 4s infinite linear;
                }
            }

            li:before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 2px;
                background-color: #0188fb;
                transition: all .4s;
            }

            li:hover:before {
                width: 100% !important;
            }
        }

        // logo
        .logo {
            width: 30px;
            flex: .023;

            img {
                width: 100%;
            }
        }
    }

    // 发布文章按钮
    @import url('https://fonts.googleapis.com/css?family=Mukta:700');
    $bg: #f3f8fa;
    $white: #fff;
    $black: #282936;

    .put-section {
        flex: .05;
    }

    @mixin transition($property: all, $duration: 0.45s, $ease: cubic-bezier(0.65, 0, .076, 1)) {
        transition: $property $duration $ease;
    }

    // 发布文章
    .put-section {
        flex: .05;
    }

    #container button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        outline: none;
        border: 0;
        vertical-align: middle;
        text-decoration: none;
        background: transparent;
        padding: 0;
        font-size: inherit;
        font-family: inherit;

        &.learn-more {
            width: 11rem;
            height: auto;

            .circle {
                @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                position: relative;
                display: block;
                margin: 0;
                width: 2.6rem;
                height: 2.6rem;
                background: $black;
                border-radius: 1.625rem;

                .icon {
                    @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background: $white;

                    &.arrow {
                        @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                        left: 0.58rem;
                        width: 1rem;
                        height: 0.125rem;
                        background: none;

                        &::before {
                            position: absolute;
                            content: '';
                            top: -0.25rem;
                            right: 0.0625rem;
                            width: 0.625rem;
                            height: 0.625rem;
                            border-top: 0.125rem solid #fff;
                            border-right: 0.125rem solid #fff;
                            transform: rotate(45deg);
                        }
                    }
                }
            }

            .button-text {
                @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0.6rem 0;
                margin: 0 0 0 1rem;
                color: $black;
                font-weight: 700;
                text-align: center;
                text-transform: uppercase;
            }
        }

        &:hover {
            .circle {
                width: 100%;

                .icon {
                    &.arrow {
                        background: $white;
                        transform: translate(1rem, 0);
                    }
                }
            }

            .button-text {
                color: $white;
            }
        }
    }
}
</style>