
declare module 'troika-three-text' {

  function preloadFont ({font, characters, sdfGlyphSize}, callback) {}

  class Text {

    font: string | null
    fontSize: number
    fontStyle: 'normal' | 'italic'
    fontWeight: number | 'normal' | 'bold'
    unicodeFontsURL: string | null
    lang: string | null
    letterSpacing: number
    lineHeight: number | string

    /**
     * @member {string} text
     * The string of text to be rendered.
     */
    text: string
    textAlign: 'left' | 'center' | 'right'
    textIndent: number

    maxWidth: number
    overflowWrap: 'normal' | 'break-word'
    whiteSpace: 'normal' | 'nowrap'

    anchorX: number | string
    anchorY: number | string

    curveRadius: number
    direction: 'auto' | 'ltr' | 'rtl'

    color: number | string

    // === Presentation properties: === //



    // /**
    //  * @member {THREE.Material} material
    //  * Defines a _base_ material to be used when rendering the text. This material will be
    //  * automatically replaced with a material derived from it, that adds shader code to
    //  * decrease the alpha for each fragment (pixel) outside the text glyphs, with antialiasing.
    //  * By default it will derive from a simple white MeshBasicMaterial, but you can use any
    //  * of the other mesh materials to gain other features like lighting, texture maps, etc.
    //  *
    //  * Also see the `color` shortcut property.
    //  */
    // this.material = null
    //
    // /**
    //  * @member {string|number|THREE.Color} color
    //  * This is a shortcut for setting the `color` of the text's material. You can use this
    //  * if you don't want to specify a whole custom `material`. Also, if you do use a custom
    //  * `material`, this color will only be used for this particuar Text instance, even if
    //  * that same material instance is shared across multiple Text objects.
    //  */
    // this.color = null
    //
    // /**
    //  * @member {object|null} colorRanges
    //  * WARNING: This API is experimental and may change.
    //  * This allows more fine-grained control of colors for individual or ranges of characters,
    //  * taking precedence over the material's `color`. Its format is an Object whose keys each
    //  * define a starting character index for a range, and whose values are the color for each
    //  * range. The color value can be a numeric hex color value, a `THREE.Color` object, or
    //  * any of the strings accepted by `THREE.Color`.
    //  */
    // this.colorRanges = null
    //
    // /**
    //  * @member {number|string} outlineWidth
    //  * WARNING: This API is experimental and may change.
    //  * The width of an outline/halo to be drawn around each text glyph using the `outlineColor` and `outlineOpacity`.
    //  * Can be specified as either an absolute number in local units, or as a percentage string e.g.
    //  * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`, which means
    //  * no outline will be drawn unless an `outlineOffsetX/Y` or `outlineBlur` is set.
    //  */
    // this.outlineWidth = 0
    //
    // /**
    //  * @member {string|number|THREE.Color} outlineColor
    //  * WARNING: This API is experimental and may change.
    //  * The color of the text outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
    //  * Defaults to black.
    //  */
    // this.outlineColor = 0x000000
    //
    // /**
    //  * @member {number} outlineOpacity
    //  * WARNING: This API is experimental and may change.
    //  * The opacity of the outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
    //  * Defaults to `1`.
    //  */
    // this.outlineOpacity = 1
    //
    // /**
    //  * @member {number|string} outlineBlur
    //  * WARNING: This API is experimental and may change.
    //  * A blur radius applied to the outer edge of the text's outline. If the `outlineWidth` is
    //  * zero, the blur will be applied at the glyph edge, like CSS's `text-shadow` blur radius.
    //  * Can be specified as either an absolute number in local units, or as a percentage string e.g.
    //  * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`.
    //  */
    // this.outlineBlur = 0
    //
    // /**
    //  * @member {number|string} outlineOffsetX
    //  * WARNING: This API is experimental and may change.
    //  * A horizontal offset for the text outline.
    //  * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
    //  * which is treated as a percentage of the `fontSize`. Defaults to `0`.
    //  */
    // this.outlineOffsetX = 0
    //
    // /**
    //  * @member {number|string} outlineOffsetY
    //  * WARNING: This API is experimental and may change.
    //  * A vertical offset for the text outline.
    //  * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
    //  * which is treated as a percentage of the `fontSize`. Defaults to `0`.
    //  */
    // this.outlineOffsetY = 0
    //
    // /**
    //  * @member {number|string} strokeWidth
    //  * WARNING: This API is experimental and may change.
    //  * The width of an inner stroke drawn inside each text glyph using the `strokeColor` and `strokeOpacity`.
    //  * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
    //  * which is treated as a percentage of the `fontSize`. Defaults to `0`.
    //  */
    // this.strokeWidth = 0
    //
    // /**
    //  * @member {string|number|THREE.Color} strokeColor
    //  * WARNING: This API is experimental and may change.
    //  * The color of the text stroke, if `strokeWidth` is greater than zero. Defaults to gray.
    //  */
    // this.strokeColor = defaultStrokeColor
    //
    // /**
    //  * @member {number} strokeOpacity
    //  * WARNING: This API is experimental and may change.
    //  * The opacity of the stroke, if `strokeWidth` is greater than zero. Defaults to `1`.
    //  */
    // this.strokeOpacity = 1
    //
    // /**
    //  * @member {number} fillOpacity
    //  * WARNING: This API is experimental and may change.
    //  * The opacity of the glyph's fill from 0 to 1. This behaves like the material's `opacity` but allows
    //  * giving the fill a different opacity than the `strokeOpacity`. A fillOpacity of `0` makes the
    //  * interior of the glyph invisible, leaving just the `strokeWidth`. Defaults to `1`.
    //  */
    // this.fillOpacity = 1
    //
    // /**
    //  * @member {number} depthOffset
    //  * This is a shortcut for setting the material's `polygonOffset` and related properties,
    //  * which can be useful in preventing z-fighting when this text is laid on top of another
    //  * plane in the scene. Positive numbers are further from the camera, negatives closer.
    //  */
    // this.depthOffset = 0
    //
    // /**
    //  * @member {Array<number>} clipRect
    //  * If specified, defines a `[minX, minY, maxX, maxY]` of a rectangle outside of which all
    //  * pixels will be discarded. This can be used for example to clip overflowing text when
    //  * `whiteSpace='nowrap'`.
    //  */
    // this.clipRect = null
    //
    // /**
    //  * @member {string} orientation
    //  * Defines the axis plane on which the text should be laid out when the mesh has no extra
    //  * rotation transform. It is specified as a string with two axes: the horizontal axis with
    //  * positive pointing right, and the vertical axis with positive pointing up. By default this
    //  * is '+x+y', meaning the text sits on the xy plane with the text's top toward positive y
    //  * and facing positive z. A value of '+x-z' would place it on the xz plane with the text's
    //  * top toward negative z and facing positive y.
    //  */
    // this.orientation = defaultOrient
    //
    // /**
    //  * @member {number} glyphGeometryDetail
    //  * Controls number of vertical/horizontal segments that make up each glyph's rectangular
    //  * plane. Defaults to 1. This can be increased to provide more geometrical detail for custom
    //  * vertex shader effects, for example.
    //  */
    // this.glyphGeometryDetail = 1
    //
    // /**
    //  * @member {number|null} sdfGlyphSize
    //  * The size of each glyph's SDF (signed distance field) used for rendering. This must be a
    //  * power-of-two number. Defaults to 64 which is generally a good balance of size and quality
    //  * for most fonts. Larger sizes can improve the quality of glyph rendering by increasing
    //  * the sharpness of corners and preventing loss of very thin lines, at the expense of
    //  * increased memory footprint and longer SDF generation time.
    //  */
    // this.sdfGlyphSize = null
    //
    // /**
    //  * @member {boolean} gpuAccelerateSDF
    //  * When `true`, the SDF generation process will be GPU-accelerated with WebGL when possible,
    //  * making it much faster especially for complex glyphs, and falling back to a JavaScript version
    //  * executed in web workers when support isn't available. It should automatically detect support,
    //  * but it's still somewhat experimental, so you can set it to `false` to force it to use the JS
    //  * version if you encounter issues with it.
    //  */
    // this.gpuAccelerateSDF = true
    //
    // this.debugSDF = false

  }

}
