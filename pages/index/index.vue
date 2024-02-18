<template>
    <view class="content" v-html="html"></view>
</template>

<script>
import md from './test.md';
import md2html from '@/utils/md2html.js';
export default {
    data() {
        return {
            html: 'Hello'
        };
    },
    onLoad() {
        uni.request({
            url: md
        }).then((v) => {
            console.log(md);
            const h = md2html(v.data);
            this.html = h;
        });
    },
    methods: {}
};
</script>

<style></style>
