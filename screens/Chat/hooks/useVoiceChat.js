import { useState, useEffect } from 'react';
import { chatServices } from '../../../services/chat-services';
import { Text, View } from 'react-native';
import { useVoiceInput } from '../../../components/voice/hooks/useVoiceInput';

export const useVoiceChat = () => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [userConvo, setUserConvo] = useState(userInput);
  const [error, setError] = useState('');

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsTextInputFocused(false);
  };

  const handleInputChange = (text) => {
    setError('');
    setUserInput(text);
  };

  const handlSendUserInput = async () => {
    setUserInput('');
    try {
      setLoading(true);
      const { response } = await chatServices.chatWithLLM({ userInput });
      setAnswer(response);
    } catch (err) {
      setError(err);
      console.log('EROROROR', err);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnswer('');
  }, []);

  const finalResponse = () => {
    const splittedAnswer = answer.split('[Divider]');
    console.log('splittedAnswer', splittedAnswer);
    if (answer.includes('None')) {
      return splittedAnswer[0].substring(11);
    } else {
      return (
        <View>
          <Text>{splittedAnswer[0]}</Text>
          <Text>{splittedAnswer[1]}</Text>
        </View>
      );
    }
  };

  return {
    error,
    loading,
    showEmojiSelector,
    isTextInputFocused,
    userInput,
    setUserInput,
    answer,
    userConvo,
    finalResponse,
    handlSendUserInput,
    handleInputChange,
    handleTextInputBlur,
    handleTextInputFocus,
    handleEmojiPress
  };
};
