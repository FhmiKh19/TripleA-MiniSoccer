import { Route } from "react-router-dom";
import OwnerLayout from "../components/layout/OwnerLayout";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import TransactionReports from "../pages/owner/TransactionReports";

function OwnerRoutes() {
  return (
    <>
      <Route path="/owner" element={<OwnerLayout pageTitle="Owner Dashboard"><OwnerDashboard /></OwnerLayout>} />
      <Route path="/owner/reports" element={<OwnerLayout pageTitle="Transaction Reports"><TransactionReports /></OwnerLayout>} />
    </>
  );
}

export default OwnerRoutes;
