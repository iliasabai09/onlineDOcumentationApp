<template>
  <ion-page class="page">
    <ion-tabs class="tabs container">
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
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page {
  //background-image: url('https://img.freepik.com/free-vector/christmas-snowy-background_1048-9078.jpg');
  //background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRztE1-AC-bEk0C4KAE0XdmpD6hi4F67LFKQ&s');
  background-image: url('https://wallpapers.com/images/hd/modern-city-at-night-blue-lights-as7hx3qru9ndrqb3.jpg');
  background-size: cover;
}

.small-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>