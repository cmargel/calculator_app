/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CalculatorDisplay from './components/calculator-display';
import NumberButton from './components/number-button';
import OperationButton from './components/operation-button';
import FunctionButton from './components/function-button';

const App: () => React$Node = () => {

  //Q1: The first line sets the display at the top of the calculator. The second line records the value of the previous total. 
  //The third line sets the operator that is to be used. This adds state to our function components, stored as variables.
  const [numberDisplay, setNumberDisplay] = useState("");
  const [previousTotal, setPreviousTotal] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");

  //Q2: `${numberDisplay}${digit}` is a template string that changes the set number display
  const updateDisplay = digit => {
      setNumberDisplay(`${numberDisplay}${digit}`);
    };

  //Q3: setNumberDisplay is properly invoked and executed because in th calculator display we defined Numbers={numberDisplay}
  // changeDisplay - action is props.ThisFunction
  const changeDisplay = action => {
      if (action === 'clear') {
        setNumberDisplay("");
        setPreviousTotal("");
        setCurrentOperation("");
      } else if (action === 'delete') {
        if (typeof numberDisplay === 'string') {
          setNumberDisplay(numberDisplay.slice(0, -1));
        }
      }
    };

  const updateCalculations = op => {
  //define total, entered number, and operation
  let newTotal = previousTotal;
  let enteredNumber = numberDisplay * 1;
  let thisOp = '';
  //conditional statement to determine what is the operation
  if(currentOperation === ''){
    thisOp = op;
  } else{
    thisOp = currentOperation;
  }
  //conditional statement to determine new Total
  if(previousTotal === ''){
    newTotal = enteredNumber;
  } else{
      if(thisOp === '/'){
        newTotal = previousTotal / enteredNumber;
      } else if(thisOp === 'x'){
        newTotal = previousTotal * enteredNumber;
      } else if(thisOp === '+'){
        newTotal = previousTotal + enteredNumber;
      } else if(thisOp === '-'){
        newTotal = previousTotal - enteredNumber;
      }  else if(thisOp === '√'){
        newTotal = Math.sqrt(enteredNumber);
    }

  }


  //conditional statement to set the state variables
  if (op !== "=") {       
    setNumberDisplay("");       
    setPreviousTotal(newTotal);       
    setCurrentOperation(op);     
  } else {       
    setNumberDisplay(newTotal);       
    setPreviousTotal(""); 
    setCurrentOperation("");     
  }
    };
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.savContainer}>
        <View style={styles.calculatorContainer}>
          <View style={{...styles.buttonRow, flexGrow: 1}}>
            <CalculatorDisplay Numbers={numberDisplay} />
          </View>
          <View style={styles.buttonRow}>
            <FunctionButton ThisFunction="clear" ButtonWidth="25%" ButtonAction={changeDisplay} />
            <FunctionButton ThisFunction="delete" ButtonWidth="25%" ButtonAction={changeDisplay} />
            <OperationButton Operation="/" UpdateCalculations={updateCalculations} />
            <OperationButton Operation="√" UpdateCalculations={updateCalculations} />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={7} ButtonWidth='25%' ButtonAction={updateDisplay} />
            <NumberButton Number={8} ButtonWidth='25%' ButtonAction={updateDisplay} />
            <NumberButton Number={9} ButtonWidth='25%' ButtonAction={updateDisplay} />
            <OperationButton Operation="x" UpdateCalculations={updateCalculations} />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={4} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <NumberButton Number={5} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <NumberButton Number={6} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <OperationButton Operation="-" UpdateCalculations={updateCalculations} />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={1} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <NumberButton Number={2} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <NumberButton Number={3} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <OperationButton Operation="+" UpdateCalculations={updateCalculations} />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={0} ButtonWidth="50%" ButtonAction={updateDisplay} />
            <NumberButton Number="." ButtonWidth="25%" ButtonAction={updateDisplay} />
            <OperationButton Operation="=" UpdateCalculations={updateCalculations} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  savContainer: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
});

export default App;
