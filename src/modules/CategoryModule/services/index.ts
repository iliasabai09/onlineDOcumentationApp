import {getDocumentsByCategory} from "@/modules/CategoryModule/api";

class CategoryService {

    getCategoriesByType(categoryType: string) {
        return getDocumentsByCategory(categoryType);
    }
}

export default new CategoryService();