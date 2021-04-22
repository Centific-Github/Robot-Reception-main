using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Model
{
    public class Erros
    {
        public static Err InstanceNotFound = new Err() { Code = -10, Message = "instance not found, maybe id is wrong" };
        public static Err DBOperationErro = new Err() { Code = -20, Message = "Data base operation erro, check your db config or network" };
        public static Err ModelStateInvalid = new Err() { Code = -30, Message = "ModelStateInvalid" };
        public static Err DuplicateDataToAddOrUpdate = new Err() { Code = -40, Message = "Duplicate Data To Add Or Update" };
    }

    public class Err
    {
        public int Code { get; set; }
        public string Message { get; set; }
    }
}
