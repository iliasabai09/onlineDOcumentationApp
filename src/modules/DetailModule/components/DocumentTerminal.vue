<script setup lang="ts">
import {PropType, ref} from "vue";
import {IonTextarea} from "@ionic/vue";

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
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editMode {
  border-radius: 4px;
  border: 2px solid #00a400;
  padding: 16px;
}

.terminal {
  background-color: #000;
  color: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  line-height: 1.3rem;
  max-width: 700px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
}

* :deep(.native-textarea) {
  height: 100px;
}


</style>