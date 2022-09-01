import { StyleSheet, View } from 'react-native';
import { globalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                periodName={expensesPeriod}
            />
            <ExpensesList
                expenses={expenses}
            />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: globalStyles.colors.primary700
    }
})