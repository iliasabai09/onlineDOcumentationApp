<script setup lang="ts">
import {nextTick, onMounted, PropType, ref} from "vue";
import Prism from 'prismjs';
import {IonButton, IonIcon, IonTextarea} from "@ionic/vue";
import {addOutline, removeOutline} from "ionicons/icons";
import {IContentCode} from "@/modules/DetailModule/interfaces";

const props = defineProps({
  data: {
    type: Object as PropType<IContentCode>,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['editUpdate', 'removeContent']);

const modelData = ref<IContentCode>(props.data)
const selectedCode = ref(props.data.codes[0])

function selectCode(code: any) {
  selectedCode.value = code;
  nextTick(() => Prism.highlightAll())
}

const codeColors = {
  js: 'blue',
  html: '#ff7400',
  ts: 'blue'
}

const showPopover = ref(false)
const popoverEvent = ref(null)

function presentPopover(ev: any) {
  popoverEvent.value = ev
  showPopover.value = true
}

const removeItem = (code: string) => {
  const idx = modelData.value.codes.findIndex(c => c.code === code)
  modelData.value.codes.splice(idx, 1);
  if (!modelData.value.codes[0]) return emits('removeContent')
  selectedCode.value = modelData.value.codes[0]
};

function selectItem(item: string) {
  modelData.value.codes.push({
    lang: item,
    code: ''
  });
  showPopover.value = false
}


onMounted(() => {
  Prism.highlightAll()
})
</script>

<template>
  <div @click="emits('editUpdate')">
    <template v-if="!editMode">
      <div class="code-container">
        <div class="codeTabs">
          <div
              v-for="(code, i) in modelData.codes"
              :key="i"
              :style="{ color: codeColors[code.lang as keyof typeof codeColors] }"
              class="codeTab"
              @click="selectCode(code)"
          >{{ code.lang.toUpperCase() }}
          </div>
        </div>
        <pre><code :class="'language-' + selectedCode.lang">{{ selectedCode.code }}</code></pre>
      </div>
    </template>
    <template v-else>
      <div class="editMode flex gap-4">
        <ion-textarea
            style="height: fit-content"
            v-model="selectedCode.code"
            label="Terminal"
            label-placement="floating"
            fill="outline"
            placeholder="Enter terminal"
        ></ion-textarea>
        <div class="flex flex-col gap-1">
          <ion-button @click="presentPopover($event)" style="height: 54px; margin: 0">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
          <ion-popover :is-open="showPopover" :event="popoverEvent" @didDismiss="showPopover = false">
            <ion-list>
              <ion-item button v-for="item in Object.keys(codeColors)" :key="item" @click="selectItem(item)">
                {{ item }}
              </ion-item>
            </ion-list>
          </ion-popover>
          <ion-button color="danger" @click="removeItem(selectedCode.code)" style="height: 54px; margin: 0">
            <ion-icon :icon="removeOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.code-container {
  background-color: #282c34;
  color: white;
  border-radius: 8px;
  position: relative;
}

.codeTabs {
  display: flex;
  position: absolute;
  right: 8px;
  top: 8px;
  gap: 8px;
}

.codeTab {
  font-weight: bold;
  cursor: pointer;
}

pre {
  margin: 0;
  padding: 10px;
}
</style>
