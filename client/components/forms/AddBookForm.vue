<script setup>
import apiUrls from "~/consts/apiUrls";

const emit = defineEmits(["onBookAdded"]);
const isSubmitting = ref(false);

const initialFormData = {
  title: null,
  author: null,
  bookFinishedDate: null,
  comments: [],
};
const formData = reactive({ ...initialFormData });

const formRules = {
  title: [(value) => (value ? true : "You must enter a title")],
  author: [(value) => (value ? true : "You must enter a author")],
};

const resetForm = () => Object.assign(formData, initialFormData);

const populateBookDetails = (book) => {
  formData.title = book.volumeInfo?.title;
  formData.author = book.volumeInfo?.authors[0];
};

const addBook = async () => {
  if (!formData.title || !formData.author) {
    return;
  }
  isSubmitting.value = true;
  await $fetch(apiUrls.CREATE_BOOK, { method: "POST", body: formData });
  resetForm();
  isSubmitting.value = false;
  emit("onBookAdded");
};
</script>

<template>
  <span class="mt-4 mb-4 w-50"> Search for book via ISBN </span>

  <forms-search-for-book-form @on-book-found="populateBookDetails" />

  <span class="mt-4 mb-4 w-50"> <b> OR</b> enter manually: </span>

  <v-form @submit.prevent class="w-50">
    <v-text-field
      v-model="formData.title"
      :rules="formRules.title"
      label="Title"
    />
    <v-text-field
      v-model="formData.author"
      :rules="formRules.author"
      label="Author"
    />
    <v-text-field
      v-model="formData.bookFinishedDate"
      label="Date Finished"
      hint="Date you finished reading the book in YYYY-MM-DD format(optional)"
      persistent-hint
    />
    <v-btn @click="addBook" size="x-large" type="submit" block class="mt-2">
      <span v-if="!isSubmitting"> Submit </span>
      <v-progress-circular indeterminate v-else />
    </v-btn>
  </v-form>
</template>
