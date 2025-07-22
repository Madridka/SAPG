<template>
  <div class="modal" v-if="isModalOpen" @click="closeModal">
    <div class="modal__content" ref="modal" @click.stop>
      <div class="modal__header">
        <div class="modal__title">Фильтры</div>
        <div class="button__modal-wrapper">
          <baseButton
            class="modal__button-custom"
            type="button"
            label="Очистить"
            purpose="tertiary"
            size="medium"
            @click="closeModal"
          />
          <baseButton
            class="modal__button-custom"
            type="button"
            icon="close"
            purpose="tertiary"
            size="medium"
            @click="closeModal"
          />
        </div>
      </div>
      <baseCheckbox labelTitle1="Сгруппировать" labelTitle2=" по допуску" />
      <filterAccordion />
      <div class="confirm__button">
        <baseButton
          label="Применить"
          purpose="secondary"
          size="medium"
          @click="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store/store";
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

import baseButton from "@/components/ui/baseButton.vue";
import filterAccordion from "./filterAccordion.vue";
import baseCheckbox from "@/components/ui/baseCheckbox.vue";

export default {
  name: "modalFilter",
  components: {
    baseButton,
    filterAccordion,
    baseCheckbox,
  },
  props: {
    isModalOpen: {
      type: Boolean,
    },
  },
  setup(_, { emit }) {
    const store = useStore();
    const selectedStatus = ref([]);
    const SetPriority = computed(() => store.SetPriority);
    const modal = ref(null);

    const closeModal = () => {
      emit("close");
    };

    const closeModalClick = (event) => {
      if (modal.value && !modal.value.contains(event.target)) {
        closeModal();
      }
    };

    onMounted(() => {
      window.addEventListener("click", closeModalClick);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", closeModalClick);
    });

    watch(selectedStatus, (newVal) => {
      emit("update:priority", newVal);
    });

    return {
      closeModal,
      SetPriority,
      selectedStatus,
      closeModalClick,
      modal,
    };
  },
};
</script>

<style lang="scss">
.modal {
  color: #7f8499;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;

  &__content {
    background: rgb(255, 255, 255);
    border-radius: 5px;
    padding: 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 42px;

    @media (max-width: 1919px) {
      min-width: 400px;
    }

    @media (min-width: 1920px) and (max-width: 2559px) {
      min-width: 480px;
    }

    @media (min-width: 2560px) {
      min-width: 550px;
    }
  }
}

.confirm__button {
  display: flex;
}

.modal__button-custom {
  font-size: 16px;
  width: 75px;
}

.button__modal-wrapper {
  display: flex;
  gap: 70px;
}

.modal__header {
  display: flex;
  justify-content: flex-start;
  gap: 42px;
}

.modal__title {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #7f8499;
}

.modal__actions {
  display: flex;
  gap: 10px;
}

.base-checkbox,
.accordion__item,
.confirm__button {
  padding-bottom: 42px;
}
</style>
