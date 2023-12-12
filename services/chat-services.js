import { requestClient } from "./request-client";

// 120 seconds before it throws error
const chatWithLLM = async ({ userInput }) => {
  const { data } = await requestClient.post("/chat", { userInput }, 120000);
  return data;
};

const ingestFile = async ({ fileInput }) => {
  const { data } = await requestClient.post("/chat/ingest", fileInput, {
    timeout: 120000,
    headers: {
      "Content-Type": `multipart/form-data: boundary=${fileInput._boundary}`,
    },
  });
  return data;
};

const chatServices = {
  chatWithLLM,
  ingestFile,
};

export { chatServices };
