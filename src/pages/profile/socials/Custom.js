import "./UserSocials.css"

import ImgPlaceholder from "../../../assets/socialPhotoPlaceholder.svg"

// imports AddSOCIAL MODAL

import { useState, useEffect } from "react"

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useGetDocument } from "../../../hooks/useGetDocument";

import CustomModal from "./CustomModal";

export default function Custom() {
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()

  const [photo, setPhoto] = useState()
  const [url, setUrl] = useState()
  const { document } = useGetDocument("users", user.uid);

  useEffect(() => {
    if (document) {
      setPhoto(document.customImgURL)
      setUrl(document.customURL)
  }
  }, [document])


  return (
    <>
      <label onClick={() => { setOpen(true) }} > 
      {url && 
      <img src={photo} alt="ceva"/>
      }
      {!url &&
        <img src={ImgPlaceholder} alt="social-media-icon" />
      }
      </label>
      {open && <CustomModal setOpen={setOpen} customPhoto={photo} customUrl={url}/>}
    </>
  )
}
