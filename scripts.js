const filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    exposure: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
}

const defaultFilters = JSON.parse(JSON.stringify(filters))

const filtersContainer = document.querySelector(".filters")
const imageInput = document.getElementById("image-input")
const previewImg = document.getElementById("preview-img")
const placeholder = document.querySelector(".placeholder")
const resetBtn = document.getElementById("reset-btn")
const downloadBtn = document.getElementById("download-btn")
const navUploadBtn = document.getElementById("nav-upload-btn")

function formatLabel(name) {
    return name.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())
}

function applyFilters() {
    if (!previewImg || !previewImg.src) return

    const filterString = [
        `brightness(${filters.brightness.value}${filters.brightness.unit})`,
        `contrast(${filters.contrast.value}${filters.contrast.unit})`,
        // Using brightness to approximate exposure
        `brightness(${filters.exposure.value}${filters.exposure.unit})`,
        `saturate(${filters.saturation.value}${filters.saturation.unit})`,
        `hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})`,
        `blur(${filters.blur.value}${filters.blur.unit})`,
        `opacity(${filters.opacity.value}${filters.opacity.unit})`,
        `grayscale(${filters.grayscale.value}${filters.grayscale.unit})`,
        `sepia(${filters.sepia.value}${filters.sepia.unit})`,
        `invert(${filters.invert.value}${filters.invert.unit})`
    ].join(" ")

    previewImg.style.filter = filterString
    previewImg.dataset.filterString = filterString
}

function handleImageLoad(src) {
    if (!previewImg) return
    previewImg.src = src
    previewImg.classList.remove("hidden")
    placeholder?.classList.add("hidden")
    previewImg.onload = () => applyFilters()
}

function handleImageInput(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        if (typeof reader.result === "string") {
            handleImageLoad(reader.result)
        }
    }
    reader.readAsDataURL(file)
}

function resetFilters() {
    Object.keys(filters).forEach(key => {
        filters[key].value = defaultFilters[key].value
        const input = document.getElementById(key)
        if (input) input.value = defaultFilters[key].value
    })
    applyFilters()
}

function downloadImage() {
    if (!previewImg || !previewImg.src) return
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = previewImg.naturalWidth
    canvas.height = previewImg.naturalHeight
    ctx.filter = previewImg.dataset.filterString || "none"
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)

    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
}

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")

    const label = document.createElement("p")
    label.innerText = formatLabel(name)

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name
    input.name = name
    input.dataset.unit = unit

    input.addEventListener("input", event => {
        const target = event.target
        filters[name].value = Number(target.value)
        applyFilters()
    })

    div.appendChild(label)
    div.appendChild(input)

    return div
}

Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    )
    filtersContainer.append(filterElement)
})

imageInput?.addEventListener("change", handleImageInput)
resetBtn?.addEventListener("click", resetFilters)
downloadBtn?.addEventListener("click", downloadImage)
navUploadBtn?.addEventListener("click", () => imageInput?.click())