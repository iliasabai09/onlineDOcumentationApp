import {onMounted, ref} from "vue";
import DocumentDetailService from '../services/index'
import {useRoute} from "vue-router";
import {IDocumentDetail} from "@/modules/DetailModule/interfaces";
import {modalController} from "@ionic/vue";
import AddContentModal from "@/modules/DetailModule/components/AddContentModal.vue";
import {ADD_CONTENT_DATA} from "@/modules/DetailModule/constants";

export function useDocumentDetail() {
    const detail = ref<IDocumentDetail>();
    const editMode = ref(false);
    const loading = ref(false);
    const route = useRoute();
    const editId = ref<string | number>('')

    function _initDetail() {
        DocumentDetailService.getDocumentById(route.params.id as string)
            .then(res => {
                console.log('data', res)
                detail.value = res;
            })
    }

    function toggleEditMode() {
        editId.value = '';
    }

    const addContent = async () => {
        const modal = await modalController.create({
            component: AddContentModal,
            cssClass: 'addContentModal'
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data && data.data.value && detail.value) {
            const addData = ADD_CONTENT_DATA[data.data.value as keyof typeof ADD_CONTENT_DATA]
            const idx = editId.value as number;
            detail.value.sections[idx].content.push({...addData})
        }
    };

    function updateDoc() {
        loading.value = true;
        if (!detail.value) return;
        detail.value['updatedAt'] = `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`
        DocumentDetailService.updateDocById(route.params.id as string, detail.value)
            .then(() => {
                editMode.value = false;
                loading.value = false;
            })
    }

    onMounted(() => {
        _initDetail();
    })
    return {
        detail,
        editMode,
        loading,
        editId,
        addContent,
        updateDoc,
        toggleEditMode,
    }
}
