let citis = document.getElementById("city");
    
let Parameter = {
url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
method: "GET", 
responseType: "application/json", 
};
let promise = axios(Parameter);
promise.then(function (result) {
renderCity(result.data);
});

function renderCity(data) {
for (const x of data) {
citis.options[citis.options.length] = new Option(x.Name, x.Id);

}
let tinh;
citis.onchange = function () {
if(this.value != ""){
const result = data.filter(n => n.Id === this.value);

const city = document.querySelector("#tinh")
if(result.length == 0){
    city.value = ""

}
else{
    city.value = result[0].Name

}


}
};

}