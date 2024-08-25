<script setup lang="ts">

import CelestialPlanet from '@/components/Celestial/Planet.vue'
import { ECelestialRotation } from '@/enums.ts'
import { useTexture } from '@tresjs/core'
import { AdditiveBlending } from 'three'

const earth = {
  orbitSpeed: 0.00029,
  orbitRadius: 16,
  orbitRotationDirection: ECelestialRotation.CLOCKWISE,
  planetSize: 0.5,
  planetAngle: (-23.4 * Math.PI) / 180,
  planetRotationSpeed: 0.01,
  planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
  planetTexture: '/assets/materials/earth-map-1.jpg',
}

const lighting = await useTexture({
  map: '/assets/materials/earth-map-2.jpg',
})

const clouds = await useTexture({
  map: '/assets/materials/earth-map-3.jpg',
  alphaMap: '/assets/materials/earth-map-4.jpg',
})

</script>

<template>

  <TresGroup>

    <CelestialPlanet v-bind="earth">

      <TresMesh>
        <TresSphereGeometry :radius="earth.planetSize"/>
        <TresMeshBasicMaterial v-bind="lighting" :blending="AdditiveBlending"/>
      </TresMesh>

      <TresMesh :scale="1.003">
        <TresSphereGeometry :radius="earth.planetSize"/>
        <TresMeshStandardMaterial v-bind="clouds" :opacity="0.8" :blending="AdditiveBlending" transparent/>
      </TresMesh>

    </CelestialPlanet>

  </TresGroup>

</template>
