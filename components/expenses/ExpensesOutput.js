import { StyleSheet, View } from 'react-native';
import { globalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
    {
        id: "1",
        description: "A pair of shoes",
        ammount: 59.99,
        date: new Date("2022-08-19")
    },
    {
        id: "2",
        description: "A pair of trousers",
        ammount: 32.99,
        date: new Date("2022-04-19")
    },
    {
        id: "3",
        description: "Bananas",
        ammount: 1.99,
        date: new Date("2022-08-10")
    },
    {
        id: "4",
        description: "A book",
        ammount: 9.99,
        date: new Date("2022-05-15")
    },
    {
        id: "5",
        description: "A book",
        ammount: 12.99,
        date: new Date("2022-05-17")
    },
]


const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList
                expenses={DUMMY_EXPENSES}
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