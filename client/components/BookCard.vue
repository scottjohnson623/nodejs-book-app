<script setup>
import { ref } from "vue";
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  dateFinished: {
    type: String,
    required: false,
  },
});
const doShowDeleteModal = ref(false);
</script>

<template>
  <v-card variant="outlined" class="w-50 mt-5">
    <v-card-title> {{ title }}</v-card-title>
    <v-card-subtitle> {{ author }}</v-card-subtitle>
    <v-card-text v-if="dateFinished">
      Finished on {{ dateFinished }}</v-card-text
    >
    <v-card-actions>
      <v-btn
        class="ms-2"
        icon="mdi-delete"
        variant="text"
        @click="doShowDeleteModal = true"
      />
    </v-card-actions>
  </v-card>
  <v-dialog v-model="doShowDeleteModal" with="50">
    <v-card>
      Are you sure you want to delete {{ title }}?
      <v-card-actions>
        <v-btn class="ms-2" variant="text"> Yes </v-btn>
        <v-btn class="ms-2" variant="text" @click="doShowDeleteModal = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
