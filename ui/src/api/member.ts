import axios from 'axios';

import { IMember, IMemberAdd, IMemberUpdate } from '../interfaces/MemberInterface';
import { apiUrl } from '../lib/axios';

export const memberApi = {
    async getMembers() {
        return await axios.get<IMember[]>(`${apiUrl}/members`);
    },

    async addMember(item: IMemberAdd) {
        return await axios.post(`${apiUrl}/members`, item);
    },

    async updateMember(item: IMemberUpdate) {
        return await axios.patch(`${apiUrl}/members/${item.id}`, item);
    },

    async deleteMember(itemId: number) {
        await axios.delete(`${apiUrl}/members/${itemId}`);
    },

    async uploadImage(itemId: number, image: string | Blob) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', image);

        xhr.open('POST', `${apiUrl}/members/${itemId}/image/upload`)
        xhr.send(formData);
    },

    async deleteImage(itemId: number) {
        await axios.post(`${apiUrl}/members/${itemId}/image/delete`);
    }
};
