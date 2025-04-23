import AuthLogin from "@/modules/AuthModule/components/AuthLogin.vue";
import AuthRegister from "@/modules/AuthModule/components/AuthRegister.vue";
import {Component, ref} from "vue";
import {FORM_CONTENT} from "@/modules/AuthModule/enums";

export function useAuthModule() {
    const activeTab = ref<FORM_CONTENT>(FORM_CONTENT.LOGIN)

    const contents: { [key in FORM_CONTENT]: Component } = {
        LOGIN: AuthLogin,
        REGISTER: AuthRegister
    }

    return {
        contents,
        activeTab
    }
}