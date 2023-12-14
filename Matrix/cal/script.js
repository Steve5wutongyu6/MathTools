// 获取DOM元素
const elements = {
    matrixAInput: null,
    matrixBInput: null,
    addButton: null,
    subtractButton: null,
    multiplyButton: null,
    inverseButton: null,
    resultValue: null
};

// 页面加载完毕后执行
window.addEventListener("DOMContentLoaded", () => {
    // 获取DOM元素
    elements.matrixAInput = document.getElementById("matrixA");
    elements.matrixBInput = document.getElementById("matrixB");
    elements.addButton = document.getElementById("addButton");
    elements.subtractButton = document.getElementById("subtractButton");
    elements.multiplyButton = document.getElementById("multiplyButton");
    elements.inverseButton = document.getElementById("inverseButton");
    elements.resultValue = document.getElementById("resultValue");

    // 添加事件监听器
    elements.addButton.addEventListener("click", () => performOperation(addMatrices));
    elements.subtractButton.addEventListener("click", () => performOperation(subtractMatrices));
    elements.multiplyButton.addEventListener("click", () => performOperation(multiplyMatrices));
    elements.inverseButton.addEventListener("click", inverseMatrix);
});

// 执行矩阵运算操作
function performOperation(operation) {
    try {
        operation();
    } catch (error) {
        showError(error.message);
    }
}

// 显示错误信息
function showError(message) {
    elements.resultValue.textContent = message;
}

// 矩阵相加、相减、相乘的计算逻辑
function operateMatrices(operator) {
    const matrixA = parseMatrix(elements.matrixAInput.value);
    const matrixB = parseMatrix(elements.matrixBInput.value);

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error("矩阵维度不匹配");
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixA[0].length; j++) {
            result[i][j] = operator(matrixA[i][j], matrixB[i][j]);
        }
    }

    elements.resultValue.textContent = formatMatrix(result);
}

// 矩阵相加
function addMatrices() {
    operateMatrices((a, b) => a + b);
}

// 矩阵相减
function subtractMatrices() {
    operateMatrices((a, b) => a - b);
}

// 矩阵相乘
function multiplyMatrices() {
    const matrixA = parseMatrix(elements.matrixAInput.value);
    const matrixB = parseMatrix(elements.matrixBInput.value);

    if (matrixA[0].length !== matrixB.length) {
        throw new Error("矩阵维度不匹配");
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }

    elements.resultValue.textContent = formatMatrix(result);
}

// 解析用户输入的矩阵数据
function parseMatrix(matrixString) {
    const rows = matrixString.trim().split("\n");
    return rows.map(row => row.split(" ").map(Number));
}

// 格式化矩阵数据，用于显示结果
function formatMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    let result = "";
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result += matrix[i][j] + " ";
      }
      result += "\n";
    }
  
    return result.trim();
  }
  
// 求逆矩阵
function inverseMatrix() {
    const matrix = parseMatrix(elements.matrixAInput.value);

    if (matrix.length !== matrix[0].length) {
        throw new Error("输入矩阵不是方阵");
    }

    // 执行求逆计算
    const inverse = math.inv(matrix);

    elements.resultValue.textContent = formatMatrix(inverse);
}

