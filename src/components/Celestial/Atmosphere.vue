<script setup lang="ts">

import { AdditiveBlending, Color } from 'three'

// TYPES
import type { IAtmosphere } from '@/types.ts'
import { computed } from 'vue'


const props = withDefaults(defineProps<IAtmosphere>(), {

  scale: 1.1,

  rimHex: 0x000000,
  facingHex: 0x000000,

  fresnelBias: 0.95,
  fresnelScale: 0.05,
  fresnelPower: 4.0,

})

const shader = computed(() => ({

  uniforms: {
    color1: { value: new Color(props.rimHex) },
    color2: { value: new Color(props.facingHex) },
    fresnelBias: { value: props.fresnelBias },
    fresnelScale: { value: props.fresnelScale },
    fresnelPower: { value: props.fresnelPower },
  },

  vertexShader: `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

      vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

      vec3 I = worldPosition.xyz - cameraPosition;

      vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

      gl_Position = projectionMatrix * mvPosition;
    }
    `,

  fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;

      varying float vReflectionFactor;

      void main() {
        float f = clamp( vReflectionFactor, 0.0, 1.0 );
        gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
      }
    `,

  transparent: true,
  blending: AdditiveBlending,

}))

</script>

<template>

  <TresMesh :scale="scale">
    <TresSphereGeometry/>
    <TresShaderMaterial v-bind="shader"/>
  </TresMesh>

</template>
