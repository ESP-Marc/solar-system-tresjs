<script setup lang="ts">

import { shallowRef } from 'vue'
import { ECelestialRotation } from '@/enums.ts'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { AdditiveBlending, Color, DoubleSide, SRGBColorSpace } from 'three'

// Types
import type { TCelestialPlanet } from '@/types.ts'

const props = withDefaults(defineProps<TCelestialPlanet>(), {

  orbitSpeed: 1,
  orbitRadius: 1,
  orbitRotationDirection: ECelestialRotation.CLOCKWISE,

  planetSize: 1,
  planetAngle: 0,
  planetRotationSpeed: 1,
  planetRotationDirection: ECelestialRotation.CLOCKWISE,
  planetTexture: '/assets/materials/mercury-map.jpg',

  rimHex: 0x0088ff,
  facingHex: 0x000000,

  rings: undefined,

})

const glow = {

  uniforms: {
    color1: { value: new Color(props.rimHex) },
    color2: { value: new Color(props.facingHex) },
    fresnelBias: { value: 0.2 },
    fresnelScale: { value: 1.5 },
    fresnelPower: { value: 4.0 },
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

}

const texture = await useTexture({
  map: props.planetTexture,
})

const ringsTexture = await (props.rings ? useTexture({
  map: props.rings.texture,
}):null)

const OrbitY = shallowRef(0)
const PlanetRotationY = shallowRef(0)

useRenderLoop().onLoop(() => {

  if (props.orbitRotationDirection === ECelestialRotation.CLOCKWISE) {

    OrbitY.value -= props.orbitSpeed
    PlanetRotationY.value -= props.planetRotationSpeed

  } else {

    OrbitY.value += props.orbitSpeed
    PlanetRotationY.value += props.planetRotationSpeed

  }

})

</script>

<template>

  <TresGroup :rotation="[0, OrbitY, 0]">

    <!-- Orbit Line -->
    <TresLine>
      <TresBufferGeometry>
        <TresPath :absarc="[0, 0, 5, 0, (Math.PI * 2)]" :get-spaced-points="50"/>
      </TresBufferGeometry>
      <TresLineBasicMaterial :color="0xADD8E6"/>
    </TresLine>
    <!--    <TresMesh :rotation="[(Math.PI / 2), 0, 0]">-->
    <!--      <TresRingGeometry :radius="orbitRadius" :tube="0.01" :segments="1"/>-->
    <!--      <TresMeshBasicMaterial :color="0xADD8E6" :side="DoubleSide"/>-->
    <!--    </TresMesh>-->

    <!-- Planet -->
    <TresGroup :scale="planetSize" :rotation="[0, 0, planetAngle]" :position="[(orbitRadius - planetSize / 9), 0, planetAngle]">

      <!-- Body -->
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshPhongMaterial v-bind="texture" :color-space="SRGBColorSpace"/>
      </TresMesh>

      <!-- Glow -->
      <TresMesh :scale="1.1">
        <TresSphereGeometry />
        <TresShaderMaterial v-bind="glow"/>
      </TresMesh>
      <TresMesh>
        <TresSphereGeometry :radius="planetSize * 2"/>
        <TresMeshPhongMaterial :color="0xFFBB11" :color-space="SRGBColorSpace"/>
      </TresMesh>
      <!-- Rings -->
      <template v-if="rings">



        <TresMesh :rotation="[(Math.PI / 2), 0, 0]">
          <TresRingGeometry :innerRadius="(planetSize + 0.1)" :outerRadius="(planetSize + 0.1 + rings.size)" :thetaSegments="32"/>
          <TresMeshBasicMaterial  :color="0xffff00" :side="DoubleSide"/>
        </TresMesh>
      </template>

      <slot/>

    </TresGroup>

  </TresGroup>

</template>
