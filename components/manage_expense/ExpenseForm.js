import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// components 
import Input from './Input';
import Button from '../ui/Button';
// functions
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({ defaultValues, onCancel, onSubmit, submitButtonLabel }) => {

    const [formData, setFormData] = useState({
        ammount: defaultValues ? defaultValues.ammount.toString() : "",
        date: defaultValues ? getFormattedDate(defaultValues.date) : "",
        description: defaultValues ? defaultValues.description : "",
    });

    const handleInputChange = (inputName, enteredValue) => {
        setFormData((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputName]: enteredValue,
            };
        });
    };

    const handleSubmit = () => {
        const expenseData = {
            ammount: +formData.ammount,
            date: new Date(formData.date),
            description: formData.description,
        };
        onSubmit(expenseData);
    };

    console.log(formData);

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Ammount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: handleInputChange.bind(this, "ammount"),
                        value: formData.ammount,
                    }}

                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLenght: 10,
                        onChangeText: handleInputChange.bind(this, "date"),
                        value: formData.date,
                    }}

                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: handleInputChange.bind(this, "description"),
                    value: formData.description,
                }}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={handleSubmit}>
                    {submitButtonLabel}
                </Button>
            </View>
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
    },
    buttons: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});