// rnfes
import { SafeAreaView, Image, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import VoiceInput from '../components/voice/VoiceInput';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`p-4 text-4xl font-bold`}>AI Tutor</Text>
        <NavOptions />
        <NavFavorites />
        {/* <VoiceInput /> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
