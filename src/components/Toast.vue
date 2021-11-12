<template>
    <!-- Toast弹框组件的开发 -->
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    props: ['message']
}
export const useToastEffect = () => {
    const toastData = reactive({
        showToast: false,
        toastMessage: ''
    })
    //统一toast弹框
    const showFilter = (message) => {
        toastData.showToast = true
        toastData.toastMessage = message
        setTimeout(() => {
            toastData.showToast = false
            toastData.toastMessage = ''
        }, 2000);//2秒后消失
    }

    const { showToast, toastMessage } = toRefs(toastData);

    return { showToast, toastMessage, showFilter }
}
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0, .35);
    padding: .1rem;
    border-radius: .05rem;
    color: #fff;
}
</style>