import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import DayListItem from '@Components/core/DayListItem';

const days = [...Array(24)].map((val, index) => index + 1);

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.content}
        data={days}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <DayListItem item={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    gap: 10,
    padding: 10
  },

  column: {
    gap: 10,
  },

});
