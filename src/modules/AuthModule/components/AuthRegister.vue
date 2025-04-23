<script setup lang="ts">
import {IonAvatar, IonButton, IonInput} from "@ionic/vue";
import {useRegister} from "@/modules/AuthModule/composables/register";

const {
  form, isValidForm, fileInput, register, triggerFileInput, onFileChange
} = useRegister();
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="register">
    <div class="flex gap-4">
      <ion-input
          v-model="form.displayName"
          label="*Username"
          label-placement="floating"
          fill="outline"
          placeholder="Enter username"
          type="text"
      ></ion-input>
      <div class="avatar-picker" @click="triggerFileInput">
        <ion-avatar class="avatar">
          <img :src="form.photoURL || '/images/avatar_empty.png'" alt="Avatar"/>
        </ion-avatar>
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
        />
      </div>
    </div>
    <ion-input
        v-model="form.email"
        label="*Email"
        label-placement="floating"
        fill="outline"
        placeholder="Enter email"
        type="email"
    ></ion-input>
    <ion-input
        v-model="form.password"
        label="*Password"
        label-placement="floating"
        fill="outline"
        placeholder="Enter password"
        type="password"
    ></ion-input>
    <ion-button
        type="submit"
        class="formActions-btn"
        color="tertiary"
        :disabled="!isValidForm"
    >
      REGISTER
    </ion-button>
  </form>
</template>


<style scoped>
.avatar-picker {
  width: 56px;
  height: 56px;
  margin: auto;
  cursor: pointer;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--ion-color-medium);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hidden {
  display: none;
}
</style>