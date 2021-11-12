<template>
    <div class="wrapper">
        <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入用户名/手机号" v-model="username"/>
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入密码" type="password" v-model="password"/>
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登录</div>
        <div class="wrapper__login-link" @click="handleRegister">立即注册</div>

        <!-- 弹框组件 -->
        <Toast v-if="showToast" :message="toastMessage" />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showFilter) => {
    const router = useRouter();
    const data = reactive({ username: '', password: ''})
    const handleLogin = async () => {
        try {
            const { username, password } = data;
            if(!username) { return showFilter('用户名不能为空') }
            if(!password) { return showFilter('密码不能为空') }

            const result = await post('/api/user/login', {
                username,
                password
            })
            //console.log(result)
            if(result.errno == 0 ) {
                localStorage.isLogin = true;
                router.push({name: 'Home'});//跳转到首页//console.log('登录成功')
            } else {
                showFilter('登录失败')
            }
        } catch(e) {
            showFilter('请求地址错误 失败~')
        }
    }
    const { username, password } = toRefs(data);

    return { username, password, handleLogin }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const router = useRouter();

    const { showToast, toastMessage, showFilter } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showFilter);

    const handleRegister = () => {
        router.push({name: 'Register'})
    }

    return {
        handleLogin,
        handleRegister,
        username,
        password,
        showToast, 
        toastMessage,
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);// 这样就居中了
    &__img {
        display: block;
        margin: 0 auto .4rem auto;
        width: .66rem;
        height: .66rem;
    }
    &__input {
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        background: #F9F9F9;
        border: .01rem solid rgba(0,0,0,0.10);
        border-radius: .06rem;
        padding: 0 .16rem;
        &__content {
            width: 100%;
            border: none;
            outline: none;
            margin-top: .12rem;// 修改手机端光标太大
            line-height: .22rem;// 修改手机端光标太大
            background: none;
            font-size: .16rem;
            color: rgba(0,0,0,0.50);
            &::placeholder {
                color: rgba(0,0,0,0.50);
            }
        }
    }
    &__login-button {
        margin: .32rem .4rem .16rem .4rem;
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        height: .48rem;
        color: #fff;
        font-size: .16rem;
        text-align: center;
        line-height: .48rem;
    }
    &__login-link {
        text-align: center;
       font-size: .14rem;
        color: rgba(0,0,0,0.50);
    }
}
</style>