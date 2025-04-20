<script setup lang="ts">
import {auth} from '@/firebase';
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton} from '@ionic/vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import {computed, ref} from 'vue';
import {useToast} from "@/composables/useToast";
import {useRouter} from "vue-router";

const router = useRouter();
const form = ref({
  email: '',
  password: '',
})

const isValidForm = computed(() => {
  return form.value.email && form.value.password;
})

const register = async () => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, form.value.email, form.value.password);
    await updateProfile(user, {
      displayName: 'user',
      photoURL: ''
    });
    await sendEmailVerification(user);
    useToast().info('Откройте почту и подтвердите email');
  } catch (err: any) {
    useToast().error(err.message);
  }
};

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
</script>

<template>
  <ion-page>
    <ion-content class="manContent">
      <div class="authLayout">
        <form class="form" @submit.prevent="login">
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

          <div class="formActions">
            <ion-button class="formActions-btn" color="secondary" @click="register" :disabled="!isValidForm">
              Register
            </ion-button>
            <ion-button
                type="submit"
                class="formActions-btn"
                color="tertiary"
                :disabled="!isValidForm"
            >
              Login
            </ion-button>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.authLayout {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images2.alphacoders.com/823/82372.jpg') center/cover no-repeat;
}

.formActions {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;

  &-btn {
    width: 100%;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 500px;
  width: 100%;
  padding: 16px;
  box-sizing: content-box;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>