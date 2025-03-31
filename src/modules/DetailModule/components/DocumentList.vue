<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonInput, IonIcon} from "@ionic/vue";
import {addOutline, removeOutline} from 'ionicons/icons';

const props = defineProps({
  data: {
    type: Object as PropType<any>
  },
  globalEdit: {
    type: Boolean,
    default: false
  }
})

const modelData = ref(props.data)
const editMode = ref(false)

const addItem = () => {
  modelData.value.items.push('');
};

const removeItem = (index: number) => {
  modelData.value.items.splice(index, 1);
};
</script>

<template>
  <div @click="globalEdit && (editMode = true)">
    <template v-if="!globalEdit || !editMode">
      <div class="numbered-list-container">
        <h4>{{ modelData.title }}</h4>
        <div class="numbered-list">
          <div v-for="(item, index) in modelData.items" :key="index">
            <span class="list-number">{{ index + 1 }}.</span> {{ item }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="editMode">
        <div class="input-container">
          <ion-input
              v-model="modelData.title"
              label="Title"
              label-placement="floating"
              fill="outline"
              placeholder="Enter title"
          ></ion-input>
          <ion-button @click="addItem" style="height: 54px; margin: 0">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
        </div>

        <div class="input-container" v-for="(item, index) in modelData.items" :key="index">
          <ion-input
              v-model="modelData.items[index]"
              label="Item"
              label-placement="floating"
              fill="outline"
              placeholder="Enter item"
          ></ion-input>
          <ion-button color="danger" @click="removeItem(index)" style="height: 54px; margin: 0">
            <ion-icon :icon="removeOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editMode {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 16px;
  border: 2px solid #00a400;
  padding: 16px;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.numbered-list-container {
  border-radius: 10px;
  width: 100%;
  max-width: 700px;
  margin-top: 8px;
}

h4 {
  color: #333;
  margin-bottom: 12px;
}

.numbered-list {
  padding-left: 8px;
  list-style-type: decimal;
  font-size: 1em;
  line-height: 1.3;
}

.numbered-list div {
  margin-bottom: 10px;
  color: #555;
}

.list-number {
  font-weight: bold;
  color: #007BFF;
  margin-right: 8px;
}
</style>