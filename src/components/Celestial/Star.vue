<script setup lang="ts">

import { onMounted, shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'

import fragment from '@/shaders/sunFragment.glsl'
import vertex from '@/shaders/sunVertex.glsl'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { IStar } from '@/types.ts'
import { Vector2 } from 'three'


// References
const shader = shallowRef()

// Definitions
const props = withDefaults(defineProps<IStar>(), {

  bodyRadius: 1,
  bodyAngle: 0,
  bodyRotationSpeed: 1,
  bodyRotationDirection: ECelestialRotation.CLOCKWISE,
  texture: '/assets/materials/sun-map.jpg',

})

// Variables
const rotationY = shallowRef(0)

// Events

onMounted(() => {

  useRenderLoop().onLoop(({ elapsed }) => {
    shader.value.uniforms.time.value = elapsed
  })

})

</script>

<template>

  <TresGroup :scale="props.bodyRadius">

    <!-- Sun -->
    <TresMesh :rotation="[0, rotationY, 0]">
      <TresSphereGeometry :args="[1, 64, 32]"/>
      <TresShaderMaterial ref="shader" :vertex-shader="vertex" :fragment-shader="fragment" :uniforms="{ time: { value: 1.0 }, resolution: { value: new Vector2() } }"/>
    </TresMesh>

    <!-- Lighting -->
    <TresPointLight :color="0xFFFCF4" :intensity="115000"/>

  </TresGroup>

</template>
