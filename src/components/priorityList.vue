<template>
  <div class="table__container">
    <table>
      <thead class="table__head">
        <tr>
          <th
            v-for="header in TableHeadersPriority"
            :key="header.id"
            @click="sortBy(header.key)"
            :class="{
              sortable: true,
              'sorted-asc': sortKey === header.key && sortOrder === 1,
              'sorted-desc': sortKey === header.key && sortOrder === -1,
            }"
          >
            {{ header.label }}
            <span class="sort-active" v-if="sortKey === header.key">
              <img
                src="@/assets/images/icons/icon_blue.svg"
                alt="icon_filter"
              />
            </span>
            <img src="@/assets/images/icons/icon_sort.svg" alt="icon_sort" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.id">
          <td>{{ user.full_name }}</td>
          <td>{{ user.category_job }}</td>
          <td>{{ user.category }}</td>
          <td>{{ user.branch_id }}</td>
          <td>{{ user.training_program }}</td>
          <td>{{ user.passed_date }}</td>
          <td>{{ user.expired_date }}</td>
          <td
            class="status-wrapper"
            @mouseenter="hoveredRow = user.id"
            @mouseleave="hoveredRow = null"
          >
            <span :style="getPriorityStyle(user.priority)">
              <template v-if="hoveredRow === user.id">
                {{ getPriorityLabel(user.priority) }}
              </template>
              <template v-else>
                {{ user.priority }}
              </template>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "@/store/store";

export default {
  name: "priorityList",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const TableHeadersPriority = computed(() => store.TableHeadersPriority);
    const sortKey = ref("");
    const sortOrder = ref(1);
    const hoveredRow = ref(null);

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = -sortOrder.value;
      } else {
        sortKey.value = key;
        sortOrder.value = 1;
      }
    };

    const sortedUsers = computed(() => {
      if (!sortKey.value) return props.users;

      return [...props.users].sort((a, b) => {
        const valA = a[sortKey.value];
        const valB = b[sortKey.value];

        const parseDate = (str) => {
          const [day, month, year] = str.split(".");
          return new Date(`${year}-${month}-${day}`);
        };

        if (!isNaN(valA) && !isNaN(valB)) {
          return (valA - valB) * sortOrder.value;
        }

        if (
          /^\d{2}\.\d{2}\.\d{4}$/.test(valA) &&
          /^\d{2}\.\d{2}\.\d{4}$/.test(valB)
        ) {
          return (parseDate(valA) - parseDate(valB)) * sortOrder.value;
        }

        return valA.toString().localeCompare(valB.toString()) * sortOrder.value;
      });
    });

    const getPriorityStyle = (priority) => {
      const styles = {
        Просрочен: { color: "#E55C5C", backgroundColor: "#FFF2F2" },
        Истекает: { color: "#FD8300", backgroundColor: "#FC8F0026" },
        Контроль: { color: "#1A5DDA", backgroundColor: "#0D80EC1A" },
        Активен: { color: "#00AAA0", backgroundColor: "#00AAA01A" },
      };

      return {
        ...(styles[priority] || {}),
        padding: "4px 8px",
        borderRadius: "10px",
        display: "inline-block",
      };
    };

    const getPriorityLabel = (priority) => {
      const hoverTextMap = {
        Просрочен: "Просрочен",
        Истекает: "<1 года",
        Контроль: "1-2 года",
        Активен: ">2 лет",
      };

      return hoverTextMap[priority] || priority;
    };

    return {
      TableHeadersPriority,
      getPriorityStyle,
      sortKey,
      sortOrder,
      sortBy,
      sortedUsers,
      hoveredRow,
      getPriorityLabel,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.table__container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow-y: auto;
}

.table__container::-webkit-scrollbar {
  width: 5px;
  height: 86px;
}

.table__container::-webkit-scrollbar-thumb {
  border-radius: 4px;
  border: 4px solid #e2e3e7;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  word-break: normal;
}

table th {
  position: sticky;
  top: 0;

  z-index: 100;
}

th {
  min-height: 47px;
  text-align: left;
  color: #138cfe;
  background-color: #eaf0f8;
  padding: 12px;
  font-size: 18px;
  font-weight: 400;

  &:hover {
    background-color: #ddeaf7;
  }
}

td {
  padding: 16px 12px;
  background-color: #ffffff;
}

tr:hover td {
  background-color: #f4f6fa;
}

th.sortable {
  cursor: pointer;
}

th.sorted-asc,
th.sorted-desc {
  font-weight: 500;
}

.sort-active {
  padding: 8px;
  bottom: 10%;

  img {
    width: 20px;
    height: 20px;
  }
}

.status-wrapper {
  text-align: center;
}
</style>
