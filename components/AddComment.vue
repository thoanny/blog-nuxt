<script  setup>
import { ref, onMounted } from 'vue';
import q from '@/queries/addComment.gql';

const props = defineProps({
    postId: Number
})

const form = ref({
    username: null,
    email: null,
    comment: null,
    save: false,
    privacy: false,
    errors: {},
    locked: false,
    success: false,
});

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

onMounted(() => {
    initUser();
})

async function initUser() {
    const localUser = localStorage.user;
    if (localUser) {
        const { username, email } = JSON.parse(atob(localUser));
        form.value.save = true;
        form.value.username = username;
        form.value.email = email;
    }
}

async function handleSubmit() {
    form.value.errors = {};

    if (!form.value.username) {
        form.value.errors.username = 'Ton pseudonyme est requis';
    } else if (form.value.username.length <= 3) {
        form.value.errors.username = 'Ton pseudonyme doit faire plus de 3 caractères';
    }

    if (form.value.email && !emailRegex.test(form.value.email)) {
        form.value.errors.email = 'Adresse e-mail invalide'
    }

    if (!form.value.comment) {
        form.value.errors.comment = 'Ton commentaire est requis'
    } else if (form.value.comment.length <= 10) {
        form.value.errors.comment = 'Ton commentaire doit faire plus de 10 caractères'
    }

    if (!form.value.privacy) {
        form.value.errors.privacy = 'Tu dois accepter la politique de confidentialité pour publier ton commentaire'
    }

    if (Object.keys(form.value.errors).length > 0) {
        return;
    }

    form.value.locked = true;

    if (form.value.save) {
        localStorage.user = btoa(JSON.stringify({ username: form.value.username, email: form.value.email }));
    }

    addComment();
}

function handleSave() {
    const localUser = localStorage.getItem('user');
    if (!form.value.save && localUser) {
        localStorage.removeItem('user');
    }
}

async function addComment() {
    const { data } = await useAsyncQuery(q, { postId: props.postId, comment: form.value.comment, username: form.value.username, email: form.value.email });
    if (data?.value.createComment.success) {
        form.value = {
            username: null,
            email: null,
            comment: null,
            save: false,
            privacy: false,
            errors: {},
            locked: false,
            success: true,
        }
    }
}
</script>

<template>
    <div>
        <div class="alert alert-success bg-primary shadow-lg" v-if="form.success">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Commentaire enregistré et en attente de validation.</span>
            </div>
        </div>
        <form v-else
            class="shadow-xl rounded-xl p-4 border dark:border-0 dark:border-zinc-600 dark:text-zinc-200 bg-white dark:bg-zinc-800"
            @submit.prevent="handleSubmit" autocomplete="off">
            <h2 class="text-2xl mb-2 font-semibold">Ajouter un commentaire</h2>
            <div class="alert alert-error shadow-lg !mt-4 !mb-2" v-if="Object.keys(form.errors).length > 0">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p>Merci de vérifier le formulaire avant d'envoyer ton commentaire.</p>
                    </div>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="form-control w-full">
                    <label class="label required" for="username">
                        <span class="label-text dark:text-zinc-200">Pseudonyme</span>
                    </label>
                    <input type="text" placeholder="John Doe" id="username"
                        class="input input-bordered w-full dark:bg-zinc-900" v-model="form.username" />
                    <span class="label" v-if="form.errors.username">
                        <span class="label-text-alt text-error">{{ form.errors.username }}</span>
                    </span>
                </div>
                <div class="form-control w-full">
                    <label class="label" for="email">
                        <span class="label-text dark:text-zinc-200">Adresse e-mail</span>
                    </label>
                    <input type="text" placeholder="john.doe@fai.ext" id="email"
                        class="input input-bordered w-full dark:bg-zinc-900" v-model="form.email" />
                    <span class="label" v-if="form.errors.email">
                        <span class="label-text-alt text-error">{{ form.errors.email }}</span>
                    </span>
                </div>
            </div>
            <div class="form-control">
                <label class="label required" for="comment">
                    <span class="label-text dark:text-zinc-200">Commentaire</span>
                </label>
                <textarea class="textarea textarea-bordered h-36 dark:bg-zinc-900" id="comment" placeholder=""
                    v-model="form.comment" />
                <span class="label" v-if="form.errors.comment">
                    <span class="label-text-alt text-error">{{ form.errors.comment }}</span>
                </span>
            </div>
            <div class="form-control mt-1">
                <label class="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" class="toggle toggle-primary" v-model="form.save" @change="handleSave" />
                    <span class="label-text dark:text-zinc-200">Enregistrer mon pseudonyme et adresse e-mail</span>
                    <div class="tooltip"
                        data-tip="Ton pseudonyme et ton adresse e-mail sont enregistrés dans ton navigateur.">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </label>
            </div>
            <div class="form-control">
                <label class="label required cursor-pointer justify-start gap-2">
                    <input type="checkbox" class="toggle toggle-primary" v-model="form.privacy" />
                    <span class="label-text dark:text-zinc-200">J'accepte la politique de confidentialité</span>
                </label>
                <span class="label" v-if="form.errors.privacy">
                    <span class="label-text-alt text-error">{{ form.errors.privacy }}</span>
                </span>
            </div>

            <button type="submit" :disabled="form.locked" class="btn btn-block mt-2"
                :class="form.locked ? 'loading btn-disabled' : 'btn-primary'"
                v-text="(form.locked) ? 'Merci de patienter' : 'Envoyer mon commentaire'">
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
form,
.alert {
    @apply max-w-2xl mx-auto my-8;
}

form {

    input,
    textarea {
        @apply text-sm;
    }

    .label {
        &.required {
            .label-text {
                &:after {
                    @apply text-error;
                    content: '*';
                }
            }
        }
    }
}
</style>