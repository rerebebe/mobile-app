import { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-voice/voice';
import { chatServices } from '../../../services/chat-services';
import { Text, View } from 'react-native';

export const useVoiceInput = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    Voice.destroy().then(() => {
      Voice.removeAllListeners();
    });
    const fetchData = async () => {
      try {
        const { response } = await chatServices.chatWithLLM({ userInput: 'hi, introduce yourself! and Ask my name' });
        setAnswer(response);
        setFadeKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchData();
  }, []);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => {
    setIsRecording(false);
    setResult('');
  };
  Voice.onSpeechResults = (result) => setResult(result.value[0]);
  Voice.onSpeechError = (err) => {
    console.log('Speech error:', err);
    setIsRecording(false);
  };

  const handlSendVoiceText = async () => {
    if (result === '') {
      console.log('no voice detected');
      return;
    }
    try {
      setLoading(true);
      const { response } = await chatServices.chatWithLLM({ userInput: result });
      setAnswer(response);
      setIsRecording(false);
      setResult('');
      setFadeKey((prevKey) => prevKey + 1);
    } catch (err) {
      setError(err);
      console.log('EROROROR', err);
      return;
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-TW');
    } catch (err) {
      setError(err);
      console.log('???');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      handlSendVoiceText();
    } catch (error) {
      setError(error);
    }
  };

  const finalResponse = () => {
    const splittedAnswer = answer.split('[Divider]:');
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

  console.log('answer', answer);

  const cancelButton = () => {
    setResult('');
    setIsRecording(false);
    Voice.destroy().then(() => {
      Voice.removeAllListeners();
    });
  };

  return {
    answer,
    voiceLoading: loading,
    result,
    error,
    isRecording,
    startRecording,
    stopRecording,
    handlSendVoiceText,
    finalResponse,
    cancelButton,
    fadeKey
  };
};
