import React from "react";

function Message({children}) {
  return (
      <div className="Message">
        {children}
      </div>
  );
}

export default Message;