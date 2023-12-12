import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

const voiceService = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = (err) => setError(err);
  Voice.onSpeechResults = (result) => setResult(result.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start('zn-CN');
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setError(err);
    }
  };

  return { result, error, isRecording, startRecording, stopRecording };
};

export default voiceService;
