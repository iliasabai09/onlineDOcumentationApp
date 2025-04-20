<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonIcon, IonTextarea} from "@ionic/vue";
import {removeOutline} from "ionicons/icons";
import {IContentTerminal} from "@/modules/DetailModule/interfaces";

const props = defineProps({
  data: {
    type: Object as PropType<IContentTerminal>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['editUpdate', 'removeContent']);

const modelData = ref<IContentTerminal>(props.data)
</script>

<template>
  <div @click="emits('editUpdate')">
    <template v-if="!editMode">
      <pre class="terminal">{{ modelData.text }}</pre>
    </template>
    <template v-else>
      <div class="editMode">
        <ion-textarea
            v-model="modelData.text"
            label="Terminal"
            label-placement="floating"
            fill="outline"
            placeholder="Enter terminal"
        ></ion-textarea>
        <ion-button color="danger" @click="emits('removeContent')" style="min-height: 100%; margin: 0">
          <ion-icon :icon="removeOutline"></ion-icon>
        </ion-button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editMode {
  display: flex;
  gap: 8px;
}

.terminal {
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  padding: 12px 16px;
  width: 100%;
  line-height: 1.3rem;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
}

* :deep(.native-textarea) {
  height: 100px;
}


</style>