import { useLayoutEffect } from "react";
import { Text } from "react-native";

const ManageExpense = ({ navigation, route }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    return (
        <Text>
            ManageExpense Screen
        </Text>
    )
};

export default ManageExpense;