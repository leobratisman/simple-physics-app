import axios from 'axios';

import { IPost, IPostAdd, IPostUpdate } from '../interfaces/PostInterface';
import { apiUrl } from '../lib/axios';

export const postApi = {
    async getPosts() {
        return await axios.get<IPost[]>(`${apiUrl}/posts`);
    },

    async addPost(item: IPostAdd) {
        return await axios.post(`${apiUrl}/posts`, item);
    },

    async updatePost(item: IPostUpdate) {
        return await axios.patch(`${apiUrl}/posts/${item.id}`, item);
    },

    async deletePost(itemId: number) {
        await axios.delete(`${apiUrl}/posts/${itemId}`);
    },

    async uploadImage(itemId: number, image: string | Blob) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', image);

        xhr.open('POST', `${apiUrl}/posts/${itemId}/image/upload`)
        xhr.send(formData);
    },

    async deleteImage(itemId: number) {
        await axios.post(`${apiUrl}/posts/${itemId}/image/delete`);
    }
};
