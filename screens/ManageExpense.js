import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
// components
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
// constants 
import { globalStyles } from "../constants/styles";
// context 
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ navigation, route }) => {

    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        expensesContext.deleteExpense(editedExpenseId);
        navigation.goBack();
    };
    const cancelHandler = () => {
        navigation.goBack();
    };
    const confirmHandler = () => {
        if (isEditing) {
            expensesContext.updateExpense(
                editedExpenseId,
                {
                    description: "Test",
                    ammount: 19.99,
                    date: new Date("2022-08-31")
                });
        } else {
            expensesContext.addExpense({
                description: "Test",
                ammount: 19.99,
                date: new Date("2022-08-31")
            });
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={globalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.primary800,
        flex: 1,
        padding: 24,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        alignItems: "center",
        borderTopColor: globalStyles.colors.primary200,
        borderTopWidth: 2,
        marginTop: 16,
        paddingTop: 8,
    }
});