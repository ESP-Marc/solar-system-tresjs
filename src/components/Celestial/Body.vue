<script setup lang="ts">

import { shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { BufferGeometry, DoubleSide, Path, SRGBColorSpace } from 'three'
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
const rotationSpeed = (isClockwise ? -1 : 1) * Math.abs(props.bodyRotationSpeed / ((365 * 6000)))
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
}) : null)

// Render Loops

if (props.orbitSpeed > 0) {

  useRenderLoop().onLoop(() => {
    OrbitY.value += (isClockwise ? -1 : 1) * (props.orbitSpeed)
  })

}

if (props.bodyRotationSpeed > 0) {

  useRenderLoop().onLoop(() => {
    PlanetRotationY.value = PlanetRotationY.value > 360 ? 0 : (rotationSpeed + PlanetRotationY.value)
  })

}

// const orbitColor = props.atmosphere?.rimHex ?? props.atmosphere?.facingHex ?? 0x56616A
const orbitColor = 0x56616A

const orbitalGeometry = new BufferGeometry().setFromPoints(
    new Path().absarc(0, 0, props.orbitDistance, 0, (Math.PI * 2)).getSpacedPoints(75),
)

</script>

<template>

  <TresGroup>

    <!-- Orbit Line -->
    <template v-if="distance">
      <TresLine :geometry="orbitalGeometry" :rotation="[(Math.PI / 2),0,0]">
        <TresLineBasicMaterial :color="orbitColor"/>
      </TresLine>
    </template>

    <TresGroup :rotation="[0, OrbitY, 0]">

      <!-- Planet -->
      <TresGroup :scale="scale" :rotation="[0, PlanetRotationY, bodyAngle]" :position="[distance, 0, 0]">

        <!-- Body -->
        <TresMesh>
          <TresSphereGeometry/>
          <TresMeshPhongMaterial v-bind="texture" :color-space="SRGBColorSpace"/>
        </TresMesh>

        <!-- Atmosphere -->
        <template v-if="atmosphere">
          <Atmosphere v-bind="atmosphere"/>
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

  </TresGroup>

</template>
