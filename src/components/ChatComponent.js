import { AudioOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";

const { Search } = Input;

const DOMAIN = process.env.REACT_APP_DOMAIN;
const searchContainer = {
  display: "flex",
  justifyContent: "center",
};

const ChatComponent = (props) => {
  const { handleResp, isLoading, setIsLoading } = props;
  // Define a state variable to keep track of the search value
  const [searchValue, setSearchValue] = useState("");
  const [isChatModeOn, setIsChatModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speech, setSpeech] = useState();

  // speech recognation
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-US",
        rate: 1,
        pitch: 1,
        voice: "Google US English",
        splitSentences: true,
      })
      .then((data) => {
        console.log("Speech is ready, voices are available", data);
        setSpeech(speech);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
    return () => {
      if (speech) {
        speech.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!listening && !!transcript) {
      (async () => await onSearch(transcript))();
      setIsRecording(false);
    }
  }, [listening, transcript]);

  const talk = (what2say) => {
    speech
      .speak({
        text: what2say,
        queue: false, // current speech will be interrupted,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: (event) => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          },
        },
      })
      .then(() => {
        console.log("Success !");
        userStartConvo();
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  };

  const userStartConvo = () => {
    SpeechRecognition.startListening({ language: "en-US" });
    setIsRecording(true);
    resetEverything();
  };

  const resetEverything = () => {
    resetTranscript();
  };

  const chatModeClickHandler = () => {
    setIsChatModeOn(!isChatModeOn);
    setIsRecording(false);
    SpeechRecognition.stopListening();
    if (speech) {
      speech.cancel();
    }
  };

  const recordingClickHandler = () => {
    if (isRecording) {
      setIsRecording(false);
      SpeechRecognition.stopListening();
    } else {
      setIsRecording(true);
      SpeechRecognition.startListening({ language: "en-US" });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
  };
  const suggestions = [
    "Summarize key points and insights",
    "Enhance writing style and clarity",
    "Generate practical applications",
  ];
  const onSearch = async (question) => {
    // Clear the search input
    setSearchValue("");
    setIsLoading(true);

    try {
      const response = await axios.get(`${DOMAIN}/chat`, {
        params: {
          question,
        },
      });
      handleResp(question, response.data);
      if (isChatModeOn) {
        talk(response.data);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      const errorMessage = error.response.data.message || "An error occurred";
      handleResp(question, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div style={searchContainer}>
        {!isChatModeOn && (
          <Search
            placeholder="How can I help you today?"
            enterButton="Ask"
            size="large"
            onSearch={onSearch}
            loading={isLoading}
            value={searchValue} // Control the value
            onChange={handleChange} // Update the value when changed
          />
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button
          onClick={chatModeClickHandler}
          type="primary"
          size="large"
          danger={isChatModeOn}
          style={{ marginLeft: "10px" }}
        >
          Chat Mode: {isChatModeOn ? "On" : "Off"}
        </Button>
        {isChatModeOn && (
          <Button
            onClick={recordingClickHandler}
            icon={<AudioOutlined />}
            type="primary"
            size="large"
            danger={isRecording}
            style={{ marginLeft: "10px" }}
          >
            Recording: {isRecording ? "On" : "Off"}
          </Button>
        )}
      </div>
      <div>
        <div
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "10px",
          }}
        >
          Prompt Example
        </div>
        {suggestions.map((suggestion, index) => (
          <button
            style={{
              backgroundColor: "#FFF8DC",
              color: "black",
              border: "none",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
            }}
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </>
  );
};

export default ChatComponent;
