import { useState } from 'react'

const FileUpload = () => {
    const [file, setFile] = useState(null)
    const [base64Image, setBase64Image] = useState(null)
    if (file){
        console.log("file: ",file);
        console.log("file.name: ",file.name);
        console.log("file.size in kb: ",Math.ceil(file.size / 1000));
        console.log("file.type: ",file.type);
        console.log("file.lastModified: ",file.lastModified);
    }
    
  return (
    <div className="flex flex-1 flex-col justify-center items-center h-screen">
      <h1 className="text-2xl">FileUpload Title</h1>
      {/* <label htmlFor="fileinput"> File upload </label> */}
      <label className='mt-5'> Image Preview </label>
      <img src={base64Image} alt="" className="h-64 w-64 border border-dashed border-blue-500" />
      <input
        type="file"
        name='fileinput'
        className="bg-blue-500 border border-black"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];

          const reader = new FileReader();
          reader.onloadend = (onLoadendEvent) => { 
            console.log("onLoadendEvent", onLoadendEvent);
            setBase64Image(onLoadendEvent.target.result)
           }

           reader.readAsDataURL(file)

          setFile(file);
        }}
      />
    </div>
  )
}

export default FileUpload