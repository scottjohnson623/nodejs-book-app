<script setup>
const apiBase = useRuntimeConfig().public.apiBase;
console.log(apiBase);
const { data: books } = await useFetch(apiBase + "books");

useHead({
  title: 'My Bookshelf',
  meta: [{
    name: 'My Bookshelf',
    description: 'A site to catalog books I have read',
  }]
})
</script>

<template>
  <div>
    <v-app id="inspire">
      <v-app-bar> <h1 class="text-center w-100">Bookshelf</h1> </v-app-bar>
      <v-main class="mt-5 d-flex align-center flex-column">
        <book-card
          v-for="(book, index) in books"
          :key="index"
          :id="book.id"
          :title="book.title"
          :author="book.author"
          :date-finished="book.dateFinished"
        />
      </v-main>
    </v-app>
  </div>
</template>
