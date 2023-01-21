<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Python compiler</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="flex container">
      <q-card class="left q-mx-md">
        <textarea v-model="code" class="textArea" placeholder="Code" />
      </q-card>
      <q-card class="right">
        <textarea
          :readonly="true"
          v-model="output"
          class="textArea"
          placeholder="output"
        />
      </q-card>
    </div>
    <q-btn
      :loading="loading"
      class="q-ml-md"
      label="Run"
      color="primary"
      @click="runCode"
    />
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import Axios from "axios";
const code = ref("");
const output = ref("");
const loading = ref(false);

const runCode = async () => {
  loading.value = true;
  const payload = {
    code: code.value,
  };
  Promise.all(
    await [
      Axios.post("http://localhost:5000/save-file", payload),
      Axios.get("http://localhost:5000/output"),
    ]
  ).then((values) => {
    loading.value = false;
    output.value = values[1].data;
    console.log(output.value);
  });
};
</script>

<style scoped>
.container {
  width: 90vw;
  box-sizing: border-box;
}

.left,
.right {
  width: 40vw;
  height: 70vh;
  margin-top: 10vh;
}
.textArea {
  width: 100%;
  height: 100%;
  resize: none;
}
</style>
