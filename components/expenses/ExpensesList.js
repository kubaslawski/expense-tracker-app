import { FlatList, Text } from 'react-native'

const ExpensesList = ({ expenses }) => {

    const renderExpenseItem = ({ item }) => {
        return (
            <Text>{item.description}</Text>
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