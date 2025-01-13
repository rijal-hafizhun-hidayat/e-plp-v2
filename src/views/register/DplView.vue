<script setup lang="ts">
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/base/InputLabel.vue'
import TextInput from '@/components/base/TextInput.vue'
import PrimaryButton from '@/components/base/PrimaryButton.vue'
import { reactive, ref, type Ref } from 'vue'

interface Form {
  name: string
  email: string
  password: string
  nip: number
}

const isLoading: Ref<boolean> = ref(false)
const form: Form = reactive({
  name: '',
  email: '',
  password: '',
  nip: 0,
})

const send = () => {
  console.log(form)
}
</script>
<template>
  <GuestLayout>
    <form @submit.prevent="send()" class="space-y-4">
      <div>
        <InputLabel>name</InputLabel>
        <TextInput type="text" class="mt-1 block w-full" v-model="form.name" />
      </div>
      <div>
        <InputLabel>email</InputLabel>
        <TextInput type="email" class="mt-1 block w-full" v-model="form.email" />
      </div>
      <div>
        <InputLabel>nip</InputLabel>
        <TextInput type="number" class="mt-1 block w-full" v-model="form.nip" />
      </div>
      <div>
        <InputLabel>password</InputLabel>
        <TextInput type="password" class="mt-1 block w-full" v-model="form.password" />
      </div>
      <div class="flex justify-end">
        <PrimaryButton :disabled="isLoading" type="submit">register</PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
