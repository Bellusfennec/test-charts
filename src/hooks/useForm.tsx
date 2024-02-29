import { useRef, useState } from "react";
import { ObjectData } from "../types";

interface UseForm {
  initial: ObjectData;
  onSubmit?: (arg: ObjectData) => void;
  isClear?: boolean;
}

export const useForm = ({ initial, onSubmit, isClear = true }: UseForm) => {
  const [form, setForm] = useState(initial);
  const formRef = useRef<any>(null);

  const handlerChange = (event: any) => {
    const { value, name } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    onSubmit?.(form);
    setForm(initial);
    if (isClear) formRef.current.reset();
  };

  return { formRef, form, setForm, handlerChange, handlerSubmit };
};
