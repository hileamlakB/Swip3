alert("from website context", window.ethereum);
console.log(window);
let meta_stat = window.ethereum? true: false;
let spn = document.createElement("span")
spn.hidden = true;
document.body.appendChild(spn);
console.log(document, meta_stat)
spn.innerHTML = meta_stat;
