<template>
  <ion-content class="ion-padding">
    <div class="modal-header">
      <h2>Создать документ</h2>
      <ion-button fill="clear" @click="closeModal" round="shape">
        <ion-icon :icon="closeOutline"></ion-icon>
      </ion-button>
    </div>
    <ion-item>
      <ion-input v-model="title" placeholder="Название"></ion-input>
    </ion-item>
    <ion-item>
      <ion-textarea v-model="description" placeholder="Описание" style="height: 80px"></ion-textarea>
    </ion-item>
    <ion-button expand="full" @click="createDocument">Создать</ion-button>
  </ion-content>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { modalController, IonContent, IonItem, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';

const title = ref('');
const description = ref('');

const closeModal = () => {
  modalController.dismiss();
};

const createDocument = () => {
  modalController.dismiss({
    data: { title: title.value, description: description.value },
  });
};
</script>

<style scoped>
.modal-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
}

ion-button {
  margin-top: 16px;
}
</style>
