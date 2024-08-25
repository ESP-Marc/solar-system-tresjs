// ENUMS
import { ECelestialRotation } from '@/enums.ts'

// TYPES
import type { Component } from 'vue'

export type IAtmosphere = {

  scale?: number

  rimHex?: number
  facingHex?: number

  fresnelBias?: number
  fresnelScale?: number
  fresnelPower?: number

}

export type IRings = {

  size: number
  texture: string

}

export type ICelestialEntity = {

  name: string
  texture: string
  component: Component

  bodyRadius: number
  bodyRadiusReal: number
  bodyAngle?: number
  bodyRotationSpeed: number
  bodyRotationDirection?: ECelestialRotation,

  atmosphere?: IAtmosphere

}

export type IStar = IAtmosphere & ICelestialEntity & {


}

export type IPlanet = IAtmosphere & ICelestialEntity & {

  index?: number,

  orbitSpeed: number
  orbitDistance: number
  orbitDistanceReal: number
  orbitRotationDirection: ECelestialRotation

  rings?: IRings

}

export type TCelestialEntities = ICelestialEntity | IStar | IPlanet
