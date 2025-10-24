<template>
    <div class="member-info-block">
        <v-img class="member-img" :src="S3_URL + member.imageId + S3_ITEM_TYPE" alt="Фото участника"></v-img>
        <div class="member-info-content">
            <h1>{{ member.name }}</h1>
            <h3 style="margin-bottom: 10px;">{{ member.role }}</h3>
            <p>{{ member.classYear }}</p>
            <p>{{ member.faculty }}</p>
            <p>{{ member.major }}</p>
            <p>{{ member.majorCode }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { IMember } from '../interfaces/MemberInterface';
    import { S3_URL, S3_ITEM_TYPE } from "../lib/axios";
    import { useBaseStore } from '../store/modules/base';

    const baseStore = useBaseStore();

    const props = defineProps<{
        member: IMember
    }>()

</script>

<style scoped>

    @keyframes appear{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    @keyframes appear-info{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
            transform: translateX(0);
        }
    }

    .member-info-block {
        display: flex;
        align-items: center;
        padding: 0 250px;
        font-size: 20px;
        gap: 40px;
    }

    .member-img {
        opacity: 0;
        height: calc(100vh - 120px);
        animation: appear 1s 1;
        animation-fill-mode: forwards;
    }

    .member-info-content {
        opacity: 0;
        animation: appear 1s 1;
        animation-fill-mode: forwards;
    }

    @media (max-width: 1400px) {
        .member-info-block {
            padding: 0 150px;
        }
    }

    @media (max-width: 1200px) {
        .member-info-block {
            padding: 0 120px;
            font-size: 18px;
        }
    }

    @media (max-width: 1024px) {
        .member-info-content {
            max-width: 300px;
            font-size: 16px;
        }

        .member-info-block {
            flex-direction: column;
            padding: 0 50px;
        }
        .member-img {
            height: 45vh;
            width: 500px;
        }
    }

    @media (max-height: 800px) {
        .member-info-content {
            max-width: 300px;
            font-size: 12px;
        }

        .member-info-block {
            flex-direction: column;
            padding: 0 30px;
        }
        .member-img {
            height: 40vh;
            width: 500px;
        }
    }

</style>