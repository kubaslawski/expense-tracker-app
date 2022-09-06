import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// components 
import Input from './Input';
import Button from '../ui/Button';
// functions
import { getFormattedDate } from '../../util/date';
import { globalStyles } from '../../constants/styles';

const ExpenseForm = ({ defaultValues, onCancel, onSubmit, submitButtonLabel }) => {

    const [formData, setFormData] = useState({
        ammount: {
            value: defaultValues ? defaultValues.ammount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
    });

    const handleInputChange = (inputName, enteredValue) => {
        setFormData((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputName]: {
                    value: enteredValue,
                    isValid: true,
                },
            };
        });
    };

    const handleSubmit = () => {
        const expenseData = {
            ammount: +formData.ammount.value,
            date: new Date(formData.date.value),
            description: formData.description.value,
        };
        // data validation 
        const isAmmountValid = !isNaN(expenseData.ammount) && expenseData.ammount > 0;
        const isDateValid = expenseData.date.toString() !== "Invalid Date";
        const isDescriptionValid = expenseData.description.trim().toString().length > 0;

        if (!isAmmountValid || !isDateValid || !isDescriptionValid) {
            setFormData((formData) => {
                return {
                    ammount: { value: formData.ammount.value, isValid: isAmmountValid },
                    date: { value: formData.date.value, isValid: isDateValid },
                    description: { value: formData.description.value, isValid: isDescriptionValid },
                }
            });
            return;
        }
        onSubmit(expenseData);
    };

    const isFormValid = !formData.ammount.isValid || !formData.date.isValid || !formData.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    invalid={!formData.ammount.isValid}
                    label="Ammount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: handleInputChange.bind(this, "ammount"),
                        value: formData.ammount.value,
                    }}
                />
                <Input
                    invalid={!formData.date.isValid}
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLenght: 10,
                        onChangeText: handleInputChange.bind(this, "date"),
                        value: formData.date.value,
                    }}
                />
            </View>
            <Input
                invalid={!formData.date.isValid}
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: handleInputChange.bind(this, "description"),
                    value: formData.description.value,
                }}
            />
            {isFormValid && <Text style={styles.errorText}>Invalid inputs values</Text>}
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
    errorText: {
        color: globalStyles.colors.error500,
        margin: 8,
        textAlign: "center",
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