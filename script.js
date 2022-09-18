// https://quranenc.com/en/browse/bengali_zakaria/2
// https://quranenc.com/api/v1/translation/sura/bengali_zakaria/2
// https://quranenc.com/api/v1/translation/aya/bengali_zakaria/1



const modalArea = document.getElementById('modal-area')
/* Load Data From API */
const loadData = async () => {
    const res = await fetch('https://api.alquran.cloud/v1/quran?fbclid=IwAR36lJr2Q7Dl2tD-NK9sxxl0LnrZ2ktxOWYYox1lyvHRjDger7ckkUIYddA')
    const data = await res.json()
    return data.data.surahs
}

/* Display Buttons With Surah Name */
const surahSection = document.getElementById('surah-section')
const displayData = async () => {
    const data = await loadData()
    data.forEach(surah => {
        const div = document.createElement('div')
        div.innerHTML = `
            <label for="my-modal-3" class="btn modal-button w-full border rounded-md px-3 py-2 btn-outline btn-success">${surah.number}. ${surah.englishName} - ${surah.name}</label>
        `
        div.addEventListener('click', function () {
            modalArea.innerHTML = ''
            surahModal(surah)
        })
        surahSection.appendChild(div)
    })
}
displayData()
const modalBody = document.getElementById('modal-body')
modalBody.style.maxWidth = '80%'


const modalText = document.createElement('div')
modalText.setAttribute('id', "modal-text")

/* Modal Set For Reading Surah */
const surahModal = async (surahObject) => {
    modalBody.innerHTML = ""
    modalText.innerHTML = ""
    const surahObj = surahObject
    const { number, name, englishName } = surahObj
    const res = await fetch(`https://quranenc.com/api/v1/translation/sura/bengali_zakaria/${number}`)
    const data = await res.json()
    const surah = data.result

    // <label for="my-modal-3" class="btn btn-sm btn-circle">✕</label>
    // <button id="surah-arabic" class="btn btn-sm">Arabic</button>
    // <button id="surah-translate" class="btn btn-sm">Bengali</button>
    // <button id="surah-describe" class="btn btn-sm">Describe</button>

    const modalBtn = document.createElement('div')
    modalBtn.classList.add("flex", "justify-between", "sticky", "left-0", "top-0")
    modalBtn.innerHTML = `
        <div class="navbar">
            <div class="navbar-start">
                <div class="dropdown">
                <label tabindex="0" class="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li id="surah-arabic"><a>Arabic</a></li>
                    <li id="surah-translate"><a>Bengali</a></li>
                    <li id="surah-describe"><a>Describe</a></li>
                </ul>
                </div>
            </div>
            <div class="navbar-end">
                <button class="btn btn-ghost btn-circle"><label for="my-modal-3" class="btn btn-sm btn-circle">✕</label></button>
            </div>
        </div>
    `
    const modalHeading = document.createElement('div')
    modalHeading.innerHTML = `
        <h3 class="text-lg font-bold text-center py-2">${number}. ${englishName} - ${name}</h3>
        <h4 class="text-md font-semibold text-center pb-5">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</h4>
    `
    modalBody.appendChild(modalBtn)
    modalBody.appendChild(modalHeading)



    surah.forEach(ayah => {
        const span = document.createElement('span')
        span.innerHTML = `
            <span class="p-1"> ${ayah.arabic_text} ۝  </span>
        `
        modalText.appendChild(span)
        modalBody.appendChild(modalText)
    })
    modalArea.appendChild(modalBody)





    /* Arabic */
    document.getElementById('surah-arabic').addEventListener('click', () => {
        modalText.innerHTML = ""

        surah.forEach(arabic => {
            const span = document.createElement('span')
            modalBody.classList.remove("relative")
            span.innerHTML = `
                <span class="p-1">${arabic.arabic_text} ۝  </span>
            `
            modalText.appendChild(span)
            modalBody.appendChild(modalText)
        })
    })

    /* Describe */
    document.getElementById('surah-describe').addEventListener('click', () => {
        modalText.innerHTML = ""

        surah.forEach(translate => {
            const span = document.createElement('span')
            modalBody.classList.remove("relative", "text-right")
            span.innerHTML = `
                <span class="p-1">${translate.footnotes}</span>
            `
            modalText.appendChild(span)
            modalBody.appendChild(modalText)
        })
    })


    /* Translation */
    document.getElementById('surah-translate').addEventListener('click', () => {
        modalText.innerHTML = ""

        surah.forEach(translate => {
            const span = document.createElement('span')
            modalBody.classList.remove("relative", "text-right")
            span.innerHTML = `
                <span class="p-1">${translate.translation}</span>
            `
            modalText.appendChild(span)
            modalBody.appendChild(modalText)
        })
    })
}







/* Search Input Field Find Surah */
const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keypress', async (event) => {
    const data = await loadData()
    if (event.key === "Enter") {
        surahSection.innerHTML = ''
        const foundData = data.filter(surah => surah.englishName.toLowerCase().includes(searchInput.value.toLowerCase()))
        foundData.forEach(surah => {
            const div = document.createElement('div')
            div.innerHTML = `
                <label for="my-modal-3" class="btn modal-button w-full border rounded-md px-3 py-2 btn-outline btn-success">${surah.number}. ${surah.englishName} - ${surah.name}</label>
            `
            div.addEventListener('click', function () {
                surahModal(surah)
            })
            surahSection.appendChild(div)
        })
    }
})