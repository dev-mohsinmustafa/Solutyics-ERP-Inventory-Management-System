import RoleGuard from "@/app/roleGuard/RoleGuard";
import DataTablePurchaseRequestApproval from "@/components/dashboard/DataTablePurchaseRequestApproval";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const ApprovalRequests = async () => {
  const purchasesRequest = await getData("purchase-requests");
  const columns = ["requestedBy", "requestDate", "purchaseOrder", "reference", "description",  "status" ];
  // "category.title", "warehouse.title", "quantity",

  return (
    <RoleGuard allowedRoles={["admin"]}>

    <div>
      {/* Fixed Header */}
      <FixedHeader title="Purchase Request Approval Management" newLink="/dashboard/inventory/approval-requests/new" />
      {/* I need a Table that show all the items */}
      {/* Table */}
      <div className="my-4 p-8">
      <h2 className="py-4 text-xl font-semibold">Pending Approval Requests</h2>
        <DataTablePurchaseRequestApproval data={purchasesRequest} columns={columns} resourceTitle="approval-requests"/>
      </div>
    </div>
    </RoleGuard>

  )
}
export default ApprovalRequests;