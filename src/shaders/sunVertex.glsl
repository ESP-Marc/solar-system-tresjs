uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

mat2 rotate(float angle) {

    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);

}

void main() {

    vUv = uv;
    vNormal = normal;
    vPosition = position;

    // Calculate the rotation angle based on time
    float rotationAngle = time * 0.025; // Rotation speed

    // Apply the rotation to the x and y components of the position
    vec3 rotatedPosition = position;
    rotatedPosition.zx *= rotate(rotationAngle);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPosition, 1.0);

}
