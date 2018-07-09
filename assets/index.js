const app = {
    
    url: 'http://localhost:3000/',
    form: null,
    fieldset: document.querySelector('.container__form__fieldset'),
    jsonRead: {},
    blank: null,

    render: async () => {
        try {
            await app.wait(500)
            const response = await fetch(app.url, {
                    method: 'POST',
                    body: []
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(json => {
                        return app.jsonRead = json._embedded
                    })
                    .then(fields => {
                        app.renderForm(fields.request_fields)
                        return fields
                    })
                    .catch(error => {
                        console.log(error)
                    })
        }
        catch (err) {
            console.log('fetch failed', err)
        }
    },

    wait: (ms) => {
        return new Promise(r => setTimeout(r, ms))
    },

    renderForm: (fields) => {
        app.form = document.createElement('div')

        fields.forEach(field => {
            let label = document.createElement('label')
            label.setAttribute('for', field.name)
            label.innerHTML = field.label
            app.form.appendChild(label)

            switch (field.type) {
                case 'enumerable':
                    app.renderSelect(field)
                    break

                case 'big_text':
                    app.renderTextArea(field)
                    break

                case 'cep':
                case 'small_text':
                case 'phone':
                case 'email':
                    app.renderInput(field)
                    break
            
                default:
                    break
            }
        })

        if(!app.blank)
            app.blank = document.querySelector('.container__form__fieldset__blank')

        app.fieldset.innerHTML = ''
        app.fieldset.appendChild(app.form)
        app.bindValidity()
    },

    renderTextArea: (field) => {
        let textArea = document.createElement('textarea')
        textArea.setAttribute('name', field.name)
        textArea.setAttribute('id', field.name)
        textArea.setAttribute('rows', 5)
        textArea.setAttribute('placeholder', field.placeholder)
        app.form.appendChild(textArea)
    },

    renderSelect: (field) => {
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

        app.form.appendChild(select)

        if(errorValidate)
            app.form.appendChild(errorValidate)
    },

    renderInput: (field) => {
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

        app.form.appendChild(input)

        if(errorValidate)
            app.form.appendChild(errorValidate)
    },

    bindValidity: () => {
        let fields = document.querySelectorAll('.container__form__fieldset input, .container__form__fieldset select')
        fields.forEach(field => {
            field.addEventListener('invalid', () => {
                field.classList.add('invalid')
                field.addEventListener('change', () => {
                    field.classList.remove('invalid')
                })
            }, false)
        })
    },

    actionForm: () => {
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
            app.fieldset.innerHTML = '' 
            app.fieldset.appendChild(app.blank)

            setTimeout(() => {
                app.renderForm(app.jsonRead.user_fields)
                form.dataset.step = 2
            }, 1000)
        } else if(pass && step == 2){
            //TODO implement save user choices in localStorage or rest API
            form.submit()
        }
    },
}

app.render()