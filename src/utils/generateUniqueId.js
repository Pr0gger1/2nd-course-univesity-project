export function generateUniqueId(name, length) {
    const symbols = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = `${name}_`;

    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * symbols.length);
        id += symbols[index];
    }
    return id;
}