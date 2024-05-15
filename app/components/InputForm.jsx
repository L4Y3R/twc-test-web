"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";

function InputForm() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuthContext();

  // handle disappearance of success message
  useEffect(() => {
    if (success) {
      const successTimeout = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(successTimeout);
    }
  }, [success]);

  // handle disappearance of error message
  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    //prevent reload
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    const contact = { fullname, phonenumber, email, gender };

    // check all the fields are filled
    if (!fullname || !phonenumber || !email || !gender) {
      setError("Please fill in all the fields");
      return;
    }

    //Error message if user enters invalid number
    if (phonenumber.length != 10) {
      setError("Enter a valid phone number");
      return;
    }
    //save in database
    const response = await fetch("http://localhost:4000/api/contacts/new", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //Clear all the fields
      setFullname("");
      setEmail("");
      setPhonenumber("");
      setGender(null);
      setError(null);
      setSuccess("Contact added!");
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <h1 className="h1 text-5xl font-semibold"> New Contact </h1>{" "}
        {/*Display succuess message*/}
        {success && (
          <span className=" text-green-500 ml-8 font-custom text-xl leading-normal tracking-wide font-semibold">
            {success}
          </span>
        )}
        {/*Display error message*/}
        {error && (
          <span className=" text-red-400 ml-8 font-custom text-xl leading-normal tracking-wide font-semibold">
            {error}
          </span>
        )}
      </div>

      <form
        className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-6 items-center mt-6"
        onSubmit={handleSubmit}>
        <input
          type="fullname"
          placeholder="full name"
          className="input"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
        />
        <input
          type="email"
          placeholder="e-mail"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="number"
          placeholder="phone number"
          className="input"
          onChange={(e) => setPhonenumber(e.target.value)}
          value={phonenumber}
        />

        <div className="flex flex-row items-center mt-5 justify-between">
          <p className="text-white font-custom text-xl leading-normal tracking-wide">
            gender
          </p>

          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="mr-3"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label
              htmlFor="male"
              className="text-white mr-3 font-custom text-xl leading-normal tracking-wide">
              Male
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="mr-3"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label
              htmlFor="female"
              className="text-white mr-8 font-custom text-xl leading-normal tracking-wide">
              Female
            </label>
          </div>
        </div>
        <button className="button w-72 py-2 h-12 mt-10">
          {" "}
          add new contact{" "}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
