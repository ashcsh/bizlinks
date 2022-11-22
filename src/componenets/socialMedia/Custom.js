

import ImgPlaceholder from "../../assets/socialPhotoPlaceholder.svg"

// imports AddSOCIAL MODAL

import { useState, useEffect } from "react"


import CustomModal from "./modal/CustomModal"

export default function Custom({ url, img, editMode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {editMode && (
        <>
          <label onClick={() => { setOpen(true) }} >
            {url &&
              <img src={img} alt="ceva" />
            }
            {!url &&
              <img src={ImgPlaceholder} alt="social-media-icon" />
            }
          </label>
          {open && <CustomModal setOpen={setOpen} img={img} url={url} />}
        </>
      )}
      {!editMode && (
        <>
          <label >
            {url &&
              <a href={url}>
                <img src={img} alt="ceva" />
                </a>
            }
          </label>
        </>
      )}
    </>
  )
}
