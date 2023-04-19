<script setup>
import { ref, defineEmits } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookFinishedDate: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["onDelete"]);
const doShowDeleteModal = ref(false);

const deleteBook = () => {
  emit("onDelete");

  doShowDeleteModal.value = false;
};
</script>

<template>
  <v-card variant="outlined" class="w-50 mt-5">
    <v-card-title> {{ title }}</v-card-title>
    <v-card-subtitle> {{ author }}</v-card-subtitle>
    <v-card-text v-if="bookFinishedDate">
      Finished reading on {{ bookFinishedDate }}</v-card-text
    >
    <v-card-actions>
      <v-btn
        class="ms-2"
        variant="outlined"
        @click="doShowDeleteModal = true"
      > <v-icon icon="mdi-delete" /> Delete </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="doShowDeleteModal" width="50%">
    <v-card class="pa-3">
      Are you sure you want to delete {{ title }}?
      <v-card-actions>
        <v-btn class="ms-2" variant="text" @click="deleteBook"> Yes </v-btn>
        <v-btn class="ms-2" variant="text" @click="doShowDeleteModal = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
