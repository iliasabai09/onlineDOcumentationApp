import {ref} from "vue";
import CategoryService from '@/modules/CategoryModule/services/index'
import {useRouter} from "vue-router";

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

    return {
        selectCategory,
        toDetailPage,
        selectedCategory,
        loading,
        categories
    }
}