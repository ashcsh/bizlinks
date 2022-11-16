import "./UserSocials.css"

export default function Custom({ img, url }) {

  return (
    <>
      {img && <a href={url} alt="customUrlPhoto">
        <img src={img} alt="customUrlPhoto"/>
      </a>}
    </>
  )
}
