// import {nextTick, onMounted, ref} from "vue";
// import Prism from 'prismjs';
//
// export function useCode(data) {
//     const modelData = ref(data)
//     const editMode = ref(false)
//     const selectedCode = ref(data.codes[0])
//
//     function selectCode(code: any) {
//         selectedCode.value = code;
//         nextTick(() => Prism.highlightAll())
//     }
//
//     onMounted(() => {
//         Prism.highlightAll()
//     })
//
//     return {
//         modelData,
//
//     }
// }