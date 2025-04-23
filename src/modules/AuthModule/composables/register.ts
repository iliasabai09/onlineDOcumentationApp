import {computed, ref} from "vue";
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {auth} from "@/firebase";
import {useToast} from "@/composables/useToast";
import {IRegisterForm} from "@/modules/AuthModule/interfaces/register.interface";
import {toBase64} from "@/shared/utils/toBase64";
import {validateForm} from "@/shared/utils/validObjKeys";

export function useRegister() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const form = ref<IRegisterForm>({
        email: '',
        password: '',
        displayName: '',
        photoURL: '',
    })

    const isValidForm = computed(() => {
        return validateForm(form.value, ['photoURL'])
    })

    const triggerFileInput = () => {
        fileInput.value?.click()
    }

    const onFileChange = async (event: Event) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file) {
            form.value.photoURL = await toBase64(file)
        }
    }
    const register = async () => {
        try {
            const F = form.value;
            const {user} = await createUserWithEmailAndPassword(auth, F.email, F.password);
            await updateProfile(user, {
                displayName: F.displayName,
                photoURL: F.photoURL,
            });
            await sendEmailVerification(user);
            useToast().info('Откройте почту и подтвердите email');
        } catch (err: any) {
            useToast().error(err.message);
        }
    };

    return {
        form,
        isValidForm,
        fileInput,
        triggerFileInput,
        onFileChange,
        register,
    }
}