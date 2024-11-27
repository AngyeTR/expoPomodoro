import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header ({ currentStatus, setCurrentStatus, setTime}) {

    function handleTap(index){
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentStatus(index)
        setTime( newTime * 60)
    }
    
    return(
        <View style={styles.container}>
            {
                options.map((item, index)=> (
                    <TouchableOpacity key={index} 
                    style={[styles.itemSytle, currentStatus !== index && {borderColor: "transparent"}]} 
                    onPress={() => handleTap(index)}> 
                        <ThemedText>{item}</ThemedText>
                    </TouchableOpacity>))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemSytle: {
        width: "33%",
        borderWidth: 3,
        padding: 5,
        borderColor: "white",
        borderRadius: 10,
        alignItems: "center"
    },
    container: { 
        flexDirection: "row", 
        marginVertical: 20}
})
