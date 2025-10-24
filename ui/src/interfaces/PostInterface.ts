export interface IPost {
    id: number;
    description: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    title: string | null;
    imageId: string | null;
}

export interface IPostAdd {
    description: string | null;
    title: string | null;
}

export interface IPostUpdate {
    id: number;
    description: string | null;
    title: string | null;
}