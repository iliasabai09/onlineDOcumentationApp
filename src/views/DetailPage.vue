<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/main/Documents"></ion-back-button>
        </ion-buttons>
        <ion-title size="large">Деталка</ion-title>
        <ion-buttons slot="end" style="gap: 8px">
          <ion-button @click="updateDoc()">
            <ion-icon slot="icon-only" :icon="saveOutline"></ion-icon>
          </ion-button>
          <ion-button @click="updateDoc()">
            <ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
          </ion-button>
          <ion-button @click="updateDoc()">
            <ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
          </ion-button>
          <ion-toggle abel-placement="start" color="secondary" v-model="editMode" :checked="editMode"
                      @ionChange="editSectionTitles = []; toggleEditMode()">
          </ion-toggle>
        </ion-buttons>
      </ion-toolbar>
      <div :style="{ opacity: loading ? '1' : '0' }">
        <ion-progress-bar type="indeterminate" color="success"></ion-progress-bar>
      </div>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <template v-if="detail">
        <DocumentHeadline :detail="detail" :globalEdit="editMode" :key="detail.updatedAt"/>
        <main>
          <section
              v-for="(section, idx) in detail.sections"
              :key="section as any"
          >
            <h2
                v-if="editId !== String(idx) || !editMode"
                @click="editId = String(idx)"
            >{{ section.title }}</h2>
            <div v-else class="mb-4 flex gap-2">
              <ion-input
                  v-model="section.title"
                  label="Section"
                  label-placement="floating"
                  fill="outline"
                  placeholder="Enter section"
              ></ion-input>
              <ion-button color="primary" @click="addContent()" style="height: 54px; margin: 0">
                <ion-icon :icon="addOutline"></ion-icon>
              </ion-button>
              <ion-button color="danger" @click="detail.sections.splice(idx, 1)" style="height: 54px; margin: 0">
                <ion-icon :icon="removeOutline"></ion-icon>
              </ion-button>
            </div>
            <div class="sectionContent">
              <template v-for="(content, j) in section.content" :key="content">
                <div v-if="content.type in sectionComponents">
                  <component
                      v-if="sectionComponents[content.type]"
                      :is="sectionComponents[content.type]"
                      :editMode="editId === `${idx}_${j}` && editMode"
                      :data="content"
                      :key="detail.updatedAt"
                      @editUpdate="editId = `${idx}_${j}`"
                      @removeContent="section.content.splice(j, 1)"
                  />
                </div>
              </template>
            </div>
          </section>
        </main>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonToggle,
  IonProgressBar,
  IonIcon,
  IonInput,
  IonButton
} from '@ionic/vue';
import {removeOutline, saveOutline, addOutline} from "ionicons/icons";
import {useDocumentDetail} from "@/modules/DetailModule/composables";
import DocumentHeadline from "@/modules/DetailModule/components/DocumentHeadline.vue";
import DocumentDescription from "@/modules/DetailModule/components/DocumentDescription.vue";
import DocumentTerminal from "@/modules/DetailModule/components/DocumentTerminal.vue";
import DocumentList from "@/modules/DetailModule/components/DocumentList.vue";
import DocumentDescList from "@/modules/DetailModule/components/DocumentDescList.vue";
import {type Component, ref} from "vue";
import DocumentCode from "@/modules/DetailModule/components/DocumentCode.vue";
import DocumentImage from "@/modules/DetailModule/components/DocumentImage.vue";

const {
  detail,
  editMode,
  loading,
  editId,
  updateDoc,
  toggleEditMode,
  addContent
} = useDocumentDetail();
const editSectionTitles = ref([]);

const sectionComponents: { [key: string]: Component } = {
  description: DocumentDescription,
  terminal: DocumentTerminal,
  list: DocumentList,
  descList: DocumentDescList,
  code: DocumentCode,
  image: DocumentImage
}

</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0;
  padding: 0;
}

.sectionContent {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
  margin-bottom: 24px;
}

</style>