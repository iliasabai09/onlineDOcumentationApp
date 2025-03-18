<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons v-if="selectedCategory" slot="start">
          <ion-back-button default-href="/main/Documents" @click="selectedCategory = null"></ion-back-button>
        </ion-buttons>
        <div :class="{categoryTitle: selectedCategory}">
          <ion-avatar slot="start" v-if="selectedCategory" style="width: 32px; height: 32px">
            <img :src="selectedCategory.icon" alt="icon"/>
          </ion-avatar>
          <ion-title>{{
              selectedCategory ? `${selectedCategory.label} (${categories.length})` : 'Categories'
            }}
          </ion-title>
        </div>
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
      <div class="spinner-wrapper">
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
import {IonHeader, IonPage, IonButtons, IonBackButton, IonTitle, IonToolbar} from "@ionic/vue";
import {navigations} from "@/modules/CategoryModule/constants";
import {chevronForwardOutline, alertCircleOutline} from "ionicons/icons";
import {useCategoryModule} from "@/modules/CategoryModule/composables";
import EmptyState from "@/components/EmptyState.vue";

const {
  selectedCategory,
  loading,
  categories,
  toDetailPage,
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