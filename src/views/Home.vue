<template>
    <span>
        <HomeIntroduction></HomeIntroduction>
        <HomeInformations></HomeInformations>
    </span>
</template>

<script>
import HomeIntroduction from '@/components/HomeIntroduction';
import HomeInformations from '@/components/HomeInformations';

export default {
    name: 'home',
    components: {
        HomeIntroduction,
        HomeInformations
    }
};
</script>
