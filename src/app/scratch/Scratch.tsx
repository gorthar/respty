import { Button, Input } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { decrementByAmount, incrementByAmount } from "./testSlice";
import { ChangeEvent, useState } from "react";
import { openModal } from "../joint_graund/modals/modalSlice";

export default function Scratch() {
  const { data } = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleIncrementSubmit();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "Enter") if (isNaN(Number(e.target.value))) return;
    setValue(Number(e.target.value));
  }
  function handleIncrementSubmit() {
    dispatch(incrementByAmount(Number(value)));
    setValue(0);
  }
  function handleDecrementSubmit() {
    dispatch(decrementByAmount(Number(value)));
    setValue(0);
  }

  const inputStyle = {
    marginRight: "10px",
  };
  return (
    <div>
      <h1>New data:</h1>
      <p>{data}</p>
      <Input
        type="text"
        onChange={handleChange}
        value={value}
        style={inputStyle}
        onKeyPress={handleKeyPress}
      />
      <Button
        onClick={handleIncrementSubmit}
        content="Increment"
        color="teal"
      />
      <Button
        onClick={() => handleDecrementSubmit()}
        content="Decreese"
        color="facebook"
      />
      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        content="Add 5"
        color="red"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", data: data }))
        }
        content="Modal test"
        color="red"
      />
    </div>
  );
}
