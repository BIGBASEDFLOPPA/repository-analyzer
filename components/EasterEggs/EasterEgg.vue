<template>
  <div v-if="showVideo" class="easter-video-overlay" @click="overlayClick">
    <video
        ref="videoRef"
        autoplay
        @ended="hideVideo"
        class="easter-video"
    >
      <source src="/videos/easter-egg.mp4" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showVideo = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const keySequence = ['ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'ArrowRight']
let pressedKeys: string[] = []

const keydownHandler = (e: KeyboardEvent) => {
  pressedKeys.push(e.key)
  if (pressedKeys.length > keySequence.length) {
    pressedKeys.shift()
  }
  if (pressedKeys.join(',') === keySequence.join(',')) {
    showVideo.value = true
    pressedKeys = []
  }
}

const hideVideo = () => {
  showVideo.value = false
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
}

const overlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    hideVideo()
  }
}

onMounted(() => {
  window.addEventListener('keydown', keydownHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownHandler)
})
</script>

<style>
.easter-video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.easter-video {
  max-width: 90%;
  max-height: 90%;
  border: 2px solid white;
  border-radius: 8px;
  box-shadow: 0 0 20px #fff;
}
</style>