import { FlatList, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({ expenses }) => {

    const renderExpenseItem = ({ item }) => {
        return (
            <ExpenseItem
                description={item.description}
                ammount={item.ammount}
                date={item.date}
            />
        )
    }

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={({ id }) => id}
        />
    )
}

export default ExpensesList