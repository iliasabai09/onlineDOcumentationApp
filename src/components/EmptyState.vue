<template>
    <div class="empty-state-wrapper">
      <img
          :src="image"
          alt="Empty"
          class="empty-state-image"
          v-if="image"
      />
      <h2 class="empty-state-title">{{ title }}</h2>
      <p class="empty-state-subtitle">{{ subtitle }}</p>
      <ion-button v-if="buttonText" @click="$emit('action')">
        {{ buttonText }}
      </ion-button>
    </div>
</template>

<script setup lang="ts">
import { IonContent, IonButton } from "@ionic/vue";

defineProps<{
  title: string;
  subtitle: string;
  image?: string;
  buttonText?: string;
}>();

defineEmits(["action"]);
</script>

<style scoped>
.empty-state-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.empty-state-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.empty-state-image {
  width: 300px;
  border-radius: 16px;
  object-fit: cover;
}

.empty-state-title {
  font-size: 20px;
  margin-bottom: 8px;
}

.empty-state-subtitle {
  color: var(--ion-color-medium);
  margin-bottom: 16px;
}
</style>
