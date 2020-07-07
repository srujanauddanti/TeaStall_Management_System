using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TeaStall_Management_System.Models;

namespace TeaStall_Management_System.Controllers
{
    public class InventoryController : Controller
    {
        InventoryManagementEntities Obj = new InventoryManagementEntities();
        string message = "";
        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>  
        ///   
        /// Get All Inventory  
        /// </summary>  
        /// <returns></returns>  
        public JsonResult Get_AllInventory()
        {
            using (InventoryManagementEntities Obj = new InventoryManagementEntities())
            {
                List<TeaInventory> item = Obj.TeaInventories.ToList();
                return Json(item, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>  
        /// Get Inventory With Id  
        /// </summary>  
        /// <param name="Id"></param>  
        /// <returns></returns>  
        public ActionResult Get_InventoryById(int id)
        {
            using (InventoryManagementEntities Obj = new InventoryManagementEntities())
            {
                TeaInventory item = Obj.TeaInventories.Find(id);
                return View(item);
               // return Json(Obj.TeaInventories.Find(id), JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>  
        /// Insert New Item  
        /// </summary>  
        /// <param name="item"></param>  
        /// <returns></returns>  
        public JsonResult Insert_Inventory(TeaInventory item)
        {
            if (item!= null)
            {
                using (InventoryManagementEntities Obj = new InventoryManagementEntities())
                {
                    Obj.TeaInventories.Add(item);
                    if(Obj!=null)
                    {
                        Obj.SaveChanges();
                        message= "Item Added Successfully";
                    }
                    else
                    {
                        message= "Item Not Inserted! Try Again";
                    }


                }
            }
            else
            {
                message= "Item Not Inserted! Try Again";
            }
            return Json(message, JsonRequestBehavior.AllowGet);

        }
        /// <summary>  
        /// Delete Item Information  
        /// </summary>  
        /// <param name="item"></param>  
        /// <returns></returns>  
        public JsonResult Delete_Inventory(TeaInventory item)
        {
            if (item != null)
            {
                using (InventoryManagementEntities Obj = new InventoryManagementEntities())
                {
                    var item_ = Obj.Entry(item);
                    if (item_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.TeaInventories.Attach(item);
                        Obj.TeaInventories.Remove(item);
                    }
                    Obj.SaveChanges();
                    message= "Item Deleted Successfully";
                }
            }
            else
            {
                message= "Item Not Deleted! Try Again";
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }
        /// <summary>  
        /// Update Item Information  
        /// </summary>  
        /// <param name="item"></param>  
        /// <returns></returns>  
        public JsonResult Update_Inventory(TeaInventory item)
        {
            
            if (item != null&&item.Sr_no>0)
            {
                    var item_ = Obj.Entry(item);
                TeaInventory itemObj = Obj.TeaInventories.Where(x => x.Sr_no == item.Sr_no).FirstOrDefault();
                if(itemObj!=null)
                {
                    itemObj.TeaName = item.TeaName;
                    itemObj.Description = item.Description;
                    itemObj.Price = item.Price;
                    Obj.TeaInventories.Attach(itemObj);
                    Obj.Entry(itemObj).State = EntityState.Modified;
                    Obj.SaveChanges();
                    
                }

                message= "Inventory Updated Successfully";

            }
            else
            {
                message= "Inventory Not Updated! Try Again";
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Detail()
        {
            return View();
        }
    }
}