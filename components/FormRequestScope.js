import {useState, useRef} from "react";
import Image from "next/image";
// import { FilePond, registerPlugin, File} from 'react-filepond';
// import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond/dist/filepond.min.css';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {supabase} from "../utils/supabase";

// registerPlugin(FilePondPluginImageResize, FilePondPluginImagePreview);

export function FormRequestScope({ formInfo, addScopeToInfo, deleteScope }) {
  const defaultNewScope = {details: '', images: [],}
  const imageUploadRef = useRef();
  const [files, setFiles] = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [newScope, setNewScope] = useState(defaultNewScope);

  const handleAddScope = () => {
    addScopeToInfo(newScope);
    setNewScope(defaultNewScope);
  }

  const downloadFile = async (filePath) => {
    const {data, error} = await supabase
      .storage
      .from('request-images')
      .download(filePath);

    console.warn(data, error);
  }

  const handleFile = async (e) => {
    setUploadingPhoto(true);
    const images = e.target.files;

    if (!images || images.length <= 0) {
      throw new Error('You must select image(s) to upload');
    }

    const file = images[0];
    const {name} = file;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let {error} = await supabase.storage
      .from('request-images')
      .upload(`${filePath}`, file);

    if (error) {
      console.error(error.message)
    }


    const downloadedImage = downloadFile(filePath);

    console.log(downloadedImage);
    // const {publicURL} = photoUrl;

    // update the newScope images array with the new image
    const newScopeImageData = [
      ...newScope.images,
      {
        name,
        publicURL,
        fileExt,
        filePath,
      }
    ];
    setNewScope({...newScope, images: newScopeImageData });

    setUploadingPhoto(false);
    e.target.value = '';
  }

  const UploadButtonView = () => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">Scope photo(s)</label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              {uploadingPhoto
                ? <LoadingSpinner />
                : (
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" multiple={true} onChange={handleFile} />
                  </label>
                )}
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
          </div>
        </div>
      </div>
    )
  }

  const ImagePreview = ({ image }) => {
    return (
      <div className="w-40 h-40 relative">
        <img src={image} />
        {/*<Image*/}
        {/*  src={image.publicURL}*/}
        {/*  alt={image}*/}
        {/*  objectFit="cover"*/}
        {/*  layout="fill"*/}
        {/*/>*/}
      </div>
    )
  }

  const LoadingSpinner = () => {
    return (
      <div role="status">
        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const ScopeItem = ({item, idx}) => {
    return (
      <li className="flex flex-col relative bg-white shadow p-5 pt-7 rounded-lg mb-10">

        <div className="flex flex-col">
          <p className="font-bold">{idx + 1}.</p>
          <p className="mt-4 mb-4">{item.details}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {/*{item.images.map((image, key) => <ImagePreview key={key} image={image} /> )}*/}
        </div>

        <button
          type="button"
          className="absolute right-0 top-0 bg-red-500 text-white w-7 h-7 rounded-tr-lg"
          onClick={() => deleteScope(idx)}>
          X
        </button>
      </li>
    )
  }

  return (
    <>
      <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
        <h2 className='text-2xl font-bold mb-5'>Scope of Work</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
          <div className="flex flex-col">
            <label htmlFor="scope_details">Scope Details</label>
            <textarea
              name="scope_details"
              id="scope_details"
              onChange={(e) => setNewScope({images: [...newScope.images], details: e.target.value })}
              className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
              value={newScope.details}
              placeholder="Scope details here..."
            />
          </div>

          {/*<FilePond*/}
          {/*  ref={imageUploadRef}*/}
          {/*  files={files}*/}
          {/*  acceptedFileTypes='image/*'*/}
          {/*  onupdatefiles={(fileItems) => handleFile(fileItems)}*/}
          {/*  allowMultiple={true}*/}
          {/*  name="file"*/}
          {/*  server="/api/uploadImage"*/}
          {/*  credits={''}*/}
          {/*/>*/}

          <div className={`grid grid-cols-4 gap-4`}>
            {newScope.images?.map((image, idx) => <ImagePreview image={image} key={idx} /> )}
            <UploadButtonView />
          </div>
        </div>



        <button
          type="button"
          onClick={handleAddScope}
          className="bg-emerald-500 hover:bg-emerald-400 rounded-lg px-5 py-3 text-white font-bold mt-5">
          Add Scope
        </button>
      </div>

      <div>
        <ol className="list-decimal list-inside">
          {formInfo.scope.map((item, idx) => <ScopeItem key={idx} item={item} idx={idx} /> )}
        </ol>
      </div>
    </>
  )
}