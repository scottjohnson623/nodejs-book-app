<script setup>
import apiUrls from "~/consts/apiUrls";
const doShowAddBookForm = ref(false);
//TODO: assign type to books
const { data: books, refresh: refreshBooks } = await useFetch(
  apiUrls.GET_ALL_BOOKS
);

const deleteBook = async (book) => {
  await useFetch(apiUrls.DELETE_BOOK_BY_ID(book.id), { method: "DELETE" });
  refreshBooks();
};
</script>

<template>
  <div class="w-50">
    <v-btn
      class="mr-0 float-right"
      v-if="!doShowAddBookForm"
      @click="doShowAddBookForm = true"
      :ripple="false"
    >
      <v-icon icon="mdi-plus" />
      Add a new Book
    </v-btn>
    <v-btn
      v-else
      class="mr-0 float-right"
      density="compact"
      icon="mdi-close"
      @click="doShowAddBookForm = false"
      :ripple="false"
    />
  </div>

  <forms-add-book-form v-if="doShowAddBookForm" @on-book-added="refreshBooks" />
  <v-divider />
  <cards-book-card
    v-for="(book, index) in books"
    :key="index"
    :title="book.title"
    :author="book.author"
    :bookFinishedDate="book.bookFinishedDate"
    @on-delete="deleteBook(book)"
  />
</template>
