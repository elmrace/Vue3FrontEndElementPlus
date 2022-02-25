<template>
  <div class="row my-2 align-items-end justify-content-end">
    <button class="btn btn-primary" @click="newUser">New User</button>
  </div>
  <div class="row">
    <DataTable :loading="loading" :tableData="tableData">
      <template v-slot:columns>
        <el-table-column prop="_id" label="#" width="250" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="email" label="EMail Address" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEditClick(scope.row)"
              >Edit</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDeleteClick(scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </template>
    </DataTable>
  </div>

  <Modal
    v-if="displayModal"
    @close-modal-event="hideModal"
    @save-modal-event="saveData"
    title="New User"
  >
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" v-model="formData.email" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Full Name</label>
      <input type="text" class="form-control" v-model="formData.name" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">GSM</label>
      <input type="text" class="form-control" v-model="formData.gsm" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">User Type</label>
      <select v-model="formData.user_type" class="form-control">
        <option value="SUPER_USER">Admin</option>
        <option value="TENANT">Tenant</option>
        <option value="MEMBER">Member</option>
      </select>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Modal from '@/components/Modal.vue'
import ApiService from '@/core/services/ApiService'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export default defineComponent({
  name: 'HomeView',
  components: {
    DataTable,
    Modal,
  },
  setup() {
    const tableData = ref([])
    const loading = ref(true)
    const displayModal = ref(false)
    const formData = reactive({
      name: '',
      email: '',
      gsm: '',
      user_type: '',
    })
    const id = ref('')

    onMounted(() => {
      fetchData()
    })

    const fetchData = async () => {
      const response = await ApiService.get('/users')
      tableData.value = response.data
      loading.value = false
    }

    const handleEditClick = (row: any) => {
      console.log(row)
      formData.name = row.name
      formData.email = row.email
      formData.gsm = row.gsm
      formData.user_type = row.user_type
      id.value = row._id
      displayModal.value = true
    }

    const newUser = () => {
      formData.name = ''
      formData.email = ''
      formData.gsm = ''
      formData.user_type = 'MEMBER'
      id.value = ''
      displayModal.value = true
    }

    const hideModal = () => {
      displayModal.value = false
    }

    const handleDeleteClick = (row: any) => {
      if (row.user_type == 'SUPER_USER') {
        return ElMessage.error('Admin User could not be deleted...')
      }
      ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
        ApiService.delete(`/users/${row._id}`)
          .then(() => {
            fetchData()
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage.error('User could not be deleted')
          })
      })
    }

    const saveData = () => {
      if (id.value != '') {
        //Edit
        ApiService.put(`/users/${id.value}`, formData)
          .then(() => {
            fetchData()
            ElNotification({
              title: 'Success',
              message: 'User updated successfully',
              type: 'success',
              position: 'bottom-right',
            })
          })
          .catch((error) => {
            ElMessage.error(error.response.data.message)
          })
      } else {
        //Create

        ApiService.post(`/users`, formData)
          .then(() => {
            fetchData()
            ElMessage.success('User created successfully')
          })
          .catch((error) => {
            ElMessage.error(error.response.data.message)
          })
      }
      displayModal.value = false
    }

    return {
      tableData,
      loading,
      displayModal,
      formData,
      handleEditClick,
      handleDeleteClick,
      newUser,
      hideModal,
      saveData,
    }
  },
})
</script>
