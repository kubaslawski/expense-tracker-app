import { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
// components
import IconButton from "../../components/ui/IconButton";
import ExpenseForm from "../../components/manage_expense/ExpenseForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
// constants 
import { globalStyles } from "../../constants/styles";
// context 
import { ExpensesContext } from "../../store/expenses-context";
// https
// import { addExpense, updateExpense, deleteExpense } from "../../util/http";
// redux 
import { useSelector, useDispatch } from "react-redux";
import { getExpense, addExpense, updateExpense, deleteExpense } from "../../redux/actions/expenses";
// hoc 
import IsLoadingHOC from "../../hoc/isLoading";


const ManageExpense = ({ navigation, route, setLoading }) => {

    const dispatch = useDispatch();
    const selectedExpense = useSelector((state) => state.expenses.expense);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            dispatch(getExpense(editedExpenseId));
            setLoading(false);
        }
        fetchData();
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
        dispatch(deleteExpense(editedExpenseId));
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

    // const deleteExpenseHandler = async () => {
    //     setIsLoading(true);
    //     try {
    //         await deleteExpense(editedExpenseId);
    //         expensesContext.deleteExpense(editedExpenseId);
    //         setIsLoading(false);
    //         navigation.goBack();
    //     } catch (error) {
    //         setError("Could not delete expense - please try again later");
    //         setIsLoading(false);
    //     }
    // };

    // const cancelHandler = () => {
    //     navigation.goBack();
    // };

    // const confirmHandler = async (expenseData) => {
    //     setIsLoading(true);
    //     try {
    //         if (isEditing) {
    //             expensesContext.updateExpense(
    //                 editedExpenseId,
    //                 expenseData,
    //             );
    //             await updateExpense(editedExpenseId, expenseData);
    //         } else {
    //             const id = await addExpense(expenseData);
    //             expensesContext.addExpense({ ...expenseData, id: id });
    //         }
    //         navigation.goBack();
    //     } catch (error) {
    //         setError("Could not save date - please try again later");
    //         setIsLoading(false);
    //     }
    // };

    // const errorHandler = () => {
    //     setError(null);
    // }

    // if (error && !isLoading) {
    //     return <ErrorOverlay
    //         message={error}
    //         onConfirm={errorHandler}
    //     />;
    // };

    // if (isLoading) {
    //     return <LoadingSpinner />;
    // };

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

export default IsLoadingHOC(ManageExpense);

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