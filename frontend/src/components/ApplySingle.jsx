import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const applySingle = ({ apply }) => {
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(false); // 控制按鈕的禁用狀態

  const handleClick = async () => {
    setIsDisabled(true); // 點擊後禁用按鈕

    const body = {
      user_id: apply.User.id,
      job_id: id,
      status: "READ",
    };

    const res = await fetch("/api/applyJob/readApply", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setIsDisabled(false);
    }
  };
  const location = useLocation();

  let style =
    "h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm";

  // !loginAuth.isCompany && loginAuth.isLogin && job.status != null
  if (isDisabled) {
    style =
      "h-[36px] bg-gray-500 text-white px-4 py-2 rounded-lg text-center text-sm";
  }

  useEffect(() => {
    console.log("i read", apply);
    if (apply.status == "READ") {
      console.log("i read");
      setIsDisabled(true);
    }
  }, [isDisabled]);
  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='text-gray-600 my-2'>Applier: </div>
          <h3 className='text-xl font-bold'>{apply.User.displayName}</h3>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <button className={style} onClick={handleClick} disabled={isDisabled}>
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default applySingle;
