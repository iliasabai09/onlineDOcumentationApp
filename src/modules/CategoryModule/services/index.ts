import {getDocumentsByCategory, setDocument} from "@/modules/CategoryModule/api";
import {addIndexedDocument, getIndexedDocuments} from "@/shared/services/indexedDbService";

class CategoryService {

    async getCategoriesByType(categoryType: string) {
        const data = await getIndexedDocuments();
        const typedData = data.filter(d => d.category === categoryType);
        if (typedData.length) return typedData;
        return getDocumentsByCategory(categoryType)
            .then((docs: any) => {
                docs.forEach((doc: any) => {
                    addIndexedDocument(doc)
                })
                return docs;
            })
    }

    setDocument(data: any) {
        return setDocument(data).then(
            (res) => {
                addIndexedDocument(res)
            }
        )
    }
}

export default new CategoryService();