import {
    IContentCode,
    IContentDescList,
    IContentDescription, IContentImage,
    IContentList,
    IContentTerminal
} from "@/modules/DetailModule/interfaces";

const description: IContentDescription = {
    type: 'description',
    text: 'Description'
}

const terminal: IContentTerminal = {
    type: "terminal",
    text: 'Terminal'
}

const code: IContentCode = {
    type: "code",
    codes: [{
        code: 'const value = 123',
        lang: 'js'
    }]
}

const list: IContentList = {
    type: "list",
    title: 'List title',
    items: [
        "List text"
    ]
}

const descList: IContentDescList = {
    type: "descList",
    list: [{
        title: 'Title',
        text: 'description'
    }]
}

const image: IContentImage = {
    type: 'image',
    data: '/images/default.png'
}

export const ADD_CONTENT_DATA = {
    description,
    terminal,
    list,
    descList,
    code,
    image,
}