<script setup lang="ts">

/**
 * TresCanvas
 * @link https://docs.tresjs.org/api/tres-canvas.html#props
 */

import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { ACESFilmicToneMapping, LinearSRGBColorSpace } from 'three'

// Systems
import SystemSol from './components/System/Sol/index.vue'

</script>

<template>

  <Suspense>

    <template #default>

      <TresCanvas :tone-mapping="ACESFilmicToneMapping" :output-color-space="LinearSRGBColorSpace" antialias window-size>

        <OrbitControls :min-distance="10" :max-distance="60"/>
        <TresPerspectiveCamera :position="[30 * Math.cos(Math.PI / 6), 30 * Math.sin(Math.PI / 6), 40]" :fov="75" :near="0.1" :far="1000"/>
        <SystemSol/>

      </TresCanvas>

    </template>

    <template #fallback>

      <div>LOADING SYSTEM...</div>

    </template>

  </Suspense>

</template>

<style scoped>


</style>
