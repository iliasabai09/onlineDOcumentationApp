import {ref} from "vue";
import CategoryService from '@/modules/CategoryModule/services/index'
import {useRouter} from "vue-router";
import {modalController} from "@ionic/vue";
import CreateCategoryModal from "@/modules/CategoryModule/components/CreateCategoryModal.vue";

export function useCategoryModule() {
    const categories = ref<any>([]);
    const selectedCategory = ref<any>(null);
    const loading = ref<boolean>(false);
    const router = useRouter();

    function _getCategoryDocs(categoryType: string) {
        loading.value = true;
        CategoryService.getCategoriesByType(categoryType)
            .then((docs: any) => {
                categories.value = docs;
            })
            .finally(() => loading.value = false);
    }

    function selectCategory(cat: any) {
        categories.value = []
        selectedCategory.value = cat;
        _getCategoryDocs(cat.data)
    }

    function toDetailPage(id: string) {
        router.push(`/main/detail/${id}`).then();
    }

    function _setCategory({description, title}: any) {
        loading.value = true;
        const data = {
            category: selectedCategory.value.data,
            sections: [],
            description,
            title,
            createdAt: new Date().toLocaleTimeString(),
            updatedAt: new Date().toLocaleTimeString(),
        }
        CategoryService.setDocument(data)
            .then(() => {
                categories.value.unshift(data);
                loading.value = false;
            })
    }

    const createCategory = async () => {
        const modal = await modalController.create({
            component: CreateCategoryModal,
            cssClass: 'createCategoryModal'
        });
        modal.present();
        const {data} = await modal.onWillDismiss();
        if (data) {
            _setCategory(data.data)
        }
    };

    return {
        selectCategory,
        toDetailPage,
        createCategory,
        selectedCategory,
        loading,
        categories
    }
}