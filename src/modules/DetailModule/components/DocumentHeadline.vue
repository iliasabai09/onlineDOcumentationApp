<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonInput, IonButton, IonIcon} from "@ionic/vue";
import {IDocumentDetail} from "@/modules/DetailModule/interfaces";
import {addOutline} from "ionicons/icons";
const props = defineProps({
  detail: {
    type: Object as PropType<IDocumentDetail>,
    required: true,
  },
  globalEdit: {
    type: Boolean,
    default: false
  }
})

const data = ref<IDocumentDetail>(props.detail)
const editMode = ref(false)

function addSection() {
data.value.sections.push({
title: 'New section',
content: []
})
}

</script>

<template>
  <div class="heading" @click="globalEdit && (editMode = true)">
    <template v-if="!globalEdit || !editMode">
      <div>
        <h1>{{ data.title }}</h1>
        <p>{{ data.description }}</p>
      </div>
    </template>
    <template v-else>
      <div class="editMode">
        <div class="flex gap-2 align-center">
          <ion-input
              v-model="data.title"
              label="Title"
              label-placement="floating"
              fill="outline"
              placeholder="Enter title"
          ></ion-input>
          <ion-button color="primary" @click="addSection()" style="height: 54px; margin: 0">
                <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
        </div>
        <ion-input
            v-model="data.description"
            label="Description"
            label-placement="floating"
            fill="outline"
            placeholder="Enter description"
        ></ion-input>
      </div>
    </template>
  </div>
</template>

<style scoped>
.heading {
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid gray;

  .editMode {
    border: 1px solid gray;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  h1 {
    margin-bottom: 16px;
  }

  p {
    color: #575757;
    margin: 0;
  }
}
</style>
