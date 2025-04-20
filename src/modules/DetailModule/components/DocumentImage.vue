<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonButton, IonIcon} from "@ionic/vue";
import {removeOutline} from "ionicons/icons";
import {IContentImage} from "@/modules/DetailModule/interfaces";

const props = defineProps({
  data: {
    type: Object as PropType<IContentImage>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const modelData = ref<IContentImage>(props.data)
const fileInput = ref<HTMLInputElement | null>(null);

const emits = defineEmits(['editUpdate', 'removeContent']);

const handleImageClick = () => {
  emits('editUpdate')
  if (props.editMode) {
    fileInput.value?.click();
  } else {
    emits('editUpdate');
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      modelData.value.data = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

</script>

<template>
  <div>
    <div class="image-wrapper" @click="handleImageClick">
      <img :src="modelData.data" alt="Uploaded image" class="preview-image"/>
      <input
          type="file"
          accept="image/*"
          ref="fileInput"
          style="display: none"
          @change="handleFileChange"
      />
      <ion-button
          v-if="editMode"
          class="removeBtn"
          color="danger"
          @click="emits('removeContent')"
      >
        <ion-icon :icon="removeOutline"></ion-icon>
      </ion-button>
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  display: inline-block;
  cursor: pointer;
  width: 100%;
  position: relative;

  .removeBtn {
    position: absolute;
    z-index: 10;
    top: 16px;
    right: 16px;
    height: 50px;
  }

  img {
    width: 100%;
  }
}

.preview-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>