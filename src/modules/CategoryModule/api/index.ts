import {addFirebaseData, getFirebaseData} from "@/composables/useFirestore";

export function getDocumentsByCategory(type: string) {
    return getFirebaseData('documents', {category: type})
        .then(res => {
            return res;
        })
}


export function setDocument(data: any) {
    return addFirebaseData('documents', data)
        .then(res => {
            return res;
        })
}