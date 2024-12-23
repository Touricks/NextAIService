import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Space } from "antd";
import { Sun } from "lucide-react";
const { Dragger } = Upload;

const DOMAIN = "http://localhost:5001";

const uploadToBackend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(`${DOMAIN}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};

const deleteFromBackend = async (file) => {
  try {
    const response = await axios.delete(`${DOMAIN}/upload`, {
      data: { filename: file.name },
    });
    return response;
  } catch (error) {
    console.error("Error deleting file: ", error);
    return null;
  }
};

const TimeGreeting = ({ username = "Friend" }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }
    };
    updateGreeting();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Space align="center">
        <Sun className="w-6 h-6 text-orange-400" />
        <h1 className="text-4xl font-serif text-gray-800">
          {greeting}, {username}
        </h1>
      </Space>
    </div>
  );
};

const attributes = {
  name: "file",
  multiple: true,
  beforeUpload: (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error(`${file.name} is not a PDF file`);
      return Upload.LIST_IGNORE;
    }

    const isLessThan10M = file.size / 1024 / 1024 < 10;
    if (!isLessThan10M) {
      message.error("File must be smaller than 10MB");
      return Upload.LIST_IGNORE;
    }

    return true;
  },
  customRequest: async ({ file, onSuccess, onError }) => {
    const response = await uploadToBackend(file);
    if (response && response.status === 200) {
      // Handle success
      onSuccess(response.data);
    } else {
      // Handle error
      onError(new Error("Upload failed"));
    }
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const PdfUploader = () => {
  return (
    <>
      <TimeGreeting />
      <Dragger {...attributes}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single file upload. Currently only PDF files are
          supported.
        </p>
      </Dragger>
    </>
  );
};

export default PdfUploader;
