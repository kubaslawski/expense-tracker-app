import { View } from 'react-native';
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
        <View>
            <Input label="Ammount" textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: handleAmmountChange,
            }} />
            <Input label="Date" textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLenght: 10,
                onChangeText: handleDateChange,
            }} />
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: handleDescriptionChange,
            }} />
        </View>
    );
};

export default ExpenseForm;