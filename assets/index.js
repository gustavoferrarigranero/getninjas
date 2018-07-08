const url = 'http://localhost:3000/'

let form = document.createElement('div');
let fieldset = document.querySelector('.container__form__fieldset');
let jsonRead = {};

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
                    renderForm(fields);
                    return fields
                })
                .catch(error => {
                    console.log(error)
                });
    }
    catch (err) {
        console.log('fetch failed', err);
    }
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

render(url);

function renderForm(fields) {
    fields.request_fields.forEach(field => {
        let label = document.createElement('label')
        label.setAttribute('for', field.name)
        label.innerHTML = field.label
        form.appendChild(label)

        switch (field.type) {
            case 'enumerable':
                renderSelect(field)
                break;

            case 'big_text':
                renderTextArea(field)
                break;
        
            default:
                break;
        }
    });
    fieldset.innerHTML = ''
    fieldset.appendChild(form)
}
function renderTextArea (field) {
    let textArea = document.createElement('textarea')
    textArea.setAttribute('name', field.name)
    textArea.setAttribute('id', field.name)
    textArea.setAttribute('rows', 5)
    textArea.setAttribute('placeholder', field.placeholder)
    form.appendChild(textArea);
}
function renderSelect (field) {
    let select = document.createElement('select')

    select.setAttribute('name', field.name)
    select.setAttribute('id', field.name)

    let option = document.createElement('option')
    option.setAttribute('value', '')
    option.innerHTML = field.placeholder

    select.appendChild(option)

    if(field.required)
        select.setAttribute('required', true)

    console.log(field.values);
        
    for(let item in field.values){
        option = document.createElement('option')
        option.setAttribute('value', item)
        option.innerHTML = item
        select.appendChild(option)
    }

    form.appendChild(select);
}
