const salary_range = document.getElementById("salary-range")
const salary_value = document.getElementById("salary-range-value")
const range_value = document.getElementById("rf-range-value")
salary_value.innerHTML = salary_range.value

range_value.oninput = function() {
    if (this.value < 0 || this.value > 100) {
        salary_value.classList.remove("bg-success-subtle", "million")
        salary_value.classList.add("bg-warning-subtle")
        salary_value.innerHTML = "Thỏa thuận"
        if (this.value < 0)
            this.value = this.value*1 + 1
        else 
            this.value = this.value*1 - 1
    }
    else {
        salary_value.classList.remove("bg-warning-subtle")
        salary_value.classList.add("bg-success-subtle", "million")
        salary_value.innerHTML = this.value
    }
    range_value.value = this.value
    salary_value.value = this.value
}

salary_range.oninput = function() {
    if (this.value == 101 || this.value == -1) {
        salary_value.classList.remove("bg-success-subtle", "million")
        salary_value.classList.add("bg-warning-subtle")
        salary_value.innerHTML = "Thỏa thuận"
        range_value.value = ""
    }
    else {
        salary_value.classList.remove("bg-warning-subtle")
        salary_value.classList.add("bg-success-subtle", "million")
        salary_value.innerHTML = this.value
        range_value.value = this.value
    }
}