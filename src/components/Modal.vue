<template>
  <div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              @click="closeModal"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="default" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveChanges">
              Save changes
            </button>
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close-modal-event', 'save-modal-event'],
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    const closeModal = () => {
      emit('close-modal-event')
    }
    const saveChanges = () => {
      emit('save-modal-event')
    }

    return {
      closeModal,
      saveChanges,
    }
  },
})
</script>

<style scoped>
/* Override default value of 'none' */
.modal {
  display: block;
}
</style>
