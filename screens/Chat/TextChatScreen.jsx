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
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Emojielector from 'react-native-emoji-selector';
import { useVoiceChat } from './hooks/useVoiceChat';

const TextChatScreen = () => {
  const navigation = useNavigation();
  const {
    error,
    loading,
    showEmojiSelector,
    isTextInputFocused,
    userInput,
    setUserInput,
    answer,
    handlSendUserInput,
    handleInputChange,
    handleTextInputBlur,
    handleTextInputFocus,
    handleEmojiPress,
    finalAnswer
  } = useVoiceChat();

  console.log('answer', answer);
  console.log('userInput', userInput);

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
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 20 }}
      >
        <Text>{finalAnswer()}</Text>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: showEmojiSelector ? 0 : 25
        }}
      >
        <Entypo onPress={handleEmojiPress} style={{ marginRight: 5 }} name="emoji-happy" size={24} color="black" />
        <TextInput
          value={userInput}
          onChangeText={handleInputChange}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10
          }}
          placeholder="Type your message..."
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
        />

        <Feather />
        {isTextInputFocused && (
          <Pressable>
            <Feather onPress={handlSendUserInput} style={{ paddingLeft: 5 }} name="send" size={24} color="black" />
          </Pressable>
        )}
      </View>
      {showEmojiSelector && (
        <Emojielector
          onEmojiSelected={(emoji) => {
            setUserInput((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default TextChatScreens;
