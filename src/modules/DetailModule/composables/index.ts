import {onMounted, ref} from "vue";
import DocumentDetailService from '../services/index'
import {useRoute} from "vue-router";

export function useDocumentDetail() {
    const detail = ref<any>(null);
    const editMode = ref(false);
    const loading = ref(false);
    const route = useRoute();

    function _initDetail() {
        DocumentDetailService.getDocumentById(route.params.id as string)
            .then(res => {
                detail.value = res;
            })
    }

    function updateDoc() {
        loading.value = true;
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
        updateDoc,
    }
}