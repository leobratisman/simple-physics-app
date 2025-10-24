import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import { BaseState } from '../types';

import { postApi } from '../../api/post';
import { memberApi } from '../../api/member';
import { dateApi } from '../../api/date';

import { IPost, IPostUpdate, IPostAdd } from '../../interfaces/PostInterface';
import { IMember, IMemberAdd, IMemberUpdate } from '../../interfaces/MemberInterface';
import { IDate, IDateAdd, IDateUpdate } from '../../interfaces/DateInterface';


const defaultState: BaseState = {
    posts: [],
    members: [],
    dates: [],
    theme: 'light',
    adminAccessToken: false,
};

export const useBaseStore = defineStore('base-store', {
    state: (): BaseState => defaultState,
    actions: {
        toggleTheme() {
            if (this.theme == 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }
        },

        setAdminAccessToken() {
            const lifeTerm = 2400;
            document.cookie = `admin_access_token=${uuidv4()}; max-age=${lifeTerm}`;
            this.adminAccessToken = true;
        },

        getAdminAccessToken() {
            if (document.cookie) {
                this.adminAccessToken = true;
            } else {
                this.adminAccessToken = false;
            }
        },

        // Posts
        async getPosts() {
            try {
                const response = await postApi.getPosts();
                this.posts = response.data;
                this.posts.sort((a: IPost, b: IPost) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
            } catch (err) {
                console.debug(err);
            }
        },
        async addPost(item: IPostAdd) {
            try {
                const result = await postApi.addPost(item);
                await this.getPosts();
                return result;
            } catch (err) {
                return err;
            }
        },
        async updatePost(item: IPostUpdate) {
            try {
                const result = await postApi.updatePost(item);
                await this.getPosts();
                return result;
            } catch (err) {
                return err;
            }
        },
        async deletePost(itemId: number) {
            try {
                await postApi.deletePost(itemId);
                await this.getPosts();
            } catch (err) {
                alert(err);
            }
        },
        async uploadPostImage(itemId: number, image: string | Blob) {
            try {
                return await postApi.uploadImage(itemId, image);
            } catch (err) {
                console.debug(err);
            }
        },

        // Members
        async getMembers() {
            try {
                const response = await memberApi.getMembers();
                this.members = response.data;
            } catch (err) {
                console.debug(err);
            }
        },
        async addMember(item: IMemberAdd) {
            try {
                const result = await memberApi.addMember(item);
                await this.getMembers();
                return result;
            } catch (err) {
                return err;
            }
        },
        async updateMember(item: IMemberUpdate) {
            try {
                const result = await memberApi.updateMember(item);
                await this.getMembers();
                return result;
            } catch (err) {
                return err;
            }
        },
        async deleteMember(itemId: number) {
            try {
                await memberApi.deleteMember(itemId);
                await this.getMembers();
            } catch (err) {
                console.debug(err);
            }
        },
        async uploadMemberImage(itemId: number, image: string | Blob) {
            try {
                return await memberApi.uploadImage(itemId, image);
            } catch (err) {
                console.debug(err);
            }
        },

        // Dates
        async getDates() {
            try {
                const response = await dateApi.getDates();
                this.dates = response.data;
            } catch (err) {
                console.debug(err);
            }
        },
        async addDate(item: IDateAdd) {
            try {
                await dateApi.addDate(item);
                await this.getDates();
            } catch (err) {
                return err;
            }
        },
        async updateDate(item: IDateUpdate) {
            try {
                await dateApi.updateDate(item);
                await this.getDates();
            } catch (err) {
                return err;
            }
        },
        async deleteDate(itemId: number) {
            try {
                await dateApi.deleteDate(itemId);
                await this.getDates();
            } catch (err) {
                console.debug(err);
            }
        },
    }
})

