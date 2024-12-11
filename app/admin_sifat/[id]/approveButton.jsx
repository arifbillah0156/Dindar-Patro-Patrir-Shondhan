"use client";
import { push, ref, set } from "firebase/database";
import { database } from "@/lib/firebase";

export default function ApproveButton({ dataObj, dataName }) {
  const {
    date,
    boyOrGirl,
    name,
    mobile,
    age,
    height,
    birthID,
    birthDate,
    address,
    marriedStatus,
    division,
    education,
    occupation,
    monthlyIncome,
    personalDetails,
    familyDetails,
    partnerDetails,
    fbLink,
    extra,
  } = dataObj;

  const approveBiodata = async () => {
    const checkPass = prompt("Enter 8 digit PIN: ");
    if (checkPass === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      const formIdInput = prompt("Enter form ID: ");
      const newDataObj = {
        date,
        boyOrGirl,
        name,
        mobile,
        age,
        height,
        birthID,
        birthDate,
        address,
        marriedStatus,
        division,
        education,
        occupation,
        monthlyIncome,
        personalDetails,
        familyDetails,
        partnerDetails,
        fbLink,
        extra,
        formID: formIdInput,
      };

      if (formIdInput) {
        try {
          const usersRef = ref(database, "ApprovedBiodata");
          const newDataRef = await push(usersRef);

          set(newDataRef, newDataObj);

          fetch(
            `${process.env.NEXT_PUBLIC_DB_URL}/AllBiodata/${dataName}.json`,
            {
              method: "DELETE",
            }
          )
            .then(() => {
              alert("Success.");
              location.replace("/all_biodata");
            })
            .catch(() => alert("Error! Contact with Arif Billah."));
        } catch (error) {
          alert("Your Data is not Approved!!");
        }
      } else {
        alert("Failed!");
      }
    } else {
      location.reload();
    }
  };

  return (
    <button
      type="button"
      onClick={approveBiodata}
      className="px-1 py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out text-xl overflow-hidden"
    >
      Approve
    </button>
  );
}
