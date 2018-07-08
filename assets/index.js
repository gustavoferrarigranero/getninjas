const url = 'http://localhost:3000/'

let form = null

async function render(url) {
    try {
        await wait(1000)
        const response = await fetch(url, {
                method: 'POST',
                body: []
            })
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    return json._embedded
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
        resolveField(field)
    });
}
function resolveField (field) {
    renderField(field)
}
function renderField (field) {
    console.log(field)
}
