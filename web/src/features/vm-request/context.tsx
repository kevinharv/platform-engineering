import { createContext, useContext, type ReactNode } from 'react';
import { useReducer } from 'react';
import type { VMRequestFormData } from './types';
import { INITIAL_FORM_DATA } from './types';

type Action =
  | { type: 'UPDATE_FORM'; payload: Partial<VMRequestFormData> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET_FORM' };

interface State {
  formData: VMRequestFormData;
  currentStep: number;
}

interface VMRequestContextType extends State {
  updateFormData: (data: Partial<VMRequestFormData>) => void;
  setStep: (step: number) => void;
  resetForm: () => void;
}

const initialState: State = {
  formData: INITIAL_FORM_DATA,
  currentStep: 0,
};

// Try to load persisted state from localStorage
try {
  const savedState = localStorage.getItem('vmRequestState');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    initialState.formData = parsed.formData;
    initialState.currentStep = parsed.currentStep;
  }
} catch (error) {
  console.error('Failed to load persisted state:', error);
}

function reducer(state: State, action: Action): State {
  let newState: State;
  
  switch (action.type) {
    case 'UPDATE_FORM':
      newState = {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
      break;
    case 'SET_STEP':
      newState = {
        ...state,
        currentStep: action.payload,
      };
      break;
    case 'RESET_FORM':
      newState = {
        formData: INITIAL_FORM_DATA,
        currentStep: 0,
      };
      break;
    default:
      return state;
  }

  // Persist state to localStorage
  localStorage.setItem('vmRequestState', JSON.stringify(newState));
  return newState;
}

const VMRequestContext = createContext<VMRequestContextType | null>(null);

export function VMRequestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: VMRequestContextType = {
    ...state,
    updateFormData: (data) => dispatch({ type: 'UPDATE_FORM', payload: data }),
    setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
    resetForm: () => dispatch({ type: 'RESET_FORM' }),
  };

  return (
    <VMRequestContext.Provider value={value}>
      {children}
    </VMRequestContext.Provider>
  );
}

export function useVMRequest() {
  const context = useContext(VMRequestContext);
  if (!context) {
    throw new Error('useVMRequest must be used within a VMRequestProvider');
  }
  return context;
}