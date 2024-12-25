"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = () => {
  const [value, setValue] = useState(""); // State to hold the editor's content

  return (
    <div className="w-full ">
      <Editor
        apiKey="njethe5lk1z21je67jjdi9v3wimfducwhl6jnnuip46yxwxh" // Replace with your TinyMCE API key
        value={value}
        onEditorChange={(content) => setValue(content)}
        init={{
          height: 400,
          menubar: false, // Disable the menu bar for a cleaner UI
          plugins: [
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "help",
          ],
          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link code",
          content_style:
            "body { font-family: Arial, sans-serif; font-size: 14px }", // Apply consistent styles
        }}
      />
    </div>
  );
};

export default TextEditor;
