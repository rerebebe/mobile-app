import { useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  userConvo,
  TouchableOpacity
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import VoiceInput from '../../components/voice/VoiceInput';
import { useVoiceInput } from '../../components/voice/hooks/useVoiceInput';
import { FadeInView } from '../../components/animated/FadeInView';
import LottieView from 'lottie-react-native';

const VoiceChatScreen = () => {
  const navigation = useNavigation();
  const {
    answer,
    handlSendVoiceText,
    result,
    error: audioError,
    isRecording,
    startRecording,
    stopRecording,
    finalResponse,
    cancelButton,
    fadeKey
  } = useVoiceInput();

  console.log('isRecording: ', isRecording);
  console.log('RESULT: ', result);

  const animation = useRef(null);

  useEffect(() => {
    if (!isRecording) {
      animation.current.play(12, 12);
    } else {
      animation.current.play(12, 81);
    }
  }, [isRecording]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FOFOFO' }} behavior="padding">
      <Pressable
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      >
        <Icon name="menu" />
      </Pressable>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 20,
          marginTop: 190
        }}
      >
        <FadeInView key={fadeKey}>
          <Text style={{ fontSize: 20 }}>{finalResponse()}</Text>
        </FadeInView>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: '#dddddd'
          // borderTopWidth: 1,
          // paddingHorizontal: 10,
          // paddingVertical: 10
          // marginBottom: 25
        }}
      >
        {isRecording ? (
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            {/* <VoiceInput onPress={isRecording ? stopRecording : startRecording} /> */}
            <LottieView
              ref={animation}
              style={{ width: 280 }}
              source={require('../../assets/lottie/record.json')}
              speed={0.5}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <LottieView ref={animation} style={{ width: 280 }} source={require('../../assets/lottie/mic.json')} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 150,
          right: 40
          // paddingHorizontal: 10,
          // paddingVertical: 10,
          // marginBottom: 25
        }}
      >
        <Text onPress={cancelButton}>cancel</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VoiceChatScreen;
