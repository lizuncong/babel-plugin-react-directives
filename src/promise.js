const p = new Promise(resolve => {resolve(1)})

p.then(res => console.log(res))

const print = async () => {
    const res = await p
    console.log('res..', res);
}
