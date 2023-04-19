<script setup>
defineProps(["props", "value"]);

const emit = defineEmits(["onBookFound"]);
const isbnNumber = ref(null);
const errors = ref([]);
const isSearching = ref(false);

const searchForBook = async () => {
  isSearching.value = true;
  errors.value = [];
  const bookData = await $fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber.value}`
  );
  if (!bookData.totalItems) {
    errors.value = [
      "Problem finding book. Please double check the ISBN number and try again",
    ];
  } else {
    emit("onBookFound", bookData.items[0]);
  }
  isbnNumber.value = null;
  isSearching.value = false;
};
</script>

<template>
  <v-form class="w-50">
    <v-text-field
      v-model="isbnNumber"
      label="Enter ISBN number with no dashes"
      hint="e.g. 978-0517618332 -> 9780517618332"
      :error-messages="errors"
    >
      <template v-slot:append>
        <v-btn block class="mt-n2" @click="searchForBook">
          <template v-if="isSearching">
            <v-progress-circular indeterminate />
          </template>
          <template v-else>
            <v-icon icon="mdi-magnify" />
            Search
          </template>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>
