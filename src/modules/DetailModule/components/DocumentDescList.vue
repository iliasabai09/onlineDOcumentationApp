<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonInput, IonIcon, IonTextarea} from "@ionic/vue";
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
  modelData.value.list.push({
    title: '',
    text: ''
  });
};

const removeItem = (index: number) => {
  modelData.value.items.splice(index, 1);
};
</script>

<template>
  <div class="heading" @click="globalEdit && (editMode = true)">
    <template v-if="!globalEdit || !editMode">
      <div class="descList">
        <div v-for="(desc, idx) in modelData.list" :key="desc">
          <h3>{{ idx + 1 }}. {{ desc.title }}</h3>
          <p>{{ desc.text }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="editMode">
        <div v-for="(desc, index) in modelData.list" :key="desc" class="descGroupEdit">
          <div style="display: flex; gap:12px">
            <ion-input
                v-model="desc.title"
                label="Title"
                label-placement="floating"
                fill="outline"
                placeholder="Enter title"
            ></ion-input>
            <ion-button color="danger" @click="removeItem(index)" style="height: 54px; margin: 0">
              <ion-icon :icon="removeOutline"></ion-icon>
            </ion-button>
          </div>
          <ion-textarea
              v-model="desc.text"
              label="Description"
              label-placement="floating"
              fill="outline"
              placeholder="Enter description"
          ></ion-textarea>
        </div>
        <ion-button shape="round" style="text-transform: capitalize" size="small" @click="addItem">
          Добавить
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editMode {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  border: 2px solid #00a400;
  padding: 16px;
}

.descGroupEdit {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.descList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

h3 {
  margin-bottom: 4px;
}

p {
  font-size: 16px;
  font-style: italic;
  line-height: 1.5rem;
  color: #555555;
}
</style>