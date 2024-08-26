<script setup lang="ts">

import { Stars, Sky } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

// Components
import Star from '@/components/Celestial/Star.vue'
import Body from '@/components/Celestial/Body.vue'
import Earth from '@/components/Sol/Earth.vue'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import { TCelestialEntities } from '@/types.ts'

let accumilateDistance = 0

// Star system composition
// 1 AU (Astronomical Units) = 215.032 R☉ (Solar Radii)
const entities: TCelestialEntities[] = [
  {
    name: 'Sun',
    texture: '/assets/materials/sun-map.jpg',
    component: Star,

    bodyRadius: 0,
    bodyRadiusReal: 696000, // km (kilometers radius)
    bodyRotationSpeed: 1997,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

  },
  {
    name: 'Mercury',
    texture: '/assets/materials/mercury-map.jpg',
    component: Body,

    orbitSpeed: 0.00048,
    orbitDistance: 0,
    orbitDistanceReal: 83.217444, // R☉ (Solar Radii)
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 2440, // km (kilometers radius)
    bodyRotationSpeed: 10.83, // km/h
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    atmosphere: {
      facingHex: 0xf9cf9f,
    }
  },
  {
    name: 'Venus',
    texture: '/assets/materials/venus-map.jpg',
    component: Body,

    orbitSpeed: 0.00035,
    orbitDistance: 0,
    orbitDistanceReal: 155.25322, // R☉ (Solar Radii)
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 6052, // km (kilometers radius)
    bodyRotationSpeed: 6.52, // km/h
    bodyRotationDirection: ECelestialRotation.CLOCKWISE,

    atmosphere: {
      facingHex: 0xb66f1f,
    }
  },
  {
    name: 'Earth',
    texture: '/assets/materials/earth-map-1.jpg',
    component: Earth,

    orbitSpeed: 0.00029,
    orbitDistance: 0,
    orbitDistanceReal: 215.032,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 6371,
    bodyAngle: (-23.4 * Math.PI) / 180,
    bodyRotationSpeed: 1574,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    atmosphere: {
      facingHex: 0x8CD1ED,
      fresnelBias: 0.95,
      fresnelScale: 0.05,
      fresnelPower: 4,
    }

  },
  {
    name: 'Mars',
    texture: '/assets/materials/mars-map.jpg',
    component: Body,

    orbitSpeed: 0.00024,
    orbitDistance: 0,
    orbitDistanceReal: 326.8489,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 3390,
    bodyRotationSpeed: 866,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    atmosphere: {
      facingHex: 0xbc6434,
    }
  },
  {
    name: 'Jupiter',
    texture: '/assets/materials/jupiter-map.jpg',
    component: Body,

    orbitSpeed: 0.00013,
    orbitDistance: 0,
    orbitDistanceReal: 1118.17,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 69911,
    bodyRotationSpeed: 45583,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    atmosphere: {
      rimHex: 0xf3d6b6,
      fresnelBias: 0.01,
      fresnelScale: 0.1,
      fresnelPower: 2,
    }
  },
  {
    name: 'Saturn',
    texture: '/assets/materials/saturn-map.jpg',
    component: Body,

    orbitSpeed: 0.0001,
    orbitDistance: 0,
    orbitDistanceReal: 2060.008,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 58232,
    bodyRotationSpeed: 36840,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    // atmosphere: {
    //   facingHex: 0xd6b892,
    // },

    rings: {
      size: 2,
      texture: '/assets/materials/saturn-rings.jpg',
    },

  },
  {
    name: 'Uranus',
    texture: '/assets/materials/uranus-map.jpg',
    component: Body,

    orbitSpeed: 0.00007,
    orbitDistance: 0,
    orbitDistanceReal: 4128.617,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 25362,
    bodyRotationSpeed: 14794,
    bodyRotationDirection: ECelestialRotation.CLOCKWISE,

    atmosphere: {
      facingHex: 0x9ab6c2,
    },

    rings: {
      size: 2,
      texture: '/assets/materials/uranus-rings.jpg',
    },

  },
  {
    name: 'Neptune',
    texture: '/assets/materials/neptune-map.jpg',
    component: Body,

    orbitSpeed: 0.000054,
    orbitDistance: 0,
    orbitDistanceReal: 6472.468,
    orbitRotationDirection: ECelestialRotation.CLOCKWISE,

    bodyRadius: 0,
    bodyRadiusReal: 24622,
    bodyRotationSpeed: 9719,
    bodyRotationDirection: ECelestialRotation.COUNTERCLOCKWISE,

    atmosphere: {
      facingHex: 0x5c7ed7,
    }

  },
].map((item: TCelestialEntities) => {

  item.bodyRadius = (item.bodyRadiusReal / 5000)
  acumilateDistance += ((item.bodyRadius) + ((item.rings?.size ?? 0) * 10) + 20)

  if ('orbitDistance' in item) {
    item.orbitDistance = (acumilateDistance + 1)
  }

  return item

})

const yStars = shallowRef(0)

useRenderLoop().onLoop(({ delta }) => {
  yStars.value += 0.001 * delta
})

</script>

<template>

  <TresGroup>

    <Sky :turbidity="1000" :rayleigh="97" :mieCoefficient="0.00015" :mieDirectionalG="1" :distance="10000" :elevation="0.01"/>

    <Stars :rotation="[0, yStars, 0]"
           :size="0.15" :radius="1000" :depth="1"
           :count="5000" :size-attenuation="false"/>

    <template v-for="(entity, index) in entities" :key="entity.name">
      <Suspense suspensible>
        <component :is="entity.component" v-bind="entity" :index="index"/>
      </Suspense>
    </template>

  </TresGroup>

</template>
