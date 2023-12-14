function calculate() {
    var input = document.getElementById("inputArray").value;
    var array = input.split(",").map(Number);
    
    var count = 0;
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                count++;
            }
        }
    }
    
    document.getElementById("result").textContent = "逆序数：" + count;
}
