import { FlatList } from 'react-native'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({ expenses }) => {

    const renderExpenseItem = ({ item }) => {
        return (
            <ExpenseItem
                expenseId={item.expenseId}
                description={item.description}
                ammount={item.ammount}
                date={item.date}
                userId={item.userId}
            />
        )
    }

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={({ expenseId }) => expenseId}
        />
    )
}

export default ExpensesList