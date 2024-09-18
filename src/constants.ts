const minRadius = 216.20
const maxRadius = 2500000
const radii = Array.from({ length: 32 }).map((_, i) => {
    const exp = Math.log10(minRadius) + 
        i * (Math.log10(maxRadius) - Math.log10(minRadius)) / 31
    return 10 ** exp
})
const centerLatInt = 180 / ((2 ** 16) - 1)
const centerLongInt = 360 / ((2 ** 17) - 1)
const lengthFactors = [
  0.25, 0.5, 0.75,
  1, 2, 3, 5, 
  10, 20, 30, 40, 50, 
  70, 100, 150, 200
]

export { minRadius, maxRadius, radii, centerLatInt, centerLongInt, lengthFactors }
