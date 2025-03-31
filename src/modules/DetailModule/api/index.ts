import {getFirebaseData, updateFirebaseData} from "@/composables/useFirestore";

export function getDocumentById(id: string) {
    return getFirebaseData('documents', {id})
        .then(res => {
            return res ? res[0] : null;
        })
}

export function updateDocumentById(id: string, data: any) {
    return updateFirebaseData('documents', id, data)
}