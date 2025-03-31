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
          <ion-toggle abel-placement="start" color="secondary" v-model="editMode" :checked="editMode"
                      @ionChange="editSectionTitles = []">Edit mode
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
          <section v-for="(section, idx) in detail.sections" :key="section">
            <h2
                v-if="!editSectionTitles.includes(idx as never) || !editMode"
                @click="editMode && editSectionTitles.push(idx as never)"
            >{{ section.title }}</h2>
            <div v-else class="mb-4 flex gap-4">
              <ion-input
                  v-model="section.title"
                  label="Section"
                  label-placement="floating"
                  fill="outline"
                  placeholder="Enter section"
              ></ion-input>
              <ion-button color="danger" @click="detail.sections.splice(idx, 1)" style="height: 54px; margin: 0">
                <ion-icon :icon="removeOutline"></ion-icon>
              </ion-button>
            </div>
            <div class="sectionContent">
              <template v-for="content in section.content" :key="content">
                <div v-if="content.type in sectionComponents">
                  <component v-if="sectionComponents[content.type]" :is="sectionComponents[content.type]" :globalEdit="editMode" :data="content"
                             :key="detail.updatedAt"/>
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
  IonIcon, IonInput, IonButton
} from '@ionic/vue';
import {removeOutline, saveOutline} from "ionicons/icons";
import {useDocumentDetail} from "@/modules/DetailModule/composables";
import DocumentHeadline from "@/modules/DetailModule/components/DocumentHeadline.vue";
import DocumentDescription from "@/modules/DetailModule/components/DocumentDescription.vue";
import DocumentTerminal from "@/modules/DetailModule/components/DocumentTerminal.vue";
import DocumentList from "@/modules/DetailModule/components/DocumentList.vue";
import DocumentDescList from "@/modules/DetailModule/components/DocumentDescList.vue";
import {Component, ref} from "vue";

const {detail, editMode, loading, updateDoc} = useDocumentDetail();
const editSectionTitles = ref([]);

const sectionComponents: {[key:string]:Component} = {
  description: DocumentDescription,
  terminal: DocumentTerminal,
  list: DocumentList,
  descList: DocumentDescList,
}

</script>

<style scoped>
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