//Set data

const seLocalStorage = (key, value) => {
    console.log("key", key);
    console.log("Value", value);
    console.log("stringify=", JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));

}
//Get Data
const getLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}
//Clear Data || Delete data
const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export { seLocalStorage, getLocalStorage, deleteLocalStorage };