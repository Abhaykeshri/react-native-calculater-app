import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumberPress = (num) => {
    setDisplayValue(displayValue === '0' ? num : displayValue + num);
  };

  const handleOperatorPress = (op) => {
    setOperator(op);
    setPreviousValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqualsPress = () => {
    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue);

    if (operator === '+') {
      setDisplayValue((previous + current).toString());
    } else if (operator === '-') {
      setDisplayValue((previous - current).toString());
    } else if (operator === '*') {
      setDisplayValue((previous * current).toString());
    } else if (operator === '/') {
      if (current === 0) {
        setDisplayValue('Error'); // Handle division by zero
      } else {
        setDisplayValue((previous / current).toString());
      }
    }

    setPreviousValue(null);
    setOperator(null);
  };

  const handleClearPress = () => {
    setDisplayValue('0');
  };

  const handleAllClearPress = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>
      <View style={styles.buttons}>
        {/* Number buttons */}
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.button}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
        {/* Operator buttons */}
        {['+', '-', '*', '/'].map((op) => (
          <TouchableOpacity
            key={op}
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperatorPress(op)}
          >
            <Text style={styles.buttonText}>{op}</Text>
          </TouchableOpacity>
        ))}
        {/* Equals button */}
        <TouchableOpacity
          style={[styles.button, styles.equalsButton]}
          onPress={handleEqualsPress}
        >
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        {/* Clear buttons */}
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearPress}
        >
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleAllClearPress}
        >
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  display: {
    backgroundColor: '#333',
    padding: 20,
    fontSize: 36,
    textAlign: 'right',
    color: '#fff',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#444',
    width: '23%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  operatorButton: {
    backgroundColor: '#f97316',
  },
  equalsButton: {
    backgroundColor: '#0ea5e9',
    width: '48%',
  },
  clearButton: {
    backgroundColor: '#dc2626',
  },
});