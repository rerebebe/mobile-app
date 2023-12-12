import { useQueryClient, useQuery } from '@tanstack/react-query';
import Voice from '@react-native-voice/voice';

const getVoiceInput = async () => {
  const result = await Voice.start('en-US');
  return result.value[0];
};

export const useVoiceInputContent = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryFn: getVoiceInput,
    queryKey: ['voiceInput']
  });

  const startRecording = () => {
    if (data) {
      queryClient.setQueryData('result', data);
    }
  };
  const stopRecording = () => {
    queryClient.invalidateQueries('voiceInput'); // Invalidate the query to trigger re-execution
  };

  return { result, error, isLoading, stopRecording, startRecording };
};

export default useVoiceInputContent;
