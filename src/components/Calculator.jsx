import React from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css';

class Calculator extends React.Component {
  constructor() {
    super()

    this.state = {
      displayValue: '0',
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0
    }

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({
      displayValue: '0',
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0
    })
  };

  setOperation(op) {
    const { current, operation, values } = this.state;
    if ( current === 0 ) {
      this.setState({
        operation: op,
        current: 1,
        clearDisplay: true,
      });
    } else {
      const equals = op === '=';
      const value = [...values]
      switch (operation) {
        case '+':
          value[0] = value[0] + value[1];
          break;
        case '/':
          value[0] = value[0] / value[1];
          break;
        case '-':
          value[0] = value[0] - value[1];
          break;
        case '*':
          value[0] = value[0] * value[1];
          break;       
        default:
          break;
      }
      value[1] = 0;

      this.setState({
        displayValue: value[0],
        operation: equals ? null : op,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: value,
      })
    }
  };

  addDigit(n) {
    const { displayValue, clearDisplay, current, values } = this.state;
    if (n === '.' && displayValue.includes('.')) {
      return
    }

    const clear = displayValue === '0' || clearDisplay;
    const value = clear ? '' : displayValue;
    const display = value + n;
    this.setState({
      displayValue: display,
      clearDisplay: false,
    })

    if (n !== '.') {
      const newValue = parseFloat(display);
      const theValues = [...values];
      theValues[current] = newValue;
      this.setState({
        values: theValues,
      })
    }
  };

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Button label="AC" click={this.clearMemory} triple/>
        <Button label="/" click={this.setOperation} operation/>
        <Button label="7" click={this.addDigit}/>
        <Button label="8" click={this.addDigit}/>
        <Button label="9" click={this.addDigit}/>
        <Button label="*" click={this.setOperation} operation/>
        <Button label="4" click={this.addDigit}/>
        <Button label="5" click={this.addDigit}/>
        <Button label="6" click={this.addDigit}/>
        <Button label="-" click={this.setOperation} operation/>
        <Button label="1" click={this.addDigit}/>
        <Button label="2" click={this.addDigit}/>
        <Button label="3" click={this.addDigit}/>
        <Button label="+" click={this.setOperation} operation/>
        <Button label="0" click={this.addDigit} double/>
        <Button label="." click={this.addDigit}/>
        <Button label="=" click={this.setOperation} operation/>
      </div>
    );
  }
}

export default Calculator;
