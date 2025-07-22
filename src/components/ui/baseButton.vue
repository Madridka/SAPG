<template>
  <button
    type="submit"
    :class="[
      `btn`,
      `btn__${purpose}`,
      `btn__${size}`,
      variant ? `btn__${purpose}-${variant}` : '',
      { 'btn-disabled': disabled },
      `btn__${iconPosition}`,
    ]"
    :disabled="disabled"
    @click.stop="$emit('onClick')"
  >
    <span v-if="iconPosition === 'left'">
      <span v-if="iconPath"
        ><img class="button__icon" :src="iconPath" :alt="{ purpose }" />
        <span>{{ label }}</span></span
      >
    </span>
    <span v-else>
      <span>{{ label }}</span>
      <span v-if="iconPath"
        ><img class="button__icon" :src="iconPath" :alt="{ purpose }" />
      </span>
    </span>
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  name: "baseButton",
  props: {
    label: {
      type: String,
      required: false,
    },
    purpose: {
      type: String,
      default: "primary",
      validator: (value) =>
        [
          "primary",
          "secondary",
          "tertiary",
          "quaternary",
          "primary-light",
          "exit",
        ].includes(value),
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    variant: {
      type: String,
      default: null,
      validator: (value) =>
        ["unavailable", "target", "default", "icon"].includes(value),
    },
    icon: {
      type: String,
      default: null,
    },
    iconPosition: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconMap = {
      exit: new URL("@/assets/images/icons/icon_logout.svg", import.meta.url)
        .href,
      filter: new URL("@/assets/images/icons/icon_filter.svg", import.meta.url)
        .href,
      plus: new URL("@/assets/images/icons/icon_plus.svg", import.meta.url)
        .href,
      close_eye: new URL(
        "@/assets/images/icons/icon_close_eye.svg",
        import.meta.url
      ).href,
      search: new URL("@/assets/images/icons/icon_search.svg", import.meta.url)
        .href,
      arrow_left: new URL(
        "@/assets/images/icons/icon_arrow_left.svg",
        import.meta.url
      ).href,
      arrow_right: new URL(
        "@/assets/images/icons/icon_arrow_right.svg",
        import.meta.url
      ).href,
      close: new URL("@/assets/images/icons/icon_close.svg", import.meta.url)
        .href,
      export: new URL("@/assets/images/icons/icon_export.svg", import.meta.url)
        .href,
      import: new URL("@/assets/images/icons/icon_import.svg", import.meta.url)
        .href,
    };

    const iconPath = computed(() => iconMap[props.icon]);

    return {
      iconPath,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

.btn {
  color: $color_main_white;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: $color_main_blue;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__primary {
    background-color: $color_main_blue;

    &:hover {
      background-color: $color_hover_blue;
    }

    &:focus {
      background-color: $color_focus_blue;
    }

    &:active {
      background-color: $color_active_blue;
    }

    &-unavailable {
      cursor: not-allowed;
      background-color: $color_unavailable_grey;

      &:hover,
      &:focus,
      &:active {
        background-color: $color_unavailable_grey !important;
      }
    }
  }

  &__secondary {
    background-color: #ffffff00;
    border: 1px solid $color_main_blue;
    color: $color_main_blue;
    font-size: 16px;

    &:hover {
      background-color: #006cd805;
      border: 1px solid $color_hover_blue;
      color: $color_hover_blue;
    }

    &:focus {
      background-color: #0d80ec1a;
      border: 1px solid $color_focus_blue;
      color: $color_focus_blue;
    }

    &:active {
      border: 1px solid $color_active_blue;
      color: $color_active_blue;
    }

    &-unavailable {
      cursor: not-allowed;
      background-color: #f5f6f8;
      border: 1px solid $color_disable_grey;
      color: $color_disable_grey;

      &:hover,
      &:focus,
      &:active {
        background-color: #f5f6f8;
        border: 1px solid $color_disable_grey;
        color: $color_disable_grey;
      }
    }
  }

  &__tertiary {
    background-color: #ffffff00;
    border: none;
    color: $color_main_blue;
    font-size: 20px;
    font-weight: 500;

    &:hover {
      color: $color_hover_blue;
    }

    &:focus {
      color: $color_focus_blue;
    }

    &:active {
      color: $color_active_blue;
    }

    &-unavailable {
      cursor: not-allowed;
      color: $color_unavailable_grey;

      &:hover,
      &:focus,
      &:active {
        color: $color_unavailable_grey !important;
      }
    }
  }

  &__quaternary {
    background-color: #ffffff00;
    border: none;
    color: #7f8499;
    font-size: 16px;

    &:hover,
    &:focus {
      color: #000000;
    }

    &:active {
      color: #000000;
      background-color: $color_main_grey;
    }

    &-unavailable {
      cursor: not-allowed;
      background-color: $color_main_grey;
      color: $color_unavailable_grey;

      &:hover,
      &:focus,
      &:active {
        color: $color_unavailable_grey !important;
      }
    }
  }

  &__primary-light {
    background-color: #0d80ec0d;
    border: 1px solid #0d80ec1a;
    color: $color_main_blue;
    font-size: 18px;
    color: $color_main_blue;

    &:hover {
      background-color: #0d80ec1a;
      border: 1px solid #0d80ec1a;
    }

    &:focus {
      background-color: #ffffff00;
      border: 1px solid $color_main_blue;
    }

    &:active {
      background-color: #0d80ec1a;
      border: 1px solid $color_main_blue;
    }

    &-unavailable {
      cursor: not-allowed;
      background-color: #e2e3e7;
      border: none;
      color: #7f8499;

      &:hover,
      &:focus,
      &:active {
        background-color: #e2e3e7;
        border: none;
        color: #7f8499;
      }
    }
  }

  &__small {
    width: 100%;
    min-height: 45px;
    font-size: 16px;
    font-weight: 400;
  }

  &__medium {
    width: 100%;
    min-height: 48px;
    font-size: 20px;
    font-weight: 400;
  }

  &__large {
    width: 100%;
    min-height: 55px;
    font-size: 18px;
    font-weight: 400;
  }

  &__exit {
    background-color: #ffffff00;
    color: #7f8499;
    border: none;
    &:hover {
      color: #e55c5c;
    }
    &:focus {
      border: 1px solid #e2e3e7;
      color: #e55c5c;
    }
    &:active {
      background-color: #fff2f2;
      border: none;
    }
  }
}

.button__icon {
  margin: 0 10px;
}
</style>
