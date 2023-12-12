import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const VoiceInput = ({ onPress }) => {
  return (
    <View style={{ alignItems: 'center', margin: 20 }}>
      <TouchableOpacity style={{ marginTop: 30 }} onPress={onPress}>
        <Text style={{ color: 'green', fontWeight: '600' }}>VoiceInput</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceInput;
