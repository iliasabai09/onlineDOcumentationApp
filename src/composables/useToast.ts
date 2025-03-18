import {toastController} from '@ionic/vue';
import {closeOutline, alertOutline, checkmarkDoneOutline} from 'ionicons/icons';

export function useToast() {
    const error = (message: string) => {
        toastController.create({
            message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
            icon: closeOutline
        }).then(toast => {
            toast.present();
        })
    }

    const warn = (message: string) => {
        toastController.create({
            message,
            duration: 2000,
            color: 'warning',
            position: 'bottom',
            icon: alertOutline
        }).then(toast => {
            toast.present().then();
        })
    }

    const success = (message: string) => {
        toastController.create({
            message,
            duration: 2000,
            color: 'success',
            position: 'bottom',
            icon: checkmarkDoneOutline
        }).then(toast => {
            toast.present().then();
        })
    }

    const info = (message: string) => {
        toastController.create({
            message,
            duration: 2000,
            color: 'tertiary',
            position: 'bottom',
            icon: alertOutline
        }).then(toast => {
            toast.present().then();
        })
    }

    return {error, success, info, warn};
}
