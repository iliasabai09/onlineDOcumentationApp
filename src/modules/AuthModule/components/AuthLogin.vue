<script setup lang="ts">
import {IonButton, IonInput} from "@ionic/vue";
import {useLogin} from "@/modules/AuthModule/composables/login";

const {
  form,
  isValidForm,
  login
} = useLogin();
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="login">
    <ion-input
        v-model="form.email"
        label="Email"
        label-placement="floating"
        fill="outline"
        placeholder="Enter email"
        type="email"
    ></ion-input>
    <ion-input
        v-model="form.password"
        label="Password"
        label-placement="floating"
        fill="outline"
        placeholder="Enter password"
    ></ion-input>
    <ion-button
        type="submit"
        class="formActions-btn"
        color="tertiary"
        :disabled="!isValidForm"
    >
      Login
    </ion-button>
  </form>
</template>

<style scoped lang="scss">
</style>