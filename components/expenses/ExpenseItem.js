import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
// global functions
import { getFormattedDate } from "../../util/date";

const ExpenseItem = ({ expenseId, description, ammount, date }) => {
    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate("ManageExpense", {
            expenseId: expenseId,
        });
    };

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.ammountContainer}>
                    <Text style={styles.ammount}>{ammount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: globalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: globalStyles.colors.grey500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: globalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
    },
    ammountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80,
    },
    ammount: {
        color: globalStyles.colors.primary500
    }
})