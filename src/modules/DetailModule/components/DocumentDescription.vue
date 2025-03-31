<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonInput} from "@ionic/vue";

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

</script>

<template>
  <div @click="globalEdit && (editMode = true)">
    <template v-if="!globalEdit || !editMode">
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
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>