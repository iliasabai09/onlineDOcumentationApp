<template>
  <ion-page>
    <ion-tabs class="tabs">
      <ion-router-outlet :stackedPages="false"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Documents" href="/main/Documents">
          <ion-icon aria-hidden="true" :icon="folderOpenOutline"/>
          <ion-label>Documents</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/main/Answer">
          <ion-icon aria-hidden="true" :icon="newspaperOutline"/>
          <ion-label>Answer</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/main/Bookmarks">
          <ion-icon aria-hidden="true" :icon="bookmarkOutline"/>
          <ion-label>Bookmarks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/main/Profile">
          <ion-icon aria-hidden="true" :icon="personOutline"/>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';
import {
  folderOpenOutline,
  newspaperOutline,
  bookmarkOutline,
  personOutline
} from 'ionicons/icons';
import {auth} from '@/firebase';
import {onMounted, ref} from "vue";

const user = ref<any>(null);

// async function logout() {
//   try {
//     await signOut(auth);
//     useToast().success('User signed out');
//     await router.push('/auth');
//   } catch (error) {
//     useToast().error('Error when user signed out');
//   }
// }

onMounted(() => {
  user.value = auth.currentUser;
})
</script>

<style scoped>
.small-avatar {
  width: 28px;
  height: 28px;
}

.small-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>