<script setup lang="ts">

import { shallowRef } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { AdditiveBlending, BackSide, Color } from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

const yRotation = shallowRef(0)

const texture = await useTexture({
  map: '/assets/materials/sun-map.jpg',
})

// Shaders

const glow = {

  uniforms: {
    color1: { value: new Color(0x000000) },
    color2: { value: new Color(0xff0000) },
    fresnelBias: { value: 0.91 },
    fresnelScale: { value: 0.1 },
    fresnelPower: { value: 0.5 },
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

const rim = {

  uniforms: {
    color1: { value: new Color(0xffff99) },
    color2: { value: new Color(0x000000) },
    fresnelBias: { value: 0.2 },
    fresnelScale: { value: 5 },
    fresnelPower: { value: 1.5 },
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

const coronaNoise = new ImprovedNoise();

useRenderLoop().onLoop(({ delta }) => {

  yRotation.value = yRotation.value > 360 ? 0 : (yRotation.value + (delta / 10));

  // for (let i = 0; i < len; i += 1) {
  //   p.fromBufferAttribute(pos, i).normalize();
  //   v3.copy(p).multiplyScalar(5);
  //   let ns = coronaNoise.noise(
  //       v3.x + Math.cos(t),
  //       v3.y + Math.sin(t),
  //       v3.z + t
  //   );
  //   v3.copy(p)
  //       .setLength(5)
  //       .addScaledVector(p, ns * 0.4);
  //   pos.setXYZ(i, v3.x, v3.y, v3.z);
  // }

  // pos.needsUpdate = true;

})

</script>

<template>

  <TresGroup :scale="4">

    <!-- Sun -->
    <TresMesh :rotation="[0, yRotation, 0]">
      <TresSphereGeometry :radius="1"/>
      <TresMeshBasicMaterial v-bind="texture" />
    </TresMesh>

    <!-- Corona -->
    <TresMesh>
      <TresSphereGeometry :radius="2" />
      <TresMeshBasicMaterial :color="0xFF0000" :side="BackSide"/>
    </TresMesh>

    <!-- Glow-->
    <TresMesh :scale="1.2">
      <TresSphereGeometry />
      <TresShaderMaterial v-bind="glow"/>
    </TresMesh>

    <!-- Rim -->
    <TresMesh :scale="1.1">
      <TresSphereGeometry />
      <TresShaderMaterial v-bind="rim"/>
    </TresMesh>

    <!-- Lighting -->
    <TresPointLight :color="0xFFFF99" :intensity="1000"/>

  </TresGroup>

</template>
