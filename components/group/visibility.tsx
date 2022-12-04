const Visibility = ({ register }: { register: any }) => {
  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
        <p className="font-mono text-lg font-bold">Public or Private*</p>
        <div className="flex ml-4 mt-2">
          <div className="flex flex-col font-mono text-lg font-bold">
            <label>
              <input
                type="radio"
                name="true-false"
                value="public"
                {...register("visibility")}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="true-false"
                value="private"
                {...register("visibility")}
              />
              Private
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visibility;
