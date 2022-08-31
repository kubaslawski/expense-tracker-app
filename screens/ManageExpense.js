import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
// components
import IconButton from "../components/ui/IconButton";
// constants 
import { globalStyles } from "../constants/styles";

const ManageExpense = ({ navigation, route }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    return (
        <View style={styles.container}>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={globalStyles.colors.error500}
                        size={36}
                        onPress={() => { }}
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
    deleteContainer: {
        alignItems: "center",
        borderTopColor: globalStyles.colors.primary200,
        borderTopWidth: 2,
        marginTop: 16,
        paddingTop: 8,
    }
});