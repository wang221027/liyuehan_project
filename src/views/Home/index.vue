<script lang="ts" setup>
import { useRouter } from 'vue-router';
const $router = useRouter()
const goPublishArticle = () => {
    $router.push("/PublishArticle")
}
</script>
<template>
    <section style="background-color: #f0ece6;display: flex;align-items: center;justify-content: center;height: 100vh;">
        <article>
            <h1>这是一个关于女性健康的网站</h1>
            <p>在这里，你可以尽情发挥你的文采，针对于女性健康</p>
        </article>
    </section>
    <main>
        <!-- 发布文章广告 -->
        <div class="Header">
            <div class="Header-background"></div>
            <div class="Header-content">
                <div class="Header-hero">
                    <h1>我们创造 <br /> 论坛博客</h1>
                    <p>任何问题都可以去论坛讨论</p>
                    <button class="Button" @click="goPublishArticle">发布文章</button>
                </div>
            </div>
        </div>
    </main>
    <!-- 底部 -->
    <Footer></Footer>
</template>
<style scoped lang='scss'>
article {
    background-color: #3575a7;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

@layer demo.support {
    h1 {
        font-size: 10vmin;
        line-height: 2.4;
    }


    p {
        font-family: "Dank Mono", ui-monospace, monospace;
    }

    html {
        block-size: 100%;
    }

    article {
        text-align: center;
    }
}

// 发布文章广告
@import url("https://fonts.googleapis.com/css?family=Varela+Round");

:root {
    --color-1: #21d4fd;
    --color-2: #b721ff;
    --color-3: #08aeea;
    --color-4: #2af598;
}

.Header {
    position: relative;
    height: 100vh;
    display: block;
    background-image: url(https://img1.baidu.com/it/u=1948451409,2073830859&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
}

.Header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0px 0px;
    transform: skewY(-10deg);
    overflow: hidden;
    z-index: -1;
}

.Header-background::before,
.Header-background::after {
    display: block;
    position: absolute;
    content: '';
    width: 80%;
    height: 33.333333333333336%;
    opacity: 0.3;
    filter: blur(15px);
}

.Header-background::before {
    background: var(--color-1);
    right: 0;
}

.Header-background::after {
    background: var(--color-2);
    bottom: 0;
}

.Header-content {
    text-align: center;
    padding: 4rem 4rem;
    margin: 0 auto;
}

@media (min-width: 58rem) {
    .Header-content {
        text-align: left;
        padding: 10rem 4rem;
        max-width: 54rem;
        display: flex;
        justify-content: space-between;
    }
}

.Header-hero h1,
.Header-hero p {
    color: #fff;
    text-shadow: 0 0.5rem 1rem rgba(50, 0, 100, 0.1);
}

.Header-hero h1 {
    margin: 0;
    font-size: 3rem;
}

.Header-hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.Header-visuals {
    position: relative;
    margin-top: 5rem;
    transform: rotate(-10deg);
}

@media (min-width: 58rem) {
    .Header-visuals {
        margin: 0;
        transform: translateY(-5rem) rotate(-10deg);
    }
}

.Button {
    padding: 1.5rem 2rem;
    border: 0;
    color: var(--color-3);
    font-size: 1.2rem;
    font-weight: bold;
    background: #fff;
    border-radius: 3px;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 0 1.75rem 2rem -0.4rem rgba(50, 0, 100, 0.15);
}

.Button:hover {
    color: var(--color-4);
    box-shadow: 0 1.75rem 3rem 0rem rgba(50, 0, 100, 0.1);
    transform: scale(1.05);
}

.Button:active {
    box-shadow: 0 1.75rem 2.5rem -0.2rem rgba(50, 0, 100, 0.125);
    transform: scale(1.025);
}

.Iphone {
    display: inline-block;
    background: #fff;
    padding: 4rem 0.6rem 0;
    border-radius: 2rem;
    box-shadow: -1rem 1.75rem 2rem -0.4rem rgba(50, 0, 100, 0.1), -0.2rem 0.2rem 0.5rem rgba(50, 0, 100, 0.05), inset 0.5rem -0.5rem 0.5rem -0.4rem rgba(50, 0, 100, 0.1);
    text-align: center;
}

.Iphone::before,
.Iphone::after {
    content: '';
    display: block;
}

.Iphone::before {
    background-color: var(--color-3);
    background-image: linear-gradient(0deg, var(--color-3) 0%, var(--color-4) 100%);
    width: 16rem;
    padding-top: 177.5%;
}

.Iphone::after {
    display: inline-block;
    margin: 0.6rem;
    padding: 1.4rem;
    border: 1px solid #f1f1f1;
    border-radius: 2rem;
    box-shadow: inset -0.05rem 0.05rem 0.5rem 0rem rgba(50, 0, 100, 0.05);
}
</style>