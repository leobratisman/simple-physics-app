<template>
    <div class="pa-4 text-center">
        <v-dialog
        v-model="props.dialog"
        max-width="600"
        >
            <v-card
                prepend-icon="mdi-post"
                title="Добавить пост"
            >
                <v-card-text>

                    <v-sheet class="mx-auto">
                        <v-form v-model="form" fast-fail @submit.prevent>

                            <v-text-field
                                v-model="postAddForm.title"
                                label="Заголовок"
                            ></v-text-field>

                            <v-textarea
                                v-model="postAddForm.description"
                                clear-icon="mdi-close-circle"
                                :rules="fieldRules"
                                label="Текст"
                                clearable
                                required
                            ></v-textarea>

                            <v-file-input
                                v-model="imageFile"
                                clearable
                                accept="image/png, image/jpeg, image/bmp, image/jpg"
                                label="Картинка"
                            ></v-file-input>

                            <v-divider></v-divider>
                            
                            <v-card-actions style="display: block; text-align: right; padding-top: 20px;">
                                <v-btn
                                    text="Закрыть"
                                    variant="plain"
                                    @click="$emit('closeDialog')"
                                ></v-btn>

                                <v-btn
                                    type="submit"
                                    color="green"
                                    variant="tonal"
                                    text="Добавить"
                                    @click="addPost"
                                ></v-btn>
                            </v-card-actions>

                        </v-form>
                    </v-sheet>

                </v-card-text>

            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { v4 as uuidv4 } from 'uuid';

    import { IPostAdd } from '../../interfaces/PostInterface';
    import { useBaseStore } from '../../store/modules/base';
    import { fieldRules } from '../../utils/rules';

    const baseStore = useBaseStore();

    const props = defineProps({
        dialog: Boolean,
    })

    const emit = defineEmits(['closeDialog']);

    const postAddForm = ref<IPostAdd>({
        title: null,
        description: null,
    });

    const imageFile = ref();
    const form = ref(false);

    const addPost = async () => {
        if (!form.value) return;

        const post = await baseStore.addPost(postAddForm.value);

        if (imageFile.value) {
            await baseStore.uploadPostImage(post['data']['id'], imageFile.value);
        }

        postAddForm.value = {
            title: null,
            description: null,
        }
        
        emit('closeDialog');
    }

</script>

<style scoped>

</style>