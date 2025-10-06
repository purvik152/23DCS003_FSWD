import React, { useState, useEffect, useRef } from "react";

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
  const [activeKey, setActiveKey] = useState("");
  const containerRef = useRef(null);

  const handleClick = (val) => {
    handleInput(val);
  };

  const handleInput = (val) => {
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
    if (
      isOperator(val) &&
      (expression === "" || isOperator(expression.slice(-1)))
    ) {
      return;
    }
    setExpression(expression + val);
    setResult("");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key;
      if (key === "Enter") key = "=";
      if (key === "Backspace") key = "DEL";
      if (key === "Escape") {
        setExpression("");
        setResult("");
        setActiveKey("");
        return;
      }
      const validKeys = [
        ...["/", "*", "+", "-", ".", "="],
        ...Array.from({ length: 10 }, (_, i) => String(i)),
        "DEL"
      ];
      if (validKeys.includes(key)) {
        setActiveKey(key);
        handleInput(key);
        setTimeout(() => setActiveKey(""), 120);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      style={styles.container}
      tabIndex={0}
      ref={containerRef}
      aria-label="Calculator"
    >
      <div style={styles.brand}>SRC</div>
      <div style={styles.display}>
        <div style={styles.result}>
          {result !== "" && <span>({result})</span>}
        </div>
        <div style={styles.expression}>{expression || "SRC"}</div>
      </div>
      {buttonLayout.map((row, i) => (
        <div key={i} style={styles.row}>
          {row.map((btn) => (
            <button
              key={btn}
              style={{
                ...(btn === "DEL"
                  ? { ...styles.button, ...styles.delButton }
                  : isOperator(btn)
                  ? { ...styles.button, ...styles.opButton }
                  : styles.button),
                ...(activeKey === btn ? styles.activeButton : {})
              }}
              onClick={() => handleClick(btn)}
              tabIndex={-1}
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
    background: "#f7f7f7ff",
    borderRadius: 14,
    padding: 0,
    margin: "40px auto",
    boxShadow: "0 4px 24px #0008",
    fontFamily: "sans-serif",
    overflow: "hidden",
    border: "3px solid #f5f1f1ff",
    position: "relative"
  },
  brand: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: 2,
    color: "#d1c9d1ff",
    padding: "14px 0 6px 0",  
    background: "#0f0f10ff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    userSelect: "none"
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
    background: "#FFA500",
    color: "#fff"
  },
  activeButton: {
    boxShadow: "0 0 0 2px #e84a7a, 0 2px 8px #ffffffff",
    filter: "brightness(0.85)"
  }
};

export default CalculatorApp; 