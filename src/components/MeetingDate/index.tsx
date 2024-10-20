import React from "react";

interface IMeetingDateProps {
    date: string; 
}

const MeetingDate : React.FC<IMeetingDateProps> = ({ date }) => {
    return (
        <div className="p-3 flex justify-center items-center border-[rgba(255,255,255,0.1)] w-full sm:min-w-[200px] border rounded-md">  
            <h1 className="text-white whitespace-nowrap text-opacity-50">{ date }</h1>
        </div>
    )
}

export default MeetingDate;