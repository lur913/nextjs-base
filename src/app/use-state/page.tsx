"use client";
import React from "react";

export default function Page() {
  // 计数器 - 存数字
  const [count, setCount] = React.useState(0);
  function handleClick() {
    setCount(count + 1);
    console.log(count); // count 总是旧值， 获取的是当前的快照；
  }

  // 文本框 - 存字符串
  const [text, setText] = React.useState("hello");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  // 复选框 - 存布尔值
  const [checked, setChecked] = React.useState(false);
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  // 同时声明两个变量
  const [name, setName] = React.useState("John");
  const [age, setAge] = React.useState(25);

  // 同时调用 set 函数三次：相当于只调用了一次 set 函数，不符合预取
  function handleInvokeThreeTimes() {
    setAge(age + 1);
    setAge(age + 1);
    setAge(age + 1);
  }

  function handleInvokeThreeTimesTrue() {
    setAge((a) => a + 1);
    setAge((a) => a + 1);
    setAge((a) => a + 1);
  }

  // 存对象 - 只读，更新时需要替换而不是修改
  const [form, setForm] = React.useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  });

  return (
    <div>
      <h1>useState Example</h1>
      <div className="bg-gray-800 p-4 rounded flex flex-col gap-2 my-4">
        <label className="flex gap-2 items-center">
          First name:
          <input
            className="border py-2 px-4 rounded"
            value={form.firstName}
            onChange={(e) => {
              setForm({
                ...form,
                firstName: e.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 items-center">
          Last name:
          <input
            className="border py-2 px-4 rounded"
            value={form.lastName}
            onChange={(e) => {
              setForm({
                ...form,
                lastName: e.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 items-center">
          Email:
          <input
            className="border py-2 px-4 rounded"
            value={form.email}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
          />
        </label>
        <p>
          {form.firstName} {form.lastName} ({form.email})
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded space-y-2 my-4">
        <p>You clicked {count} times</p>
        <button className="bg-blue-600 p-2 px-4 rounded" onClick={handleClick}>
          Click me
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded space-y-2 my-4">
        <input
          className="border border-gray-400 rounded-xl px-4 py-2 focus-visible:ring-8 focus-visible:ring-blue-600/80"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <p>You typed: {text} </p>
        <button
          className="bg-blue-600 p-2 px-4 rounded"
          onClick={() => setText("hello")}
        >
          Reset
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded space-y-2 my-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={checked} onChange={handleCheck} />I
          liked this
        </label>
        <p>You {checked ? "liked" : "did not like"} this.</p>
      </div>

      <div className="bg-gray-800 p-4 rounded flex flex-col gap-2 items-start my-4">
        <input
          className="border border-gray-400 rounded-xl px-4 py-2 focus-visible:ring-8 focus-visible:ring-blue-600/80"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 p-2 px-4 rounded"
          onClick={() => setAge(age + 1)}
        >
          Increment age
        </button>
        <p>
          Hello, {name}. You are {age}.
        </p>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 p-2 px-4 rounded"
            onClick={handleInvokeThreeTimes}
          >
            Invoke three times
          </button>
          <button
            className="bg-blue-600 p-2 px-4 rounded"
            onClick={handleInvokeThreeTimesTrue}
          >
            Invoke three times - expected
          </button>
        </div>
      </div>
    </div>
  );
}
