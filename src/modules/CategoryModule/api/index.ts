import {getFirebaseData} from "@/composables/useFirestore";

export function getDocumentsByCategory(type: string) {
    return getFirebaseData('documents', {category: type})
        .then(res => {
            console.log(type)
            console.log(res)
            return res;
        })
}