using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryCustomer : RepositoryBase<Customer>, IRepositoryCustomer
    {
        public RepositoryCustomer(PressStart2Context context) : base(context)
        {
            
        }
    }
}
 