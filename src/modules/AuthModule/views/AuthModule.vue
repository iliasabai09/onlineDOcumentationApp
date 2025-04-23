<script setup lang="ts">
import {auth} from '@/firebase';
import {IonPage, IonSegment, IonSegmentButton, IonLabel, IonContent} from '@ionic/vue';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import {useToast} from "@/composables/useToast";
import {useAuthModule} from "@/modules/AuthModule/composables";
import {FORM_CONTENT} from "@/modules/AuthModule/enums";

const {
  contents,
  activeTab
} = useAuthModule();

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
</script>

<template>
  <ion-page>
    <ion-content class="manContent">
      <div class="authLayout">
        <div class="form">
          <ion-segment v-model="activeTab" color="primary">
            <ion-segment-button :value="FORM_CONTENT.LOGIN">
              <ion-label style="color: #fff; font-weight: bold">Войти</ion-label>
            </ion-segment-button>
            <ion-segment-button :value="FORM_CONTENT.REGISTER">
              <ion-label style="color: #fff; font-weight: bold">Регистрация</ion-label>
            </ion-segment-button>
          </ion-segment>
          <component :is="contents[activeTab]"/>
        </div>
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
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('https://images2.alphacoders.com/823/82372.jpg') center/cover no-repeat;
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
  @media (max-width: 768px) {
    width: 90vw;
  }
}
</style>