let buttons = document.querySelectorAll("button");
let display = document.getElementById("display");
let currentValue = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let btn = button.innerHTML;
        let action = button.getAttribute("data-action");
        let isOperator = button.hasAttribute("data-operator");

        if (action === "equals") {
            try {
                currentValue = eval(currentValue).toString();
                display.value = currentValue;
            } catch {
                display.value = "Error";
                currentValue = "";
            }
        }
        else if (action === "clear") {
            currentValue = "";
            display.value = "";
        }
        else if (action === "delete") {
            currentValue = currentValue.slice(0, -1);
            display.value = currentValue;
        }
        else if (isOperator) {
            let lastChar = currentValue.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                currentValue = currentValue.slice(0, -1) + btn;
            } else if (currentValue !== "") {
                currentValue += btn;
            }
            display.value = currentValue;
        }
        else {
            currentValue += btn;
            display.value = currentValue;
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        currentValue += e.key;
        display.value = currentValue;
    } else if (e.key === ".") {
        currentValue += e.key;
        display.value = currentValue;
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        let lastChar = currentValue.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            currentValue = currentValue.slice(0, -1) + e.key;
        } else if (currentValue !== "") {
            currentValue += e.key;
        }
        display.value = currentValue;
    } else if (e.key === "Enter" || e.key === "=") {
        try {
            currentValue = eval(currentValue).toString();
            display.value = currentValue;
        } catch {
            display.value = "Error";
            currentValue = "";
        }
    } else if (e.key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
    } else if (e.key === "Escape") {
        currentValue = "";
        display.value = "";
    }
});