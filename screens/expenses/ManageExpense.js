import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
// components
import IconButton from "../../components/ui/IconButton";
import ExpenseForm from "../../components/manage_expense/ExpenseForm";
// constants 
import { globalStyles } from "../../constants/styles";
// redux 
import { useSelector, useDispatch } from "react-redux";
import { addExpense, updateExpense, deleteExpense } from "../../redux/actions/expenses";
// hoc 
import IsLoadingHOC from "../../hoc/isLoading";


const ManageExpense = ({ navigation, route, setLoading }) => {

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenses.find((expense) => expense.expenseId === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
        dispatch(deleteExpense(editedExpenseId));
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = (expenseData) => {
        if (isEditing) {
            dispatch(updateExpense(editedExpenseId, expenseData));
        } else {
            dispatch(addExpense(expenseData));
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                defaultValues={selectedExpense}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? "Update" : "Add"}
            />
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