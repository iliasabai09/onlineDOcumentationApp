<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ test }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer :name="test"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {onMounted, ref} from "vue";

const test = ref();
onMounted(() => {
  if (!test.value) {
    alert(1)
  }
  test.value = 'fdhfdfkdhsfhksdfkjd';
})
</script>
