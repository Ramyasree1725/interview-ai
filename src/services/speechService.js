// Speech Synthesis (TTS) and Speech Recognition (STT) Service

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.selectedVoice = null;
    this.initRecognition();
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const updateVoices = () => {
      const voices = this.synth.getVoices();
      // Look for natural English voices (Google, Microsoft, or natural voice)
      this.selectedVoice = voices.find(v => 
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Guy") || v.name.includes("Jenny")) && v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en")) || voices[0];
    };

    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  speak(text, onStart, onEnd, onError) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    // Clean text of markdown asterisks/formatting before speaking
    const cleanText = text.replace(/[*_#`$]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  startListening(onResult, onStatusChange, onError) {
    if (!this.recognition) {
      if (onError) onError("Speech Recognition not supported in this browser. You can type your answer directly.");
      return false;
    }

    this.isListening = true;
    if (onStatusChange) onStatusChange(true);

    let finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (onResult) {
        onResult(finalTranscript + interimTranscript, Boolean(finalTranscript));
      }
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        try {
          this.recognition.start();
        } catch (e) {
          this.isListening = false;
          if (onStatusChange) onStatusChange(false);
        }
      } else {
        if (onStatusChange) onStatusChange(false);
      }
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.warn("Could not start recognition:", e);
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      return false;
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  isSupported() {
    return {
      tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
      stt: typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    };
  }
}

export const speechService = new SpeechService();
