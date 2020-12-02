<i18n lang="yaml">
en:
  title: "My nickname"
  input-placeholder: "Fill my nickname"
  invalid-username: "Nickname already taken"
  submit-alt: "Confirm my nickname"

fr:
  title: "Mon pseudo"
  input-placeholder: "Saisir mon pseudo"
  invalid-username: "Ce surnom est déjà pris"
  submit-alt: "Confirmer mon pseudo"
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

      <p
        v-if="usernameInvalidRef"
        class="w-full p-2 mt-2 text-center text-red-700 bg-red-200 border-2 border-red-500 rounded"
      >
        {{ t("invalid-username") }}
      </p>

      <div class="flex justify-end w-full">
        <AppButton type="submit" rounded :aria-label="t('submit-alt')">
          <ChevronIcon right />
        </AppButton>
      </div>
    </form>
  </section>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import { useAppMachineContext } from "../composables/app";

import AppButton from "../components/AppButton.vue";
import ChevronIcon from "../components/ChevronIcon.vue";

export default {
  name: "Home",

  components: {
    AppButton,
    ChevronIcon,
  },

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();

    const invalidUsernameSearchParam = computed(
      () => route.query.invalid === "true"
    );

    const usernameInvalidRef = ref(invalidUsernameSearchParam.value);

    const { appMachineState, appMachineSend } = useAppMachineContext();

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
    }

    watchEffect(() => {
      if (appMachineState.value.matches("loadingLobbies")) {
        console.log("loading lobbies");
        router.push("/games");
        return;
      }

      if (appMachineState.value.matches("usernameSelection.failure")) {
        usernameInvalidRef.value = true;
        return;
      }
    });

    return {
      t,

      usernameInvalidRef,
      saveUsername,
    };
  },
};
</script>
