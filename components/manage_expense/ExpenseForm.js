import { StyleSheet, Text, View } from 'react-native';
// components 
import Input from './Input';

const ExpenseForm = () => {

    const handleAmmountChange = () => {

    };

    const handleDateChange = () => {

    };

    const handleDescriptionChange = () => {

    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Ammount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: handleAmmountChange,
                    }}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLenght: 10,
                        onChangeText: handleDateChange,
                    }}
                />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: handleDescriptionChange,
            }} />
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 24,
        textAlign: "center",
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    }
});