import { ref, onUnmounted } from "vue";

export function useAudio() {
  const playedAudio = ref(null);

  function play(url, options = {}) {
    if (typeof url !== "string" || url.length === 0) {
      throw new Error("A valid URL must be specified");
    }

    const { loop = false } = options;

    // Be sure to pause the current played audio.
    // It prevents memory leaks.
    stop();

    const audio = new Audio(url);
    if (loop === true) {
      audio.loop = true;
    }

    playedAudio.value = audio;

    audio.play();
  }

  function playInLoop(url) {
    play(url, {
      loop: true,
    });
  }

  function stop() {
    if (playedAudio.value === null) {
      return;
    }

    playedAudio.value.pause();
  }

  // Be sure to pause the current played audio when the component has been unmounted.
  // It also prevents memory leaks.
  onUnmounted(() => {
    stop();
  });

  return {
    play,
    playInLoop,
    stop,
  };
}
