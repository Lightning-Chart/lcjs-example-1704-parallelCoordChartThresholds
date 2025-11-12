const lcjs = require('@lightningchart/lcjs')
const { lightningChart, Themes, SolidLine, PalettedFill, LUT, ColorRGBA } = lcjs

const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
const chart = lc
    .ParallelCoordinateChart({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Parallel Coordinate Chart with Value thresholds')

const Axes = {
    'Variable A': 0,
    'Variable B': 1,
    'Variable C': 2,
}
chart.setAxes(Axes)
chart.getAxis(Axes['Variable A']).setInterval({ start: 20, end: 60 })
chart.getAxis(Axes['Variable B']).setInterval({ start: 80, end: 120 })
chart.getAxis(Axes['Variable C']).setInterval({ start: 0.0, end: 2.5 })

const series1 = chart.addSeries(
    { automaticColorIndex: 0 }
).setName('Sample 1').setData({
    'Variable A': 36,
    'Variable B': 100,
    'Variable C': 1.1,
})

const series2 = chart.addSeries(
    { automaticColorIndex: 2 }
).setName('Sample 2').setData({
    'Variable A': 32,
    'Variable B': 115,
    'Variable C': 0.5,
})

const series3 = chart.addSeries(
    { automaticColorIndex: 4 }
).setName('Sample 3').setData({
    'Variable A': 35,
    'Variable B': 82,
    'Variable C': 0.9,
})

// Show value range warning thresholds for each axis.
// This can be done by styling the Axis stroke with color lookup by Y
const theme = chart.getTheme()
const colorOK = ColorRGBA(0, 0, 0, 0)
const colorWarning = theme.examples.badGoodColorPalette[0]
chart.getAxis(Axes['Variable A']).setStrokeStyle(
    new SolidLine({
        thickness: 4,
        fillStyle: new PalettedFill({
            lookUpProperty: 'y',
            lut: new LUT({
                interpolate: false,
                steps: [
                    { value: 0, color: colorOK },
                    { value: 50, color: colorWarning },
                ],
            }),
        }),
    }),
)
chart.getAxis(Axes['Variable B']).setStrokeStyle(
    new SolidLine({
        thickness: 4,
        fillStyle: new PalettedFill({
            lookUpProperty: 'y',
            lut: new LUT({
                interpolate: false,
                steps: [
                    { value: 0, color: colorWarning },
                    { value: 85, color: colorOK },
                ],
            }),
        }),
    }),
)
chart.getAxis(Axes['Variable C']).setStrokeStyle(
    new SolidLine({
        thickness: 4,
        fillStyle: new PalettedFill({
            lookUpProperty: 'y',
            lut: new LUT({
                interpolate: false,
                steps: [
                    { value: 0, color: colorWarning },
                    { value: 0.2, color: colorOK },
                    { value: 1.5, color: colorWarning },
                ],
            }),
        }),
    }),
)
