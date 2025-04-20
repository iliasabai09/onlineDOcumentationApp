<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonIcon, IonInput} from "@ionic/vue";
import {removeOutline} from "ionicons/icons";
import {IContentDescription} from "@/modules/DetailModule/interfaces";

const props = defineProps({
  data: {
    type: Object as PropType<IContentDescription>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const modelData = ref<IContentDescription>(props.data)
const emits = defineEmits(['editUpdate', 'removeContent']);

</script>

<template>
  <div @click="emits('editUpdate')">
    <template v-if="!editMode">
      <p>{{ modelData.text }}</p>
    </template>
    <template v-else>
      <div class="editMode">
        <ion-input
            v-model="modelData.text"
            label="Description"
            label-placement="floating"
            fill="outline"
            placeholder="Enter description"
        ></ion-input>
        <ion-button color="danger" @click="emits('removeContent')" style="height: 56px; margin: 0">
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.editMode {
  display: flex;
  align-content: center;
  gap: 8px;
}
</style>