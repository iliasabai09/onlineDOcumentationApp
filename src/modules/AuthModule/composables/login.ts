import {computed, ref} from "vue";
import {ILoginForm} from "@/modules/AuthModule/interfaces/login.interface";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "@/firebase";
import {useToast} from "@/composables/useToast";
import {useRouter} from "vue-router";

export function useLogin() {
    const router = useRouter();
    const form = ref<ILoginForm>({
        email: '',
        password: ''
    })

    const isValidForm = computed(() => {
        return form.value.email && form.value.password
    })

    const login = async () => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, form.value.email, form.value.password);
            console.log(user)
            if (!user.emailVerified) {
                await signOut(auth); // Сразу выходим
                useToast().error('Пожалуйста, подтвердите ваш email перед входом');
                return;
            }
            useToast().success('Успешная авторизация');
            await router.push('/main')
        } catch (err: any) {
            useToast().error(err.message);
        }
    };

    return {
        form,
        isValidForm,
        login,
    }
}