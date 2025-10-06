import React, { useState } from "react";

const buttonLayout = [
  ["/", "*", "+", "-", "DEL"],
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", ".", "="]
];

const isOperator = (val) => ["/", "*", "+", "-"].includes(val);

function CalculatorApp() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (val) => {
    if (val === "DEL") {
      setExpression(expression.slice(0, -1));
      setResult("");
      return;
    }
    if (val === "=") {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(expression);
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
      return;
    }
    // Prevent two operators in a row
    if (
      isOperator(val) &&
      (expression === "" || isOperator(expression.slice(-1)))
    ) {
      return;
    }
    setExpression(expression + val);
    setResult("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.display}>
        <div style={styles.result}>
          {result !== "" && <span>({result})</span>}
        </div>
        <div style={styles.expression}>{expression || "0"}</div>
      </div>
      {buttonLayout.map((row, i) => (
        <div key={i} style={styles.row}>
          {row.map((btn) => (
            <button
              key={btn}
              style={
                btn === "DEL"
                  ? { ...styles.button, ...styles.delButton }
                  : isOperator(btn)
                  ? { ...styles.button, ...styles.opButton }
                  : styles.button
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: 320,
    background: "#181c24",
    borderRadius: 14,
    padding: 0,
    margin: "40px auto",
    boxShadow: "0 4px 24px #0008",
    fontFamily: "sans-serif",
    overflow: "hidden"
  },
  display: {
    background: "#181c24",
    color: "#fff",
    padding: "18px 16px 8px 16px",
    minHeight: 60,
    textAlign: "right"
  },
  result: {
    color: "#7e8ba3",
    fontSize: 14,
    minHeight: 18
  },
  expression: {
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: 1
  },
  row: {
    display: "flex"
  },
  button: {
    flex: 1,
    padding: "18px 0",
    margin: 2,
    fontSize: 20,
    background: "#232837",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background 0.2s"
  },
  opButton: {
    background: "#e84a7a",
    color: "#fff"
  },
  delButton: {
    background: "#e84a7a",
    color: "#fff"
  }
};

export default CalculatorApp; 