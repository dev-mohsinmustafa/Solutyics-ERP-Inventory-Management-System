import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Vendors = async () => {
  const vendors = await getData("vendors");
  const columns = ["title", "companyName", "email", "phone",];
  // how do i get an array with objects with only the keys title and description 
  // const data = suppliers.map((obj) => {
  //   return {
  //     title: obj.title,
  //     phone: obj.phone,
  //     email: obj.email,
  //   };
  // })
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Vendors" newLink="/dashboard/inventory/vendors/new" />
      {/* I need a Table that show all the vendors */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={vendors} columns={columns} resourceTitle={"vendors"}/>
      </div>
    </div>
  )
}
export default Vendors;