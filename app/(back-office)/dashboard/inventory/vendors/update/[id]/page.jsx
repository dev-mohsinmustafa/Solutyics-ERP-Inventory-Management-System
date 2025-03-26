import { getData } from "@/lib/getData";
import NewVendor from "../../new/page";

const UpdateVendor = async({ params: { id } }) => {
    const TAG = "UpdateVendor.js"
    const data = await getData(`vendors/${id}`);
    console.log(TAG, "data", data);
     
    return (
        <NewVendor initialData={data} isUpdate={true}/>
    )
}

export default UpdateVendor;