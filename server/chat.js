import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LLMChain, RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

// NOTE: change this default filePath to any of your default file name
export const fileBasedChat = async (
  filePath, // The path to the file
  query
) => {
  const loader = new PDFLoader(filePath);

  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500, //  (in terms of number of characters)
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.

{context}
Question: {question}
Helpful Answer:`;

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    prompt: PromptTemplate.fromTemplate(template),
  });

  const response = await chain.call({
    query,
  });

  return response;
};

export const directChat = async (query) => {
  try {
    const template = `Answer the following question concisely. Use three sentences maximum and keep the answer straightforward.
    Question: {question}
    Helpful Answer:`;
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const prompt = PromptTemplate.fromTemplate(template);
    const chain = new LLMChain({
      llm: model,
      prompt: prompt,
    });
    const response = await chain.call({ question: query });
    return response;
  } catch (error) {
    console.error("Error in directChat:", error);
    throw error;
  }
};

export const chat = async (filePath, query) => {
  try {
    if (filePath) {
      return await fileBasedChat(filePath, query);
    } else {
      throw error;
    }
  } catch (error) {
    try {
      return await directChat(query);
    } catch (error) {
      console.error("Error in chat:", error);
      throw error;
    }
  }
};

export default chat;
