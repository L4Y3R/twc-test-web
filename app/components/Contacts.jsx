"use client";

import React from "react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContactContext } from "../hooks/useContactContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Contacts() {
  const router = useRouter(); //for redirecting the user
  const { contacts, dispatch } = useContactContext();
  const { user } = useAuthContext();

  const [contactToDeleteId, setContactToDeleteId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

  const [editedContact, setEditedContact] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);

  //Fetching Contacts
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("http://localhost:4000/api/contacts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CONTACTS", payload: json }); // Update local state
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [dispatch, user]);

  //redirect user to homepage if there are no more contacts
  useEffect(() => {
    if (!contacts || contacts.length === 0) {
      router.push("/");
    }
  }, [contacts, router]);

  // DELETE LOGIC
  // handle click
  const handleDeleteClick = (contactId) => {
    setContactToDeleteId(contactId);
    setShowConfirmDelete(true);
  };

  // Handle confirmation dialog
  const handleConfirmDelete = async () => {
    setShowConfirmDelete(false);
    if (contactToDeleteId) {
      await handleDelete(contactToDeleteId);
    }
  };

  // close delete dialog
  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  //Delete a contact
  const handleDelete = async (contactId) => {
    if (!user) {
      setError("Login to delete a contact");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/contacts/${contactId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_CONTACT", payload: json }); // Update local state
      setSuccessDelete(true);
    }
  };

  const handleOkayDelete = () => {
    setSuccessDelete(false);
  };

  //Editing a contact
  const handleEditClick = (contact) => {
    setIsEditing(true);
    setEditedContact(contact);
  };

  const handlePhoneChange = (e) => {
    // Extract the new phone number
    let newPhoneNumber = e.target.value;

    // Allow only digits and backspace key
    newPhoneNumber = newPhoneNumber.replace(/[^0-9\b]/g, "");

    //limit the input to 10 characters
    newPhoneNumber = newPhoneNumber.slice(0, 10);

    // Update edited contact
    setEditedContact({
      ...editedContact,
      phonenumber: newPhoneNumber,
    });
  };

  // Handle saving edited contact
  const handleSaveContact = async (editedContact) => {
    if (!user) {
      setError("Login to edit a contact");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/contacts/${editedContact._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editedContact),
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CONTACT", payload: editedContact }); // Update local state
      setIsEditing(false);
      setEditedContact({});
      setSuccessEdit(true);
    } else {
      console.error("Error updating contact:", json);
    }
  };

  const handleOkayEdit = () => {
    setSuccessEdit(false);
  };

  return (
    <div className="mt-3 w-full bg-white rounded-3xl h-full py-4 font-custom text-portalGreen">
      {/*Table Headers*/}
      <div className="flex flex-row mx-24 font-semibold pl-2 gap-[3%]">
        <span className="w-[30%] px-2">full name</span>
        <span className="w-[17%] px-1">gender</span>
        <span className="w-[30%] px-1 ">e-mail</span>
        <span className="w-[26%] px-1">phone number</span>
      </div>

      {/*Render fetched contacts*/}
      {contacts &&
        contacts.map((contact) => (
          <div
            className="mt-3 flex justify-between font-medium items-center w-full px-8"
            key={contact._id}>
            <div className="flex flex-row gap-5 items-center w-full mr-5">
              {/*Dynamically set profile picture based on gender*/}
              {contact.gender === "male" ? (
                <Image
                  src="/male.png"
                  width={50}
                  height={50}
                  alt="Male profile image"
                />
              ) : (
                <Image
                  src="/female.png"
                  width={50}
                  height={50}
                  alt="Female profile image"
                />
              )}

              {/*Editing mode*/}
              {isEditing && editedContact._id === contact._id ? (
                <div className="flex flex-row items-center justify-between h-12 w-full gap-[3%] ">
                  <input
                    className="px-2 py-1 outline-none border-portalGreen border-r-4 bg-slate-100 w-[30%]"
                    type="text"
                    value={editedContact.fullname}
                    onChange={(e) =>
                      setEditedContact({
                        ...editedContact,
                        fullname: e.target.value,
                      })
                    }
                  />
                  <div className="flex items-center border-portalGreen border-r-4 bg-slate-100 h-8 w-[16%]">
                    <div className="flex items-center justify-center px-2">
                      <span className="font-medium mr-2">
                        {editedContact.gender}
                      </span>

                      {/*Swich between male and female*/}
                      <button
                        className="w-20 h-20"
                        onClick={() =>
                          setEditedContact({
                            ...editedContact,
                            gender:
                              editedContact.gender === "male"
                                ? "female"
                                : "male",
                          })
                        }>
                        <Image
                          src="/change.png"
                          alt="change btn"
                          width={20}
                          height={20}></Image>
                      </button>
                    </div>
                  </div>

                  <input
                    className="px-2 py-1 outline-none border-portalGreen border-r-4 bg-slate-100 w-[30%]"
                    type="text"
                    value={editedContact.email}
                    onChange={(e) =>
                      setEditedContact({
                        ...editedContact,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    className="px-2 py-1 outline-none border-portalGreen border-r-4 bg-slate-100 w-[21%]"
                    type="text"
                    value={editedContact.phonenumber}
                    onChange={handlePhoneChange}
                  />
                </div>
              ) : (
                <div className="flex flex-row items-center w-full gap-[3%]">
                  {/*regular view*/}
                  <span className="w-[30%] px-2">{contact.fullname}</span>
                  <span className="w-[16%]">{contact.gender}</span>
                  <span className="w-[30%] px-1">{contact.email}</span>
                  <span className="w-[21%]">{contact.phonenumber}</span>
                </div>
              )}
            </div>

            {/*Handle editing mode operations*/}
            <div className="flex gap-5">
              {/*Show Save button when in editing mode*/}
              {isEditing && editedContact._id === contact._id ? (
                <button
                  className="flex text-white font-custom font-medium text-md tracking-wide rounded-full border justify-center bg-portalGreen py-1 w-20 "
                  onClick={() => handleSaveContact(editedContact)}>
                  Save
                </button>
              ) : (
                <div className="flex gap-7">
                  {/*Show Edit and Delete button when not in editing mode*/}
                  <button onClick={() => handleEditClick(contact)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5">
                      <path
                        fill="#0f4141"
                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteClick(contact._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-5 h-5">
                      <path
                        fill="#0f4141"
                        d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/*Contact delete confirmation*/}
              {contactToDeleteId === contact._id && showConfirmDelete && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 z-50 flex backdrop-filter backdrop-blur-md justify-center items-center">
                  <div className="bg-white py-8 px-14 rounded-3xl shadow-md">
                    <p className="font-custom text-xl leading-normal tracking-wide mt-1 text-portalGreen">
                      Do you want to delete the contact "{contact.fullname}"?
                    </p>

                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        className="flex text-white font-custom text-xl tracking-wide rounded-full border justify-center py-2 bg-portalGreen w-20"
                        onClick={handleConfirmDelete}>
                        Yes
                      </button>
                      <button
                        className="flex text-portalGreen font-custom text-xl tracking-wide rounded-full border border-portalGreen justify-center py-2 w-24"
                        onClick={handleCancelDelete}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/*Successfully deleted*/}
              {successDelete && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 z-50 flex backdrop-filter backdrop-blur-md justify-center items-center">
                  <div className="bg-white py-8 px-14 rounded-3xl shadow-md">
                    <p className="font-custom text-xl leading-normal tracking-wide mt-1 text-portalGreen">
                      Your Contact has been deleted successfully!
                    </p>

                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        className="flex text-white font-custom text-xl tracking-wide rounded-full border justify-center py-2 bg-portalGreen w-24"
                        onClick={handleOkayDelete}>
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/*Successfully edited*/}
              {successEdit && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 z-50 flex backdrop-filter backdrop-blur-md justify-center items-center">
                  <div className="bg-white py-8 px-14 rounded-3xl shadow-md">
                    <p className="font-custom text-xl leading-normal tracking-wide mt-1 text-portalGreen">
                      Your Contact has been saved successfully!
                    </p>

                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        className="flex text-white font-custom text-xl tracking-wide rounded-full border justify-center py-2 bg-portalGreen w-24"
                        onClick={handleOkayEdit}>
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Contacts;
