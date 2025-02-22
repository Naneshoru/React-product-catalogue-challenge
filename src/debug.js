
import React, { useEffect, useState } from "react"

function Debug({ value, opacity, children }) {
  const [valueLocal, setValueLocal] = useState()
  useEffect(() => {
    setValueLocal(value)
  }, [value])

  const elem = document.getElementsByClassName("debug")?.[1]
  if (elem) {
    elem.style.right = ""
    elem.style.left = "30px"
  }

  const elem2 = document.getElementsByClassName("debug")?.[2]
  if (elem2) {
    elem2.style.top = "50%"
    elem2.style.left = "30px"
    elem2.style.width = "200px"
  }

  return (
    <div
      className="debug custom-scroll"
      style={{
        overflow: "auto",
        position: "fixed",
        right: "30px",
        top: "100px",
        maxHeight: "80vh",
        background: "white",
        zIndex: 130,
        opacity,
        color: "red",
        width: "350px",
      }}
    >
      {/* <button onClick={(() => { setRender((prev: boolean) => !prev) })}>Update</button> */}
      {/* &nbsp; {JSON.stringify(render, null, 2)} */}
      <pre>
        {JSON.stringify(valueLocal, null, 2)}
        <br></br>
        {children}
      </pre>
    </div>
  )
}

export default Debug
