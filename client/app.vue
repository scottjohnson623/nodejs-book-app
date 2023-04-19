<script setup>
useHead({
  title: "My Bookshelf",
  meta: [
    {
      name: "My Bookshelf",
      description: "A site to catalog books I have read",
    },
  ],
});
</script>

<template>
  <div>
    <v-app id="inspire">
      <v-app-bar id="app-header"> <h1 class="text-center w-100">My Bookshelf</h1> </v-app-bar>
      <v-main id="main-area" class="mt-5 d-flex align-center flex-column">
        <layouts-book-shelf />
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
  #app-header {
    background-color:bisque;
  }
  #main-area {
    background-color: #FAF9F6;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
</style>