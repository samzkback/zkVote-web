
import { CreateGroupWithAssetDemand, PRIVACY } from '../../utils/vote';

const Visibility = ({ register }: { register: any }) => {
  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
        <p className="font-mono text-lg font-bold">Decide Who Can Join the Group. Public or NFT or TOKEN holders*</p>
        <div className="flex ml-4 mt-2">
          <div className="flex flex-col font-mono text-lg font-bold">
            <label>
              <input
                type="radio"
                name="visibility"
                value={PRIVACY.ANYONE}
                {...register("visibility")}
              />
              Anyone
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value={PRIVACY.NFT}
                {...register("visibility")}
              />
              NFT
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value={PRIVACY.TOKEN}
                {...register("visibility")}
              />
              Token
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visibility;
