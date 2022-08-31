import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";

const ExpenseItem = ({ description, ammount, date }) => {
    return (
        <Pressable>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{date}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{ammount}</Text>
                </View>

            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
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
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    amount: {
        color: globalStyles.colors.primary500
    }
})