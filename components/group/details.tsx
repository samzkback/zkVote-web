const Details = ({ register, preview }: { register: any, preview: any }) => {
  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
        <p className="font-mono text-lg font-bold">Group Name*</p>
        <div className="flex justify-center mt-2">
          <input
            type="text"
            id="grouptName"
            className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4 block bg-white focus:ring-indigo-500 focus:border-indigo-500"
            {...register("grouptName")}
          />
        </div>

        <p className="font-mono text-lg font-bold mt-2">Group Description</p>
        <div className="mt-2 flex justify-center">
          <textarea
            rows={5}
            id="groupDescription"
            className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4 block bg-white focus:ring-indigo-500 focus:border-indigo-500"
            {...register("grouptDescription")}
          />
        </div>
        <div className="mt-4 mb-4 text-center flex justify-center">
          <label htmlFor="file-upload" className="custom-file-upload" style={{ cursor: "pointer" }}>
            <div className="h-40 w-40 my-10">
              {preview ? (
                <img className="mx-auto" src={preview} alt="avatar" />
              ) : (
                <img
                  className="mx-auto"
                  src={"https://s2.loli.net/2022/11/19/qeyLJlnr2xv9mts.png"}
                  alt="default"
                />
              )}
            </div>
            <a style={{ cursor: "pointer" }}>
              <p className="text-black font-mono w-full px-4 font-bold text-lg border border-black border-2 rounded-3xl bg-white py-4">
                Upload Logo +
              </p>
            </a>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              {...register("image")}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Details;
