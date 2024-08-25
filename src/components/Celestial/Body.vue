<script setup lang="ts">

import { shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { DoubleSide, SRGBColorSpace } from 'three'
import { Ring } from '@tresjs/cientos'

// Components
import Atmosphere from '@/components/Celestial/Atmosphere.vue'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { IPlanet } from '@/types.ts'


const props = withDefaults(defineProps<IPlanet>(), {

  index: 0,

  orbitSpeed: 0,
  orbitDistance: 0,
  orbitRotationDirection: ECelestialRotation.CLOCKWISE,

  bodyRadius: 1,
  bodyAngle: 0,
  bodyRotationSpeed: 1,
  bodyRotationDirection: ECelestialRotation.CLOCKWISE,
  texture: '/assets/materials/mercury-map.jpg',

  rimHex: 0x0088ff,
  facingHex: 0x000000,

  rings: undefined,

  atmosphere: undefined,

})

const isClockwise = props.orbitRotationDirection === ECelestialRotation.CLOCKWISE
const rotationSpeed = (isClockwise ? -1:1) * Math.abs(props.bodyRotationSpeed / ((365 * 6000)))
const scale = props.bodyRadius
const distance = props.orbitDistance

const OrbitY = shallowRef(0)
const PlanetRotationY = shallowRef(0)

// Load Textures
const texture = await useTexture({
  map: props.texture,
})

const ringsTexture = await (props.rings ? useTexture({
  map: props.rings.texture,
}):null)

// Render Loops

if (props.orbitSpeed > 0) {

  useRenderLoop().onLoop(() => {
    OrbitY.value += (isClockwise ? -1:1) * (props.orbitSpeed)
  })

}

if (props.bodyRotationSpeed > 0) {

  useRenderLoop().onLoop(() => {
    PlanetRotationY.value = PlanetRotationY.value > 360 ? 0 : (rotationSpeed + PlanetRotationY.value)
  })

}

</script>

<template>

  <TresGroup :rotation="[0, OrbitY, 0]">

    <!-- Orbit Line -->
    <template v-if="distance">
      <TresLine>
        <TresBufferGeometry>
          <TresPath :absarc="[0, 0, 5, 0, (Math.PI * 2)]" :get-spaced-points="50"/>
        </TresBufferGeometry>
        <TresLineBasicMaterial :color="0xADD8E6"/>
      </TresLine>
      <!--    <TresMesh :rotation="[(Math.PI / 2), 0, 0]">-->
      <!--      <TresRingGeometry :radius="orbit" :tube="0.01" :segments="1"/>-->
      <!--      <TresMeshBasicMaterial :color="0xADD8E6" :side="DoubleSide"/>-->
      <!--    </TresMesh>-->
    </template>

    <!-- Planet -->
    <TresGroup :scale="scale" :rotation="[0, PlanetRotationY, bodyAngle]" :position="[distance, 0, 0]">

      <!-- Body -->
      <TresMesh>
        <TresSphereGeometry/>
        <TresMeshPhongMaterial v-bind="texture" :color-space="SRGBColorSpace"/>
      </TresMesh>

      <!-- Atmosphere -->
      <template v-if="atmosphere">
        <Atmosphere/>
      </template>

      <!-- Rings -->
      <template v-if="rings">

        <Ring :args="[0, rings.size, 32]" :rotation="[(Math.PI / 2), 0, 0]">
          <TresMeshBasicMaterial v-bind="ringsTexture" :side="DoubleSide" transparent/>
        </Ring>

      </template>

      <slot/>

    </TresGroup>

  </TresGroup>

</template>
