import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../constants/styles';

const ExpensesSummary = ({ expenses, periodName }) => {

    const expensesSum = expenses.reduce((sum, expense) => { 
        return sum + expense.ammount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: globalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    period: {
        fontSize: 12,
        color: globalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: globalStyles.colors.primary500
    }
})