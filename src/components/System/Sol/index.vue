<script setup lang="ts">

import { Stars, Sky } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

// Components
import CelestialSun from '@/components/Celestial/Sun.vue'
import CelestialPlanet from '@/components/Celestial/Planet.vue'
import SystemSolPlanetEarth from '@/components/System/Sol/Planet/Earth.vue'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { TCelestialPlanet } from '@/types.ts'

const planets: TCelestialPlanet[] = [
  {
    orbitSpeed: 0.00048,
    orbitRadius: 10,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.2,
    planetRotationSpeed: 0.005,
    planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
    planetTexture: '/assets/materials/mercury-map.jpg',
    rimHex: 0xf9cf9f,
  },
  {
    orbitSpeed: 0.00035,
    orbitRadius: 13,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.5,
    planetRotationSpeed: 0.0005,
    planetRotationDirection: ECelestialRotation.CLOCKWISE,
    planetTexture: '/assets/materials/venus-map.jpg',
    rimHex: 0xb66f1f,
  },
  {
    orbitSpeed: 0.00024,
    orbitRadius: 19,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.3,
    planetRotationSpeed: 0.01,
    planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
    planetTexture: '/assets/materials/mars-map.jpg',
    rimHex: 0xbc6434,
  },
  {
    orbitSpeed: 0.00013,
    orbitRadius: 22,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 1,
    planetRotationSpeed: 0.06,
    planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
    planetTexture: '/assets/materials/jupiter-map.jpg',
    rimHex: 0xf3d6b6,
  },
  {
    orbitSpeed: 0.0001,
    orbitRadius: 25,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.8,
    planetRotationSpeed: 0.05,
    planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
    planetTexture: '/assets/materials/saturn-map.jpg',
    rimHex: 0xd6b892,
    rings: {
      size: 0.5,
      texture: '/assets/materials/saturn-rings.jpg',
    },
  },
  {
    orbitSpeed: 0.00007,
    orbitRadius: 28,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.5,
    planetRotationSpeed: 0.02,
    planetRotationDirection: ECelestialRotation.CLOCKWISE,
    planetTexture: '/assets/materials/uranus-map.jpg',
    rimHex: 0x9ab6c2,
    rings: {
      size: 20,
      texture: '/assets/materials/uranus-rings.jpg',
    },
  },
  {
    orbitSpeed: 0.000054,
    orbitRadius: 31,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,
    planetSize: 0.5,
    planetRotationSpeed: 0.02,
    planetRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,
    planetTexture: '/assets/materials/neptune-map.jpg',
    rimHex: 0x5c7ed7,
  },
]

const yStars = shallowRef(0)

useRenderLoop().onLoop(({ delta }) => {
  yStars.value += 0.001 * delta
})

</script>

<template>

  <TresGroup>

    <Suspense suspensible>
      <CelestialSun/>
    </Suspense>

    <Sky :turbidity="1000" :rayleigh="97" :mieCoefficient="0.00015" :mieDirectionalG="1" :distance="100" :elevation="0.1"/>

    <Stars :rotation="[0, yStars, 0]"
           :size="0.15" :radius="65" :depth="1"
           :count="5000" :size-attenuation="false"/>

    <Suspense suspensible>
      <SystemSolPlanetEarth/>
    </Suspense>

        <template v-for="planet in planets">
          <Suspense suspensible>
            <CelestialPlanet v-bind="planet"/>
          </Suspense>
        </template>

  </TresGroup>

</template>
