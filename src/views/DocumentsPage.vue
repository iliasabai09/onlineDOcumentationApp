<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons slot="start">
          <ion-back-button v-if="selectedCategory" default-href="/main/Documents"
                           @click="selectedCategory = null"></ion-back-button>
          <div :class="{categoryTitle: selectedCategory}">
            <ion-avatar slot="start" v-if="selectedCategory" style="width: 32px; height: 32px">
              <img :src="selectedCategory.icon" alt="icon"/>
            </ion-avatar>
            <ion-title>{{
                selectedCategory ? `${selectedCategory.label} (${categories.length})` : 'Categories'
              }}
            </ion-title>
          </div>
        </ion-buttons>
        <ion-buttons v-if="selectedCategory" slot="end">
          <ion-button @click="presentPopover($event)" shape="round">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
          <ion-popover :is-open="popoverOpen" :event="popoverEvent" @didDismiss="closePopover" size="large">
            <ion-item button @click="createCategory()">
              <ion-icon :icon="createOutline" slot="start" color="primary"></ion-icon>
              <ion-label color="primary">Добавить</ion-label>
            </ion-item>
          </ion-popover>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="!selectedCategory">
        <ion-item
            v-for="item in navigations"
            :key="item.label"
            :button="true"
            :detail="false"
            @click="selectCategory(item)"
        >
          <ion-avatar slot="start">
            <img :src="item.icon"/>
          </ion-avatar>
          <ion-label>{{ item.label }}</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"/>
        </ion-item>
      </ion-list>

      <ion-list v-else>
        <ion-item
            v-for="item in categories"
            :key="item.id"
            :button="true"
            :detail="false"
            @click="toDetailPage(item.id)"
        >
          <ion-label>{{ item.title }}</ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"/>
        </ion-item>
      </ion-list>
      <div class="spinner-wrapper" v-if="selectedCategory">
        <ion-spinner v-if="loading && selectedCategory" name="crescent" color="primary"
                     class="custom-spinner"></ion-spinner>
        <EmptyState
            v-if="!loading && selectedCategory && !categories.length"
            title="Nothing here yet!"
            subtitle="Please check back later."
            image="/images/empty_state.avif"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonAvatar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonIcon,
  IonSpinner,
  IonButton,
  IonPopover,
  IonLabel
} from "@ionic/vue";
import {navigations} from "@/modules/CategoryModule/constants";
import {chevronForwardOutline, ellipsisVertical, createOutline} from "ionicons/icons";
import {useCategoryModule} from "@/modules/CategoryModule/composables";
import EmptyState from "@/components/EmptyState.vue";
import {ref} from "vue";

const popoverOpen = ref(false);
const popoverEvent = ref(null);

const presentPopover = (event:any) => {
  popoverEvent.value = event;
  popoverOpen.value = true;
};

const closePopover = () => {
  popoverOpen.value = false;
  popoverEvent.value = null; // Сбрасываем event при закрытии
};

const {
  selectedCategory,
  loading,
  categories,
  toDetailPage,
  createCategory,
  selectCategory
} = useCategoryModule();
</script>

<style scoped>
.categoryTitle {
  margin-left: 16px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-left: 0;
  }
}

.toolbar {
  padding-right: 16px;
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    padding-right: 8px;
  }
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.custom-spinner {
  width: 64px;
  height: 64px;
  --stroke-width: 8px;
  display: block;
  margin: 50px auto;
}

ion-title {
  padding-left: 8px;
}
</style>