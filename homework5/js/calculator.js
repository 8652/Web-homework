window.onload = function() {
    var history = document.getElementById("history");
    var input = document.getElementById("input");
    //store the equation user type in.
    var calculator = "";
    //mark the statement that whether we have just got a result from last equation or not.
    //1 for got a result just now 0 for not.
    var flag = 0;

    var cal = document.getElementsByTagName("button");
    for (var i = cal.length - 1; i >= 0; i--) {

        cal[i].onclick = function() {
            if(flag == 0) {
                //prevent user type in multiple operators illegally, such as "*/", "**", "//" or "++". 
                if(this.innerHTML == "*" || this.innerHTML == "/" || this.innerHTML == "+") {
                    var temp = calculator.charAt(calculator.length-1);
                    if(temp == "+" || temp == "-" || temp == "*" || temp == "/") {
                        calculator = calculator.substring(0, calculator.length-1);
                    }
                } else if (this.innerHTML == "-") {
                    var temp = calculator.charAt(calculator.length-1);
                    if(temp == "+" || temp == "-") {
                        calculator = calculator.substring(0, calculator.length-1);   
                    }
                }
                calculator += this.innerHTML + "";
            }
            else if(flag == 1) {
                if(this.innerHTML == "+" || this.innerHTML == "-" || this.innerHTML == "*" || this.innerHTML == "/" || this.innerHTML == ".") {
                    calculator += this.innerHTML + "";
                }
                else {
                    calculator = this.innerHTML + "";
                }
                flag = 0;
            }
            input.innerHTML = calculator;
        }

        document.getElementById("clear").onclick = function() {
            calculator = "";
            input.innerHTML = "";
        }

        document.getElementById("backspace").onclick = function() {
            calculator = calculator.substring(0, calculator.length-1);
            input.innerHTML = calculator;
        }

        document.getElementById("equal").onclick = function() {
            history.innerHTML = calculator;
            try {
                calculator = eval(calculator) + "";
                history.innerHTML += " = " + calculator;
            } catch(wrong) {
                alert("算式不合法，请重新输入！");
                calculator = "";
                input.innerHTML = calculator;
                history.innerHTML = "请输入算式";
            }
            //undefined infinity and NaN are beyond the range of eval's throw, and we need to consider these cases separately.
            if (calculator == undefined || isNaN(calculator) || calculator == Infinity) {
                alert("算式不合法，请重新输入！");
                calculator = "";
                input.innerHTML = calculator;
                history.innerHTML = "请输入算式";
            }
            input.innerHTML = calculator;
            flag = 1;
        }
    }
}
