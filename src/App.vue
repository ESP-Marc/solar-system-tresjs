<script setup lang="ts">

/**
 * TresCanvas
 * @link https://docs.tresjs.org/api/tres-canvas.html#props
 */

import { TresCanvas } from '@tresjs/core'
import { MapControls, OrbitControls } from '@tresjs/cientos'
import { ACESFilmicToneMapping, LinearSRGBColorSpace } from 'three'

// Systems
import SolSystem from './components/Sol/System.vue'

</script>

<template>

  <Suspense>

    <template #default>

      <TresCanvas :tone-mapping="ACESFilmicToneMapping" :output-color-space="LinearSRGBColorSpace" antialias window-size>

        <MapControls />
        <TresPerspectiveCamera :position="[0, 500, 0]" :look-at="[0,0,0]" :fov="75" :near="1" :far="10000"/>
        <SolSystem/>

      </TresCanvas>

    </template>

    <template #fallback>

      <div>LOADING SYSTEM...</div>

    </template>

  </Suspense>

</template>

<style scoped>


</style>
