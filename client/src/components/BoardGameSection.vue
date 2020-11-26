<template>
  <div class="p-3 space-y-4">
    <h3 class="text-lg font-semibold">
      <slot name="title" />
    </h3>

    <div class="flex justify-center">
      <slot />
    </div>
  </div>
</template>
