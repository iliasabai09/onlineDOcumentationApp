<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonInput, IonIcon, IonTextarea} from "@ionic/vue";
import {addOutline, removeOutline} from 'ionicons/icons';
import {IContentDescList} from "@/modules/DetailModule/interfaces";

const props = defineProps({
  data: {
    type: Object as PropType<IContentDescList>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['editUpdate', 'removeContent']);

const modelData = ref<IContentDescList>(props.data)

const addItem = () => {
  modelData.value.list.push({
    title: '',
    text: ''
  });
};

const removeItem = (index: number) => {
  modelData.value.list.splice(index, 1);
  if (modelData.value.list.length === 0) emits('removeContent');
};

</script>

<template>
  <div class="heading" @click="emits('editUpdate')">
    <template v-if="!editMode">
      <div class="descList">
        <div v-for="(desc, idx) in modelData.list" :key="idx">
          <h3>{{ idx + 1 }}. {{ desc.title }}</h3>
          <p>{{ desc.text }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="editMode">
        <div v-for="(desc, index) in modelData.list" :key="index" class="descGroupEdit">
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
        <ion-button shape="round" style="text-transform: capitalize" @click="addItem">
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