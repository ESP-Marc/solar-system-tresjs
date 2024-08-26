<script setup lang="ts">

import { onMounted, ShallowRef, shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { BufferGeometry, DoubleSide, Group, Path, SRGBColorSpace } from 'three'
import { Ring } from '@tresjs/cientos'
import { Text as TroikaText } from 'troika-three-text'

// Components
import Atmosphere from '@/components/Celestial/Atmosphere.vue'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { IPlanet } from '@/types.ts'

// Definitions
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

// References
const groupOrbit = shallowRef() as ShallowRef<Group>

// Variables
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

// const orbitColor = props.atmosphere?.rimHex ?? props.atmosphere?.facingHex ?? 0x56616A
const orbitColor = 0x56616A

const orbitalGeometry = new BufferGeometry().setFromPoints(
    new Path().absarc(0, 0, props.orbitDistance, 0, (Math.PI * 2)).getSpacedPoints(75),
)

// Events

onMounted(() => {

  const label: any = new TroikaText()
  label.text = props.name
  label.font = '/assets/fonts/Roboto-Light.ttf'
  label.color = 0xFFFFFF
  label.fontSize = 1
  label.textAlign = 'center'
  label.anchorX = 'center'
  label.gpuAccelerateSDF = true
  label.maxWidth = 10
  label.position.set(distance, (props.bodyRadius + 5), 0)

  groupOrbit.value.add(label)

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

})

</script>

<template>

  <TresGroup>

    <!-- Orbit Line -->
    <template v-if="distance">
      <TresLine :geometry="orbitalGeometry" :rotation="[(Math.PI / 2),0,0]">
        <TresLineBasicMaterial :color="orbitColor"/>
      </TresLine>
    </template>

    <TresGroup ref="groupOrbit" :rotation="[0, OrbitY, 0]">

      <!-- Entity -->
      <TresGroup :scale="scale" :rotation="[0, PlanetRotationY, 0]" :position="[distance, 0, 0]">

        <!-- Body -->
        <TresMesh :rotate-z="bodyAngle">
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
