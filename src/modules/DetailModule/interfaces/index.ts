export interface IContentDescription {
    readonly type: 'description';
    readonly text: string;
}

export interface IContentTerminal {
    readonly type: "terminal";
    readonly text: string;
}

export interface IContentCode {
    readonly type: "code";
    readonly codes: {
        code: string;
        lang: string;
    }[];
}

export interface IContentDescList {
    readonly type: "descList";
    readonly list: {
        readonly text: string;
        readonly title: string;
    }[];
}

export interface IContentList {
    readonly type: "list";
    readonly items: string[];
    title: string;
}

export interface IContentImage {
    readonly type: "image";
    data: string;
}

export type IContent =
    IContentDescription
    | IContentCode
    | IContentDescList
    | IContentTerminal
    | IContentList
    | IContentImage;

export interface ISection {
    readonly title: string;
    readonly content: IContent[];
}

export interface IDocumentDetail {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly sections: ISection[];
    readonly createdAt: string;
    updatedAt: string;
}