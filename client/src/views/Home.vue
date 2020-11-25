<i18n lang="yaml">
en:
  title: "My nickname"
  input-placeholder: "Fill my nickname"

fr:
  title: "Mon pseudo"
  input-placeholder: "Saisir mon pseudo"
</i18n>

<template>
  <section class="flex items-center justify-center">
    <form
      class="flex flex-col items-center justify-center w-full max-w-md p-8 mx-2 mt-8 space-y-10 bg-white border shadow rounded-xl"
      @submit.prevent="saveUsername"
    >
      <h2 class="text-3xl font-bold text-center">
        {{ t("title") }}
      </h2>

      <div class="relative w-full mt-1 rounded-md shadow-sm">
        <input
          type="text"
          id="username"
          name="username"
          class="block w-full border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
          :placeholder="t('input-placeholder')"
        />
      </div>

      <div class="flex justify-end w-full">
        <button
          type="submit"
          class="p-2 text-gray-100 bg-blue-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <ChevronIcon right />
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import ChevronIcon from "../components/ChevronIcon.vue";
import { useAppMachineContext } from "../composables/app";

export default {
  name: "Home",

  components: {
    ChevronIcon,
  },

  setup() {
    const { t } = useI18n();

    const router = useRouter();

    const { appMachineSend } = useAppMachineContext();

    function saveUsername({ target: form }) {
      const data = new FormData(form);
      const username = data.get("username").toString().trim();
      if (username === "") {
        return;
      }

      appMachineSend({
        type: "SET_USERNAME",
        data: username,
      });

      router.push("/games");
    }

    return {
      t,

      saveUsername,
    };
  },
};
</script>
