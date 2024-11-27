import { StyleSheet, Platform,  View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import Header from "../../components/Header"
import Timer from "../../components/Timer"

const colors= ["#cc6666", "#66cc99", "#66cccc"]

export default function HomeScreen() {
  const [time, setTime] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [currentStatus, setCurrentStatus]  = useState("POMO" | "SHORT" | "LONG");

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(()=>{
        setTime(time -1)
      }, 1000)
    }
    else{
      clearInterval(interval)
    }

    if (time === 0 ){
      setIsActive(false);
      switch (currentStatus) {
        case 0:
          setTime(1500);
          break;
        case 1:
          setTime(300);
          break;
        case 2:
          setTime(900);
          break;
        default:
          setTime(0);
      }
    }
    return ()=>clearInterval(interval)
  }, [isActive, time])

  function handleStartStop () {
    setIsActive(!isActive)
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentStatus]}]}>  
      <View style={[styles.viewContainer, {
        paddingTop: Platform.OS === "android" &&30,
        backgroundColor: colors[currentStatus]
      }]}>
        <Text style={styles.texting}>My Pomodoro App!</Text>
        <Header 
          time={time} 
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          setTime={setTime}>
        </Header>
        <Timer time={time}/>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.texting}  title="Prueba">{isActive ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100
  },
  viewContainer: {    
    flex:1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  texting: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  }
});
