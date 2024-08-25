<script setup lang="ts">

import { shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { MeshBasicMaterial } from 'three'
import { CustomShaderMaterial } from '@tresjs/cientos'

// Components
import Atmosphere from '@/components/Celestial/Atmosphere.vue'

// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { IStar } from '@/types.ts'


// References
const corona = shallowRef()

// Definitions
const props = withDefaults(defineProps<IStar>(), {

  bodyRadius: 1,
  bodyAngle: 0,
  bodyRotationSpeed: 1,
  bodyRotationDirection: ECelestialRotation.CLOCKWISE,
  texture: '/assets/materials/sun-map.jpg',

})

// Variables
const scale = props.bodyRadius

const RotationY = shallowRef(0)


// Textures
const texture = await useTexture({
  map: props.texture,
})

// Shaders

// const coronaShader = {
//   baseMaterial: MeshBasicMaterial,
//   uniforms: {
//     u_Time: { value: 0 },
//     u_WobbleSpeed: { value: 0.25 },
//     u_WobbleAmplitude: { value: 0.025 },
//     u_WobbleFrequency: { value: 250 },
//   },
//   fragmentShader: `
//     varying float vWobble;
//
//     uniform float u_Time;
//
//     void main() {
//       float wobble = vWobble * 0.1;
//       csm_FragColor = mix(vec4(0.75, 0.62, 0.50, 0.7), vec4(0.8, 0.4, 0.55, 0.7), wobble);
//     }
//   `,
//   vertexShader: `
//     uniform float u_Time;
//     uniform float u_WobbleSpeed;
//     uniform float u_WobbleAmplitude;
//     uniform float u_WobbleFrequency;
//
//     varying float vWobble;
//
//     void main() {
//       float wobble = sin(csm_Position.z * u_WobbleFrequency + u_Time * u_WobbleSpeed);
//       csm_Position += normal * wobble * u_WobbleAmplitude;
//
//       vWobble = wobble;
//     }
//   `,
//
// }

// Events

useRenderLoop().onLoop(({ delta }) => {
  RotationY.value = RotationY.value > 360 ? 0 : (RotationY.value + (delta / 10));
  // coronaShader.uniforms.u_Time.value += 0.01 * coronaShader.uniforms.u_WobbleSpeed.value
})
const color = '#fffcf4'
</script>

<template>

  <TresGroup :scale="scale">

    <!-- Sun -->
    <TresMesh :rotation="[0, RotationY, 0]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial v-bind="texture" />
    </TresMesh>

    <!-- Corona -->
<!--    <TresMesh :scale="1.00">-->
<!--      <TresSphereGeometry ref="corona" />-->
<!--      <CustomShaderMaterial v-bind="coronaShader" />-->
<!--    </TresMesh>-->

    <!-- Rim -->
    <Atmosphere :scale="1.0075" :rim-hex="0xffff99" :facing-hex="0x000000"
                :fresnel-bias="0.2" :fresnel-scale="2" :fresnel-power="5" />

    <!-- Glow -->
    <Atmosphere :scale="1.15" :rim-hex="0x000000" :facing-hex="0xff0000"
                :fresnel-bias="0.45" :fresnel-scale="2.25" :fresnel-power="4" />

    <!-- Lighting -->
    <TresPointLight :color="0xFFFCF4" :intensity="105000"  />

  </TresGroup>

</template>
