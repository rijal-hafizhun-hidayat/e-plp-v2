<script setup lang="ts">
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/base/InputLabel.vue'
import TextInput from '@/components/base/TextInput.vue'
import InputError from '@/components/base/InputError.vue'
import PrimaryButton from '@/components/base/PrimaryButton.vue'
import { reactive, ref, type Ref } from 'vue'
import type { AxiosError, AxiosResponse } from 'axios'
import api from '@/plugin/api'
import { SweetAlert } from '@/utils/sweetalert'
import { useRouter } from 'vue-router'
import { Error } from '@/utils/error'

interface Fetch {
  statusCode: number
  message: string
  data: RegisterStudent
}

interface Form {
  name: string
  email: string
  password: string
  nim: string
}

interface RegisterStudent {
  id: number
  email: string
  name: string
  nim: number
  created_at: Date
  updated_at: Date
}

interface Validation {
  statusCode: number
  message: string
  errors: Record<string, string[]>
}

const router = useRouter()
const validation: Ref<Validation | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)
const form: Form = reactive({
  nim: '',
  name: '',
  email: '',
  password: '',
})

const send = async () => {
  try {
    isLoading.value = true
    const result: AxiosResponse<Fetch> = await api.post('register/student', {
      nim: parseInt(form.nim as string),
      name: form.name,
      email: form.email,
      password: form.password,
    })
    SweetAlert.successAlert(`${result.data.message}, please login with current user`)
    router.push({
      name: 'login.index',
    })
  } catch (error) {
    const err = error as AxiosError
    if (err.response?.status === 400) {
      validation.value = err.response.data as Validation
    } else if (err.response?.status === 404) {
      validation.value = err.response.data as Validation
      const errors = Error.formatErrorMessage(validation.value.errors)
      SweetAlert.errorAlert(errors)
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <GuestLayout>
    <form @submit.prevent="send()" class="space-y-4">
      <div>
        <InputLabel>name</InputLabel>
        <TextInput type="text" class="mt-1 block w-full" v-model="form.name" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.name"
          :message="validation.errors.name[0]"
        />
      </div>
      <div>
        <InputLabel>email</InputLabel>
        <TextInput type="email" class="mt-1 block w-full" v-model="form.email" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.email"
          :message="validation.errors.email[0]"
        />
      </div>
      <div>
        <InputLabel>nim</InputLabel>
        <TextInput type="number" class="mt-1 block w-full" v-model="form.nim" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.nim"
          :message="validation.errors.nim[0]"
        />
      </div>
      <div>
        <InputLabel>password</InputLabel>
        <TextInput type="password" class="mt-1 block w-full" v-model="form.password" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.password"
          :message="validation.errors.password[0]"
        />
      </div>
      <div class="flex justify-end">
        <PrimaryButton :disabled="isLoading" type="submit">register</PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
