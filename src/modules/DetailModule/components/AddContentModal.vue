<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon, modalController
} from "@ionic/vue";
import {closeOutline} from 'ionicons/icons';

const handleSelect = (value: string) => {
  modalController.dismiss({
    data: { value },
  });
};

const list = [
  'description',
  'terminal',
  'list',
  'descList',
  'code',
  'image',
]
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Выберите элемент</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modalController.dismiss()">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-item
          v-for="(item, index) in list"
          :key="index"
          button
          @click="handleSelect(item)"
      >
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
<style scoped lang="scss">

</style>