import {getDocumentById, updateDocumentById} from "@/modules/DetailModule/api";
import {getIndexedDocuments, putIndexedDocument} from "@/shared/services/indexedDbService";

class DocumentDetailService {
    async getDocumentById(id: string) {
        const data = await getIndexedDocuments();
        const typedData = data.filter(d => d.id === id);
        if (typedData.length) return typedData[0];
        return getDocumentById(id)
    }

    async updateDocById(id: string, data: any) {
        const serializedDAta = JSON.parse(JSON.stringify(data));
        console.log('updateDAta', serializedDAta)
        return updateDocumentById(id, serializedDAta)
            .then(() => {
                putIndexedDocument(serializedDAta)
            })
    }
}

export default new DocumentDetailService()