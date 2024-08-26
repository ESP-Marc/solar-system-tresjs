<script setup lang="ts">

import Body from '@/components/Celestial/Body.vue'
import { useTexture } from '@tresjs/core'
import { AdditiveBlending } from 'three'

// TYPES
import type { IPlanet } from '@/types.ts'
import { ECelestialRotation } from '@/enums.ts'

withDefaults(defineProps<IPlanet>(), {

  orbitSpeed: 1,
  orbitDistance: 1,
  orbitRotationDirection: ECelestialRotation.CLOCKWISE,

  bodyRadius: 1,
  bodyAngle: 0,
  bodyRotationSpeed: 1,
  bodyRotationDirection: ECelestialRotation.CLOCKWISE,
  texture: '/assets/materials/mercury-map.jpg',

  rimHex: 0x0088ff,
  facingHex: 0x000000,

  rings: undefined,

})

const lighting = await useTexture({
  map: '/assets/materials/earth-map-2.jpg',
})

const clouds = await useTexture({
  map: '/assets/materials/earth-map-3.jpg',
  alphaMap: '/assets/materials/earth-map-4.jpg',
})

</script>

<template>

  <Body v-bind="$props">

    <TresMesh :scale="1.001" :rotate-z="bodyAngle">
      <TresSphereGeometry :radius="$props.bodyRadius"/>
      <TresMeshBasicMaterial v-bind="lighting" :blending="AdditiveBlending"/>
    </TresMesh>

    <TresMesh :scale="1.01">
      <TresSphereGeometry :radius="$props.bodyRadius"/>
      <TresMeshStandardMaterial v-bind="clouds" :opacity="0.8" :blending="AdditiveBlending" transparent/>
    </TresMesh>

  </Body>

</template>
