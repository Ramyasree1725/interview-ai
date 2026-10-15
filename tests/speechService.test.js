/**
 * Unit Test Suite for Speech Synthesis & Voice Recognition Service
 */

import { synthesizeSpeech, getAvailableVoices } from '../src/services/speechService.js';

describe('SpeechService Voice Pipeline Suite', () => {
  beforeEach(() => {
    // Mock Web Speech API window.speechSynthesis
    if (typeof window !== 'undefined') {
      window.speechSynthesis = {
        speak: vi.fn(),
        cancel: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        getVoices: vi.fn(() => [
          { name: 'Google US English', lang: 'en-US', default: true },
          { name: 'Microsoft David', lang: 'en-US', default: false }
        ])
      };
    }
  });

  test('should return configured voice lists when available', () => {
    const voices = getAvailableVoices();
    expect(voices).toBeInstanceOf(Array);
  });

  test('should trigger speech synthesis with appropriate parameters', () => {
    const textToSpeak = "Explain the difference between interface and abstract class in TypeScript.";
    const status = synthesizeSpeech(textToSpeak, { pitch: 1.0, rate: 0.95 });
    expect(status).toBeDefined();
  });
});
