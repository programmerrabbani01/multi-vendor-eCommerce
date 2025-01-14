import { useState } from "react";

// Interface for form state with flexible keys
interface FormState {
  [key: string]: string | number | boolean;
}

const useFormFields = (initState: FormState) => {
  const [input, setInput] = useState(initState);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // reset handlers
  const resetForm = () => {
    setInput(initState);
  };

  return { input, handleInputChange, resetForm, setInput };
};

export default useFormFields;
