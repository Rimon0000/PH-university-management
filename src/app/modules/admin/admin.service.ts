import QueryBuilder from "../../builder/QueryBuilder";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model"
import { adminSearchableFields } from "./admin.constant";

//get all admins
const getAllAdminsFromDb =async (query: Record<string, unknown>) => {
    //for class uses
    const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields).filter().sort().paginate().fields()

    const result = await adminQuery.modelQuery
    return result;
}

//get single admin
const getSingleAdminFromDb =async (id: string) => {
    const result = await Admin.findById(id)
    return result;
}

//update single admin
const updateAdminFromDb =async (id:string, payload: Partial<TAdmin>) => {
    const result = await Admin.findByIdAndUpdate(id, payload, {new: true})
    return result;
}

//delete single admin
const deleteAdminFromDb =async (id:string) => {
    const result = await Admin.findByIdAndUpdate(id);
    return result;
}

export const adminServices = {
    getAllAdminsFromDb,
    getSingleAdminFromDb,
    updateAdminFromDb,
    deleteAdminFromDb
}