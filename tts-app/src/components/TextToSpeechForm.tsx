import { z } from "zod";
import { Field, Form, Formik, type FormikValues } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEffect, useRef, useState } from "react";

const Schema = z.object({
  text: z.string(),
  language: z.string(),
});

const TextToSpeechForm = () => {
  const synth = useRef(window.speechSynthesis);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [language, setLanguage] = useState("en-US");
  const [sentences, setSentences] = useState<string[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.current.getVoices();
      const filtered = availableVoices.filter((v) => v.lang === language);
      setVoices(filtered);
      if (filtered.length > 0) setSelectedVoiceName(filtered[0].name);
    };
    loadVoices();
    synth.current.onvoiceschanged = loadVoices;
    return () => {
      synth.current.onvoiceschanged = null;
    };
  }, [language]);

  const getVoice = () => voices.find((v) => v.name === selectedVoiceName);

  const speakSentence = (text: string, index: number, onEnd?: () => void) => {
    const utt = new SpeechSynthesisUtterance(text);
    const voice = getVoice();
    if (voice) utt.voice = voice;
    utt.onstart = () => setSpeakingIndex(index);
    utt.onend = () => {
      setSpeakingIndex(null);
      onEnd?.();
    };
    synth.current.speak(utt);
  };

  const handleSpeakOne = (text: string, index: number) => {
    synth.current.cancel();
    speakSentence(text, index);
  };

  const handleSpeakAll = () => {
    synth.current.cancel();
    const speakNext = (index: number) => {
      if (index >= sentences.length) return;
      speakSentence(sentences[index], index, () => {
        setTimeout(() => speakNext(index + 1), 3000);
      });
    };
    speakNext(0);
  };

  const handleConvert = (values: FormikValues) => {
    const parsed = values.text
      .split("\n")
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);
    synth.current.cancel();
    setSpeakingIndex(null);
    setSentences(parsed);
  };

  const selectStyle: React.CSSProperties = {
    flex: 1,
    padding: "10px 12px",
    fontSize: "15px",
    fontFamily: "inherit",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    color: "#222",
    outline: "none",
    cursor: "pointer",
  };

  const btnStyle = (color: string): React.CSSProperties => ({
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: color,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  });

  return (
    <Formik
      validationSchema={toFormikValidationSchema(Schema)}
      onSubmit={handleConvert}
      initialValues={{ text: "", language: "en-US" }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form
          style={{
            width: "80%",
            margin: "40px auto",
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: Input panel */}
          <div
            style={{
              flex: "0 0 calc(50% - 12px)",
              width: "calc(50% - 12px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              Step 1 — Enter text
            </h3>
            <Field
              as="textarea"
              name="text"
              placeholder="Enter sentences here, one per line..."
              style={{
                width: "100%",
                minHeight: "260px",
                padding: "12px 14px",
                fontSize: "15px",
                lineHeight: "1.6",
                fontFamily: "inherit",
                border: "1px solid #ccc",
                borderRadius: "8px",
                resize: "vertical",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.2s",
                color: "#222",
                backgroundColor: "#fafafa",
              }}
              onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                (e.target.style.borderColor = "#4f8ef7")
              }
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                (e.target.style.borderColor = "#ccc")
              }
            />
            {errors.text && touched.text && typeof errors.text === "string" && (
              <div style={{ color: "red", fontSize: "13px" }}>
                {errors.text}
              </div>
            )}

            {/* Voice + Language row */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                style={selectStyle}
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
              <Field
                as="select"
                name="language"
                style={{ ...selectStyle, flex: "0 0 160px" }}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const lang = e.target.value;
                  setFieldValue("language", lang);
                  setLanguage(lang);
                }}
              >
                <option value="en-US">English</option>
                <option value="vi-VN">Vietnamese</option>
              </Field>
            </div>

            <button
              type="submit"
              style={{ ...btnStyle("#4f8ef7"), width: "100%" }}
            >
              Convert →
            </button>
          </div>

          {/* RIGHT: Sentences panel */}
          <div
            style={{
              flex: "0 0 calc(50% - 12px)",
              width: "calc(50% - 12px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
                Step 2 — Sentences
              </h3>
              {sentences.length > 0 && (
                <button
                  type="button"
                  onClick={handleSpeakAll}
                  style={btnStyle("#22a85a")}
                >
                  ▶ Speak All
                </button>
              )}
            </div>

            {sentences.length === 0 ? (
              <div
                style={{
                  color: "#aaa",
                  fontSize: "14px",
                  border: "1px dashed #ddd",
                  borderRadius: "8px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                No sentences yet. Enter text and click Convert.
              </div>
            ) : (
              <ol
                style={{
                  margin: 0,
                  padding: "0 0 0 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {sentences.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      backgroundColor:
                        speakingIndex === i ? "#eaf3ff" : "#f9f9f9",
                      border: `1px solid ${speakingIndex === i ? "#4f8ef7" : "#e5e5e5"}`,
                      transition: "background-color 0.2s, border-color 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "15px", color: "#222", flex: 1 }}>
                      {s}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeakOne(s, i)}
                      style={{
                        ...btnStyle(
                          speakingIndex === i ? "#2d6fd4" : "#4f8ef7",
                        ),
                        padding: "6px 14px",
                        fontSize: "13px",
                        flexShrink: 0,
                      }}
                    >
                      {speakingIndex === i ? "▶ Speaking…" : "▶ Speak"}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TextToSpeechForm;
