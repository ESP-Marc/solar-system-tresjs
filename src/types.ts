import { ECelestialRotation } from '@/enums.ts'


export type TCelestialPlanetRings = {

    size: number
    texture: string

}

export type TCelestialPlanet = {

    orbitSpeed: number
    orbitRadius: number
    orbitRotationDirection: ECelestialRotation

    planetSize: number
    planetAngle?: number
    planetRotationSpeed: number
    planetRotationDirection: ECelestialRotation
    planetTexture: string

    rimHex?: number
    facingHex?: number

    rings?: TCelestialPlanetRings

}
