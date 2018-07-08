const url = 'http://localhost:3000/'

let form = null
let fieldset = document.querySelector('.container__form__fieldset')
let jsonRead = {}
let blank = null

async function render(url) {
    try {
        await wait(500)
        const response = await fetch(url, {
                method: 'POST',
                body: []
            })
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    return jsonRead = json._embedded
                })
                .then(fields => {
                    renderForm(fields.request_fields)
                    return fields
                })
                .catch(error => {
                    console.log(error)
                })
    }
    catch (err) {
        console.log('fetch failed', err)
    }
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}

render(url)

function renderForm(fields) {
    form = document.createElement('div')

    fields.forEach(field => {
        let label = document.createElement('label')
        label.setAttribute('for', field.name)
        label.innerHTML = field.label
        form.appendChild(label)

        switch (field.type) {
            case 'enumerable':
                renderSelect(field)
                break

            case 'big_text':
                renderTextArea(field)
                break

            case 'cep':
            case 'small_text':
            case 'phone':
            case 'email':
                renderInput(field)
                break
        
            default:
                break
        }
    })

    if(!blank)
        blank = document.querySelector('.container__form__fieldset__blank')

    fieldset.innerHTML = ''
    fieldset.appendChild(form)
    bindValidity()
}

function renderTextArea (field) {
    let textArea = document.createElement('textarea')
    textArea.setAttribute('name', field.name)
    textArea.setAttribute('id', field.name)
    textArea.setAttribute('rows', 5)
    textArea.setAttribute('placeholder', field.placeholder)
    form.appendChild(textArea)
}

function renderSelect (field) {
    let select = document.createElement('select')

    select.setAttribute('name', field.name)
    select.setAttribute('id', field.name)

    let option = document.createElement('option')
    option.innerHTML = field.placeholder
    option.setAttribute('value', '')
    option.setAttribute('disabled', '')
    option.setAttribute('selected', '')

    select.appendChild(option)


    let errorValidate = null

    if(field.required){
        select.setAttribute('required', '')
        errorValidate = document.createElement('span')
    }
        
    for(let item in field.values){
        option = document.createElement('option')
        option.setAttribute('value', item)
        option.innerHTML = item
        select.appendChild(option)
    }

    form.appendChild(select)

    if(errorValidate)
        form.appendChild(errorValidate)
}

function renderInput(field) {
    let input = document.createElement('input')

    input.setAttribute('name', field.name)
    input.setAttribute('id', field.name)
    input.setAttribute('type', field.type)
    input.setAttribute('placeholder', field.placeholder)

    let errorValidate = null

    if(field.required){
        input.setAttribute('required', '')
        errorValidate = document.createElement('span')
    }

    form.appendChild(input)

    if(errorValidate)
        form.appendChild(errorValidate)
}

function bindValidity() {
    let fields = document.querySelectorAll('.container__form__fieldset input, .container__form__fieldset select')
    fields.forEach(field => {
        field.addEventListener('invalid', () => {
            field.classList.add('invalid')
            field.addEventListener('change', () => {
                field.classList.remove('invalid')
            })
        }, false)
    })
}

function actionForm() {
    let form = document.querySelector('.container__form')
    let fields = form.querySelectorAll('input[required], select[required]')
    let pass = true
    let step = form.dataset.step

    fields.forEach((field) => {
        if(!field.checkValidity())
            pass = false
    })

    if(pass && step == 1){
        //TODO implement save user choices in localStorage or rest API
        fieldset.innerHTML = '' 
        fieldset.appendChild(blank)

        setTimeout(() => {
            renderForm(jsonRead.user_fields)
            form.dataset.step = 2
        }, 1000)
    } else if(pass && step == 2){
        //TODO implement save user choices in localStorage or rest API
        form.submit()
    }
}