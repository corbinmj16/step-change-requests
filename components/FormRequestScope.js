import {useState} from "react";
import {supabase} from "../utils/supabase";
import Image from "next/image";

export function FormRequestScope({ formInfo, addScopeToInfo, deleteScope }) {
  const defaultNewScope = {details: '', images: [],}
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [newScope, setNewScope] = useState(defaultNewScope);

  const handleAddScope = () => {
    addScopeToInfo(newScope);
    setNewScope(defaultNewScope);
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
      .from('test-bucket')
      .upload(`${filePath}`, file);

    if (error) {
      console.log(error.message)
    }

    const {data: photoUrl} = supabase.storage.from('test-bucket').getPublicUrl(filePath);
    const {publicURL} = photoUrl;

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
      <label
        htmlFor="images"
        className="border-2 border-dashed border-gray-300 w-40 h-40 flex justify-center hover:cursor-pointer hover:bg-gray-50">
        <span className="self-center text-center text-blue-500">
          Upload Image
        </span>
        <input
          type="file"
          name="images"
          id="images"
          className="hidden"
          onChange={handleFile} />
      </label>
    )
  }

  const ImagePreview = ({ image }) => {
    return (
      <div className="w-40 h-40 relative">
        <Image
          src={image.publicURL}
          alt={image}
          objectFit="cover"
          layout="fill"
        />
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
          {item.images.map((image, key) => <ImagePreview key={key} image={image} /> )}
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
      <section className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
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

          <div className={`grid grid-cols-4 gap-4`}>
            {newScope.images.map((image, idx) => <ImagePreview image={image} key={idx} /> )}
            {uploadingPhoto ? 'Uploading...' : <UploadButtonView />}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddScope}
          className="bg-emerald-500 hover:bg-emerald-400 rounded-lg px-5 py-3 text-white font-bold mt-5">
          Add Scope
        </button>
      </section>

      <section>
        <ol className="list-decimal list-inside">
          {formInfo.scope.map((item, idx) => <ScopeItem key={idx} item={item} idx={idx} /> )}
        </ol>
      </section>
    </>
  )
}